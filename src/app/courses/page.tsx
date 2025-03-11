import prisma from '@/lib/prisma';

interface Course {
  id: string;
  title: string;
  description: string | null;
  platform: string | null;
  url: string | null;
  createdAt: Date;
}

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      platform: true,
      url: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">📚 Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: Course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-2">{course.platform}</p>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                {course.url && (
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Learn More →
                  </a>
                )}
                <span className="text-sm text-gray-500">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}