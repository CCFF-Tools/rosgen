export interface Cue {
  id: string;
  [key: string]: unknown;
}

const STORAGE_KEY = 'cues';

function readCues(): Cue[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(data) as Cue[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    return [];
  }
}

function writeCues(cues: Cue[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cues));
}

export function getCues(): Cue[] {
  return readCues();
}

export function createCue(cue: Cue): Cue {
  const cues = readCues();
  cues.push(cue);
  writeCues(cues);
  return cue;
}

export function updateCue(cue: Cue): Cue | undefined {
  const cues = readCues();
  const index = cues.findIndex((c) => c.id === cue.id);
  if (index !== -1) {
    cues[index] = cue;
    writeCues(cues);
    return cue;
  }
  return undefined;
}

export function deleteCue(id: string): void {
  const cues = readCues();
  const filtered = cues.filter((c) => c.id !== id);
  writeCues(filtered);
}
