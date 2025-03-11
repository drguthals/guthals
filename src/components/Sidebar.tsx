'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100';
    };

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-white border-r border-gray-200 p-4">
            <div className="mb-8">
                <Link href="/" className="text-xl font-bold">My Website</Link>
            </div>
            
            <nav className="space-y-2">
                <Link 
                    href="/" 
                    className={`block p-2 rounded ${isActive('/')}`}
                >
                    🏠 Home
                </Link>
                <Link 
                    href="/books" 
                    className={`block p-2 rounded ${isActive('/books')}`}
                >
                    📚 Books
                </Link>
                <Link 
                    href="/videos" 
                    className={`block p-2 rounded ${isActive('/videos')}`}
                >
                    🎥 Videos
                </Link>
                <Link 
                    href="/courses" 
                    className={`block p-2 rounded ${isActive('/courses')}`}
                >
                    🎓 Courses
                </Link>
                <Link 
                    href="/research" 
                    className={`block p-2 rounded ${isActive('/research')}`}
                >
                    🔬 Research
                </Link>
                <Link 
                    href="/blog" 
                    className={`block p-2 rounded ${isActive('/blog')}`}
                >
                    ✍️ Blog
                </Link>
            </nav>
        </aside>
    );
} 