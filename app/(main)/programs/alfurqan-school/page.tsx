import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Al Furqan School | Islamic Education Excellence",
  description: "Al Furqan School - Providing quality Islamic education with modern academic excellence.",
}

export default function AlFurqanSchoolPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Al Furqan School</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Al Furqan School</h2>
        <p className="text-lg mb-4">
          Al Furqan School is a weekly Islamic program dedicated to nurturing young minds 
          with a balanced approach to Islamic and secular education. Our program provides a comprehensive 
          learning environment that nurtures Islamic values and character development.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-lg">
            To provide a nurturing Islamic environment where students can develop their full potential 
            academically, spiritually, and socially, while maintaining strong Islamic values and identity.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Program Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Age Requirements</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Students ages 5 and up</li>
              <li>Multiple levels available</li>
              <li>Tailored to individual needs</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Curriculum</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Quran reading (Alnooraniya)</li>
              <li>Tajweed rules</li>
              <li>Memorization techniques</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Program Schedule & Registration</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Class Schedule</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Tuesday and Thursday</li>
              <li>6:00 PM - 7:30 PM</li>
              <li>Program runs October - May</li>
              <li>Summer break during holidays</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Registration Period</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Registration opens in September</li>
              <li>Limited spots available</li>
              <li>Early registration recommended</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Al Furqan School?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Qualified Faculty</h3>
            <p>Our teachers are highly qualified professionals with expertise in both Islamic and secular education.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Holistic Development</h3>
            <p>Focus on character building, leadership skills, and community service alongside academic excellence.</p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
        <p className="text-lg mb-6">
          Be part of a school that values academic excellence, Islamic principles, and character development. 
          Enroll your child today and give them the gift of a balanced Islamic education.
        </p>
        <a 
          href="https://form.jotform.com/242478862820262" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Apply Now
        </a>
      </section>
    </div>
  )
} 