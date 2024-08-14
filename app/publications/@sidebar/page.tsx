import Item from "@/app/_components/navigation/item"

export default function Sidebar () {
    return (
        <nav className="grid items-start px-2 text-sm lg:px-4 border-r h-screen overflow-y-auto">
          <Item 
            image="@/instagram-glyph-gradient"
            title="CodeSpells: bridging educational language features with industry-standard languages" 
            subtitle="Koli Calling 2014"
            page="/publications#koliCalling14"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="A discussion on adopting peer instruction in a course focused on risk management" 
            subtitle="Good Book"
            page="/publications#journal-compsci-colleges-1"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Children's perceptions of what counts as a programming language" 
            subtitle="Good Book"
            page="/publications#journal-compsci-colleges-2"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Codespells: how to design quests to teach java concepts" 
            subtitle="Good Book"
            page="/publications#journal-compsci-colleges-3"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Student experience in a student-centered peer instruction classroom" 
            subtitle="Good Book"
            page="/publications#icer13"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="CodeSpells: embodying the metaphor of wizardry for programming" 
            subtitle="Good Book"
            page="/publications#iticse13"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="From competition to metacognition: designing diverse, sustainable educational games" 
            subtitle="Good Book"
            page="/publications#chi13"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="On the nature of fires and how to spark them when you're not there" 
            subtitle="Good Book"
            page="/publications#sigcse13"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="The abstraction transition taxonomy: developing desired learning outcomes through the lens of situated cognition" 
            subtitle="Good Book"
            page="/publications#icer12"
          />
          <Item 
            image="@/instagram-glyph-gradient"
            title="Computing as the 4th 'R': a general education approach to computing education" 
            subtitle="Good Book"
            page="/publications#icer11"
          />
        </nav>
    )
}