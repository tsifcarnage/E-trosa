import type { IDebts } from "../models/debts.interfaces";
import { createDebt } from "../utils/buildDebt";

export const MOCK_DEBT: IDebts[] = [
  createDebt("Tsifcarnage", 1000, 900, 5, "2026-12-01"),
  createDebt("Paul", 800, 0, 0, "2026-12-31"),
  createDebt("Kyara", 100, 103, 3, "2024-10-10"),
  createDebt("Kaka", 8000, 0, 5, "2026-07-27"),
  createDebt("Tony", 500, 400, 5, "2026-04-27"),
  createDebt("Serge", 8000, 1000, 5, "2026-04-27"),
  createDebt("Cafard", 8000, 0, 5, "2024-04-27"),
  createDebt("Miggles", 8000, 100, 5, "2026-06-27"),
  createDebt("Fifi", 50, 50, 3, "2026-04-27"),
  createDebt("Riri", 50, 50, 3, "2026-04-27"),
  createDebt("Loulou", 50, 50, 3, "2026-04-27"),
];
