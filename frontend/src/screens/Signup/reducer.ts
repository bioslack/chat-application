import { CaptionColor } from "../../components/TextInput";
import { prepare, validate } from "./validator";

interface InputData {
  value: string;
  caption: string;
  captionColor: CaptionColor;
}

export interface FormSignupState {
  name: InputData;
  nickname: InputData;
  password: InputData;
  disabled: boolean;
}

export type FormSignupField = "name" | "nickname" | "password";

type FormSignupAction = {
  type: "ENTER_TEXT";
  key: FormSignupField;
  value: string;
};

const errorMessages = {
  name: "Um nome precisa ser informado",
  nickname: "Precisa conter 4 caracteres",
  password: "Precisa conter pelo menos 8 caracteres"
};

export const reducer = (state: FormSignupState, action: FormSignupAction) => {
  switch (action.type) {
    case "ENTER_TEXT":
      let prepared = {
        ...state,
        [action.key]: { ...state[action.key], value: action.value },
      };
      let caption = "";
      let captionColor = "muted";
      let errors = validate(action.key, action.value);

      if (errors.length) {
        const [key] = errors;
        caption = errorMessages[key as FormSignupField];
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
        disabled,
      };
  }
};
