/* ===========================================================================
   Starfall Family Tree — dataset
   Characters are loaded live from Google Sheets (CSV export).
   Families remain hardcoded here (they carry blurb text not in the sheet).

   Sheet columns: ID, Name, Prefix, Pronouns, Title, Family, Birth, Death,
   Portrait, Bio, Parents, Partners, Academy, Magic, Region, Creature Type
   Multi-value fields (Parents, Partners, Magic) use semicolon separators.
   Partners format: "id (type)" e.g. "emily-argon (marriage)".
   =========================================================================== */
(function () {
  const SHEET_ID = "12pocjObSluK--b8ZdFnBljn01QVUbZsoSHF3KlnDb7I";
  const CSV_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/export?format=csv";

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

  // ---- CSV parser (RFC 4180) -----------------------------------------------
  function parseCSV(text) {
    const rows = [];
    let field = "", row = [], inQuote = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuote) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuote = false;
        } else {
          field += c;
        }
      } else {
        if (c === '"') { inQuote = true; }
        else if (c === ',') { row.push(field); field = ""; }
        else if (c === '\r') { /* skip */ }
        else if (c === '\n') { row.push(field); rows.push(row); field = ""; row = []; }
        else { field += c; }
      }
    }
    if (row.length || field) { row.push(field); rows.push(row); }
    if (!rows.length) return [];
    const headers = rows[0].map(function (h) { return h.trim(); });
    return rows.slice(1)
      .filter(function (r) { return r.some(function (c) { return c.trim(); }); })
      .map(function (cols) {
        const obj = {};
        headers.forEach(function (h, i) { obj[h] = (cols[i] || "").trim(); });
        return obj;
      });
  }

  // ---- field helpers -------------------------------------------------------
  function cell(obj, key) {
    const v = obj[key];
    return (v === undefined || v === "") ? null : v;
  }

  function parseList(s) {
    return s ? s.split(";").map(function (x) { return x.trim(); }).filter(Boolean) : [];
  }

  function parseBirth(s) {
    if (!s) return null;
    if (s.toLowerCase() === "unknown") return "unknown";
    const n = parseInt(s, 10);
    return isNaN(n) ? null : n;
  }

  function parseDeath(s) {
    if (!s) return null;
    if (s === "Unknown") return "Unknown";
    const n = parseInt(s, 10);
    return isNaN(n) ? null : n;
  }

  function parsePartners(s) {
    if (!s) return null;
    if (s === "Unknown") return "Unknown";
    const parts = parseList(s);
    if (!parts.length) return null;
    return parts.map(function (entry) {
      const m = entry.match(/^(.+?)\s*\((.+?)\)$/);
      return m ? { id: m[1].trim(), type: m[2].trim() } : { id: entry.trim(), type: "marriage" };
    });
  }

  function parseMagic(s) {
    if (!s) return null;
    const parts = parseList(s);
    if (!parts.length) return null;
    return parts.length === 1 ? parts[0] : parts;
  }

  function parseParents(s) {
    if (!s) return null;
    const parts = parseList(s);
    if (!parts.length) return null;
    return parts.length === 1 ? parts[0] : parts;
  }

  function rowToCharacter(row) {
    return {
      id:            cell(row, "ID"),
      name:          cell(row, "Name"),
      prefix:        cell(row, "Prefix"),
      pronouns:      cell(row, "Pronouns"),
      title:         cell(row, "Title"),
      family:        cell(row, "Family"),
      birth:         parseBirth(cell(row, "Birth")),
      death:         parseDeath(cell(row, "Death")),
      portrait:      cell(row, "Portrait"),
      bio:           cell(row, "Bio"),
      parents:       parseParents(cell(row, "Parents")),
      partners:      parsePartners(cell(row, "Partners")),
      academy:       cell(row, "Academy"),
      magic:         parseMagic(cell(row, "Magic")),
      region:        cell(row, "Region"),
      creature_type: cell(row, "Creature Type") || "human"
    };
  }

  // ---- fetch & expose -------------------------------------------------------
  window.SFT_DATA_READY = fetch(CSV_URL)
    .then(function (r) {
      if (!r.ok) throw new Error("Sheet fetch failed (" + r.status + ")");
      return r.text();
    })
    .then(function (text) {
      const CHARACTERS = parseCSV(text).map(rowToCharacter).filter(function (c) { return !!c.id; });
      window.SFT_DATA = { FAMILIES, CHARACTERS };
    });
})();
