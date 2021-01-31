import express from 'express';
import config from './config'
import { connectDatabase } from './database'
import ProductModel from './models/Product'
import CategoryModel from './models/Category'
import bodyParser from 'body-parser'
const app = express();

connectDatabase();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => res.send('API is running'));

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.PORT}`);
});
