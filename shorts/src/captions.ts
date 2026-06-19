// Caption engine — reads OpenAI TTS or ElevenLabs character-level timing
// (alignment.json shape), builds word + line tokens for karaoke captions.
//
// The generate-short-script.mjs writer produces:
//   public/short.mp3              — the audio
//   public/short.timing.json      — { alignment, outroCta, outroUrl }
//
// At render-time this file consumes that timing.json.

import timing from "../public/short.timing.json" assert { type: "json" };

type Alignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};
type Timing = { alignment: Alignment; outroCta?: string; outroUrl?: string };

const t = timing as Timing;
const alignment = t.alignment;

export type Word = { text: string; start: number; end: number };
export type Line = { words: Word[]; start: number; end: number };

function buildWords(): Word[] {
  const chars = alignment.characters;
  const starts = alignment.character_start_times_seconds;
  const ends = alignment.character_end_times_seconds;
  const words: Word[] = [];
  let cur = "";
  let curStart = 0;
  let started = false;
  const flush = (endIdx: number) => {
    const text = cur.trim();
    if (text) words.push({ text, start: curStart, end: ends[endIdx] });
    cur = "";
    started = false;
  };
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (c === " " || c === "\n" || c === "\t") {
      if (started) flush(i - 1);
      continue;
    }
    if (!started) { curStart = starts[i]; started = true; }
    cur += c;
    if (i === chars.length - 1 && started) flush(i);
  }
  return words;
}

function buildLines(words: Word[], maxWords = 3): Line[] {
  const lines: Line[] = [];
  let bucket: Word[] = [];
  const push = () => {
    if (bucket.length) {
      lines.push({ words: bucket, start: bucket[0].start, end: bucket[bucket.length - 1].end });
      bucket = [];
    }
  };
  for (const w of words) {
    bucket.push(w);
    if (bucket.length >= maxWords || /[.?!]$/.test(w.text)) push();
  }
  push();
  return lines;
}

export const WORDS = buildWords();
export const LINES = buildLines(WORDS, 3);
export const AUDIO_END = alignment.character_end_times_seconds[alignment.character_end_times_seconds.length - 1];
export const OUTRO_CTA = t.outroCta ?? "Full breakdown →";
export const OUTRO_URL = t.outroUrl ?? "geolocally.com";
