import type { IDebts, INewDebt } from "../models/debts.interfaces";
import { createDebt } from "./buildDebt";
import { supabase } from "./supabaseClient";

// Supabase row(snake_case) to Idebt(camelCase)
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

//Fetch from supa
export const fetchDebts = async (): Promise<IDebts[]> => {
  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapRowToDebt);
};

export const fetchCredits = async (): Promise<IDebts[]> => {
  const { data, error } = await supabase
    .from("credits")
    .select("*")
    .order("due_date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapRowToDebt);
};

//Insert (inject le user_id dans la sess courante)
export const insertDebt = async (formData: INewDebt): Promise<IDebts> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Utilisateur non connecté");

  const { data, error } = await supabase
    .from("debts")
    .insert({
      user_id: user.id,
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

export const insertCredit = async (formData: INewDebt): Promise<IDebts> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Utilisateur non connecté");

  const { data, error } = await supabase
    .from("credits")
    .insert({
      user_id: user.id,
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

//Update
export const updateDebtPayment = async (
  table: "debts" | "credits",
  id: string,
  paidAmount: number,
): Promise<void> => {
  const { error } = await supabase
    .from(table)
    .update({ paid_amount: paidAmount })
    .eq("id", id);

  if (error) throw error;
};

//Delete
export const deleteDebt = async (
  table: "debts" | "credits",
  id: string,
): Promise<void> => {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
};
