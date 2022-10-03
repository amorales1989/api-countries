import {Fragment, React} from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { getCountries, filterCountryByContinent, getActivities, filterActivity, orderByName, orderByPopulation} from "../actions";
import {Link} from "react-router-dom"
import Card from './Card'
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import s from "./Card.module.css"
import st from "./Home.module.css"
import Navbar from "./Navbar"



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
        dispatch(getActivities());
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
    function handleSortByPopulation(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
        
    }

    function handleFilterContinent(e){
        dispatch(filterCountryByContinent(e.target.value))
    }
    
    function handlefilterByActivities(e){
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1);
    }


    return (
        <div>
            <Navbar/>
            <button onClick={e=> {handleClick(e)}}>
                volver a cargar todos los paises</button>
            <div className={st.filtros}>
                <select onChange={e => handleSort(e)}>
                <option value="" disable selected hidden>
                {""} ordenar
                </option>
                    <option value= 'asc'>A-Z</option>
                    <option value= 'desc'>Z-A</option>
                    </select>
                    <select onChange={e => handleSortByPopulation(e)}>
                    <option value="" disable selected hidden>
                    {""} Poblacion
                    </option>
                    <option value= 'min'>Menor Poblacion</option>
                    <option value= 'max'>Mayor Poblacion</option>
                    
                    </select>
                <select onChange={e => handleFilterContinent(e)}>
                <option value="" disable selected hidden>
                {""} Continentes
                </option>
                    <option value='All'>Todos</option>
                    <option value='Asia'>Asia</option>
                    <option value='Americas'>América</option>
                    <option value='Africa'>África</option>
                    <option value='Antarctic'>Antartida</option>
                    <option value='Europe'>Europa</option>
                    <option value='Oceania'>Oceania</option>
                </select>
                <select onChange={e => handlefilterByActivities(e)}>
                <option value="" disable selected hidden>
                        {""}Actividades turísticas
                    </option>
                    <option value="todas">Todas</option>
                    {activities.map((activity) => (
                        <option key={activity.id} value={activity.name}>
                            {activity.name}
                        </option>
                    ))}
                </select>
                
                <SearchBar />
                
                <Paginado
                countriesPerPage={countriesPerPage}
                allCountries = {allCountries.length}
                paginado = {paginado}
                />
                <div className={s.cards_container}>
                    {currentCountries?.map((c) => {
                        return (
                            <div>
                                <Link to={"/countries/" + c.id}>
                                    <Card onClick={e=> {handleClick(e)}} name={c.name} image={c.flag} continent={c.continent} key={c.id} />
                                </Link>
                            </div>
                        )
                    })}
                </div>


                
            </div>
        </div>
    )
}