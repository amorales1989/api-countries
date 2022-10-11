import axios from 'axios';

export function getCountries() {
    return async function (dispatch) {
        var json = await axios("http://localhost:3001/countries");
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}



export function postActivities(payload) {  //payload es el objeto que me llega por el formulario del front
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/activities", payload); //en esta ruta hacemos el post del payload
        // console.log(response);
        return response;
    }
};

export function getActivities() {
    return async function (dispatch) {
        var info = await axios("http://localhost:3001/activities", {

        });
        return dispatch({type: "GET_ACTIVITIES", payload: info.data});
    };
}

export function getNameCountry(name) {
    return async function (dispatch) {
        var json = await axios("http://localhost:3001/countries?name=" + name);
        return dispatch({
            type: "GET_NAME_COUNTRIES",
            payload: json.data
        })
    }
}

export function filterCountryByContinent(payload) {
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function orderByName(payload) {
    return {

        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload) {
    return {

        type: 'ORDER_BY_POPULATION',
        payload
    }
}

export function filterActivity(payload) {  //payload es el value de la opcion que se elija
    return {
        type: "FILTER_BY_ACTIVITIES",
        payload,
    };
}

export function getDetails(id){
    return async function(dispatch){
        
        const countryDetailByAxios=await axios.get(`http://localhost:3001/countries/search?id=${id}`);
        const countryDetail= await countryDetailByAxios.data
        
        return dispatch({
            type:'GET_DETAILS',
            payload:countryDetail
        })
    }
}
export function cleanDetails(){
    return function(dispatch){
        return dispatch({
            type:'CLEAN_DETAILS'
        })
    }
}