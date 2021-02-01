import express from 'express';
import config from './config'
import { connectDatabase } from './database'
import * as CategoryControllers from './controllers/Category'
import * as ProductControllers from './controllers/Product'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

connectDatabase();


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => res.send('API is running'));
app.get('/category/list', CategoryControllers.getCategories)
app.get('/category/:id', CategoryControllers.getCategoryById)
app.get('/product/list', ProductControllers.getProducts)
app.get('/product/:id', ProductControllers.getProductById)

app.listen(config.PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.PORT}`);
});
