"use client"

import {
  Card,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { cn } from "@/app/_components/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function SidebarItem ( { title, page} : {title : string, page: string} ) {
    const pathname = usePathname();
    return (
        <Link
            href={page}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary", {"text-primary bg-muted":pathname===page})}
            >
            <Card className="grid w-full ">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
  );
}