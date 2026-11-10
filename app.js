const OPEN_PCS = [4, 9, 2, 7, 11, 4];
const STRING_LABELS = ["E", "A", "D", "G", "B", "E"];
const FRET_COUNT = 15;
const STORAGE = {
  sessions: "fretnote.sessions.v1",
  practice: "fretnote.practice.v1",
  scratch: "fretnote.scratch.v1",
};

const KEYS = [
  { pc: 0, label: "C", chord: ["C", "E", "G"], accidental: "natural" },
  { pc: 1, label: "Db", chord: ["Db", "F", "Ab"], accidental: "flat" },
  { pc: 2, label: "D", chord: ["D", "F#", "A"], accidental: "sharp" },
  { pc: 3, label: "Eb", chord: ["Eb", "G", "Bb"], accidental: "flat" },
  { pc: 4, label: "E", chord: ["E", "G#", "B"], accidental: "sharp" },
  { pc: 5, label: "F", chord: ["F", "A", "C"], accidental: "natural" },
  { pc: 6, label: "F#", chord: ["F#", "A#", "C#"], accidental: "sharp" },
  { pc: 7, label: "G", chord: ["G", "B", "D"], accidental: "natural" },
  { pc: 8, label: "Ab", chord: ["Ab", "C", "Eb"], accidental: "flat" },
  { pc: 9, label: "A", chord: ["A", "C#", "E"], accidental: "sharp" },
  { pc: 10, label: "Bb", chord: ["Bb", "D", "F"], accidental: "flat" },
  { pc: 11, label: "B", chord: ["B", "D#", "F#"], accidental: "sharp" },
];

const CHORD_TYPES = {
  major: {
    id: "major",
    label: "大三和弦",
    short: "大三",
    suffix: "",
    intervals: [0, 4, 7],
    formula: ["1", "3", "5"],
    description: "由根音、大三度、纯五度组成，声音稳定、明亮。",
  },
  minor: {
    id: "minor",
    label: "小三和弦",
    short: "小三",
    suffix: "m",
    intervals: [0, 3, 7],
    formula: ["1", "b3", "5"],
    description: "把大三度降低半音得到小三度，声音更柔和、内敛。",
  },
  maj7: {
    id: "maj7",
    label: "大七和弦",
    short: "大七",
    suffix: "maj7",
    intervals: [0, 4, 7, 11],
    formula: ["1", "3", "5", "7"],
    description: "在大三和弦上加入大七度，形成悬浮、通透的色彩。",
  },
  dominant7: {
    id: "dominant7",
    label: "属七和弦",
    short: "属七",
    suffix: "7",
    intervals: [0, 4, 7, 10],
    formula: ["1", "3", "5", "b7"],
    description: "在大三和弦上加入小七度，带有明确的解决倾向。",
  },
  minor7: {
    id: "minor7",
    label: "小七和弦",
    short: "小七",
    suffix: "m7",
    intervals: [0, 3, 7, 10],
    formula: ["1", "b3", "5", "b7"],
    description: "由小三和弦与小七度组成，常见于爵士、流行与 R&B。",
  },
};

const CHORD_TYPE_ORDER = ["major", "minor", "maj7", "dominant7", "minor7"];

const SHAPE_CONFIGS = {
  C: {
    label: "C 型",
    rootString: 1,
    offsets: { 1: 0, 2: -1, 3: -3, 4: -2, 5: -3 },
    formula: ["1", "3", "5", "1", "3"],
    description: "以五弦根音为锚点，向高音弦展开。",
  },
  A: {
    label: "A 型",
    rootString: 1,
    offsets: { 1: 0, 2: 2, 3: 2, 4: 2, 5: 0 },
    formula: ["1", "5", "1", "3", "5"],
    description: "五弦根音与二弦同音，形成稳定的横按骨架。",
  },
  G: {
    label: "G 型",
    rootString: 0,
    offsets: { 0: 0, 1: -1, 2: -3, 3: -3, 4: -3, 5: 0 },
    formula: ["1", "3", "5", "1", "3", "1"],
    description: "六弦与一弦构成两端根音，中间藏着三音和五音。",
  },
  E: {
    label: "E 型",
    rootString: 0,
    offsets: { 0: 0, 1: 2, 2: 2, 3: 1, 4: 0, 5: 0 },
    formula: ["1", "5", "1", "3", "5", "1"],
    description: "以六弦根音为锚点，是低把位最直观的封闭和弦之一。",
  },
  D: {
    label: "D 型",
    rootString: 2,
    offsets: { 2: 0, 3: 2, 4: 3, 5: 2 },
    formula: ["1", "5", "1", "3"],
    description: "以四弦根音为锚点，集中在中高音弦。",
  },
};

const SHAPE_ORDER = ["C", "A", "G", "E", "D"];
const PRACTICE_TASKS = [
  { id: "root", label: "先不看高亮，找到当前调和弦的根音" },
  { id: "tones", label: "说出当前和弦的音程与实际音名" },
  { id: "shapes", label: "用 CAGED 顺序串起相邻把位" },
  { id: "transfer", label: "换一个调，重新推导同一个音" },
];

const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_PCS = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const DEGREE_LETTER_STEPS = { "1": 0, "3": 2, "b3": 2, "5": 4, "7": 6, "b7": 6 };
const TONE_CLASS = {
  "1": "root",
  "3": "third",
  "b3": "third",
  "5": "fifth",
  "7": "seventh",
  "b7": "seventh",
};
const TONE_LABEL = {
  "1": "根音",
  "3": "大三音",
  "b3": "小三音",
  "5": "五音",
  "7": "大七音",
  "b7": "小七音",
};
const INTERVAL_LABEL = {
  "1": "根音",
  "3": "大三度",
  "b3": "小三度",
  "5": "纯五度",
  "7": "大七度",
  "b7": "小七度",
};
const FINGER_NAMES = { 1: "食指", 2: "中指", 3: "无名指", 4: "小指" };

