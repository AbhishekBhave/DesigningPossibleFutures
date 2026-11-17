import type {
  CareerTrack,
  ComparisonDimension,
  EraDefinition,
  TimelineMilestone,
} from '../types/timeline';

export const ORIGIN_PROLOGUE = {
  kicker: 'Class Gallery Walk · Three Potential Futures',
  title: 'Three Futures from Right Here',
  leadParagraph:
    'Standing at Year Zero, I am drawn to three very different ways of spending the next decade: shaping digital products, building better tools for classrooms, or teaching and researching the ethics of technology. Scroll across to walk through real moments from each future.',
  sharedFoundations: [
    'Enjoy untangling messy, real-world problems',
    'Care about how technology shapes everyday life',
    'Want people to feel empowered by what I build or teach',
    'Curious about both how systems work and why they matter',
  ],
  plateImage: '/src/assets/images/origin_editorial_compass_1794944121764.jpg',
  plateCaption:
    'Fig. 01 — Starting point: notebooks, sketches, and open questions before choosing a direction.',
};

export const TIMELINE_ERAS: EraDefinition[] = [
  {
    id: 'origin',
    index: 0,
    code: 'Y00',
    label: 'Starting Point',
    timeframe: 'Today',
    summary: 'The first step out the door.',
  },
  {
    id: 'immersion',
    index: 1,
    code: 'Y01–02',
    label: 'Early Days',
    timeframe: 'Years 1–2',
    summary: 'Learning the ropes in the real world.',
  },
  {
    id: 'inflection',
    index: 2,
    code: 'Y03–05',
    label: 'Taking Ownership',
    timeframe: 'Years 3–5',
    summary: 'Leading projects, teams, or original research.',
  },
  {
    id: 'stewardship',
    index: 3,
    code: 'Y06–08',
    label: 'Big Bets',
    timeframe: 'Years 6–8',
    summary: 'Scaling impact beyond a single team or classroom.',
  },
  {
    id: 'legacy',
    index: 4,
    code: 'Y09–12+',
    label: 'Long Horizon',
    timeframe: 'Years 9–12+',
    summary: 'Where a decade on this path leads.',
  },
];

