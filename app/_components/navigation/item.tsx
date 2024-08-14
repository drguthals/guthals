import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card"
import {
    BookMarked,
  } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/app/_components/ui/avatar"
import { cn } from "@/app/_components/utils";
import Link from "next/link"

export default function Item ( {image, title, subtitle, page} : {image : string, title : string, subtitle : string, page: string}) {
    return (
        <Link
            href={page}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary")}
            >
            <Card className="grid w-full ">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
            </Card>
        </Link>
  );
}