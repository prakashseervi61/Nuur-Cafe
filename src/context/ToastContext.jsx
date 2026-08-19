import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'

const ToastContext = createContext(null)

function ToastEl({ message, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2800)
    return () => clearTimeout(t)
  }, [onDone])

  return createPortal(
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1a120b] text-[#fdf6ee] text-[13px] font-medium shadow-2xl animate-toast">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Added
    </div>,
    document.body
  )
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message) => {
    setToast(message)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toast && <ToastEl message={toast} onDone={() => setToast(null)} />}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
