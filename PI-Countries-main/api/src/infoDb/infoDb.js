const axios = require ('axios');
const { Country, Activity } = require ('../db')

async function getApiInfo() {
    try {
        {
            const apiUrl = await axios.get('https://restcountries.com/v3/all');
                const apiInfo = apiUrl.data.map((el) => {
                    return {
                        id: el.cca3,
                        name: !el.translations.spa.common ? el.name.common : el.translations.spa.common,
                        flag: el.flags[0],
                        continent: el.region,
                        capital: el.capital ? el.capital[0] : "Not found",
                        subregion: el.subregion ? el.subregion : "Not found",
                        area: el.area,
                        population: el.population,
                };
            });
            apiInfo.forEach(async (el) => {
                await Country.findOrCreate({
                    where: {
                        name: el.name,
                        id: el.id,
                        flag: el.flag,
                        continent: el.continent,
                        capital: el.capital,
                        subregion: el.subregion,
                        area: el.area,
                        population: el.population,
                    },
                }
                );
            });
            console.log('DB cargada')
            return apiInfo;
        }


    } catch (error) {
        console.log(error);
    }
}

const getDbInfo = async () => {
    return await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name','difficulty','season', 'duration'],
            through: {
                attributes: []
            },            
        },
        
    });
};


//Ruta para obtener todos los paises
const getAllCountries  = async () => {
   // const apiInfo = await getApiInfo();
  //  const dbInfo = getDbInfo()
    const allCountries = await Country.findAll({include: Activity})
    return allCountries;
};

const getCountryName = async (name)=>{
    const countrys = await Country.findAll({include: Activity})
    const countryName = countrys.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    return countryName
}

const getCountryId = async(id)=>{
    let codeInMayus = id.toUpperCase() 
    let country = {}
    if(codeInMayus.length > 1){
    
        country=  await Country.findByPk(codeInMayus, {include: Activity})
        if (!country) return {}
        country = {
            id: country.id,
            name: country.name,
            flag: country.flag,
            region: country.region,
            capital: country.capital,
            subregion: country.subregion,
            area: country.area,
            population: country.population,
            activities: country.Activities.map((info)=>{
                return{
                    id: info.id,
                    name: info.name,
                    difficulty: info.difficulty,
                    duration: info.duration, 
                    season: info.season 
                }
            }) 
        }
    }
    
    console.log(country)
    return country
}


const getActivities = async () => {
    const activities = await Activity.findAll()
    console.log('actividad cargada')
    return activities;


}
module.exports = {getAllCountries, getApiInfo, getCountryName, getCountryId, getActivities}
