import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import {
  ChangeEventHandler,
  FormEventHandler,
  useReducer,
} from "react";
import { FormSignupField, FormSignupState, reducer } from "./reducer";
import { prepare, validate } from "./validator";

const initialState: FormSignupState = {
  name: {
    value: "",
    caption: "",
    captionColor: "muted",
  },
  email: {
    value: "",
    caption: "",
    captionColor: "muted",
  },
  password: {
    value: "",
    caption: "",
    captionColor: "muted",
  },
  confirmPassword: {
    value: "",
    caption: "",
    captionColor: "muted",
  },
  disabled: true,
};

const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const validation = validate("email", "exemplo@email.com", prepare(state));

    if (Boolean(validation.length)) {
      alert("Error");
      return;
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({
      type: "ENTER_TEXT",
      key: e.target.id as FormSignupField,
      value: e.target.value,
    });

  return (
    <form autoComplete="off" className="login" onSubmit={onSubmit}>
      <h1 style={{ alignSelf: "flex-start", marginBottom: 25 }}>Cadastro</h1>
      <TextInput
        id="name"
        label="Nome"
        placeholder="Nome e sobrenome"
        value={state.name.value}
        onChange={handleChange}
        caption={state.name.caption}
        captionColor={state.name.captionColor}
      />
      <TextInput
        id="email"
        label="Email"
        placeholder="exemplo@email.com"
        value={state.email.value}
        onChange={handleChange}
        caption={state.email.caption}
        captionColor={state.email.captionColor}
      />
      <TextInput
        id="password"
        type="password"
        label="Senha"
        placeholder="Pelo menos 8 caracteres"
        value={state.password.value}
        onChange={handleChange}
        caption={state.password.caption}
        captionColor={state.password.captionColor}
      />
      <TextInput
        id="confirmPassword"
        type="password"
        label="Confirmar senha"
        placeholder="Pelo menos 8 caracteres"
        value={state.confirmPassword.value}
        onChange={handleChange}
        caption={state.confirmPassword.caption}
        captionColor={state.confirmPassword.captionColor}
        margins={[0, 0, 10, 0]}
      />
      <Button label="Cadastrar" type="submit" disabled={state.disabled} />
      <div style={{ marginTop: 15, fontSize: 12, alignSelf: "flex-start" }}>
        Já tem cadastro? <Link to="/login">Entrar</Link>
      </div>
    </form>
  );
};

export default Signup;
