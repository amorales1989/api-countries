import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getActivities, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./AddActivity.module.css"


function validate(input) {
    let errors = {};
    if (!input.name) {
        //input es mi estado local, si en mi estado lical no existe un name
        errors.name = "Nombre de la actividad requerido"; //en mi objeto errors voy a pner un string que diga "nombre requerido"
    } else if (!input.difficulty) {
        errors.difficulty = "Nivel de dificultad requerido";
    } else if (input.difficulty < 1 || input.difficulty > 5) {
        errors.difficulty = "Nivel de dificultad no valido (1-5)";
    } else if (!input.duration) {
        errors.duration = "Duración de la actividad requerida";
    } else if (input.duration > 24) {
        errors.duration = "Duración no valida (0hs-24hs)";
    } else if (input.season.length === 0) {
        errors.season = "Temporada de la actividad requerida";
    } else if (input.countries.length < 1) {
        errors.countries = "País/paises requeridos";
    }
    return errors;
}


export default function ActivityCreate() {
    const dispatch = useDispatch()
    const countries = useSelector((state) => state.countries)
    const history = useHistory();
    const [errors, setErrors] = useState({
        enablebutton: true,
    }); //estado local vacío para mostrar errores

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: [],
        countries: [], //lo seteo en un array para tener la posibilidad de poner más de una

    });

    const thereAreErrors = Object.values(errors).some((error) => error);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
    }

    function handleCheck(e) {
        console.log(e.target.value, e.target.checked)
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
        }
    }

console.log(input)

    function handleSelectCountries(e) {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }

    //     const selectCountry = JSON.parse(e.target.value);
    //     const val = input.countries(
    //         (countries) => countries.name === selectCountry.name
    //     );
    //     if (!val) {
    //         const newInput = {
    //             ...input,
    //             countries: [...input.countries, selectCountry],
    //             id: [...input.id, selectCountry.name],
    //         };
    //         setInput(newInput);
    //         setErrors(validate(newInput));
    //     }
    //     e.target.value = "";
    
    // console.log(input.id);

    function handleDelete(d) {
        const newInput = {
            ...input,
            countries: input.countries.filter((country) => country !== d), //filtro por todo lo que no sea esae elemento
        };
        console.log(newInput)
        setInput(newInput);
        setErrors(validate(newInput));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input)
        dispatch(postActivities(input));
        alert("Actividad creada");
        // setInput({
        //     name: "",
        //     difficulty: "",
        //     duration: "",
        //     season: [],
        //     countries: [],
        // });
        // //ya se creó la actividad llevame a ver si está creado - vuelve solo a home
        history.push("/countries");
    }

    useEffect(() => {
        dispatch(getCountries())
    }, []);

    return (
        <div>
            <Link to='/countries'><button>volver</button></Link>
            <h1>Crea tu Actividad!!!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="--Nombre de la actividad--" />
                </div>
                <div>
                    <input
                        type="range"
                        id="get"
                        name="difficulty"
                        value={input.difficulty}
                        min="1"
                        max="5"
                        step="1"
                        onChange={(e) => handleChange(e)}
                        className={s.input2}
                        required
                        // value="1"
                        list="difficulty"
                    />
                    <p>{input.difficulty}</p>
                    <datalist id="difficulty">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                    </datalist>
                    {/* <input type="text" id="put" /> */}
                </div>
                <div>
                    <label>Duracion:</label>
                    <input
                        type="number"
                        value={input.duration}
                        name="duration" 
                        onChange={(e) => handleChange(e)}/>
                </div>
                <div>
            <label className={s.alllabel}>Temporada / s:</label>
                    <fieldset className={s.divradio}>
                        {/* <legend>Temporada:</legend> */}
                        {/* <label>Temporada:</label> */}
                        <label>
                            <input
                                type="checkbox"
                                value="Summer"
                                onChange={(e) => handleCheck(e)}
                            // required
                            />
                            Verano
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='Autumn'
                                onChange={(e) => handleCheck(e)}
                            // required
                            />
                            Otoño
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='Winter'
                                onChange={(e) => handleCheck(e)}
                            // required
                            />
                            Invierno
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value='Spring'
                                onChange={(e) => handleCheck(e)}
                            // required
                            />
                            Primavera
                        </label>

                        {/* <select onChange={(e) => handleChangeSeason(e)} required> */}
                        {/* <option value="" disable selected hidden> Seleccionar una o más temporadas</option>  */}
                        {/* hidden -> oculta la opción */}
                        {/* {season.map((s) => (
                <option value={s} name="season">{s}</option>
              ))} */}

                        {/* </select> */}
                        {/* <ul>
            {input.season.map((s) => (
                <li>{s}</li>
              ))} */}
                        {/* ↑lista que va a tomar mi estado input.countries, y me va a renderizar cada cada cosa que vaya marcando en el select/ para ver lo que voy seleccionando */}
                        {/* </ul> */}
                    </fieldset>
                    {errors.season && ( //si existe un error en el nombre, entonces renderizame un p que diga el error
                        <p>{errors.season}</p>
                    )}
                </div>
                <select name="countries" onChange={(e) => handleSelectCountries(e)}
                value = ""
                >
                    <option value={""} disable selected hidden>
                        {" "}
                        --Seleccionar uno o más países--
                    </option>
                    {countries
                        .filter((country) =>(!input.countries.includes(country.id)))
                        .sort((a,b) => a.name.localeCompare(b.name))
                        .map((country) => (
                        <option value={country.id}>{country.name}</option>
                    ))}
                </select>
                <div>
                    {input.countries.map(country => (
                        <span>
                            {countries.find((c) => c.id ===  country).name }
                            <button type="button" onClick={() => handleDelete(country)}>x</button>
                        </span>
                    )) } 
                </div>
                <div>
                    <button type="Submit" >
                        {" "}
                        Crear
                    </button>
                </div>
            </form>
        </div>
    )

}
