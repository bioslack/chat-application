import { CaptionColor } from "../../components/TextInput";
import { prepare, validate } from "./validator";

interface InputData {
  value: string;
  caption: string;
  captionColor: CaptionColor;
}

export interface FormLoginState {
  nickname: InputData;
  password: InputData;
  disabled: boolean;
}

export type FormLoginField = "nickname" | "password";

type FormLoginAction =
  | {
      type: "ENTER_TEXT";
      key: FormLoginField;
      value: string;
    }
  | { type: "RESET" };

const errorMessages = {
  nickname: "Precisa ser um email válido",
  password: "A senha tem conter pelo menos 8 caracteres",
};

export const reducer = (
  state: FormLoginState,
  action: FormLoginAction
): FormLoginState => {
  switch (action.type) {
    case "ENTER_TEXT":
      let prepared = {
        ...state,
        [action.key]: { ...state[action.key], value: action.value },
      };
      let caption = "";
      let captionColor = "muted";

      const errors = validate(action.key, action.value);

      if (errors.length) {
        const [key] = errors;
        caption = errorMessages[key as FormLoginField];
        captionColor = "error";
      }

      const validation = validate(
        action.key,
        prepared[action.key].value,
        prepare(prepared)
      );
      const disabled = Boolean(validation.length);

      return {
        ...prepared,
        [action.key]: {
          ...prepared[action.key],
          caption,
          captionColor,
        },
        disabled
      };
  }

  return state;
};
