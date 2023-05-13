import React from 'react'
import './LoginComponent.css'

export default function LoginComponent() {
    return (
        <div className='container' id='logincontainer'>
            <h3>Login</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" aria-describedby="emailHelp" />
                    {/* <input type="email" className="form-control" name="email" value={email} aria-describedby="emailHelp" /> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" />
                </div>           
                <div className="mb-3">
                    <button type="submit" className="signup-btn">Submit</button>
                </div>

            </form>
        </div>
    )
}
