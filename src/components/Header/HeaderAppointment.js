import React from 'react'

import { Link } from 'react-router-dom'

import Back from '../../images/back-button.svg'

import './header.css'

function HeaderDoctor() {
    return (

        <header>

            <div className="container">

                    <div className="logo" >
                            <h1>Medical</h1>
                    </div>
                    <div className="container">

                        <Link to="/appointment/list" >
                            <img src={Back} style={{width: '50px'}} />
                        </Link>

                    </div>

            </div>

        </header>

    )
}

export default HeaderDoctor