import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Alert,
  Button,
  Input,
  Label,
} from 'reactstrap';
import InputWithStatus from './InputWithStatus';
import './Login.css';

function isEmail(email) {
  // eslint-disable-next-line
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function Login() {
  const [theme, setTheme] = useState('light');
  const [email, setEmail] = useState(localStorage.getItem('email') ?? '');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);

  const [isEmailClicked, setIsEmailClicked] = useState(false);
  const [isPasswordClicked, setIsPasswordClicked] = useState(false);
  // eslint-disable-next-line
  const [emailError, setEmailError] = useState('');
  // eslint-disable-next-line
  const [passwordError, setPasswordError] = useState('');
  // eslint-disable-next-line
  const [validations, setValidations] = useState([false, false, false, false, false]);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      setTheme('light');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  };
  const setSuccessFor = (input) => {
    const inputWithStatus = input.parentElement;
    inputWithStatus.className = 'input-with-status';
  };
  const setErrorFor = (input) => {
    const inputWithStatus = input.parentElement;
    inputWithStatus.className = 'input-with-status error';
  };

  const handleSubmit = (e) => {
    if (e !== undefined) {
      console.log(email);
      console.log(password);
      if (isEmail(email)) {
        console.log('valid email');
      }
      localStorage.setItem('email', email);
    }
  };

  const checkBeforeSubmit = (e = undefined) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    const valids = [
      (isEmail(email.trim())),
      password.trim() !== '',
    ];
    setValidations(valids);
    const filledAreas = valids.reduce((acc, cur) => acc + cur);

    const emailEl = document.getElementById('email');
    const passwordEl = document.getElementById('password');
    if (isEmailClicked) {
      if (email.trim() === '') {
        setErrorFor(emailEl);
        setEmailError('Email cannot be blank');
      } else if (!isEmail(email.trim())) {
        setErrorFor(emailEl);
        setEmailError('Please enter a valid email');
      } else {
        setSuccessFor(emailEl);
        setEmailError('');
      }
    }

    if (isPasswordClicked) {
      if (password.trim() === '') {
        setErrorFor(passwordEl);
        setPasswordError('Password cannot be blank');
      } else {
        setSuccessFor(passwordEl, 'Enter password');
        setPasswordError('');
      }
    }
    if (filledAreas === 2) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    checkBeforeSubmit();
  }, [email, password]);

  return (
    <div className="login-container mx-0 px-4">
      <div className="w-100 pt-3">
        {/* eslint-disable-next-line */}
        <label className="switch d-flex ml-auto">
          <input
            type="checkbox"
            className="toggle"
            onChange={() => {
              toggleTheme();
            }}
          />
          <span className="slider round" />
          <i className={classnames({
            bx: true,
            'bxs-moon': theme === 'dark',
            'bxs-sun': theme === 'light',
            'theme-icon': true,
          })}
          />
        </label>
      </div>
      <Row className="justify-content-center">
        <Col
          className="pl-0 login-col pr-0"
        >
          <Card
            className="overflow-hidden login-card"
            style={{
              borderRadius: '0px 4px 4px 0px',
              width: '100%',
            }}
          >
            <div>
              <Row style={{
                paddingTop: '17px',
                paddingBottom: '15px',
                height: '10px',
              }}
              >
                <Col xs="12">
                  <div
                    className="p-4 d-flex justify-content-start"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#495057',
                    }}
                  >
                    <p className="ml-1">
                      Sign in to continue to ABC Company
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
            <CardBody
              className="pt-4 login-cardbody"
              style={{
                background: 'white',
                borderRadius: '4px',
              }}
            >
              <div className="p-2 pt-4">
                <Form id="login-form" className="form-horizontal" onSubmit={checkBeforeSubmit}>
                  {error && (
                  <Alert color="danger">Invalid email or password.</Alert>
                  )}
                  <div className="form-group">

                    <InputWithStatus
                      id="email"
                      name="email"
                      type="email"
                      val={email}
                      onChange={(e) => {
                        setIsEmailClicked(true);
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                    />
                    <p className="error-text">{emailError}</p>

                  </div>
                  <div className={classnames({
                    'form-group': true,
                    'pb-1': passwordError.length === 0,
                  })}
                  >
                    <InputWithStatus
                      id="password"
                      name="password"
                      type="password"
                      val={password}
                      onChange={(e) => {
                        setIsPasswordClicked(true);
                        setPassword(e.target.value);
                      }}
                      placeholder="Password"
                    />
                    <p className="error-text">{passwordError}</p>

                  </div>
                  <Row className="mt-4">
                    <Col className="d-flex align-items-center remember-me">
                      <Input
                        id="remember-me-checkbox"
                        name="remember-me"
                        type="checkbox"
                      />
                      <Label for="remember-me-checkbox" className="btn-forgot text-muted">Remember me</Label>
                    </Col>
                    <Col className="btn-forgot">
                      <Button color="link" className="btn-link text-muted">
                        Forgot password?
                      </Button>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Button
                      id="signin-btn"
                      color="primary"
                      className="btn btn-primary btn-block waves-effect waves-light"
                      type="submit"
                      disabled={loading}
                    >
                      Sign In
                    </Button>
                  </div>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
