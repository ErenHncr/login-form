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
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import InputWithStatus from './InputWithStatus';
import './Login.css';
import languages from './assets/languages.json';
import FlagItem from './FlagItem';

function isEmail(email) {
  // eslint-disable-next-line
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function Login() {
  // eslint-disable-next-line
  const [language, setLanguage] = useState('EN');
  const [theme, setTheme] = useState('light');
  const [email, setEmail] = useState(localStorage.getItem('email') ?? '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const [remember, setRemember] = useState(false);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
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
      if (remember) {
        localStorage.setItem('email', email);
      }
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
    if (isEmailClicked || e !== undefined) {
      if (email.trim() === '') {
        setErrorFor(emailEl);
        setEmailError(languages.blankEmailError[language]);
      } else if (!isEmail(email.trim())) {
        setErrorFor(emailEl);
        setEmailError(languages.invalidEmailError[language]);
      } else {
        setSuccessFor(emailEl);
        setEmailError('');
      }
    }

    if (isPasswordClicked || e !== undefined) {
      if (password.trim() === '') {
        setErrorFor(passwordEl);
        setPasswordError(languages.blankPasswordError[language]);
      } else {
        setSuccessFor(passwordEl);
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

  useEffect(() => {
    document.title = languages.header[language];
  }, [language]);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      const oppositeTheme = localTheme === 'dark' ? 'light' : 'dark';
      setTheme(localTheme);
      document.body.classList.remove(`${oppositeTheme}-theme`);
      document.body.classList.add(`${localTheme}-theme`);
    }
  }, []);

  return (
    <div className="login-container mx-0 px-4">
      <div className="w-100 pt-3 d-flex">
        <div className="d-flex ml-auto align-items-center">
          <Dropdown
            color="danger"
            isOpen={isDropdownOpen}
            toggle={() => { setIsDropdownOpen(!isDropdownOpen); }}
          >
            <DropdownToggle
              caret
              className="pl-3 d-flex align-items-center dropdown-toggle"
            >
              <FlagItem language={language} />
              &nbsp;&nbsp;
              <span className="language-text">
                {language}
              </span>
            </DropdownToggle>
            <DropdownMenu
              className="dropdown-menu"
            >
              <DropdownItem
                className="dropdown-item"
                onClick={() => {
                  setLanguage('EN');
                }}
              >
                <FlagItem language="EN" />
                <span className="language-text">&nbsp;&nbsp;English</span>
              </DropdownItem>
              <DropdownItem
                className="dropdown-item"
                onClick={() => {
                  setLanguage('DE');
                }}
              >
                <FlagItem language="DE" />
                <span className="language-text">&nbsp;&nbsp;Deutsch</span>
              </DropdownItem>
              <DropdownItem
                className="dropdown-item"
                onClick={() => {
                  setLanguage('FR');
                }}
              >
                <FlagItem language="FR" />
                <span className="language-text">&nbsp;&nbsp;Français</span>
              </DropdownItem>
              <DropdownItem
                className="dropdown-item"
                onClick={() => {
                  setLanguage('TR');
                }}
              >
                <FlagItem language="TR" />
                <span className="language-text">&nbsp;&nbsp;Türkçe</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* eslint-disable-next-line */}
        <label className="switch ml-4 mb-0">
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
                    className="px-4 py-2 login-card-header"
                    style={{
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#495057',
                    }}
                  >
                    <h1>{languages.header[language]}</h1>
                    <p
                      style={{
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {localStorage.getItem('email')
                        ? languages.subheaderWelcome[language]
                        : languages.subheader[language]}

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
              <div className={classnames({
                'p-2': true,
                'pt-4': ['TR', 'EN'].includes(language),
                'pt-5': ['DE', 'FR'].includes(language),
              })}
              >
                <Form id="login-form" className="form-horizontal" onSubmit={checkBeforeSubmit}>
                  <Alert className="mt-5 mb-0" color="danger" isOpen={error} toggle={() => setError(false)}>{languages.errorAfterSubmit[language]}</Alert>
                  <div className="form-group">
                    <InputWithStatus
                      id="email"
                      name="email"
                      type="email"
                      val={email}
                      placeholder={languages.emailPlaceholder[language]}
                      onChange={(e) => {
                        setIsEmailClicked(true);
                        setEmail(e.target.value);
                      }}
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
                      placeholder={languages.passwordPlaceholder[language]}
                      onChange={(e) => {
                        setIsPasswordClicked(true);
                        setPassword(e.target.value);
                      }}
                    />
                    <p className="error-text">{passwordError}</p>

                  </div>
                  <Row className="mt-4">
                    <Col className="d-flex align-items-center remember-me">
                      <Input
                        id="remember-me-checkbox"
                        name="remember-me"
                        type="checkbox"
                        onChange={(e) => {
                          setRemember(e.target.checked);
                        }}
                      />
                      <Label for="remember-me-checkbox" className="btn-forgot text-muted">
                        { languages.rememberMe[language] }
                      </Label>
                    </Col>
                    <Col className="btn-forgot">
                      <Button type="button" color="link" className="btn-link text-muted">
                        { languages.forgotPassword[language] }
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
                      { languages.header[language] }
                    </Button>
                  </div>
                  <Row className="mt-4">
                    <Col
                      className="text-muted"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      <span>
                        {languages.haveAccount[language]}
                      &nbsp;
                      </span>

                      <Button
                        type="button"
                        color="link"
                        className="btn-link"
                      >

                        {languages.haveAccountButton[language]}
                      </Button>
                    </Col>
                  </Row>
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
