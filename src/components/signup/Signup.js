import React from 'react'
import Header from '../header/Header'
import './Signup.css'

function Signup(props) {
    return (
        <>
            <Header />
            <main>
                <section className="signup">
                    <div className="signup-form-container">
                        <h1>Sign Up</h1>
                        <form onSubmit={e => props.handleSignup(e)}>
                            <div className="signup-input-container">
                                <label htmlFor="email">Email:</label>
                                <input id="email" type="text" /><br/>
                                <label htmlFor="username">Username:</label>
                                <input id="username" type="text" /><br/>
                                <label htmlFor="password">Password:</label>
                                <input id="password" type="password" /><br/>
                            </div>
                            <button type="submit">Sign Up</button>
                        </form>
                    </div>
                </section>
            </main>
            <footer>
                <span>&#169; MyImg 2021</span>
            </footer>
        </>
    )
}; 

export default Signup; 