import React from 'react'
import Header from '../header/Header'
import '../login/Login.css'

function Login(props) {
    return (
        <>
            <Header />
            <main>
                <section className="login">
                    <div className="form-container">
                        <h1>Login</h1>
                        <form onSubmit={e => props.handleLogin(e)}>
                            <div className="input-container">
                                <label htmlFor="input">Username/Email:</label>
                                <input id="input" type="text" /><br/>
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" /><br/>
                            </div>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </section>
            </main>
            <footer>
                <span>&#169; MyImg 2021</span>
            </footer>
        </>
    )
}

export default Login