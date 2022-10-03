import React from "react";
import s from "./Paginado.module.css"


export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumber = []

    for( let i=1; i<=Math.ceil(allCountries/countriesPerPage); i++){
        pageNumber.push(i)
    }

    return (
        
            <nav className={s.nav}>
                <ul className={s.paginado}>
                    {pageNumber && pageNumber.map(number => (
                        <button className={s.number} key={number}>
                            <div className={s.img} onClick={() => paginado(number)}>{number}</div>
                        </button>
                    ))}
                </ul>
            </nav>
    )
}