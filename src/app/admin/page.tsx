"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface ContentBase {
  id: string;
  title: string;
  description: string;
  url: string;
}

const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',') || [];

type ContentType = 'Book' | 'Video' | 'Course' | 'Research';

interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  url: string;
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const [books, setBooks] = useState<ContentBase[]>([]);
    const [videos, setVideos] = useState<ContentBase[]>([]);
    const [courses, setCourses] = useState<ContentBase[]>([]);
    const [research, setResearch] = useState<ContentBase[]>([]);
    const [newItem, setNewItem] = useState({
        type: 'Book' as ContentType,
        title: '',
        url: ''
    });
    const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

    useEffect(() => {
        // Fetch all content types
        Promise.all([
            fetch("/api/books").then(res => res.json()),
            fetch("/api/videos").then(res => res.json()),
            fetch("/api/courses").then(res => res.json()),
            fetch("/api/research").then(res => res.json())
        ]).then(([booksData, videosData, coursesData, researchData]) => {
            setBooks(booksData);
            setVideos(videosData);
            setCourses(coursesData);
            setResearch(researchData);
        });
    }, []);

    const handleDelete = async (item: ContentItem) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const endpoint = `/api/${item.type.toLowerCase()}s/${item.id}`;
            const response = await fetch(endpoint, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Update the appropriate state based on content type
                switch (item.type) {
                    case 'Book':
                        setBooks(books.filter(book => book.id !== item.id));
                        break;
                    case 'Video':
                        setVideos(videos.filter(video => video.id !== item.id));
                        break;
                    case 'Course':
                        setCourses(courses.filter(course => course.id !== item.id));
                        break;
                    case 'Research':
                        setResearch(research.filter(research => research.id !== item.id));
                        break;
                }
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item: ContentItem) => {
        setEditingItem(item);
        setNewItem({
            type: item.type,
            title: item.title,
            url: item.url
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = `/api/${newItem.type.toLowerCase()}s/${editingItem?.id}`;
            const method = editingItem ? 'PUT' : 'POST';
            
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newItem.title,
                    url: newItem.url,
                }),
            });
            
            if (response.ok) {
                const updatedItem = await response.json();
                // Update the appropriate state based on content type
                switch (newItem.type) {
                    case 'Book':
                        if (editingItem) {
                            setBooks(books.map(book => book.id === editingItem.id ? updatedItem : book));
                        } else {
                            setBooks([...books, updatedItem]);
                        }
                        break;
                    case 'Video':
                        if (editingItem) {
                            setVideos(videos.map(video => video.id === editingItem.id ? updatedItem : video));
                        } else {
                            setVideos([...videos, updatedItem]);
                        }
                        break;
                    case 'Course':
                        if (editingItem) {
                            setCourses(courses.map(course => course.id === editingItem.id ? updatedItem : course));
                        } else {
                            setCourses([...courses, updatedItem]);
                        }
                        break;
                    case 'Research':
                        if (editingItem) {
                            setResearch(research.map(r => r.id === editingItem.id ? updatedItem : r));
                        } else {
                            setResearch([...research, updatedItem]);
                        }
                        break;
                }
                // Reset form
                setNewItem({
                    type: 'Book',
                    title: '',
                    url: ''
                });
                setEditingItem(null);
            }
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    // Combine all content items into a single array
    const allContent: ContentItem[] = [
      ...(books?.map(book => ({
        ...book,
        type: 'Book' as ContentType,
      })) || []),
      ...(videos?.map(video => ({
        ...video,
        type: 'Video' as ContentType,
      })) || []),
      ...(courses?.map(course => ({
        ...course,
        type: 'Course' as ContentType,
      })) || []),
      ...(research?.map(item => ({
        ...item,
        type: 'Research' as ContentType,
      })) || []),
    ];

    if (status === "loading") {
      return <div>Loading...</div>;
    }

    if (!session) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl">Admin Login</h1>
          <button onClick={() => signIn("google")} className="p-3 bg-blue-500 text-white rounded-lg">
            Sign in with Google
          </button>
        </div>
      );
    }

    if (!session.user?.email || !allowedEmails.includes(session.user.email)) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl text-red-500">Unauthorized Access</h1>
          <p className="mt-4">You dont have permission to access this page.</p>
          <button onClick={() => signOut()} className="mt-4 p-2 bg-red-500 text-white rounded-lg">
            Sign out
          </button>
        </div>
      );
    }
  
    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl">Welcome, {session.user?.name}!</h1>
                    <h1 className="text-3xl">Admin Dashboard</h1>
                </div>
                <button onClick={() => signOut()} className="p-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600">
                    Sign out
                </button>
            </div>
            {/* Main Content Layout */}
            <div className="flex gap-8">
                {/* Add Content Form - Left Side */}
                <section className="w-1/3">
                    <h2 className="text-2xl font-bold mb-4">
                        {editingItem ? 'Edit Content' : 'Add New Content'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2">Content Type:</label>
                            <select
                                value={newItem.type}
                                onChange={(e) => setNewItem({...newItem, type: e.target.value as ContentType})}
                                className="w-full p-2 border rounded"
                            >
                                <option value="Book">Book</option>
                                <option value="Video">Video</option>
                                <option value="Course">Course</option>
                                <option value="Research">Research</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Title:</label>
                            <input
                                type="text"
                                value={newItem.title}
                                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2">URL:</label>
                            <input
                                type="url"
                                value={newItem.url}
                                onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
                        >
                            {editingItem ? 'Update Content' : 'Add Content'}
                        </button>
                        {editingItem && (
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditingItem(null);
                                    setNewItem({
                                        type: 'Book',
                                        title: '',
                                        url: ''
                                    });
                                }}
                                className="w-full bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </section>

                {/* Unified Content Table - Right Side */}
                <section className="w-2/3">
                    <h2 className="text-2xl font-bold mb-4">All Content</h2>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">URL</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allContent.map((item) => (
                                <tr key={item.id} className="border">
                                    <td className="border p-2">
                                        <span className={`px-2 py-1 rounded text-sm ${
                                            item.type === 'Book' ? 'bg-blue-100 text-blue-800' :
                                            item.type === 'Video' ? 'bg-red-100 text-red-800' :
                                            item.type === 'Course' ? 'bg-green-100 text-green-800' :
                                            'bg-purple-100 text-purple-800'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="border p-2">{item.title}</td>
                                    <td className="border p-2">
                                        <a 
                                            href={item.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 underline"
                                        >
                                            {item.url}
                                        </a>
                                    </td>
                                    <td className="border p-2">
                                        <button 
                                            onClick={() => handleEdit(item)}
                                            className="p-1 text-white rounded mr-2 hover:bg-yellow-600"
                                        >
                                            🖍
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(item)}
                                            className="p-1 text-white rounded hover:bg-red-600"
                                        >
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}