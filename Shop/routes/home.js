const {Router} = require('express')
const router = Router()

router.get('/', (req,res)=>{
    res.render('index',{
        title: 'Bosh saxifa',
        isHome:true
    })
})

module.exports = router