export const CAREER_TRACKS: CareerTrack[] = [
  {
    id: 'consulting-pm',
    romanIndex: 'Path I',
    title: 'Tech Consulting & Product Management',
    shortTitle: 'Consulting & Product',
    subtitle: 'Solving messy business problems and shipping software people actually use',
    accentHex: '#1E3A8A',
    accentSoftBg: '#EFF4FF',
    accentBorder: '#BFDBFE',
    plateImage: '/src/assets/images/path_consulting_product_1794944121255.jpg',
    plateCaption:
      'Fig. 02 — Product & strategy studio: turning user interviews and sketches into working software.',
    archetypeSummary:
      'Fast-paced teamwork focused on figuring out what to build, why users struggle with it, and how to ship better tools at scale.',
  },
  {
    id: 'edtech-founder',
    romanIndex: 'Path II',
    title: 'Entrepreneurship in Education',
    shortTitle: 'EdTech Founder',
    subtitle: 'Creating better, fairer learning tools and starting an education venture',
    accentHex: '#9A3412',
    accentSoftBg: '#FFF4ED',
    accentBorder: '#FED7AA',
    plateImage: '/src/assets/images/path_edtech_venture_1794944120878.jpg',
    plateCaption:
      'Fig. 03 — Learning workshop: testing hands-on prototypes directly with teachers and students.',
    archetypeSummary:
      'Hands-on building with high risk and high heart—starting from scratch to make great learning resources accessible to more students.',
  },
  {
    id: 'ethics-professor',
    romanIndex: 'Path III',
    title: 'Professor of Technology & Ethics',
    shortTitle: 'Tech & Ethics Prof',
    subtitle: 'Researching how technology affects society and teaching future builders',
    accentHex: '#14532D',
    accentSoftBg: '#F0FDF4',
    accentBorder: '#BBF7D0',
    plateImage: '/src/assets/images/path_ethics_academia_1794944122565.jpg',
    plateCaption:
      'Fig. 04 — University study: connecting computer science, moral philosophy, and classroom debate.',
    archetypeSummary:
      'Deep thinking, writing, and teaching—investigating big questions about AI, fairness, and democracy over long timelines.',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  // ================= PATH I: CONSULTING & PRODUCT MANAGEMENT =================
  {
    id: 'cpm-y0',
    trackId: 'consulting-pm',
    eraId: 'origin',
    eraIndex: 0,
    yearLabel: 'Today',
    stageCategory: 'First Step',
    roleTitle: 'Product & Strategy Intern',
    setting: 'Summer Internship · Campus Case Competitions',
    scenarioHook:
      'Spending a weekend interviewing frustrated commuters to redesign a city transit app from scratch.',
    sceneStory:
      'My team has 48 hours to figure out why local riders keep missing bus transfers. Instead of guessing at a desk, we stand at transit stops talking to people, sketch a simpler screen on paper, and pitch a clear fix to product leaders.',
    tuesdaySnapshot:
      'User interviews in the morning, sketching wireframes at lunch, and practicing a crisp 5-minute pitch in the afternoon.',
    skillsUsed: ['Asking good questions', 'Clear storytelling', 'Quick sketching'],
    hardCall:
      'Cutting three flashy features I liked because riders only cared about seeing reliable arrival times.',
    milestoneArtifact: 'Redesigned Transit App Prototype',
  },
  {
    id: 'cpm-y1',
    trackId: 'consulting-pm',
    eraId: 'immersion',
    eraIndex: 1,
    yearLabel: 'Years 1–2',
    stageCategory: 'Early Days',
    roleTitle: 'Technology Consultant',
    setting: 'Client Sites · New Industry Every 3 Months',
    scenarioHook:
      'Flying out on Monday to figure out why a hospital’s scheduling software keeps double-booking nurses.',
    sceneStory:
      'Every few months I drop into a totally new world—a hospital, an airline, a clean-energy grid. This week I am shadowing night-shift nurses to see all the sticky-note workarounds they use because their software is confusing, then translating that into a fix for executives.',
    tuesdaySnapshot:
      'Shadowing real workers on-site, cleaning up messy data in spreadsheets, and turning findings into a clean action plan.',
    skillsUsed: ['Fast learning', 'Listening across teams', 'Data detective work'],
    hardCall:
      'Telling a senior VP their expensive software rollout failed not because of bugs, but because nobody trained the staff.',
    milestoneArtifact: 'Hospital Workflow Turnaround Plan',
  },
  {
    id: 'cpm-y3',
    trackId: 'consulting-pm',
    eraId: 'inflection',
    eraIndex: 2,
    yearLabel: 'Years 3–5',
    stageCategory: 'Taking Ownership',
    roleTitle: 'Product Manager',
    setting: 'Software Company · Working Directly with Engineers & Designers',
    scenarioHook:
      'Deciding what 8 engineers build next month when sales wants speed, designers want polish, and users want simplicity.',
    sceneStory:
      'No more handing over slide decks and walking away—now I live with what we ship. After noticing thousands of users quit during onboarding, I rally a designer and three engineers to rebuild the first 60 seconds of the app and watch retention jump in real time.',
    tuesdaySnapshot:
      'Morning engineer check-in, reviewing fresh designs, watching recorded user tests, and writing clear priorities.',
    skillsUsed: ['Saying no kindly', 'Team alignment', 'Reading user behavior'],
    hardCall:
      'Delaying a big client’s custom request so we can fix a slow checkout bug hurting everyday users.',
    milestoneArtifact: 'Zero-to-One Feature Launch',
  },
  {
    id: 'cpm-y6',
    trackId: 'consulting-pm',
    eraId: 'stewardship',
    eraIndex: 3,
    yearLabel: 'Years 6–8',
    stageCategory: 'Big Bets',
    roleTitle: 'Group Product Lead',
    setting: 'Multi-Team Organization · Coaching Younger PMs',
    scenarioHook:
      'Stepping back from day-to-day tickets to help four product teams pull in the same direction during an AI shift.',
    sceneStory:
      'Instead of owning one app screen, I help four product managers make smart bets across an entire product suite. When two teams accidentally start building overlapping tools, I get everyone in one room to merge their vision into something stronger.',
    tuesdaySnapshot:
      '1-on-1 coaching with PMs, reviewing 2-year strategy docs, and resolving cross-team roadblocks.',
    skillsUsed: ['Mentoring builders', 'Big-picture strategy', 'Calm conflict resolution'],
    hardCall:
      'Shutting down a beloved 6-month side project because the market shifted and the team is needed elsewhere.',
    milestoneArtifact: '3-Year Platform Roadmap',
  },
  {
    id: 'cpm-y9',
    trackId: 'consulting-pm',
    eraId: 'legacy',
    eraIndex: 4,
    yearLabel: 'Years 9–12+',
    stageCategory: 'Long Horizon',
    roleTitle: 'VP of Product & Advisor',
    setting: 'Executive Bench · Advising Startups',
    scenarioHook:
      'Helping decide a company’s next five years—and mentoring the next wave of young builders.',
    sceneStory:
      'A decade of seeing what works and what flops turns into pattern recognition. I sit on leadership teams deciding which big bets to fund, and spend Friday mornings advising early founders—including friends building mission-driven tools.',
    tuesdaySnapshot:
      'Company-wide strategy sessions, board conversations, and coffee chats advising new founders.',
    skillsUsed: ['Executive judgment', 'Spotting talent', 'Setting healthy team culture'],
    hardCall:
      'Protecting time for creative experiments when quarterly revenue targets tighten.',
    milestoneArtifact: 'Products Used by Millions + Mentored Leaders',
  },

  // ================= PATH II: EDUCATIONAL ENTREPRENEURSHIP =================
  {
    id: 'ed-y0',
    trackId: 'edtech-founder',
    eraId: 'origin',
    eraIndex: 0,
    yearLabel: 'Today',
    stageCategory: 'First Step',
    roleTitle: 'Student Resource Builder',
    setting: 'Campus Tutoring · Open Study Guides',
    scenarioHook:
      'Seeing classmates struggle with a dense textbook—and staying up late to build an interactive visual guide that makes it click.',
    sceneStory:
      'Every semester I notice the exact same concept tripping up half the room. Instead of just complaining about the textbook, I make a simple interactive walkthrough, share it with twenty students before the midterm, and watch their relief when the idea finally lands.',
    tuesdaySnapshot:
      'Tutoring peers, spotting where explanations break down, and tinkering with clearer interactive visuals.',
    skillsUsed: ['Breaking down hard ideas', 'Empathy for learners', 'Scrappy building'],
    hardCall:
      'Throwing away a clever diagram I spent five hours making because students still found it confusing.',
    milestoneArtifact: 'Open Interactive Study Guide',
  },
  {
    id: 'ed-y1',
    trackId: 'edtech-founder',
    eraId: 'immersion',
    eraIndex: 1,
    yearLabel: 'Years 1–2',
    stageCategory: 'Early Days',
    roleTitle: 'Classroom Tool Prototyper',
    setting: 'Local Public Schools · Education Incubator',
    scenarioHook:
      'Sitting in the back of a 9th-grade classroom watching students test my prototype on battered Chromebooks.',
    sceneStory:
      'Nothing humbles an idea faster than a real Tuesday morning classroom. Wi-Fi drops, three laptops won’t charge, and the teacher has 42 minutes total. I rewrite my tool over the weekend so it works offline and saves teachers an hour of prep every night.',
    tuesdaySnapshot:
      'Co-designing lessons with teachers, fixing bugs from classroom tests, and applying for education grants.',
    skillsUsed: ['Designing for real constraints', 'Teacher collaboration', 'Rapid iteration'],
    hardCall:
      'Realizing students don’t need another flashy game—teachers just need effortless ways to see who is stuck.',
    milestoneArtifact: 'Offline-Ready Classroom Pilot',
  },
  {
    id: 'ed-y3',
    trackId: 'edtech-founder',
    eraId: 'inflection',
    eraIndex: 2,
    yearLabel: 'Years 3–5',
    stageCategory: 'Taking Ownership',
    roleTitle: 'EdTech Co-Founder',
    setting: 'Small Startup Team · First School District Contracts',
    scenarioHook:
      'Demoing our learning platform to a panel of skeptical principals—and winning our first district-wide rollout.',
    sceneStory:
      'I’ve teamed up with an engineer and a veteran teacher to turn our pilot into a real company. One hour I’m pitching mission-minded investors to keep the lights on; the next I’m onboarding a rural school district that previously couldn’t afford interactive science labs.',
    tuesdaySnapshot:
      'Pitching schools and funders, shipping new lessons with a 5-person team, and answering teacher emails.',
    skillsUsed: ['Fundraising', 'Hiring true believers', 'Balancing mission and budget'],
    hardCall:
      'Turning down a lucrative test-prep feature investors wanted because it didn’t genuinely help students learn.',
    milestoneArtifact: 'First 50 Partner Schools',
  },
  {
    id: 'ed-y6',
    trackId: 'edtech-founder',
    eraId: 'stewardship',
    eraIndex: 3,
    yearLabel: 'Years 6–8',
    stageCategory: 'Big Bets',
    roleTitle: 'Scaling Free & Low-Cost Access',
    setting: 'Growing Organization · National & Multilingual Reach',
    scenarioHook:
      'Launching a Spanish and offline-mobile version so rural and underfunded schools get the exact same quality.',
    sceneStory:
      'The product works—now the challenge is fairness at scale. We set up a model where well-resourced districts pay full price so Title I schools get the entire library free. Watching students across regions use the same hands-on simulations feels surreal.',
    tuesdaySnapshot:
      'Working with translators and curriculum writers, reviewing learning outcomes, and building public partnerships.',
    skillsUsed: ['Creative pricing for equity', 'Leading a growing org', 'Measuring real learning'],
    hardCall:
      'Growing carefully enough to protect quality instead of expanding too fast and letting school support slip.',
    milestoneArtifact: 'Free Open-Access Tier for Underserved Schools',
  },
  {
    id: 'ed-y9',
    trackId: 'edtech-founder',
    eraId: 'legacy',
    eraIndex: 4,
    yearLabel: 'Years 9–12+',
    stageCategory: 'Long Horizon',
    roleTitle: 'Education Commons Builder',
    setting: 'Established Venture / Nonprofit · Backing New Founders',
    scenarioHook:
      'Looking at a generation of students who grew up using free tools my team built—and funding the next founder’s idea.',
    sceneStory:
      'The resource library has outgrown me and runs with its own dedicated leaders. I now spend my energy backing teachers and young builders who have bold ideas for classrooms that traditional tech companies ignore.',
    tuesdaySnapshot:
      'Guiding the board, mentoring first-time education founders, and pushing for better public school tech.',
    skillsUsed: ['Institution building', 'Backing new creators', 'Education advocacy'],
    hardCall:
      'Stepping out of day-to-day product tinkering to trust the next generation of leaders.',
    milestoneArtifact: 'Lasting Open Learning Library',
  },

  // ================= PATH III: PROFESSOR OF TECHNOLOGY & ETHICS =================
  {
    id: 'prof-y0',
    trackId: 'ethics-professor',
    eraId: 'origin',
    eraIndex: 0,
    yearLabel: 'Today',
    stageCategory: 'First Step',
    roleTitle: 'Cross-Disciplinary Researcher',
    setting: 'Honors Thesis · Reading Groups Across CS & Philosophy',
    scenarioHook:
      'Writing code in the morning, reading moral philosophy in the afternoon, and asking why algorithms fail certain people.',
    sceneStory:
      'While most classes focus on making software faster or prettier, I can’t stop asking who gets left out or harmed when it scales. My thesis tests a widely used recommendation model for hidden bias and pairs the technical findings with ethical theory.',
    tuesdaySnapshot:
      'Reading papers in the library, testing datasets in Python, and debating big questions at evening seminars.',
    skillsUsed: ['Connecting tech & ethics', 'Careful reading', 'Persuasive writing'],
    hardCall:
      'Choosing a slower research path while many classmates jump straight into high-paying industry offers.',
    milestoneArtifact: 'Senior Thesis on Algorithmic Fairness',
  },
  {
    id: 'prof-y1',
    trackId: 'ethics-professor',
    eraId: 'immersion',
    eraIndex: 1,
    yearLabel: 'Years 1–2',
    stageCategory: 'Early Days',
    roleTitle: 'PhD Student in Computing & Society',
    setting: 'Research University · Interdisciplinary Lab',
    scenarioHook:
      'Leading my first college discussion section—and watching a room of CS majors rethink what "good engineering" means.',
    sceneStory:
      'Grad school is part detective work, part marathon. I’m auditing how automated grading or hiring tools treat different accents and dialects, while teaching my first weekly seminar where students realize every technical choice is also a human value choice.',
    tuesdaySnapshot:
      'Running research studies, debating drafts with labmates, and holding office hours for undergrads.',
    skillsUsed: ['Research design', 'Teaching discussions', 'Patient deep focus'],
    hardCall:
      'Spending months double-checking one study carefully while tech headlines move on every week.',
    milestoneArtifact: 'First Published Conference Paper',
  },
  {
    id: 'prof-y3',
    trackId: 'ethics-professor',
    eraId: 'inflection',
    eraIndex: 2,
    yearLabel: 'Years 3–5',
    stageCategory: 'Taking Ownership',
    roleTitle: 'Dissertation Scholar & Lecturer',
    setting: 'Research Fellowship · Designing Original College Courses',
    scenarioHook:
      'Defending my 200-page dissertation on fair AI design and teaching a brand-new syllabus I invented from scratch.',
    sceneStory:
      'All those scattered questions finally lock together into a clear thesis that only I could have written. After defending my dissertation, I design an undergrad course called "Designing Just Technology" where students build real apps and critique their social impact.',
    tuesdaySnapshot:
      'Morning quiet writing blocks, designing class assignments, and presenting research at international conferences.',
    skillsUsed: ['Original thesis building', 'Course design', 'Public speaking'],
    hardCall:
      'Navigating a super competitive faculty job market without watering down the questions I truly care about.',
    milestoneArtifact: 'Completed Dissertation & New Course',
  },
  {
    id: 'prof-y6',
    trackId: 'ethics-professor',
    eraId: 'stewardship',
    eraIndex: 3,
    yearLabel: 'Years 6–8',
    stageCategory: 'Big Bets',
    roleTitle: 'Assistant Professor & Lab Lead',
    setting: 'University Faculty · Advising Lawmakers & Grad Students',
    scenarioHook:
      'Testifying to city lawmakers on AI transparency in the morning, then rushing back to teach 120 engineers at 2pm.',
    sceneStory:
      'Now I have my own small lab of PhD students chasing bold questions together. Half my joy comes from helping them find their voices; the other half comes from translating careful research into clear rules that cities and tech companies actually adopt.',
    tuesdaySnapshot:
      'Lecturing, advising grad students on their research, writing grant proposals, and briefing policy teams.',
    skillsUsed: ['Mentoring researchers', 'Explaining tech to policymakers', 'Leading a lab'],
    hardCall:
      'Juggling teaching prep, student mentorship, and heavy book writing against the pre-tenure clock.',
    milestoneArtifact: 'Policy Briefs + Required Engineering Ethics Class',
  },
  {
    id: 'prof-y9',
    trackId: 'ethics-professor',
    eraId: 'legacy',
    eraIndex: 4,
    yearLabel: 'Years 9–12+',
    stageCategory: 'Long Horizon',
    roleTitle: 'Tenured Professor & Author',
    setting: 'Tech & Ethics Center · Public Debate',
    scenarioHook:
      'Publishing a widely read book on technology and human dignity—and watching former students lead ethics teams everywhere.',
    sceneStory:
      'With tenure protecting my freedom to ask tough questions, I write books meant for everyday readers as well as scholars. Best of all, former students now work as product managers, EdTech founders, and policymakers—carrying these values into rooms I’ll never enter.',
    tuesdaySnapshot:
      'Writing book chapters, hosting public debates on campus, and mentoring junior professors.',
    skillsUsed: ['Writing for the public', 'Shaping national debates', 'Generational teaching'],
    hardCall:
      'Saying no to endless media requests so I still have quiet mornings to write work that lasts.',
    milestoneArtifact: 'Public Book + Network of Former Students',
  },
];

export const COMPARISON_DIMENSIONS: ComparisonDimension[] = [
  {
    id: 'tuesday-vibe',
    category: 'craft',
    label: 'What’s a random Tuesday like?',
    description: 'How the day actually feels five years in.',
    entries: {
      'consulting-pm': {
        headline: 'Fast meetings, sketching fixes & shipping',
        detail:
          'Talking with users in the morning, debating trade-offs with engineers at lunch, and checking live metrics by 4pm.',
      },
      'edtech-founder': {
        headline: 'Every hat at once, close to classrooms',
        detail:
          'Testing a new lesson with a teacher, fixing a bug before 3rd period, and pitching backers to fund next semester.',
      },
      'ethics-professor': {
        headline: 'Quiet writing mornings + lively class debates',
        detail:
          'Deep reading and writing before noon, then teaching curious students and advising grad researchers in the afternoon.',
      },
    },
  },
  {
    id: 'best-rush',
    category: 'impact',
    label: 'Best moment / Biggest rush',
    description: 'The payoff that makes the hard weeks worth it.',
    entries: {
      'consulting-pm': {
        headline: 'Watching millions use something you shaped',
        detail:
          'Seeing an idea sketched on a whiteboard become a smooth feature people rely on every single day.',
      },
      'edtech-founder': {
        headline: 'Watching a tough concept click for a student',
        detail:
          'Hearing from a teacher in an underfunded school that your tool finally unlocked math or science for their class.',
      },
      'ethics-professor': {
        headline: 'Changing how a room of future builders thinks',
        detail:
          'Seeing a student—or a city policymaker—suddenly notice an invisible fairness flaw because of your research.',
      },
    },
  },
  {
    id: 'hardest-part',
    category: 'craft',
    label: 'Hardest trade-off',
    description: 'What each path quietly asks you to give up.',
    entries: {
      'consulting-pm': {
        headline: 'Less control over the bigger mission',
        detail:
          'Great pay and fast learning, but you’re usually building inside someone else’s business priorities.',
      },
      'edtech-founder': {
        headline: 'Constant uncertainty & slow school sales',
        detail:
          'Total freedom over the mission, paired with financial stress and waiting full school years to see results.',
      },
      'ethics-professor': {
        headline: 'Long training years & modest early pay',
        detail:
          'Spending 6+ years in grad school and postdocs before earning permanent freedom and stability.',
      },
    },
  },
  {
    id: 'ten-year-horizon',
    category: 'impact',
    label: 'Where this leads in 10+ years',
    description: 'The kind of impact that sticks after a decade.',
    entries: {
      'consulting-pm': {
        headline: 'Executive product leader or startup advisor',
        detail:
          'Deep instincts for building great products—and the network to launch or advise almost anything later.',
      },
      'edtech-founder': {
        headline: 'A lasting learning library & founder mentor',
        detail:
          'Proven proof that equitable education tools can survive in the real world and reach classrooms everywhere.',
      },
      'ethics-professor': {
        headline: 'Books, public policy & generations of students',
        detail:
          'Permanent freedom to ask the hardest questions about tech—while former students carry those values into industry.',
      },
    },
  },
];
