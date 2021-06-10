import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { auth, firestore, serverTimeStamp, signInWithGoogle } from '../firebase.utils';
import './LoginModal.css';

const LoginModal = ({ isShown, onHide }) => {
  const [open] = useState(true);
  const [active, setActive] = useState(true);
  const [loginUser, setLoginUser] = useState({
    Email: '',
    Password: '',
  });

  const [signUpUser, setSignUpUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [forgotPass, setForgotPass] = useState('Forgot your password?');

  const handleForgetPass = () => {
    if (loginUser.Email === '') {
      setForgotPass('Enter the Email in field');
      setTimeout(() => {
        setForgotPass('Forgot your password?');
      }, 4000);
    } else {
      auth
        .sendPasswordResetEmail(loginUser.Email)
        .then(() => {
          setForgotPass('Password Reset Email Sent.');
        })
        .catch((error) => console.log(error));
    }
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginUser((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpUser((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSignInPanel = () => {
    setActive(false);
  };

  const handleSignUpPanel = () => {
    setActive(true);
  };

  const submitSignUp = async (event) => {
    event.preventDefault();

    const {
      Name, Email, Password, ConfirmPassword,
    } = signUpUser;

    if (Password !== ConfirmPassword) {
      alert("Passwords don't match ");
      return;
    }

    try {
      await auth
        .createUserWithEmailAndPassword(Email, Password)
        .then((result) => {
          // console.log(result.user.uid);
          result.user.updateProfile({ displayName: Name });
          return firestore.collection('users').doc(result.user.uid)
            .set({
              bio: 'Hi there!',
              credits: 75,
              currentMHP: null,
              displayName: Name,
              email: Email,
              gender: '',
              profileCreatedTimestamp: serverTimeStamp,
            });
        })
        .then(() => {
          onHide();
        })
        .catch((error) => alert(error.message));

      setSignUpUser({
        Name: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const submitSignIn = async (event) => {
    event.preventDefault();

    const { Email, Password } = loginUser;

    try {
      await auth.signInWithEmailAndPassword(Email, Password);
      onHide();
    } catch (error) {
      alert(error.message);
    }

    setLoginUser({ Email: '', Password: '' });
  };

  return (
    <Modal
      dialogClassName="modal-50w"
      className="ModalLogin"
      centered
      show={isShown && open}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={onHide}
    >
      <Modal.Body
        className={`container ${active ? 'right-panel-active' : ''}`}
        id="container row"
      >
        <div className="form-container form-group sign-up-container">
          <form onSubmit={submitSignUp} className="pr-4">
            <h1>Create Account</h1>
            <input
              type="text"
              name="Name"
              value={signUpUser.Name}
              onChange={handleSignUpChange}
              placeholder="Name"
              className="form-control"
            />
            <input
              type="email"
              name="Email"
              onChange={handleSignUpChange}
              value={signUpUser.Email}
              placeholder="Email"
              className="form-control"
            />
            <input
              type="password"
              name="Password"
              onChange={handleSignUpChange}
              value={signUpUser.Password}
              placeholder="Password"
              className="form-control"
            />
            <input
              type="password"
              name="ConfirmPassword"
              onChange={handleSignUpChange}
              value={signUpUser.ConfirmPassword}
              placeholder="Confirm Password"
              className="form-control"
            />
            <button
              type="submit"
              className="btn"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container form-group sign-in-container">
          <form onSubmit={submitSignIn} className="pr-4">
            <h1>Sign in</h1>
            <div className="social-container">
              <i
                role="button"
                onClick={() => {
                  signInWithGoogle();
                  onHide();
                }}
                className="social link"
              >
                <i className="fab fa-google-plus-g fa-lg" />
              </i>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              name="Email"
              onChange={handleLoginChange}
              value={loginUser.Email}
              placeholder="Email"
              className="form-control"
            />
            <input
              type="password"
              name="Password"
              onChange={handleLoginChange}
              value={loginUser.Password}
              placeholder="Password"
              className="form-control"
            />
            <i role="button" onClick={handleForgetPass} className="link">
              {forgotPass}
            </i>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="btn btn-white text-dark" id="signIn" onClick={handleSignInPanel}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="btn btn-white text-dark" id="signUp" onClick={handleSignUpPanel}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
