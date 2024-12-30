const express = require('express')
const app = express();
require('dotenv').config()
const cors = require('cors');

const PORT = process.env.PORT || 10000;

const userConnect = require('./config/db.user');
const tokenConnect = require('./config/db.token');
const productConnect = require('./config/db.product');
const userRouter = require('./routes/user.route');
const authUserTask = require('./middlewares/authUser.middleware');
const productRouter = require('./routes/product.route');

app.use(cors(
    {
        origin: ['http://localhost:5173', 'https://warm-figolla-ad3dbf.netlify.app'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        preflightContinue: false,
        credentials: true,
        optionsSuccessStatus: 200,
    }))


app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
    try {
        return res.status(200).send(`server working fine`);
    } catch (error) {
        return res.status(500).send(`server not working fine:${error}`);

    }
})

app.listen(PORT, async () => {
    try {
        await userConnect;
        await tokenConnect;
        await productConnect;
        console.log(`server is running on ${PORT} and dbs connect to users and products`)
    } catch (error) {
        console.log(`error in server :${error}`)
    }
})