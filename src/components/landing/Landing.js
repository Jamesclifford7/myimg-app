import React from 'react'; 
import Header from '../header/Header'
import '../landing/Landing.css'

function Landing(props) {
    return (
        <>
            <Header user={props.user} />
            <main>
                <section className="main">
                    <h1>MyImg</h1>
                    <p>One place to upload and share all of your favorite moments.</p>
                </section>
                <section className="info">
                    <div className="info-container">
                        <h3>Snap</h3>
                    </div>
                    <div className="info-container">
                        <h3>Upload</h3>
                    </div>
                    <div className="info-container">
                        <h3>Share</h3>
                    </div>
                </section>
                <section className="signup">
                    <h2>Get Started Today</h2>
                    <button>Sign Up</button>
                </section>
            </main>
            <footer>
                <span>&#169; MyImg 2021</span>
            </footer>
        </>
    )
}

export default Landing