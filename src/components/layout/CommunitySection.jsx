import React from 'react'

const CommunitySection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl mb-6 text-center text-brown-900">
            Our Community
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Events */}
            <div className="space-y-6">
              <h3 className="font-semibold text-xl text-brown-900 mb-4">
                Community Events
              </h3>
              <p className="text-brown-600">
                Aurora Cafe regularly hosts events that bring our community
                together, including coffee tasting workshops, latte art
                competitions, live music performances, and art exhibitions.
                These events provide opportunities for learning, creativity,
                and connection.
              </p>
              <button
                className="btn-primary px-6 py-3 bg-brown-500 hover:bg-brown-600 transition-all duration-300"
              >
                View Upcoming Events
              </button>
            </div>
            {/* Partnerships */}
            <div className="space-y-6">
              <h3 className="font-semibold text-xl text-brown-900 mb-4">
                Local Partnerships
              </h3>
              <p className="text-brown-600">
                We believe in supporting our local community by partnering with
                nearby businesses and organizations. From sourcing pastries
                from local bakeries to collaborating with artists for our
                wall displays, we strive to create a network of mutual support
                and shared success.
              </p>
              <p className="text-brown-600 mt-4">
                These partnerships not only enrich our offerings but also
                strengthen the vibrant fabric of our neighborhood.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection