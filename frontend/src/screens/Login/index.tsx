import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useReducer,
} from 'react';
import TextInput from '../../components/TextInput';
import Loading from '../../components/Loading';
import Button from '../../components/Button';
import Logo from '../../assets/img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { FormLoginField, FormLoginState, reducer } from './reducer';
import { prepare, validate } from './validator';
import useAuth from '../../hooks/useAuth';

const initialState: FormLoginState = {
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

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { signin, user } = useAuth();
  const navigate = useNavigate();

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(validate('nickname', state.nickname.value, prepare(state)));
    signin(prepare(state)).catch((err) => {
      alert(err.message);
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    dispatch({
      type: 'ENTER_TEXT',
      key: e.target.id as FormLoginField,
      value: e.target.value,
    });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (false) return <Loading />;

  return (
    <form autoComplete="off" className="login" onSubmit={onSubmit}>
      <img src={Logo} alt="Flyer" style={{ height: 150, marginBottom: 25 }} />
      <TextInput
        id="nickname"
        type="text"
        label="Apelido"
        placeholder="Pelo menos 4 caracteres"
        value={state.nickname.value}
        caption={state.nickname.caption}
        captionColor={state.nickname.captionColor}
        onChange={handleChange}
      />
      <TextInput
        id="password"
        type="password"
        label="Senha"
        placeholder="Pelo menos 8 caracteres"
        value={state.password.value}
        caption={state.password.caption}
        captionColor={state.password.captionColor}
        onChange={handleChange}
        margins={[0, 0, 10, 0]}
      />
      <Button label="Entrar" type="submit" disabled={state.disabled} />
      <div style={{ marginTop: 15, fontSize: 12, alignSelf: 'flex-start' }}>
        Não tem registro ainda? <Link to="/signup">Cadastrar</Link>
      </div>
      <div style={{ marginTop: 15, fontSize: 12, alignSelf: 'flex-start' }}>
        Esqueci minha senha. <Link to="/forgot">Recuperar</Link>
      </div>
    </form>
  );
};

export default Login;
