
const initialState = {
    countries: [],
    allCountries: [],
    details: [],
    allActivities: [],
    activities: [],
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case `GET_COUNTRIES`:
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const continentFiltered = action.payload === 'All' ? allCountries :
                allCountries.filter(el => el.continent === action.payload)
            return {
                ...state,
                countries: continentFiltered
            }

        case 'ORDER_BY_NAME':
            action.payload === "asc" ? state.countries.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1
                }
                return 0
            }) :
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                countries: state.countries

            }

            case 'ORDER_BY_POPULATION':
            action.payload === "min" ? state.countries.sort(function (a, b) {
                if (a.population > b.population) {
                    return 1
                }
                if (b.population > a.population) {
                    return -1
                }
                return 0
            }) :
                state.countries.sort(function (a, b) {
                    if (a.population > b.population) {
                        return -1
                    }
                    if (b.population > a.population) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                countries: state.countries

            }

        case 'GET_NAME_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }

            case "POST_ACTIVITIES":
                return {
                  ...state,  //el estado me lo deja como está, me crea una ruta nueva
                };
        case 'GET_ACTIVITIES':
            //console.log(action.payload)
            return {
                ...state,
                activities: action.payload,
            }    

        case "FILTER_BY_ACTIVITIES":
            const countries = state.allCountries
            console.log(countries,action.payload)
            const countriesFiltered = countries
            .filter((c) => { return c.Activities?.find((c) => { return c.name === action.payload; }); });

            if (action.payload === 'todas') {
                return { ...state, countries: countries.filter((country) => country.Activities?.length > 0) }
            } else {
                return {
                    ...state,
                    countries: countriesFiltered
                }
            }  
            
            case 'GET_DETAILS':{
                return{
                    ...state,
                    details:action.payload
                }
            }
            case 'CLEAN_DETAILS':{
                return{
                    ...state,
                    details:[]
                }
            }
        default:
            return state;
    }
}

export default rootReducer;