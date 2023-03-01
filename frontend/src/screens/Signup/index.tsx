import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useReducer,
} from 'react';
import { FormSignupField, FormSignupState, reducer } from './reducer';
import { prepare } from './validator';
import useAuth from '../../hooks/useAuth';

const initialState: FormSignupState = {
  name: {
    value: '',
    caption: '',
    captionColor: 'muted',
  },
  nickname: {
    value: '',
    caption: '',
    captionColor: 'muted',
  },
  password: {
    value: '',
    caption: '',
    captionColor: 'muted',
  },
  disabled: true,
};

const Signup = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    signup(prepare(state)).catch((err) => {
      alert(err.message);
    });
    e.preventDefault();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({
      type: 'ENTER_TEXT',
      key: e.target.id as FormSignupField,
      value: e.target.value,
    });
    
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <form autoComplete="off" className="login" onSubmit={onSubmit}>
      <h1 style={{ alignSelf: 'flex-start', marginBottom: 25 }}>Cadastro</h1>
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
        id="nickname"
        label="Apelido"
        placeholder="Precisa conter 4 caracteres"
        value={state.nickname.value}
        onChange={handleChange}
        caption={state.nickname.caption}
        captionColor={state.nickname.captionColor}
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
      <Button label="Cadastrar" type="submit" disabled={state.disabled} />
      <div style={{ marginTop: 15, fontSize: 12, alignSelf: 'flex-start' }}>
        Já tem cadastro? <Link to="/login">Entrar</Link>
      </div>
    </form>
  );
};

export default Signup;
