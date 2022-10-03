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
    try {
        
        let {name, difficulty, duration, season, countries} = req.body
        let newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        });
        console.log(newActivity)
    
        const countrieDb = await Country.findAll({
            where: {
                id: countries,
            }
        })
        console.log(countrieDb)
        await newActivity.addCountries(countrieDb)
        const Act = await Activity.findOne({where: {id:newActivity.id}, include:Country})
        res.status(200).send(Act);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
});

    router.get('/activities', async (req, res) =>{
        const activities = await getActivities();
        res.status(200).send(activities);
    })

    


module.exports = router
