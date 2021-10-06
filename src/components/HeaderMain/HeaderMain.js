import React from 'react'

import { Link } from 'react-router-dom'

import './headerMain.css'

function HeaderMain() {
    return (

        <header>
            <div className="container">
                
                <div className="logo" >
                    <h1>Medical</h1>
                </div>

                <div className="btn-doctor" >

                    <Link to="/doctor/list" >
                        <button>Doctors</button>
                    </Link>

                </div>

                <div className="btn-appointment" >

                    <Link to="/appointment/list" >
                        <button>Appointments</button>
                    </Link>

                </div>

                <div className="btn-appointment" >

                    <Link to="/" >
                        <button>Sign Up</button>
                    </Link>

                </div>
            </div>
        </header>

    )
}

export default HeaderMain