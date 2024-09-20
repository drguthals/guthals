export default function Layout ({children, sidebar}:{children:React.ReactNode, sidebar:React.ReactNode}) {
    return (
        <div className="grid md:grid-cols-[220px_1fr] grid-cols-[1fr_100px]">
            {sidebar}
            <div className="max-md:hidden">
                {children}
            </div>
        </div>
    )
};