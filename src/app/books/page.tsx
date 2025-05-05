import prisma from '@/lib/prisma';

interface Book {
  id: string;
  title: string;
  authors: Array<{
    id: string;
    name: string;
    image: string | null;
    amazonAuthorUrl: string | null;
    acmDigitalLibraryUrl: string | null;
  }>;
  description: string | null;
  coverImage: string | null;
  url: string | null;
  publishDate: Date | null;
  createdAt: Date;
}

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      coverImage: true,
      url: true,
      publishDate: true,
      createdAt: true,
      authors: {
        select: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          },
          order: true,
          role: true,
        },
        orderBy: {
          order: 'asc'
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Transform the data to match our component's expectations
  const booksWithAuthors = books.map((book: Book) => ({
    ...book,
    authors: book.authors.map((ba: { author: any }) => ba.author)
  }));

  // Debug log
  console.log('Books response:', JSON.stringify(booksWithAuthors, null, 2));

  // Ensure books is an array
  const booksArray = Array.isArray(booksWithAuthors) ? booksWithAuthors : [];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">📚 Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {booksArray.map((book: Book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {book.coverImage ? (
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {book.authors?.map((author, index) => (
                  <div key={author.id} className="flex items-center gap-2">
                    {index > 0 && <span className="text-gray-600">&</span>}
                    {author.image && (
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src={author.image} 
                          alt={author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {author.amazonAuthorUrl ? (
                      <a 
                        href={author.amazonAuthorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {index === 0 ? 'By ' : ''}{author.name}
                      </a>
                    ) : (
                      <span className="text-gray-600">
                        {index === 0 ? 'By ' : ''}{author.name}
                      </span>
                    )}
                  </div>
                ))}
              </div>
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
                {book.publishDate && (
                  <span className="text-sm text-gray-500">
                    {new Date(book.publishDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}