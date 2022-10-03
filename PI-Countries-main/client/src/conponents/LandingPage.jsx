import { Link } from "react-router-dom";
import React from "react";
import s from  "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos</h1>
            <Link to = '/countries'>
                <button className={s.button}>Entrar</button>
            </Link>
        </div>
    )
}