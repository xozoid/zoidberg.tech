import imgEngine from "src/assets/logs/2026/2026-08-30-datsun-engine.jpg";
import imgEngineCompartment from "src/assets/logs/2026/2026-08-30-mg-without-engine.jpg";
import type { LogEntry } from "src/content/logs/types";

const mgGlider = {
  title: "Removing the ICE drivetrain and weighing the glider",
  slug: "2026-08-30-mg-glider",
  icon: "scale",

  date: "2026-08-30",

  summary: [
    "Removed the Datsun A12 drivetrain and established a 498 kg complete-glider baseline for planning the electric drivetrain and battery layout.",
  ],

  tags: ["MG Midget", "EV conversion", "Drivetrain", "Measurement"],
  allTags: [
    "MG Midget",
    "EV conversion",
    "Restoration",
    "Drivetrain",
    "Measurement",
    "Vehicle weight",
    "Corner weights",
    "Weight distribution",
    "Datsun A12",
    "Engine removal",
    "EV packaging",
  ],

  project: {
    label: "MG electric conversion",
    href: "/artifacts/mg-midget",
  },

  stats: [
    { label: "Glider weight", value: "498 kg (1,098 lb)", class: "font-mono" },
    { label: "Axle sharing", value: "43.8% / 56.2%", class: "font-mono" },
    { label: "Activity", value: "Removing ICE drivetrain" },
  ],

  details: [
    `
    <h2>Out with the Datsun drivetrain</h2>
    <p>
      The MG came to me with a Datsun A12 engine and transmission in place of its
      original drivetrain. With the restoration and electric conversion beginning,
      I removed the existing ICE drivetrain to expose the engine bay and establish
      the car's weight without it.
    </p>
    `,
    {
      type: "image",
      src: imgEngine,
      alt: "Datsun A12 engine removed from the MG Midget and resting on a dolly",
      caption:
        "The removed Datsun A12 engine, clutch, and associated hardware.",
    },
    `
    <p>
      I didn't do much more disassembly during this session. With the drivetrain
      out, though, the empty engine bay gives a clearer picture of
      the space available for the electric motor, power electronics, and potential
      battery packaging.
    </p>
    `,
    {
      type: "image",
      src: imgEngineCompartment,
      alt: "MG Midget engine compartment after removal of the Datsun drivetrain",
      caption: "The engine compartment after removing the Datsun drivetrain.",
      size: "lg",
    },

    `
    <h2>Weighing the glider</h2>
    <p>
      With the drivetrain removed, I put the car on four load-cell scales to get an
      actual baseline rather than relying on published curb-weight figures. The
      corner-weight system is based on Travis Cea's
      <a href="https://github.com/traviscea/DIY-ESP32-Race-Scales"
         target="_blank" rel="noopener noreferrer">DIY ESP32 Race Scales</a>
      project.
    </p>

    <p>
      The first measurement was taken without the bonnet installed:
    </p>

    <table>
      <thead>
        <tr>
          <th>Position</th>
          <th>Weight</th>
          <th>Percent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Front left</td>
          <td>108 kg</td>
          <td>22.1%</td>
        </tr>
        <tr>
          <td>Front right</td>
          <td>99.3 kg</td>
          <td>20.4%</td>
        </tr>
        <tr>
          <td>Rear left</td>
          <td>141 kg</td>
          <td>29.0%</td>
        </tr>
        <tr>
          <td>Rear right</td>
          <td>139 kg</td>
          <td>28.4%</td>
        </tr>
        <tr>
          <th>Total</th>
          <th>486 kg</th>
          <th>100%</th>
        </tr>
      </tbody>
    </table>

    <p>
      The measured combined values were:
    </p>

    <table>
      <thead>
        <tr>
          <th>Distribution</th>
          <th>Weight</th>
          <th>Percent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Left</td>
          <td>249 kg</td>
          <td>51.2%</td>
        </tr>
        <tr>
          <td>Right</td>
          <td>237 kg</td>
          <td>48.8%</td>
        </tr>
        <tr>
          <td>Front</td>
          <td>207 kg</td>
          <td>42.6%</td>
        </tr>
        <tr>
          <td>Rear</td>
          <td>279 kg</td>
          <td>57.4%</td>
        </tr>
        <tr>
          <td>Cross</td>
          <td>—</td>
          <td>50.5%</td>
        </tr>
      </tbody>
    </table>

    <h2>Accounting for the bonnet</h2>
    <p>
      The bonnet was off the car during the corner-weight measurement, so I weighed
      it at 12.4 kg. Its center of gravity is approximately
      7 inches behind the front axle. With a 72-inch wheelbase, that places about
      11.2 kg of its weight on the front axle and 1.21 kg on the rear axle.
    </p>

    <pre><code>Bonnet weight = 12.4 kg

Front contribution = 12.4 × (72 - 7) / 72 = 11.2  kg
Rear contribution  = 12.4 × 7 / 72        =  1.21 kg</code></pre>

    <p>
      Adding the bonnet produces a complete-glider weight of about
      <strong>498 kg</strong>. The corresponding axle loads are
      approximately <strong>218 kg front</strong> and
      <strong>280 kg rear</strong>, or <strong>43.8% front / 56.2% rear</strong>.
    </p>

    <h2>A useful EV baseline</h2>
    <p>
      This gives me an actual mass baseline for the car before adding electric
      drivetrain components. Rather than designing around a stock MG Midget's
      published weight, I can use the 498 kg glider and its measured axle
      distribution to assess motor and battery locations.
    </p>
    <p>
      Each component's mass and position can be added to this baseline as the
      motor, battery boxes, charger, inverter, and other hardware are selected.
      This will estimate finished vehicle weight and front-to-rear distribution
      before final packaging.
    </p>
    `,
  ],
} satisfies LogEntry;

export default mgGlider;
