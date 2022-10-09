import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { IToken } from '../../Interfaces/IToken';
import { requestAPI } from '../../Services';
import style from './Login.module.css';


function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const {data} = await requestAPI<IToken>('POST', {email, password}, 'auth/signin');
      const token = data.access_token;
      localStorage.setItem('authLibrary', JSON.stringify(token));
      navigate('/home');
    } catch (err: any) {
      setShowError(true);
      setErrorMessage(err.data.message);     
    }
  };

  useEffect(() => {
    const validate = (
      email.includes('@') &&
      email.includes('.com') &&
      email.length > 5 &&
      password.length >= 5
    );
    setIsDisabled(!validate);
  }, [password, email]);

  return (
    <section className={style.loginPage}>
      <Form className={style.loginForm}>
        {showError &&
      <Alert variant='primary'
        onClose={() => setShowError(false)}
        dismissible
      >
        {errorMessage}
      </Alert>
        }
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" placeholder="Enter email" 
            value={email}
            onChange={({target}) => setEmail(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={({target}) => setPassword(target.value)} />
        </Form.Group>
        <Button 
          variant="primary"
          onClick={() => login()}
          disabled={isDisabled}
        >
        Submit
        </Button>
      </Form>
    </section>
  );
}

export default Login;