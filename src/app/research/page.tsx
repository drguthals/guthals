import prisma from '@/lib/prisma';

interface Research {
  id: string;
  title: string;
  abstract: string | null;
  authors: {
    role: string | null;
    authorId: string;
    order: number;
    researchId: string;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
  }[];
  publication: string | null;
  year: number | null;
  url: string | null;
  createdAt: Date;
}

export default async function ResearchPage() {
  const research = await prisma.research.findMany({
    select: {
      id: true,
      title: true,
      abstract: true,
      publication: true,
      year: true,
      url: true,
      createdAt: true,
      authors: {
        include: {
          author: {
            select: {
              name: true,
              id: true,
              image: true,
            }
          }
        },
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">🔬 Research</h1>
      <div className="grid grid-cols-1 gap-6">
        {research.map((paper: Research) => (
          <div key={paper.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{paper.title}</h2>
              <p className="text-gray-600 mb-2">
                {paper.authors.map((a) => a.author.name).join(', ')}
              </p>
              <p className="text-gray-500 mb-4">{paper.publication} ({paper.year})</p>
              <p className="text-gray-600 mb-4">{paper.abstract}</p>
              {paper.url && (
                <a 
                  href={paper.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read Paper →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}