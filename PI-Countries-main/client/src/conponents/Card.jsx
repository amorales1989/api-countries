import React from "react";
import s from "./Card.module.css"
import { Link } from "react-router-dom";

export default function Card({name, image, continent, id}) {
    return (
        <div className={s.card_container}>
            <img src={image} alt="Img not found" />
            <div className={s.card_info}>
                <h3>{name}</h3>
                <p>{continent}</p>
                <p>{id}</p>
                
            </div>
        </div>
    );
}
