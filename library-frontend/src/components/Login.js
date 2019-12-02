import React from 'react';

const handleLogin = (props) => {

}

const Login = (props) => {
    return(
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input></input>
                </div>
                <div>
                    <label>Password</label>
                    <input></input>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
