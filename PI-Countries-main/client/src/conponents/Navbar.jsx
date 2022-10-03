// import { Link, NavLink } from 'react-router-dom';
// import styles from "./Navbar.module.css"

// export default function Navbar() {
//     return (
//         <nav className={styles.nav_container}>
//             <div className={styles.navigation}>
//                 <Link className={styles.logo} to="/countries">
//                     Countries
//                 </Link>
//                 <div className={styles.navbar}>
//                     <NavLink
//                         className={({ isActive }) => `link  ${isActive ? 'active' : ''}`}
//                         to="/activitiesCreate"
//                     >  Create activities   </NavLink>
//                 </div>
//             </div>
//         </nav>
//     );
// }

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
                        <Link to="/">Inicio</Link>
                        <Link to="/countries">Página principal</Link>
                        {/* <a href="https://github.com/CariBosio/PI-Countries">
                            <img
                                id="linkedin"
                                src={GitHub}
                                width="25"
                                height="25"
                                className={s.link}
                                alt="img"
                            />
                        </a>

                        <a href="https://www.linkedin.com/in/carina-susana-bosio-73621215b/">
                            <img
                                id="linkedin"
                                src={Linkedin}
                                width="25"
                                height="25"
                                className={s.link}
                                alt="img"
                            />
                        </a> */}

                        <Link to="/activities" className={s.final}>Crear actividad turística</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}