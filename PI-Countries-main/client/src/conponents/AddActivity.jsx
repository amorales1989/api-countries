import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivities, getActivities, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./AddActivity.module.css"




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
    function validate() {
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
        } else if (input.duration > 120 && input.duration < 1) {
            errors.duration = "Duración no valida (1min - 120min)";
        } else if (input.season.length === 0) {
            errors.season = "Temporada de la actividad requerida";
        } else if (input.countries.length < 1) {
            errors.countries = "País/paises requeridos";
        }
        return errors;
    }

    const thereAreErrors = Object.values(errors).some((error) => error);

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
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



    function handleSelectCountries(e) {
        if (!input.countries.includes(e.target.value)){
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }
}

    function handleDelete(d) {
        const newInput = {
            ...input,
            countries: input.countries.filter((country) => country !== d), //filtro por todo lo que no sea ese elemento
        };
        console.log(newInput)
        setInput(newInput);
        setErrors(validate(newInput));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(validate(input));
		const errorCompletarFormu = validate(input);
		if (Object.values(errorCompletarFormu).length !== 0 || !input.countries) {
			alert("Todos los campos deben ser requeridos");
		} else {
        dispatch(postActivities(input));
        alert("Actividad creada");
 //ya se creó la actividad llevame a ver si está creado - vuelve solo a home
        history.push("/countries");
    }
}

    useEffect(() => {
        dispatch(getCountries())
    }, []);

    return (
        <div className={s.form}>
            <div className={s.volver}>
            <Link to='/countries'><button>volver</button></Link>
            </div>
            <h1 className={s.titulo}>Crea tu Actividad!!!</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={s.formulario}>
                <div>
                    <label  className={s.display}>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        placeholder="--Nombre de la actividad--"
                        required/>
                </div>
                <div>
                <label className={s.display}>Dificultad:</label>
                <select
						name="difficulty"
						value={input.difficulty}
						className=""
						onChange={e => handleChange(e)}
					>
						<option value="">Selecciona la dificultad</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						{errors.difficulty && <p className="error">{errors.difficulty}</p>}
					</select>
                    
                </div>
                <div>
                    <label className={s.display}>Duracion en minutos:</label>
                    <input
                        type="number"
                        value={input.duration}
                        name="duration"
                        autocomplete="off"
                        min="1"
                        max="120"
                        onChange={e => handleChange(e)}
                    />
                    {errors.duration && <p className="error">{errors.duration}</p>}
                </div>
                <div>
					<label className={s.display}>Estación del año</label>
					<select
						value={input.season}
						name="season"
						onChange={e => handleChange(e)}
					>
						<option value="">Selecciona la estación</option>
						<option value="Summer">Verano</option>
						<option value="Autumn">Otoño</option>
						<option value="Winter">Invierno</option>
						<option value="Spring">Primavera</option>
						{errors.season && <p className="error">{errors.season}</p>}
					</select>
				</div>
                <label className={s.display}>País</label>
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
                    <button type="Submit" className={s.submit}>
                        {" "}
                        Crear
                    </button>
                </div>
            </form>
            
			
        </div>
    )

}
