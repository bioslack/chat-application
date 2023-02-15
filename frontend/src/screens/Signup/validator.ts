import Joi from "joi";
import { FormSignupField, FormSignupState } from "./reducer";

const schema = Joi.object({
  name: Joi.string().not(""),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(8),
  confirmPassword: Joi.ref("password"),
});

export const prepare = (state: FormSignupState) => ({
  name: state.name.value,
  email: state.email.value,
  password: state.password.value,
  confirmPassword: state.confirmPassword.value,
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
