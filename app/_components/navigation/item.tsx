"use client"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import { cn } from "@/app/_components/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";

export default function Item ( {image, title, subtitle, page} : {image : string, title : string, subtitle : string, page: string}) {
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