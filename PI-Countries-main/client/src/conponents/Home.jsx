import {Fragment, React} from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCountries, filterCountryByContinent, filterByActivity, orderByName} from "../actions";
import {Link} from "react-router-dom"
import Card from './Card'
import Paginado from "./Paginado";

export default function Home(){

    const dispatch = useDispatch()
    const allCountries = useSelector ((state) => state.countries)
    const activities = useSelector((state) => state.activities);
    const [orden, setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry  = currentPage * countriesPerPage 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries  = allCountries.slice(indexOfFirstCountry,indexOfLastCountry)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=>{
        dispatch(getCountries());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleSort (e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        
    };

    function handleFilterContinent(e){
        dispatch(filterCountryByContinent(e.target.value))
    }
    
    function handlefilterByActivities(e){
        dispatch(filterByActivity(e.target.value))
    }


    return (
        <div>
            <Link to='/countries'>crear...</Link>
            <h1>Vemos q ponemos</h1>
            <button onClick={e=> {handleClick(e)}}>
                volver a cargar todos los paises</button>
            <div>
                <select onChange={e => handleSort(e)}>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <select onChange={e => handleFilterContinent(e)}>
                    <option value='All'>Todos</option>
                    <option value='Asia'>Asia</option>
                    <option value='Americas'>América</option>
                    <option value='Africa'>África</option>
                    <option value='Antarctic'>Antartida</option>
                    <option value='Europe'>Europa</option>
                    <option value='Oceania'>Oceania</option>
                </select>
                <select onChange={e => handlefilterByActivities(e)}>
                    <option value= 'Activity'>Actividades</option>
                </select>
                <Paginado
                countriesPerPage={countriesPerPage}
                allCountries = {allCountries.length}
                paginado = {paginado}
                />
                    {currentCountries?.map((c)=>{
                        return (
                            <div>
                                <Link to = {"/countries/" + c.id}>
                                    <Card name= {c.name} image={c.flag} continent={c.continent} key={c.id}/>
                                </Link>
                            </div>
                        )
                    })}

                
                {/* {
                    allCountries && allCountries.map( el=>{
                        <Card name={el.name} image={el.img} continent={el.continent}/>
                    })} */}
            </div>
        </div>
    )
}