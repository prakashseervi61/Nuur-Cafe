const weekdaySlots = [
  '7:00', '7:30', '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
  '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30',
]

const weekendSlots = [
  '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00',
  '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30',
]

export const timeSlots = weekdaySlots.map((time, i) => ({
  time,
  available: i < weekendSlots.length,
}))

export const guestOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7–8' },
  { value: 8, label: '8+' },
]

export const getAvailableSlots = (date) => {
  const day = new Date(date).getDay()
  const isWeekend = day === 0 || day === 6
  const slots = isWeekend ? weekendSlots : weekdaySlots

  const unavailableCount = Math.floor(Math.random() * 4) + 1
  const unavailable = new Set()

  while (unavailable.size < unavailableCount) {
    unavailable.add(Math.floor(Math.random() * slots.length))
  }

  return slots.filter((_, i) => !unavailable.has(i))
}
