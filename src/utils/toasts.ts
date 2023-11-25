import { toast } from "react-toastify";

export const ShowSuccessToastMessage = (str: string) => {
  toast.success(str, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ShowErrorToastMessage = (name="Произошла ошибка!") => {
  toast.error(name, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const ShowWarningToastMessage = (name="Внимание! Возможна ошибка") => {
  toast.warning(name , {
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