const state = {
  currentView: "studio",
  keyIndex: KEYS.findIndex((key) => key.label === "E"),
  chordType: "major",
  selectedShape: "E",
  labelMode: "note",
  showScaleNotes: false,
  selectedNote: null,
  editingId: null,
  sessions: [],
  practice: {},
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const shapeCache = new Map();

function pitchClass(pc) {
  return (pc + 12) % 12;
}

function noteName(pc, preferFlats = false) {
  return (preferFlats ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[pitchClass(pc)];
}

function currentKey() {
  return KEYS[state.keyIndex];
}

function currentChordType() {
  return CHORD_TYPES[state.chordType] || CHORD_TYPES.major;
}

function parseNoteLabel(label) {
  const letter = label[0];
  const accidental = label.slice(1);
  const offset = accidental.split("").reduce((total, symbol) => {
    if (symbol === "#") return total + 1;
    if (symbol === "b") return total - 1;
    return total;
  }, 0);
  return { letter, offset };
}

function spellChordTone(rootLabel, degree, targetPc) {
  const root = parseNoteLabel(rootLabel);
  const rootLetterIndex = LETTERS.indexOf(root.letter);
  const letterStep = DEGREE_LETTER_STEPS[degree] ?? 0;
  const targetLetter = LETTERS[(rootLetterIndex + letterStep) % 7];
  const naturalPc = LETTER_PCS[targetLetter];
  let accidentalOffset = pitchClass(targetPc - naturalPc);
  if (accidentalOffset > 6) accidentalOffset -= 12;
  const accidental = accidentalOffset > 0 ? "#".repeat(accidentalOffset) : "b".repeat(-accidentalOffset);
  return `${targetLetter}${accidental}`;
}

function chordToneDefinitions() {
  const key = currentKey();
  const chordType = currentChordType();
  return chordType.intervals.map((interval, index) => {
    const degree = chordType.formula[index];
    const pc = pitchClass(key.pc + interval);
    return {
      interval,
      degree,
      pc,
      name: spellChordTone(key.label, degree, pc),
    };
  });
}

function chordPcs() {
  return chordToneDefinitions().map((tone) => tone.pc);
}

function degreeForPc(pc) {
  return chordToneDefinitions().find((tone) => tone.pc === pitchClass(pc))?.degree || null;
}

function noteNameForPc(pc, preferFlats = false) {
  const key = currentKey();
  const chordTone = chordToneDefinitions().find((tone) => tone.pc === pitchClass(pc));
  if (chordTone) return chordTone.name;
  return noteName(pc, preferFlats || key.accidental === "flat");
}

function currentChordName() {
  return `${currentKey().label}${currentChordType().suffix}`;
}

function rootFretForShape(shapeKey) {
  const shape = SHAPE_CONFIGS[shapeKey];
  const stringPc = OPEN_PCS[shape.rootString];
  let fret = pitchClass(currentKey().pc - stringPc);
  const lowestOffset = Math.min(0, ...Object.values(shape.offsets));
  if (fret + lowestOffset < 0) fret += 12;
  return fret;
}

function stringPositionLabel(stringIndex) {
  return `${6 - stringIndex}弦`;
}

function buildMajorFingering(shapeKey, rootFret) {
  if (shapeKey === "C" && rootFret === 3) {
    return { fingers: { 1: 3, 2: 2, 4: 1 }, barres: [] };
  }
  if (shapeKey === "A" && rootFret === 0) {
    return { fingers: { 2: 1, 3: 2, 4: 3 }, barres: [] };
  }
  if (shapeKey === "G" && rootFret === 3) {
    return { fingers: { 0: 2, 1: 1, 5: 3 }, barres: [] };
  }
  if (shapeKey === "E" && rootFret === 0) {
    return { fingers: { 1: 2, 2: 3, 3: 1 }, barres: [] };
  }
  if (shapeKey === "D" && rootFret === 0) {
    return { fingers: { 3: 1, 4: 3, 5: 2 }, barres: [] };
  }

  const standardFingerings = {
    C: {
      fingers: { 1: 4, 2: 3, 3: 1, 4: 2, 5: 1 },
      barres: [{ fret: rootFret - 3, from: 3, to: 5, finger: 1 }],
    },
    A: {
      fingers: { 1: 1, 2: 3, 3: 3, 4: 3, 5: 1 },
      barres: [
        { fret: rootFret, from: 1, to: 5, finger: 1 },
        { fret: rootFret + 2, from: 2, to: 4, finger: 3 },
      ],
    },
    G: {
      fingers: { 0: 3, 1: 2, 2: 1, 3: 1, 4: 1, 5: 4 },
      barres: [{ fret: rootFret - 3, from: 2, to: 4, finger: 1 }],
    },
    E: {
      fingers: { 0: 1, 1: 3, 2: 4, 3: 2, 4: 1, 5: 1 },
      barres: [{ fret: rootFret, from: 0, to: 5, finger: 1 }],
    },
    D: {
      fingers: { 2: 1, 3: 2, 4: 3, 5: 4 },
      barres: [],
    },
  };

  return standardFingerings[shapeKey];
}

function findVoicingForChord(shapeKey, rootFret, config) {
  const chordTones = chordToneDefinitions();
  const chord = chordTones.map((tone) => tone.pc);
  const degreeByPc = new Map(chordTones.map((tone) => [tone.pc, tone.degree]));
  const activeStrings = Object.keys(config.offsets)
    .map(Number)
    .sort((a, b) => a - b);
  const candidatesByString = activeStrings.map((stringIndex) => {
    const desiredFret = rootFret + config.offsets[stringIndex];
    const buildCandidates = (radius) =>
      Array.from({ length: FRET_COUNT + 1 }, (_, fret) => fret)
        .filter((fret) => Math.abs(fret - desiredFret) <= radius)
        .map((fret) => {
          const pc = pitchClass(OPEN_PCS[stringIndex] + fret);
          const degree = degreeByPc.get(pc);
          return degree
            ? { fret, pc, degree, distance: Math.abs(fret - desiredFret) }
            : null;
        })
        .filter(Boolean)
        .filter(
          (candidate) =>
            stringIndex !== config.rootString || candidate.degree === "1",
        );

    let candidates = buildCandidates(4);
    if (!candidates.length) candidates = buildCandidates(7);
    return candidates;
  });

  let best = null;

  function search(index, chosen, degrees, distance) {
    if (index === activeStrings.length) {
      const frets = chosen.map((candidate) => candidate.fret);
      const minFret = Math.min(...frets);
      const maxFret = Math.max(...frets);
      const span = maxFret - minFret;
      const uniqueFrets = new Set(frets).size;
      const missing = chord.length - degrees.size;
      const duplicateCount = activeStrings.length - degrees.size;
      const hasRoot = degrees.has("1");
      const score =
        missing * 10000 +
        (hasRoot ? 0 : 10000) +
        Math.max(0, span - 4) * 80 +
        Math.max(0, uniqueFrets - 4) * 35 +
        duplicateCount * 5 +
        distance * 2;

      if (!best || score < best.score) {
        best = {
          score,
          fretsByString: Object.fromEntries(
            activeStrings.map((stringIndex, noteIndex) => [
              stringIndex,
              chosen[noteIndex].fret,
            ]),
          ),
        };
      }
      return;
    }

    for (const candidate of candidatesByString[index]) {
      const nextDegrees = new Set(degrees);
      nextDegrees.add(candidate.degree);
      chosen.push(candidate);
      search(index + 1, chosen, nextDegrees, distance + candidate.distance);
      chosen.pop();
    }
  }

  search(0, [], new Set(), 0);
  return best?.fretsByString || null;
}

function buildGeneratedFingering(fretsByString) {
  const groups = new Map();
  for (const [stringIndex, fret] of Object.entries(fretsByString)) {
    if (fret <= 0) continue;
    const group = groups.get(fret) || [];
    group.push(Number(stringIndex));
    groups.set(fret, group);
  }

  const fingers = {};
  const barres = [];
  [...groups.entries()]
    .sort(([fretA], [fretB]) => fretA - fretB)
    .forEach(([fret, strings], groupIndex) => {
      const finger = Math.min(4, groupIndex + 1);
      strings.sort((a, b) => a - b);
      for (const stringIndex of strings) fingers[stringIndex] = finger;
      if (strings.length > 1) {
        barres.push({
          fret,
          from: strings[0],
          to: strings[strings.length - 1],
          finger,
        });
      }
    });

  return { fingers, barres };
}

function buildShape(shapeKey) {
  const cacheKey = `${state.keyIndex}:${state.chordType}:${shapeKey}`;
  if (shapeCache.has(cacheKey)) return shapeCache.get(cacheKey);

  const config = SHAPE_CONFIGS[shapeKey];
  const rootFret = rootFretForShape(shapeKey);
  const fretsByString =
    state.chordType === "major"
      ? Object.fromEntries(
          Object.entries(config.offsets).map(([stringIndex, offset]) => [
            Number(stringIndex),
            rootFret + offset,
          ]),
        )
      : findVoicingForChord(shapeKey, rootFret, config);

  const notes = Object.entries(fretsByString).map(([stringIndex, fret]) => {
    const index = Number(stringIndex);
    const pc = pitchClass(OPEN_PCS[index] + fret);
    const degree = degreeForPc(pc);
    return {
      stringIndex: index,
      string: STRING_LABELS[index],
      fret,
      pc,
      name: noteNameForPc(pc),
      degree,
    };
  });

  const rootNotes = notes.filter((note) => note.degree === "1");
  const frets = notes.map((note) => note.fret);
  const formula = notes.map((note) => note.degree);

  const shape = {
    key: shapeKey,
    config,
    rootFret,
    fretsByString,
    notes,
    rootNotes,
    formula,
    minFret: Math.min(...frets),
    maxFret: Math.max(...frets),
    fingering:
      state.chordType === "major"
        ? buildMajorFingering(shapeKey, rootFret)
        : buildGeneratedFingering(fretsByString),
  };
  shapeCache.set(cacheKey, shape);
  return shape;
}

function allShapes() {
  return SHAPE_ORDER.map((shapeKey) => buildShape(shapeKey));
}

function localDateValue(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseStored(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.warn(`Unable to parse ${key}`, error);
    return fallback;
  }
}

function persist(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to store ${key}`, error);
  }
}

function seedSessions() {
  const today = localDateValue();
  const now = new Date().toISOString();
  return [
    {
      id: crypto.randomUUID(),
      date: today,
      durationMinutes: 45,
      key: "E",
      chordType: "major",
      shapes: "CAGED",
      title: "E 大调：把五种指型串起来",
      focus:
        "从六弦与五弦根音定位 E 型、G 型、C 型、A 型，再从四弦找到 D 型。重点观察同一个根音在不同指型中的位置。",
      tags: ["根音定位", "同音异形", "换把位"],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: crypto.randomUUID(),
      date: today,
      durationMinutes: 25,
      key: "C",
      chordType: "major",
      shapes: "C / A / G",
      title: "把公式变成音名，而不只是数字",
      focus:
        "C 型和 A 型都以五弦作根音锚点；G 型从六弦出发。练习时先说出 1-3-5，再对应到实际音名，最后听两遍和弦。",
      tags: ["和弦音", "听觉训练"],
      createdAt: now,
      updatedAt: now,
    },
  ];
}

function initializeData() {
  const storedSessions = parseStored(STORAGE.sessions, null);
  const sessions = Array.isArray(storedSessions) ? storedSessions : seedSessions();
  state.sessions = sessions.map((session) => ({
    ...session,
    chordType: CHORD_TYPES[session.chordType] ? session.chordType : "major",
  }));
  persist(STORAGE.sessions, state.sessions);
  state.practice = parseStored(STORAGE.practice, {});
  $("#scratchNote").value = parseStored(STORAGE.scratch, "");
}

function renderKeys() {
  $("#keyPicker").innerHTML = KEYS.map(
    (key, index) => `
      <button
        class="key-button ${index === state.keyIndex ? "is-active" : ""}"
        type="button"
        data-key-index="${index}"
        aria-pressed="${index === state.keyIndex}"
      >${key.label}</button>
    `,
  ).join("");
}

function renderQualityPicker() {
  const activeType = currentChordType();
  $("#qualityPicker").innerHTML = CHORD_TYPE_ORDER.map((typeId) => {
    const type = CHORD_TYPES[typeId];
    return `
      <button
        class="quality-button ${typeId === state.chordType ? "is-active" : ""}"
        type="button"
        data-quality="${typeId}"
        aria-pressed="${typeId === state.chordType}"
      >
        <span>${type.label}</span>
        <strong>${type.formula.join(" · ")}</strong>
      </button>
    `;
  }).join("");
  $("#qualityFormula").textContent = activeType.formula.join(" · ");
}

function renderHero() {
  const key = currentKey();
  const type = currentChordType();
  $("#heroChordLetter").textContent = key.label;
  $("#heroChordType").textContent = type.label;
  $("#heroChordNotes").textContent = chordToneDefinitions()
    .map((tone) => tone.name)
    .join(" · ");
}

function fretX(fret, left, segment) {
  return fret === 0 ? left - 25 : left + (fret - 0.5) * segment;
}

function stringY(stringIndex, top) {
  // Internal indexes run from low E (0) to high E (5). The diagram itself
  // places the high E string at the top and the low E string at the bottom.
  return top + (5 - stringIndex) * 34;
}

function renderFretboard() {
  const svg = $("#fretboard");
  const title = svg.querySelector("title");
  const desc = svg.querySelector("desc");
  const key = currentKey();
  const shape = buildShape(state.selectedShape);
  const shapes = allShapes();
  const left = 98;
  const top = 56;
  const right = 882;
  const segment = (right - left) / FRET_COUNT;
  const bottom = stringY(0, top);
  const boardTop = top - 28;
  const boardBottom = bottom + 28;
  const chordTones = chordToneDefinitions();
  const type = currentChordType();
  const shapePositions = new Set(
    shape.notes.map((note) => `${note.stringIndex}-${note.fret}`),
  );
  const pieces = [];

  title.textContent = `${currentChordName()} 的 CAGED 指板图`;
  desc.textContent = `${currentChordName()} ${type.label}包含 ${chordTones.map((tone) => tone.name).join("、")}。当前显示 ${SHAPE_CONFIGS[state.selectedShape].label}。纵向按一弦在上、六弦在下排列。`;

  pieces.push(`<rect class="board-wood" x="${left}" y="${boardTop}" width="${right - left}" height="${boardBottom - boardTop}" rx="7"/>`);

  for (const fret of [3, 5, 7, 9, 12, 15]) {
    const x = fretX(fret, left, segment);
    const y = fret === 12 ? top - 15 : bottom + 17;
    pieces.push(`<circle class="fret-marker" cx="${x}" cy="${y}" r="${fret === 12 ? 3.5 : 2.6}"/>`);
    if (fret === 12) {
      pieces.push(`<circle class="fret-marker" cx="${x}" cy="${top + 15}" r="2.6"/>`);
    }
  }

  for (let fret = 1; fret < FRET_COUNT; fret += 1) {
    const x = left + fret * segment;
    pieces.push(`<line class="fret-line" x1="${x}" y1="${boardTop}" x2="${x}" y2="${boardBottom}"/>`);
  }

  pieces.push(`<line class="nut" x1="${left}" y1="${boardTop}" x2="${left}" y2="${boardBottom}"/>`);
  pieces.push(`<line class="fret-line" x1="${right}" y1="${boardTop}" x2="${right}" y2="${boardBottom}"/>`);

  for (let stringIndex = 0; stringIndex < 6; stringIndex += 1) {
    const y = stringY(stringIndex, top);
    // Low E is physically the thickest string; keep that true after the
    // visual order flip.
    const width = 1.1 + (5 - stringIndex) * 0.32;
    pieces.push(`<line class="string-line" x1="${left}" y1="${y}" x2="${right}" y2="${y}" stroke-width="${width}"/>`);
    pieces.push(`<line class="string-line" x1="${left - 16}" y1="${y}" x2="${left}" y2="${y}" stroke-width="${width}"/>`);
    pieces.push(`<text class="string-label" x="${left - 50}" y="${y + 3.5}">${6 - stringIndex}·${STRING_LABELS[stringIndex]}</text>`);
  }

  for (let fret = 1; fret <= FRET_COUNT; fret += 1) {
    pieces.push(
      `<text class="fret-number" x="${fretX(fret, left, segment)}" y="${boardTop - 13}">${fret}</text>`,
    );
  }

  // Draw every chord-tone location. The selected shape receives a larger ring.
  for (let stringIndex = 0; stringIndex < 6; stringIndex += 1) {
    for (let fret = 0; fret <= FRET_COUNT; fret += 1) {
      const pc = pitchClass(OPEN_PCS[stringIndex] + fret);
      const degree = degreeForPc(pc);
      const positionId = `${stringIndex}-${fret}`;

      if (degree) {
        const isInShape = shapePositions.has(positionId);
        const radius = isInShape ? 14 : 9.3;
        const label =
          state.labelMode === "note"
            ? noteNameForPc(pc, key.accidental === "flat")
            : degree;
        const x = fretX(fret, left, segment);
        const y = stringY(stringIndex, top);
        const aria = `${stringPositionLabel(stringIndex)} ${STRING_LABELS[stringIndex]}，${fret} 品，${noteNameForPc(pc)}，${TONE_LABEL[degree]}`;

        if (isInShape && degree === "1") {
          pieces.push(`<circle class="root-halo" cx="${x}" cy="${y}" r="18"/>`);
        }

        pieces.push(
          `<g class="note-dot" data-string="${stringIndex}" data-fret="${fret}" data-pc="${pc}" role="button" tabindex="0" aria-label="${aria}">
            <circle class="chord-dot ${TONE_CLASS[degree]} ${isInShape ? "is-shape" : ""}" cx="${x}" cy="${y}" r="${radius}"/>
            <text class="dot-label" x="${x}" y="${y + 3}">${label}</text>
          </g>`,
        );
      } else if (state.showScaleNotes) {
        const x = fretX(fret, left, segment);
        const y = stringY(stringIndex, top);
        const label = noteNameForPc(pc, key.accidental === "flat");
        pieces.push(
          `<g class="note-dot" data-string="${stringIndex}" data-fret="${fret}" data-pc="${pc}" role="button" tabindex="0" aria-label="${stringPositionLabel(stringIndex)} ${STRING_LABELS[stringIndex]}，${fret} 品，${label}，调外音">
            <circle class="neutral-dot" cx="${x}" cy="${y}" r="8.2"/>
            <text class="dot-label neutral-label" x="${x}" y="${y + 3}">${label}</text>
          </g>`,
        );
      }
    }
  }

  // Draw the connecting braces that make each selected shape readable.
  const minShapeString = Math.min(...shape.notes.map((note) => note.stringIndex));
  const maxShapeString = Math.max(...shape.notes.map((note) => note.stringIndex));
  const minX = fretX(shape.minFret, left, segment) - 19;
  const maxX = fretX(shape.maxFret, left, segment) + 19;
  const braceTop = stringY(minShapeString, top) - 17;
  const braceBottom = stringY(maxShapeString, top) + 17;
  pieces.push(
    `<path d="M ${minX} ${braceTop} Q ${minX - 9} ${(braceTop + braceBottom) / 2} ${minX} ${braceBottom}" fill="none" stroke="rgba(23,55,45,.28)" stroke-width="1.2" stroke-dasharray="3 3"/>`,
  );

  svg.innerHTML = `
    <title id="fretboard-title">${title.textContent}</title>
    <desc id="fretboard-description">${desc.textContent}</desc>
    ${pieces.join("")}
  `;
}

function renderShapeCards() {
  const shapes = allShapes();
  $("#shapePicker").innerHTML = shapes
    .map((shape) => {
      const firstRoot = shape.rootNotes[0];
      return `
        <button
          class="shape-card ${state.selectedShape === shape.key ? "is-active" : ""}"
          type="button"
          data-shape="${shape.key}"
          aria-pressed="${state.selectedShape === shape.key}"
        >
          <span class="shape-letter">${shape.key}</span>
          <span class="shape-name">${shape.config.label} · ${currentChordType().short}</span>
          <span class="shape-root">根音 · ${stringPositionLabel(firstRoot.stringIndex)} ${firstRoot.fret}品</span>
          <span class="shape-formula">${shape.formula.join(" · ")}</span>
          <span class="shape-range">${shape.minFret}–${shape.maxFret} 品</span>
        </button>
      `;
    })
    .join("");
}

function rootLocationGroups() {
  const groups = new Map();
  for (const shape of allShapes()) {
    for (const note of shape.rootNotes) {
      const id = `${note.stringIndex}-${note.fret}`;
      const existing = groups.get(id) || {
        stringIndex: note.stringIndex,
        string: note.string,
        fret: note.fret,
        shapes: [],
      };
      existing.shapes.push(shape.key);
      groups.set(id, existing);
    }
  }
  return [...groups.values()].sort((a, b) => a.stringIndex - b.stringIndex || a.fret - b.fret);
}

function fingeringDiagram(shape) {
  const chordName = currentChordName();
  const type = currentChordType();
  const startFret = shape.minFret <= 1 ? 1 : shape.minFret;
  const fretSpan = Math.max(4, shape.maxFret - startFret + 1);
  const left = 47;
  const top = 35;
  const stringGap = 34;
  const fretGap = 27;
  const bottom = top + fretSpan * fretGap;
  const right = left + stringGap * 5;
  const stringX = (stringIndex) => left + stringIndex * stringGap;
  const fretY = (fret) => top + (fret - startFret + 0.5) * fretGap;
  const activeStrings = new Set(Object.keys(shape.config.offsets).map(Number));
  const pieces = [];

  pieces.push(
    `<svg class="fingering-diagram" viewBox="0 0 276 ${bottom + 46}" role="img" aria-label="${chordName} ${type.label} ${shape.config.label} 标准左手按法">`,
    `<title>${chordName} ${type.label} ${shape.config.label} 左手按法</title>`,
    `<desc>从低音 E 弦到高音 E 弦排列，圆点数字表示左手手指，横条表示横按。</desc>`,
  );

  for (const barre of shape.fingering.barres) {
    const y = fretY(barre.fret);
    const x1 = stringX(barre.from);
    const x2 = stringX(barre.to);
    pieces.push(
      `<rect class="fingering-barre" x="${x1 - 12}" y="${y - 10}" width="${x2 - x1 + 24}" height="20" rx="10"/>`,
    );
  }

  for (let fretLine = 0; fretLine <= fretSpan; fretLine += 1) {
    const y = top + fretLine * fretGap;
    pieces.push(
      `<line class="${fretLine === 0 && startFret === 1 ? "fingering-nut" : "fingering-fret"}" x1="${left}" y1="${y}" x2="${right}" y2="${y}"/>`,
    );
  }

  for (let stringIndex = 0; stringIndex < 6; stringIndex += 1) {
    const x = stringX(stringIndex);
    const stringNumber = 6 - stringIndex;
    pieces.push(
      `<line class="fingering-string string-${stringNumber}" x1="${x}" y1="${top}" x2="${x}" y2="${bottom}"/>`,
      `<text class="fingering-string-name" x="${x}" y="${bottom + 18}">${stringNumber}</text>`,
      `<text class="fingering-string-note" x="${x}" y="${bottom + 31}">${STRING_LABELS[stringIndex]}</text>`,
    );
  }

  pieces.push(
    `<text class="fingering-fret-label" x="17" y="${top + 15}">${startFret}fr</text>`,
  );

  for (let stringIndex = 0; stringIndex < 6; stringIndex += 1) {
    const x = stringX(stringIndex);
    if (!activeStrings.has(stringIndex)) {
      pieces.push(`<text class="fingering-muted" x="${x}" y="${top - 10}">×</text>`);
      continue;
    }

    const fret = shape.fretsByString[stringIndex];
    const degree = degreeForPc(pitchClass(OPEN_PCS[stringIndex] + fret));
    if (fret === 0) {
      pieces.push(
        `<circle class="fingering-open ${TONE_CLASS[degree]}" cx="${x}" cy="${top - 11}" r="6"/>`,
      );
      continue;
    }

    const finger = shape.fingering.fingers[stringIndex];
    const y = fretY(fret);
    pieces.push(
      `<circle class="fingering-finger ${TONE_CLASS[degree]}" cx="${x}" cy="${y}" r="10.5"/>`,
      `<text class="fingering-number" x="${x}" y="${y + 3.5}">${finger}</text>`,
    );
  }

  pieces.push("</svg>");
  return pieces.join("");
}

function renderFingeringPanel() {
  const shape = buildShape(state.selectedShape);
  const type = currentChordType();
  const barreText = shape.fingering.barres.length
    ? `横按：${shape.fingering.barres
        .map(
          (barre) =>
            `${barre.fret} 品 ${stringPositionLabel(barre.from)}—${stringPositionLabel(barre.to)}`,
        )
        .join("；")}`
    : "本调中此指型不使用横按";

  $("#fingeringPanel").innerHTML = `
    <div class="fingering-panel-heading">
      <div>
        <p class="section-kicker">LEFT HAND</p>
        <h2>${shape.key} 型 · 左手按法</h2>
        <p>${currentChordName()} ${type.label} · ${chordToneDefinitions().map((tone) => tone.name).join(" · ")}</p>
      </div>
      <span class="fingering-range">${shape.minFret}–${shape.maxFret} 品</span>
    </div>
    <div class="fingering-sheet">
      ${fingeringDiagram(shape)}
      <div class="fingering-guide">
        <div class="finger-keys" aria-label="左手手指编号">
          ${[1, 2, 3, 4]
            .map(
              (finger) =>
                `<span><strong>${finger}</strong>${FINGER_NAMES[finger]}</span>`,
            )
            .join("")}
        </div>
        <div class="fingering-symbols">
          <span><i class="open-symbol"></i>空弦</span>
          <span><i class="muted-symbol">×</i>不弹</span>
          <span><i class="barre-symbol"></i>横按</span>
        </div>
        <p class="fingering-copy">
          ${barreText}。和弦框从左到右依次为六弦至一弦；按实际调性自动移动把位。
        </p>
        <div class="fingering-root">
          <span>根音锚点</span>
          <strong>${shape.rootNotes
            .map((note) => `${stringPositionLabel(note.stringIndex)} ${note.fret} 品`)
            .join(" · ")}</strong>
        </div>
      </div>
    </div>
  `;
}

function renderFormulaCard() {
  const shape = buildShape(state.selectedShape);
  const type = currentChordType();
  const chordTones = chordToneDefinitions();
  const rootGroups = rootLocationGroups();
  const chordNotes = shape.notes.map((note) => note.name);
  const intervalString = shape.formula.join(" / ");

  $("#formulaCard").innerHTML = `
    <div class="formula-top">
      <div class="formula-badge">${shape.key}</div>
      <div>
        <h2>${currentChordName()} ${type.label}</h2>
        <p>${chordTones.map((tone) => tone.name).join(" · ")} &nbsp;/&nbsp; ${intervalString}</p>
      </div>
    </div>
    <div class="formula-block">
      <div class="formula-label">
        <span>指型公式</span>
        <span>${shape.config.label}</span>
      </div>
      <div class="interval-sequence">
        ${shape.formula
          .map((degree) => `<span class="interval-chip ${TONE_CLASS[degree]}">${degree}</span>`)
          .join("")}
      </div>
      <div class="note-sequence" style="margin-top: 8px">
        ${chordNotes
          .map(
            (note, index) =>
              `<span class="note-chip"><strong>${note}</strong><small>${TONE_LABEL[shape.formula[index]]}</small></span>`,
          )
          .join("")}
      </div>
    </div>
    <div class="formula-block">
      <div class="formula-label">
        <span>为什么成立</span>
      </div>
      <p class="derivation-copy">
        ${shape.config.description} ${type.description} 当前公式为
        <strong>${type.formula.join(" – ")}</strong>，切换到其他调时，音程关系保持不变。
      </p>
    </div>
    <div class="formula-block" style="border-bottom: 0; padding-bottom: 0">
      <div class="formula-label">
        <span>同音不同型</span>
        <span>${chordTones[0].name} 的根音落点</span>
      </div>
      <div class="octave-list">
        ${rootGroups
          .map(
            (group) => `
              <div class="octave-row">
                <span>${stringPositionLabel(group.stringIndex)} · ${group.fret}品</span>
                <div class="octave-locations">
                  ${[...new Set(group.shapes)]
                    .map((shapeName) => `<span class="mini-tag">${shapeName} 型</span>`)
                    .join("")}
                </div>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function practiceKey(keyLabel = currentKey().label, quality = state.chordType) {
  return `${keyLabel}:${quality}`;
}

function getPractice(keyLabel = currentKey().label, quality = state.chordType) {
  const composite = state.practice[practiceKey(keyLabel, quality)];
  if (composite) return composite;
  // Preserve progress from the original major-chord-only data model.
  return quality === "major" ? state.practice[keyLabel] || {} : {};
}

function renderPractice() {
  const done = getPractice();
  const count = PRACTICE_TASKS.filter((task) => done[task.id]).length;
  $("#practiceCount").textContent = `${count} / ${PRACTICE_TASKS.length}`;
  $("#practiceProgress").style.width = `${(count / PRACTICE_TASKS.length) * 100}%`;
  $("#practiceList").innerHTML = PRACTICE_TASKS.map(
    (task) => {
      const label =
        task.id === "tones"
          ? `说出 ${currentChordType().formula.join("、")} 的名称与实际音名`
          : task.label;
      return `
      <button
        class="practice-task ${done[task.id] ? "is-done" : ""}"
        type="button"
        data-task="${task.id}"
        aria-pressed="${Boolean(done[task.id])}"
      >
        <span class="task-check">✓</span>
        <span>${label}</span>
      </button>
    `;
    },
  ).join("");
}

function renderChordLegend() {
  $("#chordLegend").innerHTML = `
    ${chordToneDefinitions()
      .map(
        (tone) =>
          `<span><i class="legend-dot ${TONE_CLASS[tone.degree]}"></i>${TONE_LABEL[tone.degree]} ${tone.degree}</span>`,
      )
      .join("")}
    <span><i class="legend-ring"></i>当前指型</span>
  `;
}

function renderStudio() {
  renderKeys();
  renderQualityPicker();
  renderHero();
  renderFretboard();
  renderChordLegend();
  renderShapeCards();
  renderFingeringPanel();
  renderFormulaCard();
  renderPractice();
}

function compareSessions(a, b) {
  return b.date.localeCompare(a.date) || b.updatedAt.localeCompare(a.updatedAt);
}

function renderJournalStats() {
  const totalMinutes = state.sessions.reduce(
    (sum, session) => sum + Number(session.durationMinutes || 0),
    0,
  );
  const notes = new Set(state.sessions.flatMap((session) => session.tags || []));
  const days = new Set(state.sessions.map((session) => session.date));
  $("#journalStats").innerHTML = `
    <article class="stat-card">
      <span>LEARNING LOG</span>
      <strong>${state.sessions.length}</strong><small>次记录</small>
    </article>
    <article class="stat-card">
      <span>PRACTICE TIME</span>
      <strong>${totalMinutes}</strong><small>分钟</small>
    </article>
    <article class="stat-card">
      <span>REPERTOIRE</span>
      <strong>${days.size}</strong><small>个练习日 · ${notes.size} 个标签</small>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderJournalList() {
  const query = $("#journalSearch").value.trim().toLowerCase();
  const sessions = [...state.sessions].sort(compareSessions).filter((session) => {
    if (!query) return true;
    return [
      session.title,
      session.focus,
      session.key,
      session.shapes,
      CHORD_TYPES[session.chordType]?.label || "",
      ...(session.tags || []),
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  if (!sessions.length) {
    $("#journalList").innerHTML = `
      <div class="empty-state">
        <strong>${query ? "没有找到匹配的记录" : "从第一段练习开始"}</strong>
        <p>${query ? "试试搜索调性、CAGED 指型或标签。" : "记录推导过程，比只记下答案更有价值。"}</p>
      </div>
    `;
    return;
  }

  const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
    month: "short",
    day: "numeric",
    weekday: "short",
  });

  $("#journalList").innerHTML = sessions
    .map((session) => {
      const date = new Date(`${session.date}T12:00:00`);
      const dateLabel = Number.isNaN(date.getTime()) ? session.date : dateFormatter.format(date);
      const chordType = CHORD_TYPES[session.chordType] || CHORD_TYPES.major;
      return `
        <article class="journal-card">
          <div class="journal-card-top">
            <div class="entry-meta">
              <span class="entry-key">${escapeHtml(session.key)}</span>
              <span>${escapeHtml(chordType.label)} · ${escapeHtml(dateLabel)} · ${escapeHtml(session.durationMinutes)} 分钟</span>
              <span class="entry-shapes">${escapeHtml(session.shapes)}</span>
            </div>
            <div class="entry-actions">
              <button class="icon-button" type="button" data-edit-id="${session.id}" aria-label="编辑 ${escapeHtml(session.title)}">✎</button>
              <button class="icon-button" type="button" data-delete-id="${session.id}" aria-label="删除 ${escapeHtml(session.title)}">×</button>
            </div>
          </div>
          <h3>${escapeHtml(session.title)}</h3>
          <p>${escapeHtml(session.focus)}</p>
          ${
            session.tags?.length
              ? `<div class="entry-tags">${session.tags
                  .map((tag) => `<span># ${escapeHtml(tag)}</span>`)
                  .join("")}</div>`
              : ""
          }
        </article>
      `;
    })
    .join("");
}

function populateKeySelect() {
  $("#entryKey").innerHTML = KEYS.map(
    (key) => `<option value="${key.label}">${key.label} 根音</option>`,
  ).join("");
}

function populateChordTypeSelect() {
  $("#entryChordType").innerHTML = CHORD_TYPE_ORDER.map(
    (typeId) =>
      `<option value="${typeId}">${CHORD_TYPES[typeId].label}</option>`,
  ).join("");
}

function resetJournalForm() {
  state.editingId = null;
  $("#journalForm").reset();
  $("#editorTitle").textContent = "新学习记录";
  $("#saveJournalButton").textContent = "保存记录";
  $("#entryDate").value = localDateValue();
  $("#entryDuration").value = "30";
  $("#entryKey").value = currentKey().label;
  $("#entryChordType").value = state.chordType;
  $("#entryShape").value = state.selectedShape;
  $("#formError").textContent = "";
}

function loadSessionIntoEditor(id) {
  const session = state.sessions.find((entry) => entry.id === id);
  if (!session) return;
  state.editingId = id;
  $("#journalForm").reset();
  $("#entryDate").value = session.date;
  $("#entryDuration").value = session.durationMinutes;
  $("#entryKey").value = session.key;
  $("#entryChordType").value = session.chordType || "major";
  $("#entryShape").value = session.shapes;
  $("#entryTitle").value = session.title;
  $("#entryNotes").value = session.focus;
  $("#entryTags").value = (session.tags || []).join(", ");
  $("#editorTitle").textContent = "编辑学习记录";
  $("#saveJournalButton").textContent = "保存修改";
  $("#formError").textContent = "";
  switchView("journal");
  $("#journalEditor").scrollIntoView({ behavior: "smooth", block: "start" });
  $("#entryTitle").focus({ preventScroll: true });
}

function renderJournal() {
  renderJournalStats();
  renderJournalList();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function switchView(viewName) {
  state.currentView = viewName;
  $$(".view").forEach((view) => {
    const isActive = view.id === viewName;
    view.hidden = !isActive;
    view.classList.toggle("is-active", isActive);
  });
  $$(".nav-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === viewName);
  });
  if (viewName === "journal") renderJournal();
  history.replaceState(null, "", viewName === "studio" ? "#studio" : "#journal");
  window.scrollTo({ top: 0, behavior: "auto" });
}

function updateStateAndRender(changes = {}) {
  shapeCache.clear();
  Object.assign(state, changes);
  renderStudio();
}

function formatInspector(note) {
  const inspector = $("#noteInspector");
  const preferredName = noteNameForPc(note.pc, currentKey().accidental === "flat");
  const degree = degreeForPc(note.pc);
  const stringName = stringPositionLabel(note.stringIndex);
  if (degree) {
    const rootNote = chordToneDefinitions()[0].name;
    const interval = INTERVAL_LABEL[degree];
    const relation = degree === "1" ? "与根音同音" : `根音 ${rootNote} 的${interval}`;
    inspector.innerHTML = `
      <span class="inspector-hint">${stringName} 弦 · ${note.fret} 品</span>
      <strong>${preferredName} / ${TONE_LABEL[degree]} · ${relation}</strong>
    `;
  } else {
    const distance = pitchClass(note.pc - currentKey().pc);
    inspector.innerHTML = `
      <span class="inspector-hint">${stringName} 弦 · ${note.fret} 品</span>
      <strong>${preferredName} / 调外音 · 距根音 ${distance || 12} 半音</strong>
    `;
  }
}

function buildExportDocument() {
  return {
    format: "fretnote.guitar-journal",
    schemaVersion: "1.1",
    exportedAt: new Date().toISOString(),
    instrument: {
      type: "guitar",
      tuning: ["E2", "A2", "D3", "G3", "B3", "E4"],
      system: "CAGED",
      chordTypes: CHORD_TYPE_ORDER,
    },
    practiceProgress: state.practice,
    sessions: [...state.sessions].sort(compareSessions),
  };
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildMarkdown() {
  const doc = buildExportDocument();
  const lines = [
    "# 指板手记 · CAGED 学习档案",
    "",
    `- 导出时间：${new Date(doc.exportedAt).toLocaleString("zh-CN")}`,
    "- 乐器：Guitar",
    "- 标准调弦：E A D G B E",
    "- 学习系统：CAGED 和弦系统",
    `- 记录数量：${doc.sessions.length}`,
    "",
    "---",
    "",
  ];

  for (const session of doc.sessions) {
    const chordType = CHORD_TYPES[session.chordType] || CHORD_TYPES.major;
    lines.push(
      `## ${session.date} · ${session.title}`,
      "",
      `- 和弦：${session.key}${chordType.suffix}（${chordType.label}）`,
      `- CAGED 指型：${session.shapes}`,
      `- 练习时长：${session.durationMinutes} 分钟`,
      `- 标签：${(session.tags || []).map((tag) => `#${tag}`).join(" ") || "无"}`,
      "",
      session.focus,
      "",
    );
  }

  lines.push("## 练习进度", "");
  for (const [practiceId, tasks] of Object.entries(doc.practiceProgress)) {
    const [key, quality] = practiceId.split(":");
    const chordType = CHORD_TYPES[quality] || CHORD_TYPES.major;
    const done = PRACTICE_TASKS.filter((task) => tasks[task.id]).map((task) => task.label);
    lines.push(
      `- ${key}${chordType.suffix} ${chordType.label}：${done.length}/4${done.length ? ` · ${done.join("；")}` : ""}`,
    );
  }
  lines.push("");
  return lines.join("\n");
}

function importJournal(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (data.format !== "fretnote.guitar-journal" || !Array.isArray(data.sessions)) {
        throw new Error("文件不是指板手记学习档案。");
      }

      const normalized = data.sessions
        .filter((session) => session && session.title && session.date)
        .map((session) => ({
          id: session.id || crypto.randomUUID(),
          date: String(session.date),
          durationMinutes: Number(session.durationMinutes) || 0,
          key: String(session.key || "C"),
          chordType: CHORD_TYPES[session.chordType] ? session.chordType : "major",
          shapes: String(session.shapes || "全部"),
          title: String(session.title),
          focus: String(session.focus || ""),
          tags: Array.isArray(session.tags) ? session.tags.map(String) : [],
          createdAt: session.createdAt || new Date().toISOString(),
          updatedAt: session.updatedAt || new Date().toISOString(),
        }));

      state.sessions = normalized;
      state.practice =
        data.practiceProgress && typeof data.practiceProgress === "object"
          ? data.practiceProgress
          : {};
      persist(STORAGE.sessions, state.sessions);
      persist(STORAGE.practice, state.practice);
      renderJournal();
      renderPractice();
      showToast(`已导入 ${normalized.length} 条学习记录`);
    } catch (error) {
      showToast(`导入失败：${error.message}`);
    } finally {
      $("#importFile").value = "";
    }
  };
  reader.readAsText(file);
}

function setShape(shapeKey) {
  updateStateAndRender({ selectedShape: shapeKey, selectedNote: null });
  $("#noteInspector").innerHTML = `
    <span class="inspector-hint">已选择 ${SHAPE_CONFIGS[shapeKey].label}</span>
    <strong>点击音点查看音程关系</strong>
  `;
}

function setQuality(qualityId) {
  if (!CHORD_TYPES[qualityId]) return;
  updateStateAndRender({ chordType: qualityId, selectedNote: null });
  $("#noteInspector").innerHTML = `
    <span class="inspector-hint">已切换到 ${CHORD_TYPES[qualityId].label}</span>
    <strong>${currentChordName()} · ${chordToneDefinitions().map((tone) => tone.name).join(" · ")}</strong>
  `;
}

function setKey(index) {
  updateStateAndRender({ keyIndex: Number(index), selectedNote: null });
  $("#noteInspector").innerHTML = `
    <span class="inspector-hint">已切换到根音 ${currentKey().label}</span>
    <strong>点击音点查看音程关系</strong>
  `;
}

function promoteScratchNote() {
  const text = $("#scratchNote").value.trim();
  if (!text) {
    showToast("先写下一点内容，再保存为学习记录");
    $("#scratchNote").focus();
    return;
  }

  resetJournalForm();
  $("#entryKey").value = currentKey().label;
  $("#entryChordType").value = state.chordType;
  $("#entryShape").value = state.selectedShape;
  $("#entryTitle").value = `${currentChordName()} ${currentChordType().label} · ${SHAPE_CONFIGS[state.selectedShape].label}推导`;
  $("#entryNotes").value = text;
  $("#entryTags").value = "CAGED, 随手记";
  switchView("journal");
  $("#entryTitle").focus();
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker registration failed", error);
    });
  }
}

function bindEvents() {
  $$(".nav-button").forEach((button) => {
    button.addEventListener("click", () => switchView(button.dataset.view));
  });

  $(".brand").addEventListener("click", (event) => {
    event.preventDefault();
    switchView("studio");
  });

  $("#keyPicker").addEventListener("click", (event) => {
    const button = event.target.closest("[data-key-index]");
    if (button) setKey(button.dataset.keyIndex);
  });

  $("#qualityPicker").addEventListener("click", (event) => {
    const button = event.target.closest("[data-quality]");
    if (button) setQuality(button.dataset.quality);
  });

  $("#shapePicker").addEventListener("click", (event) => {
    const button = event.target.closest("[data-shape]");
    if (button) setShape(button.dataset.shape);
  });

  $$("[data-label-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.labelMode = button.dataset.labelMode;
      $$("[data-label-mode]").forEach((item) => {
        item.classList.toggle("is-active", item === button);
      });
      renderFretboard();
    });
  });

  $("#scaleToggle").addEventListener("click", () => {
    state.showScaleNotes = !state.showScaleNotes;
    $("#scaleToggle").setAttribute("aria-pressed", String(state.showScaleNotes));
    $("#scaleToggle").textContent = state.showScaleNotes ? "隐藏调外音" : "显示调外音";
    renderFretboard();
  });

  $("#fretboard").addEventListener("click", (event) => {
    const dot = event.target.closest(".note-dot");
    if (!dot) return;
    const note = {
      stringIndex: Number(dot.dataset.string),
      fret: Number(dot.dataset.fret),
      pc: Number(dot.dataset.pc),
    };
    state.selectedNote = note;
    formatInspector(note);
  });

  $("#fretboard").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const dot = event.target.closest(".note-dot");
    if (!dot) return;
    event.preventDefault();
    const note = {
      stringIndex: Number(dot.dataset.string),
      fret: Number(dot.dataset.fret),
      pc: Number(dot.dataset.pc),
    };
    state.selectedNote = note;
    formatInspector(note);
  });

  $("#practiceList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-task]");
    if (!button) return;
    const key = practiceKey();
    const taskId = button.dataset.task;
    const current = getPractice();
    state.practice[key] = { ...current, [taskId]: !current[taskId] };
    persist(STORAGE.practice, state.practice);
    renderPractice();
  });

  let scratchTimer;
  $("#scratchNote").addEventListener("input", () => {
    $("#scratchState").textContent = "正在保存…";
    clearTimeout(scratchTimer);
    scratchTimer = setTimeout(() => {
      persist(STORAGE.scratch, $("#scratchNote").value);
      $("#scratchState").textContent = "已自动保存";
    }, 350);
  });

  $("#promoteNote").addEventListener("click", promoteScratchNote);

  $("#journalSearch").addEventListener("input", renderJournalList);

  $("#newJournalButton").addEventListener("click", () => {
    resetJournalForm();
    switchView("journal");
    $("#entryTitle").focus();
  });

  $("#closeEditor").addEventListener("click", resetJournalForm);
  $("#cancelEdit").addEventListener("click", resetJournalForm);

  $("#journalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = $("#entryTitle").value.trim();
    const focus = $("#entryNotes").value.trim();
    if (!title || !focus) {
      $("#formError").textContent = "标题与练习笔记不能为空。";
      return;
    }

    const now = new Date().toISOString();
    const existing = state.sessions.find((session) => session.id === state.editingId);
    const session = {
      id: state.editingId || crypto.randomUUID(),
      date: $("#entryDate").value,
      durationMinutes: Number($("#entryDuration").value),
      key: $("#entryKey").value,
      chordType: $("#entryChordType").value || "major",
      shapes: $("#entryShape").value,
      title,
      focus,
      tags: $("#entryTags")
        .value.split(/[,，]/)
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    if (state.editingId) {
      state.sessions = state.sessions.map((entry) =>
        entry.id === state.editingId ? session : entry,
      );
    } else {
      state.sessions = [session, ...state.sessions];
    }

    persist(STORAGE.sessions, state.sessions);
    resetJournalForm();
    renderJournal();
    showToast(existing ? "学习记录已更新" : "学习记录已保存");
  });

  $("#journalList").addEventListener("click", (event) => {
    const editButton = event.target.closest("[data-edit-id]");
    if (editButton) {
      loadSessionIntoEditor(editButton.dataset.editId);
      return;
    }
    const deleteButton = event.target.closest("[data-delete-id]");
    if (deleteButton) {
      const session = state.sessions.find((entry) => entry.id === deleteButton.dataset.deleteId);
      if (!session) return;
      if (!window.confirm(`删除“${session.title}”？此操作无法撤销。`)) return;
      state.sessions = state.sessions.filter((entry) => entry.id !== session.id);
      persist(STORAGE.sessions, state.sessions);
      if (state.editingId === session.id) resetJournalForm();
      renderJournal();
      showToast("学习记录已删除");
    }
  });

  $("#exportJson").addEventListener("click", () => {
    downloadFile(
      `fretnote-journal-${localDateValue()}.json`,
      JSON.stringify(buildExportDocument(), null, 2),
      "application/json",
    );
    showToast("JSON 学习档案已导出");
  });

  $("#exportMarkdown").addEventListener("click", () => {
    downloadFile(
      `fretnote-journal-${localDateValue()}.md`,
      buildMarkdown(),
      "text/markdown;charset=utf-8",
    );
    showToast("Markdown 学习档案已导出");
  });

  $("#importButton").addEventListener("click", () => $("#importFile").click());
  $("#importFile").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) importJournal(file);
  });
}

function init() {
  initializeData();
  populateKeySelect();
  populateChordTypeSelect();
  resetJournalForm();
  bindEvents();
  renderStudio();
  renderJournal();
  const initialView = location.hash === "#journal" ? "journal" : "studio";
  switchView(initialView);
  registerServiceWorker();
}

init();
