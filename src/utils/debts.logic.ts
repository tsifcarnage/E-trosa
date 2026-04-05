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
