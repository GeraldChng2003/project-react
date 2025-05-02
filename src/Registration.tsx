import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Registration.css';
import { faEnvelope, faLock, faUserTie } from '@fortawesome/free-solid-svg-icons';

function Registration() {
    /* Password States */
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    /*Password State checks */
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    /*Submit form */
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password != confirmPassword) {
            setError("Password do not match");
        } 
        
        if (!hasLower || !hasUpper || !hasNumber || !hasMinLength) {
            setError("Password does not meet the requirements");
            return;
        }

        else {
            setError('');
            alert('Password confirmed!');
             /*Temporary Database */
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userExists = users.find((u: any) => u.username === username);

            if (userExists) {
            setError('Username already taken');
            return;
            }


            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            setError('');
            alert('Registration successful!');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            
            navigate('/Login');

        }

       
    };
    
    return (
        <div className='body'>

        <div className='container'>

        <form className ="registrationForm" onSubmit={handleSubmit}> 


            <h1 className='formTitle'> Registration </h1>

            <div className='formRow'> 
                <FontAwesomeIcon icon={faUserTie} />
                
                <label> Username </label>
                <div className="formWrapper">
                    <input type="text" placeholder="Enter Username" name="uname" value={username} onChange={(e) => setUsername(e.target.value)} required /> 
                </div>

            </div>
            
            <div className='formRow'> 
            <FontAwesomeIcon icon={faEnvelope} />
                <label> Email </label>
                <div className="formWrapper">
                <input type="email" placeholder="Enter Email" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
            </div>

            <div className='formRow'> 
                <FontAwesomeIcon icon={faLock} />
                <label> Password </label>
                <div className="formWrapper">

                <input type="password" placeholder="Enter Password" name="psw" value={password} 
                onFocus={() => setShowPasswordRules(true)} 
                onBlur={() => setShowPasswordRules(false)}
                onChange={(e) => setPassword(e.target.value)} required />

                </div>
            </div>

            <div className='formRow'> 
            <FontAwesomeIcon icon={faLock} />

                <label> Confirm Password </label>
                <div className="formWrapper">

                <input type="password" placeholder="Confirm Password" name="cpsw" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} required />
                </div>

            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        
            {/*Hidden message for password creation */}
            {showPasswordRules && (
            <div id="message">
                <h3>Password must contain the following:</h3>
                <p className={hasLower ? "valid" : "invalid"}>A <b>lowercase</b> letter</p>
                <p className={hasUpper ? "valid" : "invalid"}>A <b>capital (uppercase)</b> letter</p>
                <p className={hasNumber ? "valid" : "invalid"}>A <b>number</b></p>
                <p className={hasMinLength ? "valid" : "invalid"}>Minimum <b>8 characters</b></p>
            </div>
            )}

            <button type="submit">Register Account</button>
            <Link to="/Login" className="specialbtn">Already have an account? Login </Link>
            


        </form>
        
        
        </div>
        </div>
  );
}

export default Registration;
