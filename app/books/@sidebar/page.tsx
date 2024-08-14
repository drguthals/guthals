import Item from "@/app/_components/navigation/item"

export default function Sidebar () {
    return (
        <nav className="grid items-start px-2 text-sm lg:px-4 border-r h-screen overflow-y-auto">
          <Item 
            image="@/instagram-glyph-gradient"
            title="Modding Minecraft: Build Your Own Minecraft Mods!" 
            subtitle="Good Book"
            page="/books/moddingMinecraft"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Minecraft Modding For Kids For Dummies" 
            subtitle="Good Book"
            page="/books/moddingMinecraftKids"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Building 3D Digital Games: Design and Program 3D Games" 
            subtitle="Good Book"
            page="/books/games"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Building a Minecraft City: Build Like a Pro!" 
            subtitle="Good Book"
            page="/books/buildMinecraft"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Helping Kids with Coding For Dummies" 
            subtitle="Good Book"
            page="/books/helpKidsCode"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="GitHub for Dummies" 
            subtitle="Good Book"
            page="/books/ghfd"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Write Code Like a Pro: Create Working Applications" 
            subtitle="Good Book"
            page="/books/writeCode"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Building a Mobile App: Design and Program Your Own App!" 
            subtitle="Good Book"
            page="/books/buildAnApp"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Creating a Web Site: Design and Build Your First Site!" 
            subtitle="Good Book"
            page="/books/createWebsite"
          />
        </nav>
    )
}