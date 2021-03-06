import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap';
import './Register.css';
import { useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import db from '../firebase.utils';

function Register() {
    const history = useHistory('');
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const [loading, setLoading] = useState(false);   


    async function register(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError("");
            setLoading(true);
            const auth = await signup(email, password);
            if (auth.user) {
                auth.user.updateProfile({
                    displayName: firstName,
                })
                db.collection('mhp').doc(auth.user.uid).set({
                    name: firstName,
                    email: email,
                })
                .then((s) => {
                    history.push("/admin");
                })
            }
          } catch {
            setError("Failed to create an account");
          }
      
          setLoading(false);
    }

    return (
        <div className="register">
            <Container fluid>
            <Row>
                <Col xs={12} md={6} className="register__left">
                    <center>
                    <img src=""alt="fashion"  className="register__images"></img>
                    </center>
                </Col>
                <Col xs={12} md={6}>
                <center>
                <div className="register__container">
                    <h1>Register Today!</h1>
                    <h3>It's quick and easy..</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <form>
                        <center>
                            <input onChange={(e) => setFirstName(e.target.value)} className="register__name" type="name" placeholder="First Name" />
                        </center>
                        <center>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </center>
                        <center>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </center>
                        <center>
                            <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                        </center>
                        <center>
                        <p className="register__policy">
                            By clicking sign up, you agree to our{" "}
                            <span>Terms, Data Policy</span> and <span>Cookie Policy</span>. You 
                            may recieve SMS notifications from us and can opt out at any time.
                        </p>
                        </center>

                        <center>
                            <button disabled={loading} onClick={register} type="submit" className="register__register">Sign Up</button>
                        </center>
                    </form>
                </div>
                </center>
                </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Register
