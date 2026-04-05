export const calcInterestAmount = (amount: number, rate: number): number => {
  return amount * (rate / 100);
};

export const calcTotalToPay = (amount: number, rate: number): number => {
  return amount + calcInterestAmount(amount, rate);
};

//calcule du reste

export const calcRemainingAmount = (
  amount: number,
  rate: number,
  paid: number,
): number => {
  return calcTotalToPay(amount, rate) - paid;
};
