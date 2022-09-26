const { Router,json } = require('express');
const {getAllCountries,getCountryName,getCountryId,getActivities} = require('../infoDb/infoDb')
const {Country, Activity} = require ('../db')
const router = Router();


router.use(json())
router.get('/countries', async (req, res) => {
    try {
        const { name } = req.query
        let countries = await getAllCountries();
        if (name) {
            try {
                let countryName = await getCountryName(name)
                if (countryName.length !== 0) {  //← validar para que no se rompa el form con el !==0 
                    res.status(200).json(countryName)
                } else {
                    throw ("the country does not exist")
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            res.json(countries)
        }

    } catch (error) {
        console.log('something went wrong ')

    }
})

router.get('/countries/:id', async (req, res) => {
    const  idCountry  = req.params.id
    const country = await getCountryId(idCountry)
    console.log(country)
    res.send(country)
})


router.post('/activities', async (req, res) => {
    let {name, difficulty, duration, season, countryId} = req.body
    let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        countryId
    });
    console.log(newActivity)

    const countrieDb = await Country.findAll({
        where: {
            id: countryId,
        }
    })
    newActivity.addCountries(countrieDb)
    res.status(200).send(newActivity);
});

    router.get('/activities', async (req, res) =>{
        const activities = await getActivities();
        res.status(200).send(activities);
    })



module.exports = router
