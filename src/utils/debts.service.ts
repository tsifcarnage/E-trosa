import type { IDebts, INewDebt } from "../models/debts.interfaces";
import { createDebt } from "./buildDebt"; // Adapte le chemin si nécessaire
import { supabase } from "./supabaseClient";
import { MOCK_DEBT, MOCK_RECEIVABLES } from "../data/debts.mock";

// Transforme les lignes de Supabase (snake_case) vers ton modèle d'interface
const mapRowToDebt = (row: any): IDebts => {
  return createDebt(
    row.creditor,
    Number(row.debt_amount),
    Number(row.paid_amount),
    Number(row.interest_rate),
    row.due_date,
    row.id,
  );
};

// ==========================================
// 1. FETCH (Dettes ou Créances/Crédits)
// ==========================================
export const fetchDebts = async (): Promise<IDebts[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // MODE DÉMO
  if (!session) {
    return MOCK_DEBT;
  }

  // MODE CONNECTÉ
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapRowToDebt);
};

export const fetchCredits = async (): Promise<IDebts[]> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // MODE DÉMO
  if (!session) {
    return MOCK_RECEIVABLES;
  }

  // MODE CONNECTÉ
  const { data, error } = await supabase
    .from("credits")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapRowToDebt);
};

// ==========================================
// 2. INSERT
// ==========================================
export const insertDebt = async (
  formData: INewDebt,
  table: "debts" | "credits" = "debts",
): Promise<IDebts> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // MODE DÉMO
  if (!session) {
    const newDebt = createDebt(
      formData.creditor,
      Number(formData.debtAmount),
      0,
      Number(formData.interestRate),
      formData.dueDate,
    );

    if (table === "debts") MOCK_DEBT.push(newDebt);
    else MOCK_RECEIVABLES.push(newDebt);

    return newDebt;
  }

  // MODE CONNECTÉ
  const { data, error } = await supabase
    .from(table)
    .insert({
      user_id: session.user.id,
      creditor: formData.creditor,
      debt_amount: Number(formData.debtAmount),
      paid_amount: 0,
      interest_rate: Number(formData.interestRate),
      due_date: formData.dueDate,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRowToDebt(data);
};

// ==========================================
// 3. UPDATE (Remboursement / Solder)
// ==========================================
export const updateDebtPayment = async (
  table: "debts" | "credits",
  id: string,
  paidAmount: number,
): Promise<void> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // MODE DÉMO
  if (!session) {
    const targetArray = table === "debts" ? MOCK_DEBT : MOCK_RECEIVABLES;
    const index = targetArray.findIndex((d) => d.id === id);

    if (index !== -1) {
      const current = targetArray[index];
      // On recrée l'élément pour recalculer automatiquement le reste et le statut
      targetArray[index] = createDebt(
        current.creditor,
        current.debtAmount,
        paidAmount,
        current.interestRate,
        current.dueDate,
        current.id,
      );
    }
    return;
  }

  // MODE CONNECTÉ
  const { error } = await supabase
    .from(table)
    .update({ paid_amount: paidAmount })
    .eq("id", id);

  if (error) throw error;
};

// ==========================================
// 4. DELETE
// ==========================================
export const deleteDebt = async (
  table: "debts" | "credits",
  id: string,
): Promise<void> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // MODE DÉMO
  if (!session) {
    if (table === "debts") {
      const filtered = MOCK_DEBT.filter((d) => d.id !== id);
      MOCK_DEBT.length = 0;
      MOCK_DEBT.push(...filtered);
    } else {
      const filtered = MOCK_RECEIVABLES.filter((d) => d.id !== id);
      MOCK_RECEIVABLES.length = 0;
      MOCK_RECEIVABLES.push(...filtered);
    }
    return;
  }

  // MODE CONNECTÉ
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
};
