import express from "express";
import { ProductManager } from "./routers/productos.router.js";

const app = express()
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/productos", ProductManager);

app.get('/api/productos', (req, res) => {
    res.send(productos)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})