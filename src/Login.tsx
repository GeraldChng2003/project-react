import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Login.css';
import { faLock, faUserTie } from '@fortawesome/free-solid-svg-icons';


function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    /*Submit form */
    const navigate = useNavigate();
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
    
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const validUser = users.find((u: any) => u.username === username && u.password === password);
    
        if (validUser) {
          alert('Login successful!');
          setError('');
          navigate('/Temporary');
        } else {
          setError('Invalid username or password');
        }
      

      };


    return (

        <div className='loginContainer'>
        <form className ="loginForm" onSubmit={handleLogin}> 
            <h1 className='formTitle'> Login </h1>


            <div className='formRow'> 
            <FontAwesomeIcon icon={faUserTie} />
                <label> Username </label>
                <div className="formWrapper">
                    <input type="text" placeholder="Enter Username" className="input" name="uname" value={username} onChange={(e) => setUsername(e.target.value)} required /> 
                </div>

            </div>

            <div className='formRow'> 
            <FontAwesomeIcon icon={faLock} />

                <label> Password  </label>
                <div className="formWrapper">
                  <input type="password" placeholder="Enter Password" className="input" name="psw" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>

            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}


            <button type="submit">Login</button>

            <Link to="/Registration" className="specialbtn">Don't have an account? Register here </Link>

        
        </form>
        
        
        </div>

    );
}

export default Login;
