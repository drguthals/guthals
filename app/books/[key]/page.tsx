import { helpers } from "@/prisma/helpers";

export default async function BookDetails( {params}: { params: {key: string}} ) {

    const book = await helpers.getContentByKey(params.key);

    return (
        <div className="h-screen w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
            {book?.title}
        </h1>
            {book?.description}
            {book?.image}
            {book?.exturl}
            {book?.status}
        </div>
    )
}