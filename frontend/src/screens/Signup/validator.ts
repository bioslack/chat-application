import Joi from "joi";
import { FormSignupField, FormSignupState } from "./reducer";

const schema = Joi.object({
  name: Joi.string().not(""),
  nickname: Joi.string().min(4),
  password: Joi.string().min(8),
});

export const prepare = (state: FormSignupState) => ({
  name: state.name.value,
  nickname: state.nickname.value,
  password: state.password.value,
});

export const validate = (
  key: FormSignupField,
  value: string,
  extraFields?: Object
) => {
  const validation = schema.validate({ ...extraFields, [key]: value });
  if (validation.error) {
    const error = `${validation.error}`.split('"');
    return [error[1], error[2].trim()];
  }
  return [];
};
