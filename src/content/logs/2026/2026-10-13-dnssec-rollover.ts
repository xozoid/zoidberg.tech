import type { LogEntry } from "src/content/logs/types";

const dnssecIncident = {
  title: "A DNSSEC rollover took down my redundant DNS servers",
  slug: "2026-10-13-dnssec-rollover",
  icon: "cloud_off",

  date: "2026-10-13",

  summary: [
    "An October 2026 DNSSEC root key rollover simultaneously broke both of my Pi-hole DNS servers.",
    "Traced the failure to outdated trust anchors in a deprecated container image, migrated to a maintained replacement, and improved DNS monitoring.",
  ],

  tags: ["Homelab", "DNS", "Incident"],
  allTags: [
    "Homelab",
    "DNS",
    "DNSSEC",
    "Pi-hole",
    "Unbound",
    "Docker",
    "Ansible",
    "Infrastructure",
    "Incident response",
    "Monitoring",
    "Root cause analysis",
  ],

  stats: [
    { label: "Affected servers", value: "2" },
    { label: "Root cause", value: "Outdated DNSSEC trust anchor" },
    { label: "Resolution", value: "Upgraded and verified" },
  ],

  details: [
    `
    <h2>Both DNS servers stopped resolving</h2>
    <p>
      On October 11, 2026, both of my DNS servers began failing to resolve domains.
      These are independent Pi-hole instances running on separate hosts, with Unbound providing recursive DNS resolution, and DNSSEC validation.
    </p>

    <p>
      Having two DNS servers is supposed to provide redundancy.
      A failure of one host, container, or network connection shouldn't interrupt DNS for the rest of the network.
      Redundancy doesn't help much when both instances share the same software defect.
    </p>

    <p>
      The immediate workaround was disabling DNSSEC validation in the Pi-hole interface.
      Resolution started working again, narrowing the problem considerably.
      The servers could communicate with upstream resolvers, but something in the validation process was rejecting otherwise legitimate responses.
    </p>

    <h2>Following the DNSSEC chain of trust</h2>
    <p>
      DNSSEC provides a way to cryptographically verify DNS responses.
      Rather than trusting the answer returned by a DNS server, a validating resolver checks signatures using a chain of trust extending back to the DNS root zone.
    </p>

    <p>
      That chain starts with a root trust anchor: a trusted public key used to authenticate the root zone's DNSSEC keys.
      The root key-signing key (KSK) is periodically replaced, and validating resolvers need to learn the replacement before the old key stops being useful.
    </p>

    <p>
      On October 11, the root zone began using its new key-signing key, identified by key tag <code>38696</code>.
      The previous key had tag <code>20326</code>.
    </p>

    <p>
      Both of my Pi-hole instances were running Pi-hole 5.18.2 and FTL 5.25.1 from the pinned <code>cbcrowe/pihole-unbound:2024.03.2</code> Docker image.
      The generated dnsmasq configuration contained only the old root trust anchor.
    </p>

    <p>
      The logs made the failure explicit:
    </p>

    <pre><code>reply . is BOGUS DNSKEY</code></pre>

    <p>
      FTL could no longer verify the root DNSKEY response.
      Since the root is the starting point for the DNSSEC chain of trust, dependent validations failed as well.
      The result was widespread <code>SERVFAIL</code> responses.
    </p>

    <p>
      This also explained why both servers failed at essentially the same time.
      They weren't experiencing independent hardware or network failures.
      They were running the same outdated software after the same external change.
    </p>

    <h2>Two validation layers, two problems</h2>
    <p>
      My DNS architecture uses Pi-hole for filtering and local DNS records.
      Unbound handles recursive resolution and DNSSEC.
      Pi-hole's own DNSSEC validation was also enabled.
      That meant responses passed through two independent validation layers.
    </p>

    <p>
      Disabling DNSSEC in Pi-hole removed the outdated FTL validation step.
      This was the correct direction for the architecture: Unbound should be the only service that verifies DNSSEC responses.
    </p>

    <p>
      But checking Unbound directly revealed another issue.
    </p>

    <p>
      On <code>dns1.nibbler</code>, the <code>root.key</code> file contained both the old and new trust anchors.
      It successfully resolved valid domains and rejected <code>dnssec-failed.org</code>, a test domain with broken DNSSEC configuration.
    </p>

    <p>
      <code>docker0.nibbler</code> was different.
      Its trust-anchor file initially contained the new key, but subsequently reverted to the old key alone.
      Unbound then returned <code>SERVFAIL</code> even for valid domains.
    </p>

    <p>
      Adding <code>+cd</code> to a DNS query allowed resolution to succeed.
      This flag requests that the resolver disable DNSSEC checking for the query, providing further evidence that validation, rather than connectivity, was the problem.
    </p>

    <p>
      The Unbound trust-anchor file lived inside the container at <code>/var/lib/unbound/root.key</code>, without persistent storage.
      The existing container initialization could then reintroduce an outdated trust anchor.
    </p>

    <p>
      Both hosts had synchronized clocks, and Unbound was configured to update its trust anchor automatically.
      Neither was enough to protect from the observed container bootstrap behavior.
    </p>

    <h2>Replacing the deprecated container</h2>
    <p>
      The underlying container image had another problem: a deprecated March 2024 release.
      Pi-hole v5 is also no longer supported.
    </p>

    <p>
      Rather than patching the old image, I updated my Ansible configuration to use the maintained <code>mpgirro/pihole-unbound:2026.07.2</code> image.
    </p>

    <p>
      The migration also required updating the environment variables for Pi-hole v6.
      The old configuration used Pi-hole v5 variable names, while v6 expects the <code>FTLCONF_*</code> format.
    </p>

    <p>
      The important settings are:
    </p>

    <pre><code>FTLCONF_dns_dnssec=false
FTLCONF_dns_upstreams=127.0.0.1#5335
FTLCONF_misc_etc_dnsmasq_d=true</code></pre>

    <p>
      This leaves DNSSEC validation to Unbound, keeps Unbound as Pi-hole's only upstream resolver, and preserves support for my existing local DNS records managed through dnsmasq configuration files.
    </p>

    <p>
      The change is managed through Ansible so both instances can be configured consistently and recreated without manual configuration through the Pi-hole interface.
    </p>

    <h2>Deploying the fix</h2>
    <p>
      With the configuration updated, I deployed the replacement containers using Ansible.
      The two DNS servers were handled one at a time to avoid taking down both resolvers simultaneously.
    </p>

    <p>
      <code>docker0.nibbler</code> was the priority because its existing Unbound instance was also failing DNSSEC validation.
      After upgrading the first resolver, I continued with DNS1.
    </p>

    <p>
      Both servers are now running the updated configuration, and DNS resolution has been restored throughout the homelab.
      Pi-hole handles filtering and local records while Unbound provides recursive resolution and DNSSEC validation.
    </p>

    <p>
      I also added a dedicated Ansible verification playbook, <code>dns_verify.yaml</code>, to check the DNS configuration independently of the deployment process.
    </p>

    <p>
      The verification checks cover local DNS records, wildcard resolution, external domain resolution, and DNSSEC behavior.
      Valid domains must resolve successfully, while domains with bad DNSSEC signatures must be rejected.
    </p>

    <h2>Monitoring the service, not just the port</h2>
    <p>
      One of the more useful lessons from this incident was that my existing monitoring wasn't testing the behavior I actually cared about.
    </p>

    <p>
      Uptime Kuma was checking whether the DNS servers' TCP ports were reachable.
      That confirms a service is listening, but doesn't establish that it can resolve a domain.
    </p>

    <p>
      A DNS server can be running, accepting connections, and still be unusable to its clients.
    </p>

    <p>
      I replaced those checks with DNS queries for the A record of <code>google.com</code>, directed at each Pi-hole instance every 60 seconds.
      A <code>SERVFAIL</code> response now causes the check to fail and uses my existing Discord notifications.
    </p>

    <p>
      This is a better availability check, although it doesn't establish that DNSSEC validation is working correctly.
      A resolver without DNSSEC could still pass the test.
    </p>

    <p>
      The Ansible verification playbook handles that distinction by checking both successful resolution and rejection of known-bad DNSSEC responses.
    </p>

    <h2>Lessons learned</h2>
    <p>
      The immediate problem is resolved, but this incident exposed weaknesses in my infrastructure.
    </p>

    <p>
      First, two independent servers aren't necessarily independent failure domains.
      Both Pi-hole instances shared the same pinned container image, the same outdated trust anchor, and the same failure mode.
      Redundant hardware couldn't protect from a shared software problem.
    </p>

    <p>
      Second, having two DNSSEC validation layers added complexity without providing a useful benefit.
      Pi-hole and Unbound were both verifying responses, and the outdated FTL service rejected answers that Unbound had already checked.
      Assigning DNSSEC responsibility to Unbound alone simplifies the architecture.
    </p>

    <p>
      Third, automatic trust-anchor updates are only useful if the resulting state survives container initialization.
      Docker0 demonstrated that a resolver could get the correct key and subsequently lose it when its trust-anchor file was replaced.
    </p>

    <p>
      Finally, monitoring needs to test the behavior a service is supposed to provide.
      An open DNS port doesn't guarantee working resolution, and successful resolution doesn't guarantee DNSSEC validation.
    </p>

    <p>
      Both resolvers are now back online with a maintained container image, a simpler validation architecture, and monitoring that can detect actual DNS failures.
      The homelab is happy again.
    </p>
    `,
  ],
} satisfies LogEntry;

export default dnssecIncident;
