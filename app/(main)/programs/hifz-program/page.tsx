import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hifz Program | Quran Memorization",
  description: "Join our comprehensive Hifz program for systematic Quran memorization and spiritual growth.",
}

export default function HifzProgramPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hifz Program</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">About Our Hifz Program</h2>
        <p className="text-lg mb-4">
          Our Hifz program is designed to help students memorize the Holy Quran with proper Tajweed and understanding. 
          We provide a structured and supportive environment where students can develop a strong connection with the Quran 
          while building a solid foundation in Islamic knowledge.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Program Structure</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Program Schedule</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Monday - Friday</li>
              <li>9:00 AM - 3:30 PM</li>
              <li>Full-day program</li>
              <li>Structured breaks and prayer times</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Eligibility Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Boys age 7 and above</li>
              <li>Basic Quran reading skills</li>
              <li>Commitment to full-time program</li>
              <li>Parental support and involvement</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Benefits of the Program</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Spiritual Growth</h3>
            <p>Develop a deep connection with the Quran and strengthen your relationship with Allah.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Academic Excellence</h3>
            <p>Improve memory, concentration, and discipline through systematic Quran memorization.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Community Building</h3>
            <p>Join a community of like-minded individuals committed to Quranic learning and Islamic values.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Registration Information</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Program Fees</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>First child: $250</li>
                <li>Additional children: $200 each</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Registration Details</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Open enrollment throughout the year</li>
                <li>Flexible start dates</li>
                <li>No application deadlines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Begin Your Hifz Journey?</h2>
        <p className="text-lg mb-6">
          Join our Hifz program and take the first step towards memorizing the Holy Quran. 
          Our dedicated teachers and supportive environment will help you achieve your goals.
        </p>
        <a 
          href="https://form.jotform.com/242355099328261" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Enroll Now
        </a>
      </section>
    </div>
  )
}
