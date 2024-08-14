"use client"

import Link from "next/link"
import {
  ScrollText,
  BookUser,
  School,
  Hand,
  BookMarked,
  TvMinimalPlay,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar"
import { usePathname } from "next/navigation";
import { cn } from "@/app/_components/utils";

const Sidebar = () => {
  // This hook uses browser APIs, which is why we have to ship to the client
  const pathname = usePathname();
  
  return ( <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Avatar>
              <AvatarImage src="https://github.com/drguthals.png" alt="@drguthals" />
              <AvatarFallback>DR G</AvatarFallback>
          </Avatar>
          <span>Hey, I'm Sarah</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm lg:px-4">
          <Link
            href="/about"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"text-primary bg-muted":pathname==="/about"})}
          >
            <BookUser className="h-4 w-4" />
            About
          </Link>
          <Link
            href="/books"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"text-primary bg-muted":pathname==="/books"})}
          >
            <BookMarked className="h-4 w-4" />
            Books
          </Link>
          <Link
            href="/publications"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"text-primary bg-muted":pathname==="/publications"})}
          >
            <ScrollText className="h-4 w-4" />
            Publications
          </Link>
          <Link
            href="/videos"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"text-primary bg-muted":pathname==="/videos"})}
          >
            <TvMinimalPlay className="h-4 w-4" />
            Videos
          </Link>
          <Link
            href="/courses"
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"text-primary bg-muted":pathname==="/courses"})}
          >
            <School className="h-4 w-4" />
            Courses
          </Link>
        </nav>
      </div>
    </div>
  </div>)
};

export default Sidebar;