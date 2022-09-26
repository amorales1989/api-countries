import { Link } from "react-router-dom";
import React from "react";

export default function LandingPage(){
    return(
        <div>
            <h1>Bienvenidos</h1>
            <Link to = '/countries'>
                <button>Entrar</button>
            </Link>
        </div>
    )
}