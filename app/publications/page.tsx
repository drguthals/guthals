import React from "react";
import Content from "@/app/_components/navigation/content"

const Publications = () => {
  return (
    <div className="h-screen w-full overflow-y-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl">
        Peer-Reviewed Publications
      </h1>
      <div id="koliCalling14">
        <Content 
            title="CodeSpells: bridging educational language features with industry-standard languages" 
            year="2014"
            role="Koli Calling"
            description="K-12 Computer Science Education has been an increasingly popular topic worldwide. Additionally, with K-12 standardized testing moving online, students are being required to improve their computer skills, which, among other factors, has also motivated the discussion to add computer science to the core curriculum [6, 8, 35, 22]. Educational programming languages, such as Scratch [25] and Alice [11], have a set of features that foster their use with younger students [27] such as drag-and-drop, limited API, and visual output. Given that novices can be introduced to such educational languages with a basic understanding of computer science concepts, industry-standard programming languages like Java can now be introduced to younger students."
            page="https://dl.acm.org/doi/10.1145/2674683.2674684"
            valid={true}
        />
      </div>
      <div id="journal-compsci-colleges-1">
        <Content 
            title="A discussion on adopting peer instruction in a course focused on risk management" 
            year="2014"
            role="Journal of Computing Sciences in Colleges"
            description="Peer Instruction (PI) has been shown to promote learning in introductory CS courses as well as upper-division courses such as architecture. A common thread among PI courses is that they focus on programs, algorithms, or equations that follow clear rules. In these courses there is usually one answer, though there may be varying approaches to finding it. An open-question in the PI research is: How could PI be incorporated in a course such as Software Engineering, where the focus is risk management and is therefore situational and dependent on personal experience and resources? This paper addresses one approach to developing PI materials for such a course. The pedagogy has been slightly modified: the instructor asks clicker questions, but then asks the students to call out suggestions for the answers. This paper describes this change and presents data from a student survey about their experiences. A call to the community is made to discuss how this and other modifications may be beneficial pedagogical changes to PI."
            page="https://dl.acm.org/doi/10.5555/2591468.2591496"
            valid={true}
        />
      </div>
      <div id="journal-compsci-colleges-2">
        <Content 
            title="Children's perceptions of what counts as a programming language" 
            year="2014"
            role="Journal of Computing Sciences in Colleges"
            description=""
            page="https://dl.acm.org/doi/10.5555/2591468.2591491"
            valid={true}
        />
      </div>
      <div id="journal-compsci-colleges-3">
        <Content 
            title="Codespells: how to design quests to teach java concepts" 
            year="2014"
            role="Journal of Computing Sciences in Colleges"
            description=""
            page="https://dl.acm.org/doi/10.5555/2591468.2591490"
            valid={true}
        />
      </div>
      <div id="icer13">
        <Content 
            title="Student experience in a student-centered peer instruction classroom" 
            year="2013"
            role="ICER"
            description=""
            page="https://dl.acm.org/doi/10.1145/2493394.2493407"
            valid={true}
        />
      </div>
      <div id="iticse13">
        <Content 
            title="CodeSpells: embodying the metaphor of wizardry for programming" 
            year="2013"
            role="ITiCSE"
            description=""
            page="https://dl.acm.org/doi/10.1145/2462476.2465593"
            valid={true}
        />
      </div>
      <div id="chi13">
        <Content 
            title="From competition to metacognition: designing diverse, sustainable educational games" 
            year="2013"
            role="CHI"
            description=""
            page="https://dl.acm.org/doi/10.1145/2470654.2470669"
            valid={true}
        />
      </div>
      <div id="sigcse13">
        <Content 
            title="On the nature of fires and how to spark them when you're not there" 
            year="2013"
            role="SIGCSE"
            description=""
            page="https://dl.acm.org/doi/10.1145/2445196.2445290"
            valid={true}
        />
      </div>
      <div id="icer12">
        <Content 
            title="The abstraction transition taxonomy: developing desired learning outcomes through the lens of situated cognition" 
            year="2012"
            role="ICER"
            description=""
            page="https://dl.acm.org/doi/10.1145/2361276.2361290"
            valid={true}
        />
      </div>
      <div id="icer11">
        <Content 
            title="Computing as the 4th 'R': a general education approach to computing education" 
            year="2011"
            role="ICER"
            description=""
            page="https://dl.acm.org/doi/10.1145/2016911.2016938"
            valid={true}
        />
      </div>
    </div>
  );
};

export default Publications;