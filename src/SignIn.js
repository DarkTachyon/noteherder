import React from 'react'

import './SignIn.css'
import { auth, googleProvider } from './base'
import quill from './quill.svg'
import googleLogo from './google.svg'

const SignIn = () => {
    const authenticate = () => {
        auth.signInWithPopup(googleProvider)
    }

    return (
        <div className="SignIn">
            <header className="Header">
                <img src={quill} alt="" />
                    <span className="title">Noteherder</span>
            </header>
            <main>
                <h3>Hey, Nerd! You Like Notes?</h3>
                <p>You never know when youll need to write crap down. In fact, you should probably be taking notes right now.</p>

                <button
                    className="google"
                    onClick={authenticate}
                >
                    <img src={googleLogo} alt="" />
                Sign in with Google
                </button>
            </main>
        </div>
    )
}

export default SignIn
