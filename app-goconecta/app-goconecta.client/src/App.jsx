import './App.css';
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import CadastroFormulario from './Components/cadastro-formulario/CadastroFormulario';
import Login from './Components/login-formulario/LoginForm';
import LoginForm from './Components/LoginSenha';



function App()
{

    return <MantineProvider>
    <CadastroFormulario></CadastroFormulario>

    <h2>Olá, Faça seu Login</h2>
    <LoginForm></LoginForm>
    </MantineProvider>;

    return <MantineProvider>{ }</MantineProvider>;

}

export default App;