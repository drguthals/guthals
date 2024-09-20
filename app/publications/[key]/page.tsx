import { helpers } from "@/prisma/helpers";

export default async function PubDetails( {params}: { params: {key: string}} ) {

    const publication = await helpers.getContentByKey(params.key);

    return (
        <div className="h-screen w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
            {publication?.title}
        </h1>
            {publication?.description}
            {publication?.exturl}
            {publication?.status}
        </div>
    )
}