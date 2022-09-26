
const initialState = {
    countries: [],
    allCountries: [],
    Activities: [],
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
                action.payload === "asc" ? state.countries.sort(function(a, b) {
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.countries.sort(function(a, b) {
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    countries: state.countries
                    
                }

        case "FILTER_BY_ACTIVITY":
            const allActivities = action.payload === 'Activities' ? state.allCountries.filter(el => el.Activities.length) :
                state.allCountries.filter(el => !el.Activities.length)
            return {
                ...state,
                Activities: state.Activities
            }

        default:
            return state;
    }
}

export default rootReducer;