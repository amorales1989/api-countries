import React from "react";
import { Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getDetails,cleanDetails} from "../actions/index";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import style from './detail.module.css'

export default function Detail(){
    const dispatch=useDispatch()
    const {id}=useParams()
    const detailsCountry=useSelector(state=>state.details)
    useEffect(()=>{
        dispatch(getDetails(id))
        
        return()=>dispatch(cleanDetails())
    },[dispatch])
    const details=detailsCountry;
    return(

        details?<div className={style.detail}>
            
            <div>
                <img className={style.img} src={details.flag}></img>
                <div className={style.infoDetail}>
                    <p><b>Name:</b> {details.name}</p>
                    <p><b>Id:</b> {details.id}</p>
                    <p><b>Continent:</b> {details.subregion}</p>
                    <p><b>Capital:</b> {details.capital}</p>
                    <p><b>Subregion:</b> {details.subregion}</p>
                    <p><b>Area:</b> {details.area}</p>
                    <p><b>Poblation:</b> {details. population}</p>
                    <p><b>Activities:</b></p> 
                    <div>
                            {
                                details.activities?.length>0?details.activities.map(a=>
                                    <ul>
                                        <h3>{a.name}</h3>
                                        <h5>Difficulty: {a.difficulty}</h5>
                                        <h5>Duration: {a.duration}</h5>
                                        <h5>Season: {a.season}</h5>
                                    </ul>
                                ):'-'
                            }
                    </div>
                    <Link to='/countries'>
                <button className={style.btn2}>Atras</button>
            </Link>
                </div>
            </div>
        </div>:<p>loading...</p>
    )
}
