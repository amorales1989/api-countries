import React from "react";
import s from "./Card.module.css"


export default function Card({name, image, continent}) {
    return (
        <div className={s.card_container}>
            <img src={image} alt="Img not found" />
            <div className={s.card_info}>
                <h3>{name}</h3>
                <p>{continent}</p>
                
                
            </div>
        </div>
    );
}
