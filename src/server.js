import express from "express";
import { productoRouter } from "./routers/productsRouter.js";
import { carritosRouter } from "./routers/cartRouter.js";

const app = express()
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/products", productoRouter)
app.use("/api/carts", carritosRouter)





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

export default app;