export type TranscriptRole = "host" | "guest" | "intro" | "speaker";

export interface TranscriptEntry {
  speaker: string;
  time: string;
  text: string;
  role: TranscriptRole;
}

export interface PodcastTranscript {
  entries: TranscriptEntry[];
  wordCount: number;
  readMinutes: number;
  sourceUrl: string;
}

function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: "\"",
    apos: "'",
    nbsp: " ",
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    const key = entity.toLowerCase();
    if (key in named) return named[key];
    if (key.startsWith("#x")) return String.fromCharCode(parseInt(key.slice(2), 16));
    if (key.startsWith("#")) return String.fromCharCode(parseInt(key.slice(1), 10));
    return match;
  });
}

function cleanTime(value: string): string {
  const withoutMs = value.replace(",", ".").replace(/\.\d+$/, "");
  const parts = withoutMs.split(":");
  if (parts.length === 3 && parts[0] === "00") return `${parts[1]}:${parts[2]}`;
  return withoutMs;
}

function classifySpeaker(speaker: string, guestName?: string): TranscriptRole {
  const normalized = speaker.trim().toLowerCase();
  if (!normalized) return "speaker";
  if (/^speaker\s+[012]$/.test(normalized)) return "intro";
  if (/(intro|announcer|voiceover)/.test(normalized)) return "intro";
  if (["host", "naren", "ben", "moderator", "interviewer", "arulrajah"].some((key) => normalized.includes(key))) {
    return "host";
  }

  const guest = guestName?.trim().toLowerCase();
  if (guest) {
    const firstName = guest.split(/\s+/)[0];
    if (normalized.includes(guest) || normalized.includes(firstName)) return "guest";
  }

  return "speaker";
}

function displaySpeaker(speaker: string): string {
  const numbered = speaker.trim().match(/^Speaker\s+(\d+)$/i);
  if (!numbered) return speaker;

  const number = Number(numbered[1]);
  if (number === 0) return "";
  if (number === 1 || number === 2) return "Intro";
  return speaker;
}

function isSilenceText(value: string): boolean {
  return /^(\[silence\]|<silence>)$/i.test(value.trim());
}

function isVtt(text: string): boolean {
  return /^WEBVTT/i.test(text.replace(/^\uFEFF/, "").trim());
}

function parseVtt(text: string, guestName?: string): TranscriptEntry[] {
  const lines = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const entries: TranscriptEntry[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line || /^WEBVTT/i.test(line) || /^NOTE(\s|$)/i.test(line) || /^STYLE(\s|$)/i.test(line) || /^REGION(\s|$)/i.test(line) || /^\d+$/.test(line)) {
      index += 1;
      continue;
    }

    if (!line.includes("-->")) {
      index += 1;
      continue;
    }

    const timeMatch = line.match(/^((?:\d{1,2}:)?\d{1,2}:\d{2}[.,]\d{1,3})/);
    const time = timeMatch ? cleanTime(timeMatch[1]) : "";
    index += 1;

    const textLines: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      textLines.push(lines[index]);
      index += 1;
    }

    const joined = textLines.join(" ").trim();
    if (!joined) continue;

    const voiceMatch = joined.match(/^<v\s+([^>]+)>/i);
    let speaker = voiceMatch ? voiceMatch[1].trim() : "";
    let content = decodeEntities(joined.replace(/<[^>]+>/g, "").trim());
    const colonMatch = !speaker ? content.match(/^([A-Z][A-Za-z .&/'-]{0,60}):\s+(.+)$/) : null;

    if (colonMatch) {
      speaker = colonMatch[1].trim();
      content = colonMatch[2].trim();
    }

    if (!content || isSilenceText(content)) continue;
    entries.push({
      speaker: speaker || guestName?.split(/\s+/)[0] || "",
      time,
      text: content,
      role: classifySpeaker(speaker, guestName),
    });
  }

  return entries;
}

function parsePlainLine(line: string, guestName?: string): TranscriptEntry | null {
  const speakerTimeText = line.match(/^([A-Z][A-Za-z0-9 .&/'-]{1,60}|Speaker\s+\d+)\s{2,}(\d{1,2}:\d{2}(?::\d{2})?)\s{2,}(.+)$/);
  if (speakerTimeText) {
    const speaker = speakerTimeText[1].trim();
    const display = displaySpeaker(speaker);
    return {
      speaker: display,
      time: cleanTime(speakerTimeText[2]),
      text: speakerTimeText[3].trim(),
      role: classifySpeaker(display || speaker, guestName),
    };
  }

  const speakerColon = line.match(/^([A-Z][A-Za-z0-9 .&/'-]{1,60}|Speaker\s+\d+):\s+(.+)$/);
  if (speakerColon) {
    const speaker = speakerColon[1].trim();
    const display = displaySpeaker(speaker);
    return {
      speaker: display,
      time: "",
      text: speakerColon[2].trim(),
      role: classifySpeaker(display || speaker, guestName),
    };
  }

  const timeOnly = line.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?\s+(.+)$/);
  if (timeOnly) {
    return {
      speaker: "",
      time: cleanTime(timeOnly[1]),
      text: timeOnly[2].trim(),
      role: "speaker",
    };
  }

  return null;
}

function parsePlainText(text: string, guestName?: string): TranscriptEntry[] {
  const entries: TranscriptEntry[] = [];
  const carry: string[] = [];

  const flushCarry = () => {
    const textValue = carry.join(" ").replace(/\s+/g, " ").trim();
    if (textValue && !isSilenceText(textValue)) {
      entries.push({ speaker: "", time: "", text: textValue, role: "speaker" });
    }
    carry.length = 0;
  };

  text
    .replace(/^\uFEFF/, "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .forEach((rawLine) => {
      const line = decodeEntities(rawLine.trim());
      if (!line || isSilenceText(line)) {
        flushCarry();
        return;
      }

      const parsed = parsePlainLine(line, guestName);
      if (parsed) {
        flushCarry();
        if (parsed.text && !isSilenceText(parsed.text)) entries.push(parsed);
        return;
      }

      carry.push(line);
    });

  flushCarry();
  return entries;
}

export function parsePodcastTranscriptEntries(text: string, guestName?: string): TranscriptEntry[] {
  const entries = isVtt(text) ? parseVtt(text, guestName) : parsePlainText(text, guestName);
  if (entries.length > 0) return entries;

  return text
    .split(/\n{2,}/)
    .map((block) => block.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .map((block) => ({ speaker: "", time: "", text: block, role: "speaker" as const }));
}

export function buildPodcastTranscript(text: string, sourceUrl: string, guestName?: string): PodcastTranscript | null {
  const entries = parsePodcastTranscriptEntries(text, guestName).filter((entry) => entry.text);
  if (!entries.length) return null;

  const wordCount = entries.reduce((total, entry) => total + entry.text.split(/\s+/).filter(Boolean).length, 0);

  return {
    entries,
    wordCount,
    readMinutes: Math.max(1, Math.round(wordCount / 200)),
    sourceUrl,
  };
}
