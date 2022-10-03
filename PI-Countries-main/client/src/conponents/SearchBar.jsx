import React from "react";
import {useDispatch} from "react-redux";
import { useState } from "react";
import { getNameCountry } from "../actions";
import s from "./SearchBar.module.css"

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit (e){
        e.preventDefault()
        dispatch(getNameCountry(name))
        setName("")
    }

    return (
        <div className={s.searchBar}>
            <input className={s.input}
            type= "text"
            placeholder = "Ingrasar Pais..."
            onChange={(e) => handleInputChange(e)}
            />
            <button className={s.button} type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}