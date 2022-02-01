const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');


app.use(bodyParser.json({
    limit: '50mb'
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'HEAD, OPTIONS, GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization');
    next();
});

const cartRoutes = require('./app/components/cart/cartAPI');
const productRoutes = require('./app/components/product/productAPI');
const userRoutes = require('./app/components/user/userAPI');
const logs = require('./utils/logs');

app.use('/carts', cors(), cartRoutes);
app.use('/products', cors(), productRoutes);
app.use('/users', cors(), userRoutes);

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    logs.logError(err);
    res.render('error', { error: err });
}

app.listen(PORT, () => {
    console.log(`BlackthornShoppingCart app listening on port ${PORT}`);
})