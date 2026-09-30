// Lot data transcribed from the master plan image (public/images/sections/TONG MAT BANG.webp).
// Structure (13 Trần Quang Diệu + 13 nội khu + 4 Đoàn Thị Điểm/Hồ Xuân Hương + 4 góc) is confirmed by the
// investor dossier (docs/VERIFIED_FACTS_2026-09-30.md). Per-lot areas are read from the master plan; the dossier
// only gives type averages (135 / 135 / ~147,7 / ~194,4 m²), so the "tham khảo" disclaimer stays.

export type Street = 'Trần Quang Diệu' | 'Hồ Xuân Hương' | 'Đoàn Thị Điểm' | 'Đường nội khu Phan Rang Center';

/** Which edge of the block the lot sits on; `order` runs west→east (north/south) or north→south (west/east). */
export type Edge = 'north' | 'south' | 'west' | 'east';

export interface Lot {
  id: number; // ODT number on the plan
  area: number; // m²
  edge: Edge;
  order: number;
  frontage: Street[];
  corner: boolean;
}

const rowLot = (id: number, edge: 'north' | 'south', order: number): Lot => ({
  id,
  area: 135,
  edge,
  order,
  frontage: [edge === 'north' ? 'Trần Quang Diệu' : 'Đường nội khu Phan Rang Center'],
  corner: false,
});

export const lots: Lot[] = [
  // West block, north → south
  { id: 17, area: 199.5, edge: 'west', order: 0, frontage: ['Trần Quang Diệu', 'Đoàn Thị Điểm'], corner: true },
  { id: 18, area: 150, edge: 'west', order: 1, frontage: ['Đoàn Thị Điểm'], corner: false },
  { id: 49, area: 149.2, edge: 'west', order: 2, frontage: ['Đoàn Thị Điểm'], corner: false },
  { id: 50, area: 193.6, edge: 'west', order: 3, frontage: ['Đoàn Thị Điểm', 'Đường nội khu Phan Rang Center'], corner: true },
  // North row (faces Trần Quang Diệu), west → east: 19 … 31
  ...Array.from({ length: 13 }, (_, i) => rowLot(19 + i, 'north', i)),
  // South row (faces Đường nội khu Phan Rang Center and the park), west → east: 48 … 36
  ...Array.from({ length: 13 }, (_, i) => rowLot(48 - i, 'south', i)),
  // East block, north → south
  { id: 32, area: 192.2, edge: 'east', order: 0, frontage: ['Trần Quang Diệu', 'Hồ Xuân Hương'], corner: true },
  { id: 33, area: 147, edge: 'east', order: 1, frontage: ['Hồ Xuân Hương'], corner: false },
  { id: 34, area: 147.5, edge: 'east', order: 2, frontage: ['Hồ Xuân Hương'], corner: false },
  { id: 35, area: 195.3, edge: 'east', order: 3, frontage: ['Hồ Xuân Hương', 'Đường nội khu Phan Rang Center'], corner: true },
];

export const lotStats = {
  total: lots.length,
  corner: lots.filter((l) => l.corner).length,
  minArea: Math.min(...lots.map((l) => l.area)),
  maxArea: Math.max(...lots.map((l) => l.area)),
  // Approved published range (docs/VERIFIED_FACTS_2026-09-30.md, hồ sơ mục "3. Thông số 4 loại căn":
  // "135 m² · 135 m² · ~147,7 m² · ~194,4 m² (dao động 135–200 m²/căn)"). Per-lot figures stay on the plan
  // and keep the "tham khảo" disclaimer, so the headline range must not be derived from them.
  approvedMinArea: 135,
  approvedMaxArea: 200,
};

/**
 * Decimal comma without `toLocaleString` — ICU data differs between the Node build and the browser,
 * which produced a server/client mismatch (e.g. "199.5" vs "199,5"). Lot areas have at most one
 * decimal place, so a plain swap is enough.
 */
const decimalComma = (n: number) => String(n).replace('.', ',');

export const formatArea = (m2: number) => `${decimalComma(m2)} m²`;
