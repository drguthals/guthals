
import { Badge } from "@/app/_components/ui/badge"

/*
If I want to add back in the buy buttons:
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/app/_components/ui/button"

<div className="flex justify-end">
    <Button className="w-auto" asChild>
        <a href={page} target="_blank"><ShoppingCart className="mr-2 h-4 w-4" /> Buy Now</a>
    </Button>
</div>
*/

export default function Content ( {title, year, role, description, page} : {title : string, year : string, role : string, description : string, page: string}) {
    return (
        <div className="w-full px-5 pt-9">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {title}
            </h1>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="pb-6">
                <Badge>{year}</Badge>&nbsp;&nbsp;
                <Badge>{role}</Badge>
                </div>
            <div className="pb-6">
                {description}
            </div>
        </div>
    )
}