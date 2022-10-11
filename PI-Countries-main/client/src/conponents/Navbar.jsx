import React from "react";
import { Link } from "react-router-dom";
import s from "./Navbar.module.css";


export default function NavBar() {
    return (
        <header className={s.navbar}>
            <div>
                <img
                    className={s.shadow}
                    id="logo"
                    width="100%"
                    height="59"
                    top="1px"
                    filter="drop-shadow(10px 10px 20px black)"
                    alt=""
                />
            </div>
            <nav>
                <ul className={s.list}>
                    <li className={s.listitem}>
                        <Link to="/" className={s.link}>Inicio</Link>
                        <Link to="/activities" className={s.final}>Crear actividad turística</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}