import React from 'react';
import './Logout.scss';
import {logout} from '../../services/login'
import { useHistory } from 'react-router-dom';
const Logout = () => {
    const history = useHistory();    
    const HandleLogout = (event) => {
            event.preventDefault();
            logout()
            history.push('/login')
        }
        return (
            <div className="logout">
                <div className="center">
                <a href="z" onClick={HandleLogout}>Salir</a>

                </div>
            </div>
        )
    };
    export default Logout;