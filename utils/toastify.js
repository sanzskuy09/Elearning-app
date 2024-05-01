import { toast } from "react-toastify";

export const toastSuccess = (title) => {
  toast.success(`${title}`, {
    autoClose: 1500,
  });
};

export const toastFailed = (title) =>
  toast.error(`${title}`, {
    autoClose: 1500,
  });

export const toastInfo = (title) =>
  toast.info(`${title}`, {
    autoClose: 1500,
  });

export const toastPending = (textPending, textSuccess) => {
  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  toast.promise(resolveAfter3Sec, {
    pending: `${textPending}`,
    success: `${textSuccess}`,
  });
};
