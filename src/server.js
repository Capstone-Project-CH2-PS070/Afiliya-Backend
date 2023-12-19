const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const ProductRoute = require('./routes/ProductRoute');
const ShopRoute = require('./routes/ShopRoute');
const UserRoute = require('./routes/UserRoute');
const OrderRoute = require('./routes/OrderRoute');
const AddressRoute = require('./routes/AddressRoute');

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ProductRoute);
app.use(ShopRoute);
app.use(UserRoute);
app.use(OrderRoute);
app.use(AddressRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
