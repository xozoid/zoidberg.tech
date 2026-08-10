import type { LogEntry } from "src/content/logs/types";

const vaultPostmortem = {
  title: "Bitwarden vault loss postmortem",
  slug: "2026-08-09-vault-postmortem",
  icon: "security_key",

  date: "2026-08-09",

  summary: [
    "I changed my Bitwarden vault password, forgot it 24 hours later, and couldn't recover the vault.",
  ],

  tags: ["Bitwarden", "Password management", "GPG", "YubiKey"],
  allTags: [
    "Bitwarden",
    "Password management",
    "GPG",
    "YubiKey",
    "Security",
    "Diceware",
    "Encryption",
    "Multi-factor authentication",
    "Hardware security key",
    "Key rotation",
  ],

  project: {
    label: "homelab",
    href: "/artifacts/homelab",
  },

  stats: [
    { label: "Root key", value: "Ed25519", class: "font-mono" },
    { label: "Hardware keys", value: "2× YubiKey 5C", class: "font-mono" },
    { label: "Recovery drills", value: "1", class: "font-mono" },
    { label: "Password reset", value: "Ongoing" },
  ],

  details: [
    `
    <h2>Security by executive dysfunction</h2>
    <p>
      My Bitwarden vault password felt particularly unpleasant to type on my
      <a href="https://configure.zsa.io/moonlander/layouts/blmEg/latest/0">Colemak-DH keyboard</a>:
      <code>OnePassword2RuleThem@ll</code>. I replaced it with a four-word
      <a href="https://diceware.dmuth.org/">Diceware</a> passphrase. I logged in
      and out and <q>committed it to memory</q>.
    </p>

    <p>
      The next day, I needed to connect to my university VPN. I typed the new
      vault password I remembered: <code>senator-think-smile-lunar</code>,
      but Bitwarden rejected it. I tried <code>senator-thank-smooth-lunar</code>
      and 1,200 other combinations. I wrote a script to generate and test
      Diceware passphrases close to what I remembered using the Bitwarden CLI.
      Bitwarden intentionally has no recovery path for forgotten vault passwords.
      Without it, I lost the vault.
    </p>

    <p>
      <strong>In short:</strong> Less than 24 hours after changing my Bitwarden
      vault password, I permanently lost access to my vault.
    </p>

    <h2>Redesign</h2>

    <p>
      Losing the vault hurt, but it gave me a reason to redesign my entire
      personal security model instead of continuing to accumulate technical debt.
    </p>

    <p>
      My new vault password uses another six-word Diceware passphrase. This time,
      I physically rolled the dice instead of using a web generator. I wrote the
      password on paper and stored it in my safe alongside Bitwarden's account
      fingerprint and multi-factor authentication recovery code. Keeping this
      backup offline protects it from cloud account compromise, ransomware, and
      my own mistakes.
    </p>

    <p>
      I reset passwords as I encounter each account. Every new password comes
      directly from Bitwarden's built-in generator. I have dropped the two-part
      password scheme.
    </p>

    <h2>Disaster recovery</h2>

    <p>
      Security involves more than preventing compromise. It also involves
      recovery. To that end, I maintain a single encrypted
      recovery archive containing the material needed to reconstruct my digital
      identity.
    </p>

    <p>
      The archive is encrypted with GPG and stored on my NAS, which is included
      in my off-site Backblaze backups. This means a NAS failure or even the loss
      of the house doesn't automatically destroy the recovery material.
    </p>

    <pre>security-backup.tar.gz.gpg
├── master-secret.asc
├── public.asc
├── 1E125F84304A7207C6DD736E8A1351ABE3517216.rev
├── bitwarden-export.json
└── checksums.txt</pre>

    <h2>Digital fingerprint</h2>

    <p>
      Since I was rebuilding my security model anyway, I also rotated my GPG
      identity. I generated a new certification-only primary key using Ed25519
      to replace the old RSA key. The primary certification key is kept only in
      the encrypted recovery archive and is never imported onto a daily use
      workstation except during recovery or key rotation.
    </p>

    <p>
      The primary certification key has a single signing subkey. That signing
      key lives on two YubiKey 5C devices: one on my everyday keychain and one
      stored in my safe. My computers contain only the public key and smartcard
      stubs, so the signing key never leaves the hardware token. To sign a Git
      commit, I unlock the YubiKey, then tap it.
    </p>

    <h3>Key-rotation procedure</h3>

    <ol>
      <li>Retrieve the encrypted backup archive from the NAS and unpack it.</li>

      <li>
        Import the primary key.
        <pre>gpg --import public.asc
gpg --import master-secret.asc</pre>
      </li>

      <li>
        Verify that the fingerprint matches:
        <code>1E12 5F84 304A 7207 C6DD 736E 8A13 51AB E351 7216</code>.
        <pre>gpg --fingerprint</pre>
      </li>

      <li>
        Edit the key.
        <pre>gpg --edit-key 1E125F84304A7207C6DD736E8A1351ABE3517216</pre>
      </li>

      <li>
        Create a new signing subkey.
        <pre>addkey</pre>
        Choose:
        <ul>
          <li>ECC (sign only)</li>
          <li>Ed25519</li>
          <li>Expiry: 2 years</li>
        </ul>
      </li>

      <li>
        Save the key.
        <pre>save</pre>
      </li>

      <li>
        Move the new signing subkey onto the daily YubiKey.
        <pre>gpg --edit-key 1E125F84304A7207C6DD736E8A1351ABE3517216
key &lt;n&gt;
keytocard</pre>
        Select <strong>Signature key</strong>.
      </li>

      <li>Repeat the previous step for the backup YubiKey.</li>

      <li>
        Export the updated public key.
        <pre>gpg --armor --export 1E125F84304A7207C6DD736E8A1351ABE3517216 &gt; public.asc</pre>
      </li>

      <li>
        Recreate the encrypted recovery archive containing
        <code>master-secret.asc</code>, <code>public.asc</code>, the revocation
        certificate, Bitwarden export, and checksums.
      </li>

      <li>
        Delete the secret key from the workstation.
        <pre>gpg --delete-secret-key 1E125F84304A7207C6DD736E8A1351ABE3517216</pre>
        Leave only the public key and smartcard stubs.
      </li>

      <li>
        Verify that signing still works and requires the YubiKey.
        <pre>echo test | gpg --clearsign</pre>
      </li>

      <li>
        Securely erase the temporary working directory.
        <pre>shred -u gpg-backup/*
rm -rf gpg-backup</pre>
      </li>
    </ol>

    <h2>Passkeys are neat</h2>

    <p>
      Whenever a service supports passkeys, both of my YubiKey 5C devices are
      registered. One lives on my everyday keychain and the other stays in my
      safe. Losing one key should never prevent me from logging in.
    </p>

    <p>
      For services without passkey support, I enable multi-factor authentication.
      I use an authenticator application or a hardware security key.
      I avoid SMS-based authentication when another option exists. SIM-swapping
      attacks can compromise phone numbers. Phone numbers provide weak authentication.
    </p>

    <p>
      Bitwarden generates a unique password for every account.
      Passkeys reduce how often those passwords need to be typed while also
      making supported login flows resistant to credential phishing.
      Authentication becomes tied to possession of the hardware token instead of
      manually entering another secret.
    </p>

    <h2>Failure mode analysis</h2>

    <p>
      Engineering is often less about preventing every breakage and more about
      enabling recovery. These are the failures I consider most likely over the
      next decade and how this design responds to them.
    </p>

    <h3>Forgot vault password</h3>

    <p>
      The vault password is written on paper and stored in my safe alongside the
      Bitwarden recovery code and account fingerprint. If I forget the password,
      I retrieve the paper copy, log in, and continue life. This is exactly the
      failure mode that motivated the redesign.
    </p>

    <h3>Lost YubiKey</h3>

    <p>
      Every critical service has two registered YubiKeys. If my everyday key is
      lost, stolen, or damaged, I retrieve the backup key from the safe. I remove
      the missing key from affected accounts and register a replacement YubiKey.
      Then I restore the system to two hardware tokens.
    </p>

    <p>
      Separate backups hold my GPG primary certification key and signing subkey,
      so losing a YubiKey doesn't permanently destroy my signing
      identity.
    </p>

    <h3>Lost both YubiKeys</h3>

    <p>
      This isn't convenient, but it isn't catastrophic. The GPG primary certification
      key and signing subkey are present in the encrypted recovery archive. I can
      provision replacement YubiKeys, recover accounts using their documented
      recovery paths, re-register passkeys, and return to redundant hardware
      tokens.
    </p>

    <h3>Laptop stolen</h3>

    <p>
      My laptop contains only encrypted Bitwarden data, GPG public keys, and
      smartcard stubs. The signing key itself never exists on disk during normal
      use. With full-disk encryption enabled, the immediate response is to revoke
      active sessions where appropriate and continue from another computer using
      a YubiKey.
    </p>

    <h3>NAS failure</h3>

    <p>
      The NAS isn't the only copy of the recovery archive. Its contents are
      backed up off-site to Backblaze, so a failed array or dead NAS should be a
      restore operation rather than a loss of identity.
    </p>

    <h3>Bitwarden outage</h3>

    <p>
      Existing logged-in clients keep locally cached vault data during a
      temporary Bitwarden outage. New logins or synchronization may have to wait
      until service is restored, but an outage shouldn't immediately prevent me
      from accessing credentials on devices I already use.
    </p>

    <h3>House fire</h3>

    <p>
      A house fire could destroy the safe, backup YubiKey, and NAS at the same
      time. The off-site encrypted backup prevents that from also destroying the
      recovery archive. I can further improve physical redundancy by keeping a
      limited set of recovery material in the detached garage so one building
      doesn't contain every local backup.
    </p>

    <h3>Lost safe contents</h3>

    <p>
      Losing the contents of the safe would be annoying but shouldn't
      immediately lock me out of anything. My everyday YubiKey and remembered
      vault password still provide normal access. I can use Bitwarden and the
      off-site recovery archive to recreate the paper backup and provision a new
      backup YubiKey.
    </p>

    <p>
      Conversely, if I lose my everyday key while the safe remains intact, the
      backup hardware token and written recovery information let me recover.
      Either side can be lost independently without becoming catastrophic.
    </p>

    <h3>Human error</h3>

    <p>
      The original design assumed I would always remember important secrets.
      The new design assumes I eventually won't. Recovery procedures are
      documented, hardware has redundant copies, and critical credentials exist
      on paper, in hardware, and in encrypted files. Forgetting something should now be an inconvenience
      instead of an unrecoverable event.
    </p>

    <h2>Lessons learned</h2>

    <ul>
      <li>Memorized secrets eventually fail.</li>
      <li>Every critical credential should have a documented recovery path.</li>
      <li>Backups are only useful after a successful restore test.</li>
      <li>Hardware security keys simplify day-to-day authentication.</li>
      <li>Security should preserve access instead of failing catastrophically.</li>
    </ul>
    `,
  ],
} satisfies LogEntry;

export default vaultPostmortem;
