import type { LogEntry } from "src/content/logs/types";

const plex2shell = {
  title: "Plex2Shell: The crypto miner in my NAS",
  slug: "2026-11-10-plex2shell",
  icon: "shield_question",

  date: "2026-11-10",

  summary: [
    "An unsolicited security disclosure led to a Plex2Shell investigation, a confirmed cryptocurrency miner in Plex's storage, and a clean recovery using ZFS snapshots.",
  ],

  tags: ["Homelab", "Security", "Plex", "Incident"],
  allTags: [
    "Homelab",
    "Security",
    "Plex",
    "Plex2Shell",
    "TrueNAS SCALE",
    "Kubernetes",
    "ZFS",
    "Incident",
    "Cryptocurrency mining",
    "NVIDIA transcoding",
  ],

  stats: [
    { label: "Affected service", value: "Plex" },
    { label: "Earliest observed activity", value: "November 1, 2026" },
    { label: "Recovery", value: "ZFS snapshot + fresh configuration" },
  ],

  details: [
    `
    <h2>An unexpected disclosure</h2>
    <p>
      Apparently, my NAS has been moonlighting as a cryptocurrency miner.
    </p>
    <p>
      Plex2Shell chains four vulnerabilities to enable unauthenticated remote
      code execution. The researcher who discovered it assigned the combined
      exploit a critical CVSS score of 9.8/10. For technical details, see the
      <a href="https://zmain.info/blog/plex2shell">original vulnerability
      disclosure</a>.
    </p>
    <p>
      I found out because a security researcher named Raj sent me an unsolicited
      email warning that my internet-facing Plex server was vulnerable to
      Plex2Shell. An unexpected email claiming that a server has been compromised
      is normally a good candidate for the spam folder. This one had enough
      specific technical details to investigate.
    </p>
    <p>The warning was accurate.</p>

    <h2>Tracing the compromise</h2>
    <p>
      Plex runs on TrueNAS SCALE in a Kubernetes container, with TCP port 32400
      forwarded through pfSense. Its logs showed suspicious requests from
      <code>80.87.206.91</code> on November 1 and November 9.
    </p>
    <p>
      The intruder went beyond scanning. They modified Plex's transcoder
      preferences and triggered a transcode that loaded a malicious shared
      library, <code>aa91766.so</code>, which ran shell commands. Those commands
      led to files with appropriately inconspicuous names:
    </p>
    <ul>
      <li><code>PlexScriptHost</code>: malicious executable</li>
      <li><code>Plex Scanner</code>: persistence and execution script</li>
      <li><code>.cache/.netns17</code>: another executable copy</li>
      <li><code>.cache/.netns17.loop</code>: watchdog script</li>
      <li><code>.cache/ksoftirqd</code>: XMRig cryptocurrency miner</li>
    </ul>
    <p>
      The scripts attempted to establish cron persistence, kill competing
      miners, and escape the container. The mining configuration referenced
      infrastructure at <code>80.87.206.91</code> and
      <code>80.87.206.95</code>. Miner logs confirmed that it had actually run.
    </p>

    <h2>Checking the host</h2>
    <p>
      The possibility of a container escape was my main concern. The Plex
      container wasn't privileged, but the payload included escape attempts.
      I checked the host's running processes, crontabs, systemd services, and
      suspicious filesystem modifications.
    </p>
    <p>
      I found no evidence of a successful escape. That doesn't prove one never
      occurred, but the evidence I found pointed to a compromise confined to
      Plex's writable storage. The miner's execution was confirmed.
    </p>

    <h2>Rebuilding Plex</h2>
    <p>
      I had ZFS snapshots. I preserved the November 9 and
      November 10 snapshots for recovery and forensic reference, then built a
      fresh Plex configuration rather than trying to clean the compromised one.
      I selectively restored the library databases, metadata, and artwork from
      the November 9 snapshot.
    </p>
    <p>
      I left the old <code>Preferences.xml</code> behind to avoid reusing the
      compromised server's authentication state. I updated Plex, changed my
      password, revoked existing sessions, and created a fresh configuration.
      Then I restored the libraries and reclaimed the server with a new token.
    </p>
    <p>
      There was one unrelated complication: TrueNAS temporarily stopped
      advertising my NVIDIA GPUs to Kubernetes. Disabling and re-enabling GPU
      support brought back the NVIDIA device plugin. Plex could see the T400
      again, and an MPEG-2 to H.264 test confirmed hardware transcoding worked.
    </p>

    <h2>What I took away</h2>
    <p>
      ZFS snapshots made recovery much less painful. The compromise appeared
      confined to Plex's writable storage, but I wouldn't treat that as proof of
      an impenetrable container boundary. Plex had also continued working while
      malicious executables lived in its configuration directory: a functional
      service isn't necessarily a healthy one.
    </p>
    <p>
      Raj's unsolicited disclosure led me directly to the compromise.
    </p>

    <h2>Epilogue</h2>
    <p>
      I gave Raj a coffee. His <a href="https://rrccyber.com/">website</a>
      has an impressive number of mouse-driven animations. Everything moves when the cursor
      moves. His security research gets an enthusiastic recommendation; his
      frontend design choices remain under investigation.
    </p>
    <p>
      The miner has been evicted, Plex is working again, and my NAS has returned
      to its intended purpose: storing an unreasonable quantity of
      <s>media</s> Linux ISOs.
    </p>
    `,
  ],
} satisfies LogEntry;

export default plex2shell;
