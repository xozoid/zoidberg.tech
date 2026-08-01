import imgFlagFrenzy from "src/assets/artifacts/tahoma-robotics-camp/flag-frenzy.png";
import imgMallardMadness from "src/assets/artifacts/tahoma-robotics-camp/mallard-madness.png";
import imgWifflePiffle from "src/assets/artifacts/tahoma-robotics-camp/wiffle-piffle.png";

export const tahomaRoboticsCamp = {
  title: "Tahoma Robotics Camp",
  icon: "precision_manufacturing",
  summary: [
    "Designed robots, games, software, competition infrastructure, and media for a week-long VEX robotics camp for students ages 8-14.",
    "Over five summers the role grew from technical counselor into designing the complete competition experience, culminating in Mallard Madness.",
  ],
  tags: ["Robotics", "Game design", "Java", "Education"],
  stats: [
    { label: "Status", value: "Complete" },
    { label: "Started", value: "Jun 2014", class: "font-mono" },
    { label: "Finished", value: "Jul 2018", class: "font-mono" },
    { label: "Type", value: "Robotics education program" },
    { label: "Role", value: "Lead Technical Counselor" },
  ],
  links: [
    {
      icon: "code",
      label: "Mallard Madness repository",
      href: "https://github.com/xozoid/Mallard-Madness",
    },
  ],
  details: [
    `
    <h2>Building robots for a week, competing on Friday</h2>
    <p>
      Tahoma Robotics Club ran a week-long summer camp where students ages 8-14 built VEX
      robots for four days. They competed in front of their families on the final day. I
      joined the counselors in 2014 and stayed involved through 2018.
    </p>
    <p>
      My first responsibilities focused on technical work: create robot designs younger
      campers could build successfully. I also helped teams with electronics, programming,
      and troubleshooting. Older teams had more freedom to invent their own machines.
    </p>

    <h2>From counselor to game designer</h2>
    <p>
      By my second year I had started working on the competition itself. That eventually
      grew into designing original games, writing rules, producing animations and media,
      testing gameplay, creating trophies, and building the software used to run the
      tournament.
    </p>
    <p>
      Each game had to work for a wide range of experience levels. The rules needed to
      make sense to an eight-year-old while leaving enough room for older campers to
      experiment with strategy and robot design.
    </p>

    <h2>2015: Bridge Battle</h2>
    <p>
      In 2015 I adapted an existing VEX game for the camp while continuing to support
      robot design and programming. I also produced a highlight video for families at the
      end of the week.
    </p>

    <h2>2016: Wiffle Piffle</h2>
    <p>
      Wiffle Piffle became the first camp game I created from scratch. That meant
      designing game elements, writing rules, creating an animation, testing gameplay for
      balance across different skill levels, and manufacturing custom trophies.
    </p>
    <p>
      Because the game used custom scoring, the normal VEX tournament software couldn't
      run it. I wrote custom software for match scoring, rankings, alliance selection, and
      the elimination bracket. I also developed a livestreaming setup so family members
      could watch remotely.
    </p>`,
    {
      type: "image",
      src: imgWifflePiffle,
      alt: "Circular Wiffle Piffle logo with red and blue arcs, a Wiffle ball, and a Bear Metal bear mark",
      caption: "Wiffle Piffle branding for the first fully custom camp game.",
    },
    `
    <h2>2017: Flag Frenzy</h2>
    <p>
      Capture the flag inspired the next original game. Robots moved flags around
      the field while ping-pong balls could increase a flag's point value. I again
      developed the game, rules, supporting material, and competition infrastructure.
    </p>`,
    {
      type: "image",
      src: imgFlagFrenzy,
      alt: "Flag Frenzy logo with red and blue text with a triangular flag",
      caption:
        "Flag Frenzy, the 2017 camp game inspired by capture-the-flag mechanics.",
    },
    `
    <h2>2018: Mallard Madness</h2>
    <p>
      By 2018 I had moved away for college, but the camp asked me to create one more game.
      Mallard Madness centered on moving rubber ducks and milk crates around the field
      with VEX robots competing in two-team alliances.
    </p>
    <p>
      I developed the game remotely, producing the rules, gameplay resources, animation,
      and tournament software. Then I returned for the first week of camp to verify that
      the event ran correctly and train my replacement.
    </p>

    <h2>Tournament software</h2>
    <p>
      The custom Java application handled the event functions normally provided by
      commercial tournament software. A scorekeeper could submit match results through a
      remote web interface while an audience-facing display showed scores in real time.
    </p>
    <p>
      During qualification rounds the system tracked wins and rankings. It then supported
      alliance selection before generating the elimination bracket used to finish the
      tournament.
    </p>
    <p>
      For Mallard Madness I also published the game resources and software so another
      robotics camp could reproduce the event instead of leaving the system as a one-off
      internal tool. The club could adapt and rerun it in following years.
    </p>`,
    {
      type: "image",
      src: imgMallardMadness,
      alt: "Mallard Madness elimination bracket display showing semifinal and final scores with duck graphics",
      caption:
        "The Mallard Madness audience display showing the elimination bracket and match results.",
    },
    `
    <h2>More than teaching robotics</h2>
    <p>
      What began as helping children assemble VEX robots gradually turned into a compact
      exercise in product and event design. Robot templates, game rules, physical fields,
      scoring models, software, and livestream graphics all had to describe the same
      system. Competition-day operations had to match that system well enough for campers,
      counselors, and an audience to use it.
    </p>`,
  ],
} as const;
