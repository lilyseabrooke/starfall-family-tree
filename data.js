/* ===========================================================================
   Starfall Family Tree — dataset
   Calendar years; present day = 2034. Families are CATEGORIES (colour + record),
   never columns. Layout is derived from the relationship graph + birth years.

   Per character: id, name, birth (number | "unknown"). Optional: prefix,
   pronouns, title, family (id|null), death (number | "Unknown" | null), portrait,
   bio, parents (ids), partners ([{id,type}]), academy, magic (string|array),
   region, creature_type.
   Bio supports inline links: ${text: 'shown words', link:'character-id'} — these
   render as gold cross-links; targets not yet in the ledger render muted.
   Relatives referenced by id that don't exist are simply skipped.
   =========================================================================== */
(function () {
  const FAMILIES = [
    { id: "argon-core", name: "The Argon Family", color: "crimson",
      blurb: "The ancient core line — founders of chronomancy and, with it, the Academy itself, and authors of a hundred-year blood hex against the Mars family. Old, powerful, and rarely kind." },
    { id: "argon-split", name: "The Argon Breakaway", color: "plum",
      blurb: "Damien Argon's faction, which formally declared itself the true Argon family in 2015. The two lines have been vying for the name ever since." },
    { id: "whisperkeep", name: "The Whisperkeep Family", color: "teal",
      blurb: "Diviners without peer — the name is synonymous with the field. Frilly, sweet-toothed, and never to be underestimated." },
    { id: "Cloudless", name: "The Cloudless Family", color: "azure",
      blurb: "Founded by the chronomancer who rescued the Academy during the Basilisk Incident; now a foundation devoted to sustainable magic." },
    { id: "Burnwicke", name: "The Burnwicke Family", color: "forest",
      blurb: "A divination line lately better known for very nearly unmaking all magic to break a hex — and for an unruly House team." },
    { id: "Mars", name: "The Mars Family", color: "rust",
      blurb: "A family that carried a century-old generational hex laid by the Argons, severed only recently by stubborn love and chronomancy." },
    { id: "rook", name: "The Rook Family", color: "slate",
      blurb: "A line that produced at least one arcane hitman, working for years behind the cover of a telekinesis professorship." }
  ];

  const CHARACTERS = [
    {
      id: "ember-argon", name: "Ember Argon", prefix: null, pronouns: "she/her", title: "Argon Heiress",
      family: "argon-core", birth: 1993, death: null, portrait: null,
      bio: "The current formal head of the Argon family, and mirror for the Great Scorpion and original family founder, ${text: 'Ariin', link: 'ariin'}. Her efforts to reform the family have resulted in some friction: her cousin ${text: 'Damien Argon', link: 'damien-argon'} split a faction off, formally declaring his the true Argon family in 2015, and the two families are still vying. Ember remains committed to reining in the family's worst practices, though.",
      parents: ["ophelia-argon", "richard-argon"], partners: [{ id: "emily-argon", type: "marriage" }],
      academy: "Starfall Academy", magic: ["Artificy", "Draconology"], region: "Starfall", creature_type: "human"
    },
    {
      id: "emily-argon", name: "Emily Argon", prefix: null, pronouns: "she/they", title: "The Queen Consort",
      family: "argon-core", birth: 1993, death: null, portrait: null,
      bio: "A dedicated arcanist by trade, Emily nonetheless spends most of her time managing affairs for the Argon family together with her wife ${text: 'Ember', link: 'ember-argon'}. Having been there with Ember since the days of the Argon heiress's magic failing at Starfall, Emily has been through it all by Ember's side.",
      parents: null, partners: [{ id: "ember-argon", type: "marriage" }],
      academy: "Starfall Academy", magic: "Telekinesis", region: "Starfall", creature_type: "human"
    },
    {
      id: "damien-argon", name: "Damien Argon", prefix: null, pronouns: "he/him", title: "The Rebel King",
      family: "argon-split", birth: 1990, death: null, portrait: null,
      bio: "A dangerous and charismatic arcanist who is skilled with magic, and more skilled still with the dark politics of powerful magic. Having leveraged the better part of the Argon clan against one another to control them more easily, he wields secrets like magic spells and controls the flow of power.",
      parents: ["cassian-argon", "melinda-argon"], partners: [{ id: "elizabeth-argon", type: "marriage" }],
      academy: "Mayweather Academy", magic: "Counterhexology", region: "Starfall", creature_type: "human"
    },
    {
      id: "elizabeth-argon", name: "Elizabeth Argon", prefix: null, pronouns: "she/her", title: "The Hexlady in Waiting",
      family: "argon-split", birth: 1991, death: null, portrait: null,
      bio: "Ruthless manipulator and successful social climber, Elizabeth Blackfeld came from a well-respected magic family already, but set her sights higher, pursuing who was then just an unpredictable rebel, ${text: 'Damien Argon', link: 'damien-argon'}. She remains relentlessly dedicated to him in everything he does, and she encourages his worst instincts: Damien's breakaway family formally challenged the Argon clan only two years after they married.",
      parents: ["edmond-blackfeld", "julia-blackfeld"], partners: [{ id: "damien-argon", type: "marriage" }],
      academy: "Albion Arcane", magic: "Divination", region: "Starfall", creature_type: "human"
    },
    {
      id: "valentine-emma-whisperkeep", name: "Valentine-Emma Whisperkeep", prefix: null, pronouns: "she/her", title: "Diviner Queen",
      family: "whisperkeep", birth: 1994, death: null, portrait: null,
      bio: "The current head of the Whisperkeep family, Valentine-Emma is a little hard to take seriously. A small woman with a large love for frilly dresses and sweet things, it's easy to forget Valentine-Emma is one of the world's greatest diviners and runs the family whose name is synonymous with the field.",
      parents: ["julian-moore-whisperkeep", "luna-harriett-whisperkeep"], partners: [{ id: "persephone-whisperkeep", type: "marriage" }],
      academy: "Starfall Academy", magic: "Divination", region: "Starfall", creature_type: "human"
    },
    {
      id: "henrietta-valencia-whisperkeep", name: "Henrietta-Valencia Whisperkeep", prefix: null, pronouns: "she/her", title: "Princess to the Stars",
      family: "whisperkeep", birth: 2016, death: null, portrait: null,
      bio: "A very prodigal and very spoiled young diviner who has very little practical connection to the real world, Henrietta-Valencia is the crown princess to the Whisperkeep family, set to take over once her birth mother ${text: 'Valentine-Emma', link: 'valentine-emma-whisperkeep'} resigns from family direction.",
      parents: ["valentine-emma-whisperkeep", "persephone-whisperkeep"], partners: null,
      academy: "Starfall Academy", magic: "Divination", region: "Starfall", creature_type: "human"
    },
    {
      id: "astra-onomy", name: "Astra Baron-Cantor-Onomy", prefix: "Professor", pronouns: "she/her", title: "Team Save the World Founder",
      family: null, birth: 1994, death: null, portrait: null,
      bio: "Transmutation professor and founding member of Team Save the World, a team known for having saved the world. Loves rocks, her wife, and collecting strange magic things, people, and creatures. Will officiate your wedding.",
      parents: "astras-mother", partners: [{ id: "styx-baron-cantor-onomy", type: "marriage" }],
      academy: "Starfall Academy", magic: "Transmutation", region: "Starfall", creature_type: "human"
    },
    {
      id: "astras-mother", name: "Astra's Mom", prefix: null, pronouns: "was/were", title: "Attempted Dragon Tamer",
      family: null, birth: 1970, death: 2002, portrait: null,
      bio: "Killed by a dragon.",
      parents: null, partners: null,
      academy: null, magic: null, region: null, creature_type: "human"
    },
    {
      id: "mckenna-davis", name: "Mckenna Davis", prefix: null, pronouns: "she/her", title: "Nightmare Heiress",
      family: null, birth: 2005, death: null, portrait: null,
      bio: "A girl given hypnomantic prowess with traumatic bioarcane experimentation, Mckenna formed her runner's group Renaissance to give troubled students a second chance—and as a secret task force for her mastermind operations. A powerful dreamcreep with a strong sense of justice.",
      parents: ["ernest-davis", "sarah-davis"], partners: [{ id: "linnea-anderson", type: "marriage" }, { id: "rosie-nightmare", type: "creature-bond" }],
      academy: "Starfall Academy", magic: "Hypnomancy", region: "Starfall", creature_type: "human"
    },
    {
      id: "rosie-nightmare", name: "Rosie", prefix: null, pronouns: "she/her", title: "Steed of Terror",
      family: null, birth: "unknown", death: null, portrait: null,
      bio: "Pet nightmare to ${text: 'Mckenna Davis', link: 'mckenna-davis'}, Rosie goes where her best friend Mckenna goes, in search of fear to feed on and spectral sugar cubes.",
      parents: null, partners: [{ id: "mckenna-davis", type: "creature-bond" }],
      academy: null, magic: null, region: "Starfall", creature_type: "beast"
    },
    {
      id: "horus-jones", name: "Horus 'Rus' Jones", prefix: null, pronouns: "he/they", title: "Twisted Thief",
      family: null, birth: 2005, death: null, portrait: null,
      bio: "Having woken up as a child with no memories of family or where they came from, Rus bounced between orphanages and eventually forged their own path in life. This path, naturally, includes stealing twisted artifacts.",
      parents: null, partners: [{ id: "hana-watanabe", type: "marriage" }],
      academy: "Starfall Academy", magic: "Counterhexology", region: "Starfall", creature_type: "human"
    },
    {
      id: "linnea-anderson", name: "Linnea Anderson", prefix: null, pronouns: "she/her", title: "Enchanting Star",
      family: null, birth: 2003, death: null, portrait: null,
      bio: "A star Witch's Run mainline, Linnea loves the attention of stardom. Helps distract her from her own past. A key operative in Renaissance together with her partner ${text: 'Mckenna', link: 'mckenna-davis'}.",
      parents: null, partners: [{ id: "mckenna-davis", type: "marriage" }],
      academy: "Starfall Academy", magic: "Enchantment", region: "Starfall", creature_type: "human"
    },
    {
      id: "hana-watanabe", name: "Hana Watanabe", prefix: null, pronouns: "she/her", title: "Grave Lantern Guide",
      family: null, birth: 2003, death: null, portrait: null,
      bio: "A very serious, very solitary necromancer who hates everyone except ${text: 'Rus', link: 'horus-jones'}. Frequently dabbles in strange experimental necromancies and their intersection with strange artifacts that are probably illegal.",
      parents: null, partners: [{ id: "horus-jones", type: "marriage" }],
      academy: "Starfall Academy", magic: "Necromancy", region: "Starfall", creature_type: "human"
    },
    {
      id: "harriett-cloudless", name: "Harriett Cloudless-Sparkes", prefix: null, pronouns: "she/her", title: "Hero of the Cosmos",
      family: "Cloudless", birth: 1993, death: null, portrait: null,
      bio: "The legendary chronomancer who rescued Starfall Academy during the Basilisk Incident with a centuries-long time loop, Harriett is known professionally simply as Harriett Cloudless. Now a great spell designer, she runs the Cloudless Foundation, a charity dedicated to sustainable magic development, together with her wife ${text: 'Alessandra', link: 'allie-sparkes'}.",
      parents: null, partners: [{ id: "allie-sparkes", type: "marriage" }],
      academy: "Starfall Academy", magic: "Chronomancy", region: "Starfall", creature_type: "human"
    },
    {
      id: "allie-sparkes", name: "Alessandra Cloudless-Sparkes", prefix: null, pronouns: "she/her", title: "Cloudless Heiress",
      family: "Cloudless", birth: 1994, death: null, portrait: null,
      bio: "Allie Sparkes, legally Alessandra Cloudless-Sparkes, accidentally fell in love with one of history's most powerful arcanists, unintentionally changed the course of destiny by being stubbornly in love, and now has gone from Dolphin House gossip to high-society socialite and philanthropy heiress. She's really in love with her wife, ${text: 'Harriett Cloudless', link: 'harriett-cloudless'}, so it all works out.",
      parents: ["henry-sparkes", "melissa-sparkes"], partners: [{ id: "harriett-cloudless", type: "marriage" }],
      academy: "Starfall Academy", magic: "Herbalism", region: "Starfall", creature_type: "human"
    },
    {
      id: "calla-burnwicke", name: "Calla Burnwicke", prefix: "Professor", pronouns: "she/her", title: "Keeper of Promises",
      family: "Burnwicke", birth: 1974, death: null, portrait: null,
      bio: "A Divination professor best known for a conspiracy to destroy all magic, Professor Burnwicke was really just going through a lot of options trying to break the hex on her wife, ${text: 'Professor Elena Mars', link: 'elena-mars'}. Eventually, legendary chronomantic manipulation severed the hex from its roots a hundred years ago, and she's mellowed out a little now, raising three kids with her wife while managing an unruly House team at Starfall.",
      parents: ["daniel-scott-burnwicke", "priscilla-burnwicke"], partners: [{ id: "elena-mars", type: "marriage" }],
      academy: "Starfall Academy", magic: "Divination", region: "Starfall", creature_type: "human"
    },
    {
      id: "elena-mars", name: "Elena Mars", prefix: "Professor", pronouns: "she/her", title: "Ancient Hexbreaker",
      family: "Mars", birth: 1974, death: null, portrait: null,
      bio: "Born with a hex that would eventually wipe out all her emotions, Professor Mars tried to dedicate herself fully to counterhexological studies to make her contribution to breaking the century-old generational Mars hex, but fell in love despite her best efforts. Her wife, ${text: 'Professor Calla Burnwicke', link: 'calla-burnwicke'}, is extremely stubborn and eventually broke the hex with her, and now they raise three chaotic children and a pet hellhound called Marshmallow.",
      parents: ["christopher-mars", "amelia-desmond"], partners: [{ id: "calla-burnwicke", type: "marriage" }],
      academy: "Starfall Academy", magic: "Counterhexology", region: "Starfall", creature_type: "human"
    },
    {
      id: "octavia-argon", name: "Octavia Argon", prefix: null, pronouns: "she/her", title: "The Blood Mage",
      family: "argon-split", birth: 2000, death: null, portrait: null,
      bio: "When ${text: 'a family rival', link:'edward-harrington-rook'} killed ${text: 'her mother', link:'margaux-winifred-argon'} while Octavia was only eight, Octavia leveraged an experimental fluid-control magic to find and exsanguinate her mother's killer at eleven years old. ${text: 'Her uncle', link:'laurent-argon'} stepped in to keep her out of trouble, and she's owed the family a blood debt ever since, leveraged as a great—and dangerous—artificer.",
      parents: ["samuel-bishop", "margaux-winifred-argon"], partners: null,
      academy: "Mayweather Academy", magic: "Artificy", region: "Starfall", creature_type: "human"
    },
    {
      id: "matthias-argon", name: "Matthias Argon", prefix: null, pronouns: "he/him", title: "Whisperer of Flame",
      family: "argon-split", birth: 1997, death: null, portrait: null,
      bio: "A mysterious and closed-off member of the breakaway Argon family, Matthias is a cousin of the head ${text: 'Damien Argon', link: 'damien-argon'}, and seems to have his sights set higher, but he plays with vials out of view.",
      parents: ["laurent-argon", "genevieve-argon"], partners: null,
      academy: "Starfall Academy", magic: "Evocation", region: "Starfall", creature_type: "human"
    },
    {
      id: "laurent-argon", name: "Laurent Argon", prefix: null, pronouns: "he/him", title: "Harbinger Director",
      family: "argon-split", birth: 1966, death: null, portrait: null,
      bio: "Uncle to breakaway Argon head ${text: 'Damien Argon', link: 'damien-argon'}, Laurent is intent on leveraging his position for soft power. An effete and lascivious man, Laurent is addicted to the privileges bought by his position.",
      parents: ["victor-brandt-argon", "iris-argon"], partners: [{ id: "genevieve-argon", type: "marriage" }],
      academy: "Albion Arcane", magic: "Enchantment", region: "Starfall", creature_type: "human"
    },
    {
      id: "edward-harrington-rook", name: "Edward Harrington Rook", prefix: "Professor", pronouns: "he/him", title: "Black-Hearted Falcon",
      family: "rook", birth: 1945, death: 2011, portrait: null,
      bio: "A professional arcane hitman under his cover of an Elara Magica telekinesis professor, killing ${text: 'Margaux Argon', link: 'margaux-winifred-argon'} should have been a clean job. He wasn't expecting ${text: 'her daughter', link: 'octavia-argon'} to track him down to where he disappeared to safety in Argentina and kill him with one brutal, bloody cast.",
      parents: ["roberto-garcia-rook", "cecilia-rook"], partners: null,
      academy: "Mayweather Academy", magic: "Telekinesis", region: null, creature_type: "human"
    },
    {
      id: "levinia-argon", name: "Levinia Argon", prefix: null, pronouns: "she/her", title: "Mother of Hexes",
      family: "argon-core", birth: 1874, death: 1925, portrait: null,
      bio: "The head of the Argon clan, Levinia allowed herself very few feelings, but her deep devotion to her husband ${text: 'Theodore', link: 'theodore-argon'} was one exception. And when a Mars family operative tried to assassinate Theodore and left him with a lifelong injury, she mobilized the coremost family to place a generational blood hex on the Mars family that would continue to haunt their descendents for a hundred years.",
      parents: ["william-prescott-argon", "margaret-adelaide-argon"], partners: [{ id: "theodore-argon", type: "marriage" }],
      academy: "Starfall Academy", magic: "Disparate", region: "Starfall", creature_type: "human"
    },
    {
      id: "theodore-argon", name: "Theodore Argon", prefix: null, pronouns: "he/him", title: "Catalyst of Grief",
      family: "argon-core", birth: 1876, death: 1940, portrait: null,
      bio: "A man who came from a modest but respectable mercantile background, his station was low enough in comparison to his lover ${text: 'Levinia', link: 'levinia-argon'}'s that it was scandalous for her, and that he was expected to take her last name. When a Mars family operative tried to assassinate him, he joined his wife in placing a blood hex on the Mars family.",
      parents: ["philip-brown", "dorothy-brown"], partners: [{ id: "levinia-argon", type: "marriage" }],
      academy: null, magic: "Disparate", region: "Starfall", creature_type: "human"
    },
    {
      id: "sebastian-argon", name: "Sebastian Argon", prefix: null, pronouns: "he/him", title: "Argon Executor",
      family: "argon-core", birth: 1818, death: 1923, portrait: null,
      bio: "The most powerful and feared Argon caster of his time, Sebastian remained content to operate from the shadows, quietly pulling strings until he placed a blood hex on the Mars family together with ${text: 'his granddaughter Levinia', link:'levinia-argon'}. Circumstances of his death are uncertain: no body was ever found, and divinatory traces found he simply disappeared in the middle of casting his most terrible spell yet, five red candles still burning.",
      parents: ["alistair-francis-argon", "catherine-argon"], partners: [{ id: "josephine-argon", type: "marriage" }],
      academy: "Starfall Academy", magic: "Disparate", region: "Starfall", creature_type: "human"
    },
    {
      id: "alistair-francis-argon", name: "Alistair Francis Argon", prefix: "Professor", pronouns: "he/him", title: "Buried in the Sands of Time",
      family: "argon-core", birth: 1787, death: "Unknown", portrait: null,
      bio: "The first to bear the name of Argon, little is known of Starfall's first Chronomancy professor: in an attempt to erase ${text: 'Ariin', link: 'ariin'} from history, the Great Dolphin Isadora wiped every record of him out of the timestream and out of the history books. It is believed he was ensnared into his own time paradox and, at Isadora's deception, made to erase himself.",
      parents: ["ariin", "percival-renegon"], partners: "Unknown",
      academy: "Starfall Academy", magic: "Chronomancy", region: "Starfall", creature_type: "human"
    },
    {
      id: "ariin", name: "Ariin", prefix: null, pronouns: "she/her", title: "Scorpion House Founder",
      family: "argon-core", birth: 1743, death: 1810, portrait: null,
      bio: "The woman who created the field of chronomancy, Ariin was born a poor girl in a poor town not far outside of Boston, but a magic confluence incident wiped out most of her family when she was young. She took on a new name and threw herself into making sense of the magic phenomenon that had killed her family and touched her with arcane influence, and the power she achieved brought ${text: 'the Great Dragon', link:'isvaldarhyxvynn'} to her doorstep in search of her expertise to help create a bastion of humans' magical knowledge on the ley line cluster that would one day be Starfall Academy. Founding Starfall was what brought her to her lover, the breakaway English artificer Percival Renegon, and forming the Argon family together. She was killed by her fellow founder ${text:'Isadora', link:'isadora'}, but her soul lived on through the ley lines and has, in the modern day, been reincarnated in an artifical body, where she travels the modern world together with her old friend, the Great Dragon.",
      parents: null, partners: [{ id: "percival-bregon", type: "widowed" }, { id: "isvaldarhyxvynn", type: "partnership" }],
      academy: "Starfall Academy", magic: "Chronomancy", region: "Global", creature_type: "human"
    }
  ];

  window.SFT_DATA = { FAMILIES, CHARACTERS };
})();
