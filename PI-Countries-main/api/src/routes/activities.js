const { Router } = require('express');
const router= Router();
//const {Activity} = require('../db')


// router.get('/', (req, res, next) => {
//     Activity.findAll()
//     .then((activities) => {
//         res.send(activities)
//     })
//     .catch((error) => {
//         next(error)
//     })
// })

// router.post('/', async (req, res, next) => {
//     try{
//         const activity = await Activity.findAll()
//         res.send(activity)
//     }catch (error){
//         next(error)
//     }

//     })

// router.post('/', (req, res, next) => {
//     const {name} = req.body
//     return Activity.create({name})
//     .then((newActivity) =>{
//         res.status(201).send(newActivity)
//     })
//     .catch(error => next(error))
// })


module.exports = router;