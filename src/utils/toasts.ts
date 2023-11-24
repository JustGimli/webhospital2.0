import { toast } from "react-toastify";

export const ShowSuccessToastMessage = (str: string) => {
  toast.success(str, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ShowErrorToastMessage = () => {
  toast.error("Произошла ошибка!", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ShowWarningToastMessage = () => {
  toast.warning("Внимание! Возможна ошибка", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ShowInfoToastMessage = (str: string) => {
  toast.info(str, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ShowDefaultToastMessage = () => {
  toast("Default Notification!", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const howCustomToastMessage = () => {
  toast("Custom Style Notification with css class!", {
    position: toast.POSITION.TOP_RIGHT,
    className: "foo-bar",
  });
};
