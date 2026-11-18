/**
 * Continuidade do fornecimento da Enel RJ, a partir dos dados abertos da ANEEL
 * (Indicadores Coletivos de Continuidade – DEC e FEC, gerados em 2026-11-05).
 *
 * Valores enviados pela distribuidora à ANEEL, por conjunto e por mês, agregados
 * para a distribuidora com peso pelo número de consumidores de cada conjunto.
 * Gerado por script a partir do arquivo da ANEEL; não editar à mão.
 */

export interface YearRow {
  year: number;
  /** DEC regulado (horas por consumidor no ano). */
  dec: number;
  /** FEC regulado (interrupções por consumidor no ano). */
  fec: number;
  /** Horas que ficam fora do DEC regulado: dias críticos, situação de emergência, origem externa etc. */
  excluded: number;
  limDec: number;
  limFec: number;
  sets: number;
  setsAbove: number;
  /** Fatia dos consumidores em conjuntos acima do limite de DEC. */
  consAboveShare: number;
  consumers: number;
}

export const DATA_GENERATED = "2026-11-05";

export const YEARS: YearRow[] = [
  { year: 2010, dec: 23.96, fec: 12.77, excluded: 9.78, limDec: 15.38, limFec: 14.7, sets: 45, setsAbove: 41, consAboveShare: 0.948, consumers: 2551971 },
  { year: 2011, dec: 19.26, fec: 9.85, excluded: 5.88, limDec: 14.51, limFec: 13.57, sets: 85, setsAbove: 64, consAboveShare: 0.765, consumers: 2625542 },
  { year: 2012, dec: 17.56, fec: 9.26, excluded: 5.89, limDec: 13.58, limFec: 12.52, sets: 85, setsAbove: 68, consAboveShare: 0.81, consumers: 2699654 },
  { year: 2013, dec: 20.1, fec: 9.81, excluded: 8.33, limDec: 12.67, limFec: 11.53, sets: 85, setsAbove: 67, consAboveShare: 0.8, consumers: 2767703 },
  { year: 2014, dec: 21.82, fec: 9.65, excluded: 5.49, limDec: 11.77, limFec: 10.37, sets: 85, setsAbove: 72, consAboveShare: 0.871, consumers: 2516036 },
  { year: 2015, dec: 27.81, fec: 13.25, excluded: 7.22, limDec: 11.6, limFec: 9.91, sets: 85, setsAbove: 84, consAboveShare: 0.995, consumers: 2557973 },
  { year: 2016, dec: 22.3, fec: 12.51, excluded: 6.79, limDec: 11.2, limFec: 9.19, sets: 85, setsAbove: 82, consAboveShare: 0.954, consumers: 2582619 },
  { year: 2017, dec: 18.31, fec: 10.17, excluded: 4.79, limDec: 10.8, limFec: 8.51, sets: 85, setsAbove: 74, consAboveShare: 0.818, consumers: 2630841 },
  { year: 2018, dec: 14.04, fec: 8.11, excluded: 5.25, limDec: 10.46, limFec: 7.91, sets: 85, setsAbove: 63, consAboveShare: 0.651, consumers: 2653163 },
  { year: 2019, dec: 13.35, fec: 8.33, excluded: 7.36, limDec: 10.25, limFec: 7.38, sets: 82, setsAbove: 61, consAboveShare: 0.683, consumers: 2654556 },
  { year: 2020, dec: 11.24, fec: 6.51, excluded: 5.04, limDec: 10.16, limFec: 7.28, sets: 82, setsAbove: 45, consAboveShare: 0.475, consumers: 2673148 },
  { year: 2021, dec: 9.88, fec: 5.17, excluded: 4.68, limDec: 9.94, limFec: 7.13, sets: 82, setsAbove: 37, consAboveShare: 0.351, consumers: 2733652 },
  { year: 2022, dec: 9.59, fec: 4.45, excluded: 7.67, limDec: 9.63, limFec: 6.72, sets: 82, setsAbove: 43, consAboveShare: 0.412, consumers: 2663991 },
  { year: 2023, dec: 9.0, fec: 4.15, excluded: 21.79, limDec: 9.19, limFec: 6.29, sets: 82, setsAbove: 35, consAboveShare: 0.323, consumers: 2654778 },
  { year: 2024, dec: 9.13, fec: 4.6, excluded: 16.8, limDec: 9.14, limFec: 6.31, sets: 78, setsAbove: 35, consAboveShare: 0.394, consumers: 2662286 },
  { year: 2025, dec: 8.1, fec: 4.34, excluded: 12.45, limDec: 8.84, limFec: 5.92, sets: 78, setsAbove: 26, consAboveShare: 0.319, consumers: 2679552 },
];

/** Janeiro a setembro (2026 tem dados até setembro). */
export const YTD = {
  months: 9,
  prev: { year: 2025, dec: 6.09, excluded: 7.41 },
  curr: { year: 2026, dec: 5.33, excluded: 13.3 },
};

/** Média por mês de 2021 a 2025. */
export const SEASON: { month: number; dec: number; excluded: number }[] = [
  { month: 1, dec: 0.87, excluded: 1.46 },
  { month: 2, dec: 0.91, excluded: 1.41 },
  { month: 3, dec: 0.87, excluded: 1.09 },
  { month: 4, dec: 0.82, excluded: 0.81 },
  { month: 5, dec: 0.75, excluded: 0.25 },
  { month: 6, dec: 0.67, excluded: 0.06 },
  { month: 7, dec: 0.66, excluded: 0.42 },
  { month: 8, dec: 0.73, excluded: 0.68 },
  { month: 9, dec: 0.72, excluded: 0.72 },
  { month: 10, dec: 0.66, excluded: 1.27 },
  { month: 11, dec: 0.75, excluded: 2.3 },
  { month: 12, dec: 0.73, excluded: 2.22 },
];

/** Conjuntos mais acima do limite de DEC em 2025. */
export const WORST_2025: { name: string; dec: number; limit: number; consumers: number; excluded: number }[] = [
  { name: "Mambucaba", dec: 17.72, limit: 9.0, consumers: 39122, excluded: 63.8 },
  { name: "Itaorna", dec: 16.31, limit: 9.0, consumers: 12768, excluded: 48.97 },
  { name: "Itaipava", dec: 13.55, limit: 9.0, consumers: 23343, excluded: 27.33 },
  { name: "Parada Modelo", dec: 15.0, limit: 10.0, consumers: 15338, excluded: 13.46 },
  { name: "Tamoios", dec: 14.47, limit: 10.0, consumers: 46968, excluded: 19.2 },
];
