"use client"

import Link from "next/link"
import {
  Menu,
  ScrollText,
  BookUser,
  School,
  BookMarked,
  TvMinimalPlay,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet"
import { usePathname } from "next/navigation";
import { cn } from "@/app/_components/utils";

const Header = () => {
    const pathname = usePathname();

    return ( 
        <header className="fixed top-0 inset-x-0 flex h-14 items-center gap-4 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                    <Avatar>
                        <AvatarImage src="https://github.com/drguthals.png" alt="@drguthals" />
                        <AvatarFallback>DR G</AvatarFallback>
                    </Avatar>
                    <span >Hey, I'm Sarah</span>
                </Link>
                <Link
                  href="/about"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", {"text-primary bg-muted":pathname==="/about"})}
                >
                    <BookUser className="h-5 w-5" />
                    About
                </Link>
                <Link
                  href="/books"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", {"text-primary bg-muted":pathname==="/books"})}
                >
                    <BookMarked className="h-5 w-5" />
                    Books
                </Link>
                <Link
                  href="/publications"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", {"text-primary bg-muted":pathname==="/publications"})}
                >
                    <ScrollText className="h-5 w-5" />
                    Publications
                </Link>
                <Link
                  href="/videos"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", {"text-primary bg-muted":pathname==="/videos"})}
                >
                    <TvMinimalPlay className="h-5 w-5" />
                    Videos
                </Link>
                <Link
                  href="/courses"
                  className={cn("mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground", {"text-primary bg-muted":pathname==="/courses"})}
                >
                    <School className="h-5 w-5" />
                    Courses
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header> 
    )
}

export default Header;