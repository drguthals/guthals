import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen p-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome! 👋</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">📚 Latest Books</h2>
            <p className="text-gray-600">
              Discover my recommended reading list and book reviews.
            </p>
            <a href="/books" className="text-blue-600 hover:underline mt-4 inline-block">
              View all books →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">🎥 Recent Videos</h2>
            <p className="text-gray-600">
              Watch my latest video content and tutorials.
            </p>
            <a href="/videos" className="text-blue-600 hover:underline mt-4 inline-block">
              View all videos →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">🎓 Featured Courses</h2>
            <p className="text-gray-600">
              Browse through my educational courses and learning materials.
            </p>
            <a href="/courses" className="text-blue-600 hover:underline mt-4 inline-block">
              View all courses →
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">🔬 Latest Research</h2>
            <p className="text-gray-600">
              Read my latest research papers and academic work.
            </p>
            <a href="/research" className="text-blue-600 hover:underline mt-4 inline-block">
              View all research →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}