import SidebarItem from "@/app/_components/navigation/SidebarItem"
import { Type } from "@prisma/client";
import { helpers } from "@/prisma/helpers";

export default async function Sidebar () {
  const contentitems = await helpers.getContentByType(Type.BOOK);
  //const contentitems = await helpers.getBooks();

  return (
      <nav className="grid items-start px-2 text-sm lg:px-4 border-r h-screen overflow-y-auto">
        {contentitems.map((contentItem) => (
          <SidebarItem 
            key={contentItem.key}
            title={contentItem.title}
            page={`/books/${contentItem.key}`}
          />
        ))}
      </nav>
  )
}