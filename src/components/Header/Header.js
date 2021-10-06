import React from 'react'

import { Link } from 'react-router-dom'

import Back from '../../images/back-button.svg'

import './header.css'

function Header(props) {
    return (

        <header>

            <div className="container">

                    <div className="logo" >
                            <h1>Medical</h1>
                    </div>

                    <div className="container">

                        <Link to="/home" >
                            <img src={Back} style={{width: '50px'}} />
                        </Link>

                    </div>

                    <div className="logo" >
                            <h2>{props.option}</h2>
                    </div>

            </div>
            
        </header>

    )
}

export default Header