export interface Tidbit {
  /** Month-day key, e.g. "03-14" for March 14 */
  date: string;
  text: string;
  source?: string;
}

/**
 * Daily tidbits keyed by MM-DD.
 * When a day has no dedicated entry the API deterministically picks one from this pool.
 * Add new entries anywhere — order doesn't matter.
 */
export const tidbits: Tidbit[] = [
  // ── Special / easter-egg days ──────────────────────────────
  {
    date: "01-01",
    text: "The Unix epoch began on January 1, 1970 at 00:00:00 UTC. Every timestamp on your computer is counting seconds from that moment.",
  },
  {
    date: "02-14",
    text: "The first message sent over ARPANET in 1969 was 'LO' — it was supposed to be 'LOGIN' but the system crashed after two letters. A fitting start to networking.",
  },
  {
    date: "03-14",
    text: "Pi Day. The answer you're looking for is not 3.14159 — it's 42. But you already knew that.",
    source: "Douglas Adams (approximately)",
  },
  {
    date: "04-05",
    text: "First Contact Day. On this date in 2063, Zefram Cochrane will make humanity's first warp flight and attract the attention of a passing Vulcan survey ship.",
    source: "Star Trek: First Contact",
  },
  {
    date: "04-12",
    text: "On this day in 1961, Yuri Gagarin became the first human in space. His single orbit of the Earth lasted 108 minutes and changed everything.",
  },
  {
    date: "04-22",
    text: "Earth Day. As the Hitchhiker's Guide notes, Earth is 'mostly harmless.' Let's try to keep it that way.",
    source: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    date: "05-04",
    text: "A long time ago in a galaxy far, far away, someone decided this date sounded like a greeting. The rest is merchandising history.",
  },
  {
    date: "05-25",
    text: "Towel Day. A towel is about the most massively useful thing an interstellar hitchhiker can have. Don't panic, and always know where yours is.",
    source: "The Hitchhiker's Guide to the Galaxy",
  },
  {
    date: "07-20",
    text: "On this day in 1969, humans first walked on the Moon. Neil Armstrong's 'small step' was watched by 600 million people — roughly 20% of all humans alive.",
  },
  {
    date: "09-08",
    text: "Star Trek first aired on this day in 1966. NBC executives didn't love the pilot, but they gave it a second chance. The rest is 60 years of boldly going.",
  },
  {
    date: "10-04",
    text: "On this day in 1957, Sputnik 1 began orbiting Earth, beeping its way into history. The Space Age started with a ball the size of a beach ball.",
  },
  {
    date: "10-29",
    text: "The internet's birthday. On October 29, 1969, the first ARPANET message was sent from UCLA to Stanford. The network has grown slightly since then.",
  },
  {
    date: "12-25",
    text: "Isaac Newton was born on this day in 1642 (Old Style calendar). He went on to invent calculus, describe gravity, and ruin several university courses.",
  },

  // ── General tidbits (no specific date) ─────────────────────
  {
    date: "01-17",
    text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.",
  },
  {
    date: "02-08",
    text: "An octopus has three hearts and blue blood. Two hearts pump blood to the gills, and the third pumps it to the rest of the body.",
  },
  {
    date: "02-29",
    text: "You found a leap day! The Gregorian calendar adds February 29 every 4 years, except every 100 years, except every 400 years. Calendars are just timezone bugs at a larger scale.",
  },
  {
    date: "03-01",
    text: "There are more possible games of chess than atoms in the observable universe. The Shannon number estimates about 10^120 possible games.",
  },
  {
    date: "03-19",
    text: "A day is not exactly 24 hours. Earth's rotation is gradually slowing due to tidal friction with the Moon, gaining about 2.3 milliseconds per century.",
  },
  {
    date: "04-15",
    text: "The Great Wall of China is not visible from space with the naked eye. This myth has been around since at least 1932, but astronauts have confirmed it's not true.",
  },
  {
    date: "05-12",
    text: "Doors and corners, kid. That's where they get you. Always check your doors and corners.",
    source: "Detective Miller, The Expanse",
  },
  {
    date: "06-07",
    text: "A teaspoon of neutron star material would weigh about 6 billion tons. Neutron stars are what happens when gravity really commits.",
  },
  {
    date: "06-28",
    text: "The first computer bug was an actual bug — a moth trapped in a relay of the Harvard Mark II computer in 1947. Grace Hopper's team taped it into the logbook.",
  },
  {
    date: "07-04",
    text: "Voyager 1, launched in 1977, is the most distant human-made object. It's over 24 billion kilometers from Earth and still sending data home.",
  },
  {
    date: "08-06",
    text: "The World Wide Web went public on August 6, 1991. Tim Berners-Lee posted a summary on the alt.hypertext newsgroup. The first website is still online.",
  },
  {
    date: "08-25",
    text: "There are more trees on Earth than stars in the Milky Way — roughly 3 trillion trees versus 100–400 billion stars.",
  },
  {
    date: "09-22",
    text: "Bananas are naturally radioactive due to their potassium content. You'd need to eat about 10 million bananas at once for a lethal dose of radiation.",
  },
  {
    date: "10-15",
    text: "The directive was clear. Classify the plant. Protect the plant. But WALL-E found something more important — someone to share it with.",
    source: "WALL-E (loosely)",
  },
  {
    date: "11-03",
    text: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth. Every sunrise you see is a slightly delayed broadcast.",
  },
  {
    date: "11-23",
    text: "The first text message was sent on December 3, 1992. It read 'Merry Christmas.' Humanity has been replying 'k' ever since.",
  },
  {
    date: "12-10",
    text: "Ada Lovelace wrote the first algorithm intended for a machine in 1843. The computer it was designed for — Babbage's Analytical Engine — was never built in her lifetime.",
  },
];
