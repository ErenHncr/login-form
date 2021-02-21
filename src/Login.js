import React, { useCallback, useEffect, useState } from 'react';
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
import FlagIcon from './FlagIcon';
import SocialIcon from './SocialIcon';

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

  const [error, setError] = useState(false);
  const [status, setStatus] = useState(false);
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

  const getSocialItem = (social) => {
    const socialCapitalized = social.charAt(0).toUpperCase() + social.slice(1);
    return (
      <Row className="mt-3">
        <Col>
          <Button
            type="button"
            color="secondary"
            className={`btn-white w-100 social-btn ${language.toLowerCase()}`}
          >
            <SocialIcon brand={social} />
            <span>
              {languages.signInWith[language].replace('placeholder', socialCapitalized)}
            </span>
          </Button>
        </Col>
      </Row>
    );
  };

  const setSuccessFor = (input) => {
    const inputWithStatus = input.parentElement;
    inputWithStatus.className = 'input-with-status';
  };
  const setErrorFor = (input) => {
    const inputWithStatus = input.parentElement;
    inputWithStatus.className = 'input-with-status error';
  };

  const handleSubmit = useCallback(
    (e = undefined) => {
      if (e !== undefined && e !== null) {
        setError(false);
        if (email !== 'a@a.com') {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setStatus('error');
            setError(true);
          }, 1500);
          setTimeout(() => {
            setStatus(null);
          }, 2500);
        } else {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setStatus('ok');
          }, 1500);
          setTimeout(() => {
            setStatus(null);
          }, 2500);
        }
        if (remember) {
          localStorage.setItem('email', email);
        }
      }
    },
    [email, remember],
  );

  const checkBeforeSubmit = useCallback(
    (e = undefined) => {
      if (e !== undefined && typeof e !== 'string') {
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

      if (isEmailClicked || e !== undefined || typeof e === 'string') {
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

      if (isPasswordClicked || e !== undefined || typeof e === 'string') {
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
    },
    [email,
      password,
      language,
      handleSubmit,
      isEmailClicked,
      isPasswordClicked],
  );

  const getDropdownItem = (langShort, langLong = null) => (
    <DropdownItem
      className="dropdown-item"
      onClick={() => {
        setLanguage(langShort);
        localStorage.setItem('lang', langShort);
      }}
    >
      <FlagIcon language={langShort} />
      <span className="language-text">
        &nbsp;
        &nbsp;
        {langLong}
      </span>
    </DropdownItem>
  );

  useEffect(() => {
    checkBeforeSubmit();
  }, [email, password, checkBeforeSubmit]);

  useEffect(() => {
    document.title = languages.header[language];
    if (isEmailClicked || isPasswordClicked) checkBeforeSubmit();
  }, [language, isEmailClicked, isPasswordClicked, checkBeforeSubmit]);

  useEffect(() => {
    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', 'EN');
    } else {
      const lang = localStorage.getItem('lang').toUpperCase();
      setLanguage(lang);
    }
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      const oppositeTheme = localTheme === 'dark' ? 'light' : 'dark';
      setTheme(localTheme);
      document.body.classList.remove(`${oppositeTheme}-theme`);
      document.body.classList.add(`${localTheme}-theme`);
    }
  }, []);

  return (
    <div className="login-container mx-0">
      <div className="w-100 pt-3 d-flex">
        <div className="d-flex ml-auto align-items-center">
          <Dropdown
            className="dropdown"
            color="danger"
            isOpen={isDropdownOpen}
            toggle={() => { setIsDropdownOpen(!isDropdownOpen); }}
          >
            <DropdownToggle
              caret
              className="d-flex align-items-center dropdown-toggle"
            >
              <FlagIcon language={language} />
              &nbsp;&nbsp;
              <span className="language-text">
                {language}
              </span>
            </DropdownToggle>
            <DropdownMenu
              className="dropdown-menu"
            >
              {getDropdownItem('EN', 'English')}
              {getDropdownItem('DE', 'Deutsch')}
              {getDropdownItem('FR', 'Français')}
              {getDropdownItem('TR', 'Türkçe')}
            </DropdownMenu>
          </Dropdown>
          <label htmlFor="theme-toggle" className="switch ml-3 mb-0">
            <input
              id="theme-toggle"
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
                  <div
                    className="form-group"
                    style={{
                      marginTop: '-5px',
                    }}
                  >
                    <InputWithStatus
                      id="email"
                      name="email"
                      type="text"
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
                        {languages.rememberMe[language]}
                      </Label>
                    </Col>
                    <Col className="btn-forgot">
                      <Button type="button" color="link" className="btn-link text-muted">
                        {languages.forgotPassword[language]}
                      </Button>
                    </Col>
                  </Row>
                  <div className="mt-4">
                    <Button
                      disabled={loading || status === 'ok'}
                      id="signin-btn"
                      color={status === 'ok' ? 'success' : 'primary'}
                      className="btn btn-block waves-effect waves-light"
                      type="submit"
                      onClick={() => {
                        setIsEmailClicked(true);
                        setIsPasswordClicked(true);
                      }}
                    >
                      {/* { languages.header[language] } */}

                      {status === 'ok' && (
                        <>
                          <i className="bx bx-loader bx-spin mr-2" />
                          {languages.redirecting[language]}
                        </>
                      )}
                      {loading === true && (
                        <>
                          <i className="bx bx-loader bx-spin mr-2" />
                          {languages.signingIn[language]}
                        </>
                      )}
                      {(loading !== true) && status !== 'ok' && languages.header[language]}
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
                        className="btn-link createnewone"
                      >
                        {languages.haveAccountButton[language]}
                      </Button>
                    </Col>
                  </Row>

                </Form>
                <Row className="divider">
                  <Col md="5">
                    <hr className="line" />
                  </Col>
                  <Col className="line-text">
                    or
                  </Col>
                  <Col md="5">
                    <hr className="line" />
                  </Col>
                </Row>
                <div className="social-buttons">
                  {getSocialItem('google')}
                  {getSocialItem('facebook')}
                  {getSocialItem('twitter')}
                  {getSocialItem('microsoft')}
                </div>

              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
