const express = require('express')
const path = require('path')
const csrf = require('csurf')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const varMiddleware = require('./middleware/variables')
const userMiddleware = require('./middleware/user')
const keys = require('./keys/')
const app = express()




// hbs use
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',

    runtimeOptions: {
        allowedProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})
// MongoStore
const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGODB_URI
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


// public use
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

// routes use
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')
const cardRoutes = require('./routes/card')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')



// routes
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)


const PORT = process.env.PORT || 3000

async function start() {
    try {


        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`Express working on ${PORT} port`);
        })
    }
    catch (err) {
        console.log(err);
    }
}
start()

// d=).rns4X8E@pC:11
// d=).rns4X8E@pC:AADD
// P@qWJ9a6iyZrb/;1
// Hek28Sb4vcz*nv61
// Hek28Sb4vcz*nv612
// E@Q44@7W+W,p`?s1
// aWm-WB=kCudMe3W3