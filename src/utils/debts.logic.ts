import { Status } from "../enums/status.enum";

export const calcStatus = (
  remaining: number,
  paid: number,
  dueDate: string,
): Status => {
  const today = new Date();
  const deadline = new Date(dueDate);

  if (remaining <= 0) {
    return Status.PAID;
  }

  if (today > deadline) {
    return Status.LATE;
  }

  if (paid > 0) {
    return Status.IN_PROGRESS;
  }

  return Status.PENDING;
};

export const statusBadge = (status: Status) => {
  switch (status) {
    case "En cours":
      return "badge badge-warning";
    case "Payé":
      return "badge badge-success";
    case "En retard":
      return "badge badge-error";
    case "En attente":
      return "badge badge-info";
    default:
      return "badge badge-info";
  }
};

export const formatEuro = (value: number | null | undefined): string => {
  if (value == null) return "";

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(value);
};
