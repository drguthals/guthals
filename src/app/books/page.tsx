import prisma from '@/lib/prisma';

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      description: true,
      coverImage: true,
      url: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">📚 Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book: any) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-2">By {book.author}</p>
              {book.description && (
                <p className="text-gray-600 mb-4">{book.description}</p>
              )}
              <div className="flex justify-between items-center">
                {book.url && (
                  <a 
                    href={book.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Learn More →
                  </a>
                )}
                <span className="text-sm text-gray-500">
                  {new Date(book.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}