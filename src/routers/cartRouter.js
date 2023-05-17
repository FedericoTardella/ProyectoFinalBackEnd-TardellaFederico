import express from "express";
import ProductManager from "../ProductManager.js";
import CartManager from "../cartManager.js";
export const carritosRouter = express.Router();


const productos = new ProductManager("./productos.json")
const carritos = new CartManager("./carritos.json")

carritosRouter.get("/", async (req, res) => {
    try{
        const data = await carritos.getCarts();
        await carritos.addCart({productos: []})
        res.status(200).json(data)
    } catch (err){
        if (err){
            res.status(400).json({status: "error", msg: "input invalido", data: {}})
        } else {
            res.status(400).json({status: "error", msg: "error en el servidor", data: {}})
        }
    }
})

carritosRouter.post("/", async (req, res) => {
    try {
        const data = await carritos.getCarts();
        await carritos.addCart({ productos: [] })
        res.status(200).json(data)
    } catch (err) {
        if (err) {
            res.status(400).json({ status: "error", msg: "input invalido", data: {} })
        } else {
            res.status(400).json({ status: "error", msg: "error en el servidor", data: {} })
        }
    }
}
)

carritosRouter.get("/:cid", async (req, res) => {
    try {
        const dataCarritos = await carritos.getCarts()
        const id = req.params.cid
        const dataId = await carritos.getCartById(parseInt(id));
        if (dataId){
            res.status(200).json(dataId)
        } else {
            res.status(400).json(`No existe el carrito con el id: ${id}`)
        }
    } catch{
        res.status(400).json({status: "error", msg: "error en el servidor", data: {}})
    }
})

carritosRouter.post("/:cid/product/:pid", async (req, res) => {
    try{
        const dataCarritos = await carritos.getCarts()
        const dataProductos = await productos.getProducts()
        const carritoId = req.params.cid
        const productoId = req.params.pid
        const carritoFound = dataCarritos.find((ele) => ele.id == carritoId)
        if (!carritoFound){
            res.status(200).json(`No existe el carrito con el id: ${cartId}`)
        }
        const productoFound = dataProductos.find((ele) => ele.id == parseInt(productoId))
        if (!productoFound) {
            res.status(200).json(`No existe el producto con el id: ${productoId}`)
        }
        const producto = await carritos.updateCart(parseInt(carritoId), parseInt(productoId))
        res.status(200).json(producto)
    } catch {
        res.status(500).json({ status: "error", msg: "Error en el servidor", data: {} })
    }
})

carritosRouter.get("*", (req, res) => {
    res.status(400).json({ status: "error", msg: "ruta no encontrada", data: {} })
})

