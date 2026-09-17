import fs from "fs";
import path from "path";
import { seedProperties } from "./seed-properties";
import type { Lead, Property } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const PROPERTIES_FILE = path.join(DATA_DIR, "properties.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(PROPERTIES_FILE)) {
    fs.writeFileSync(PROPERTIES_FILE, JSON.stringify(seedProperties, null, 2), "utf8");
  }
  if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([] as Lead[], null, 2), "utf8");
  }
}

function readJson<T>(file: string, fallback: T): T {
  ensureStore();
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, value: unknown) {
  ensureStore();
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

export function createId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function readProperties(): Property[] {
  return readJson<Property[]>(PROPERTIES_FILE, seedProperties);
}

export function writeProperties(list: Property[]) {
  writeJson(PROPERTIES_FILE, list);
}

export function readLeads(): Lead[] {
  return readJson<Lead[]>(LEADS_FILE, []);
}

export function writeLeads(list: Lead[]) {
  writeJson(LEADS_FILE, list);
}

export function nextReference(list: Property[]): string {
  const numbers = list
    .map((item) => Number(item.reference.replace(/\D/g, "")))
    .filter((value) => Number.isFinite(value));
  const next = (numbers.length ? Math.max(...numbers) : 0) + 1;
  return `NFI-${String(next).padStart(4, "0")}`;
}

export function uniqueSlug(title: string, list: Property[], ignoreId?: string): string {
  const base = slugify(title) || "imovel";
  let slug = base;
  let i = 2;
  while (list.some((item) => item.slug === slug && item.id !== ignoreId)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}
