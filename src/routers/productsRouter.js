import express from "express";
import ProductManager from "../ProductManager.js";
export const productoRouter = express.Router();

const productos = new ProductManager("./productos.json");

productoRouter.get("/", async (req,res) => {
    try{
        const data = await productos.getProducts();
        const limit = req.query.limit;
        const limitProductos = limit ? data.slice(0, limit) : data;
        res.status(200).json(limitProductos)
    } catch (err){
        if (err){
            res.status(400).json({status: "error", msg: "Input Invalido", data: {} })
        } else {
            res.status(400).json({status: "error", msg: "error en el servidor",data: {} })
        }
    }
})

productoRouter.get("/:pid", async (req, res) => {
    try{
        const id = req.params.pid;
        const dataId = await productos.getProductById(parseInt(id));
        res.status(200).json(dataId);
    } catch (err){
        if (err){
            res.status(400).json({status: "error", msg: "Input Invalido", data: {} })
        } else {
            res.status(400).json({status: "error", msg: "error en el servidor",data: {} })
        }
    }
}
)

productoRouter.post("/", async (req, res) => {
    try {
        const data = await productos.getProducts();
        let nuevoProducto = req.body;
        let findProducto = (data.find((ele) => ele.code === nuevoProducto.code))
        if (findProducto){
            return res.status(400).json({
                status: "error",
                msg: "el producto ya existe",
            })
        }
    const camposObligatorios = ["title", "desc", "code", "price", "stock", "category", "thumbnail"]
    const allCampos = camposObligatorios.every(prop => nuevoProducto[prop]);
    if (nuevoProducto.id == undefined && allCampos){
        nuevoProducto = 
        {
            ...nuevoProducto, 
            id: (Math.random() * 10000000000000000).toFixed(0),
        }
        await productos.addProduct({...nuevoProducto, status: true})
        return res.status(200).json({
            status: "success",
            msg: "producto agregado correctamente",
            data: nuevoProducto
        })
    } else {
        res.status(400).json({
            status: "error",
            msg: "input invalido"
        })
    }
}   catch (err) {
        if (err) {
            res.status(400).json({status: "error", msg: "Input invalido" })
        } else {
            res.status(400).json({status: "error", msg: "error en el servidor"})
        }
    }
})

productoRouter.put("/:pid", async (req, res) => {
    try{
        const id = req.params.pid;
        const data = await productos.getProducts();
        let cambiarProducto = req.body;
        await productos.updateProduct(id, cambiarProducto);
        return res.status(200).json({status: "success", msg: "producto actualizado", data: cambiarProducto})
    } catch {
        res.status(400).json({status: "error", msg: "Input invalido", data: {}})
    }
})

productoRouter.delete("/:pid", async (req, res) => {
    try {
        const id = req.params.pid
        const data = await productos.getProducts();
        let findProducto = data.find((prod) => prod.id == id)
        if (!findProducto){
            return res.status(400).json(
                {status: "error", 
                msg: "producto no encontrado"
            })
        } else {
            await productos.deleteProduct(id);
            return res.status(200).json({status: "success", msg: "producto eliminado", data: {}})
        }
    } catch {
        res.status(400).json({status: "errror", msg:"input invalido", data: {}})
    }
}
)

productoRouter.get("*", (req, res) => {
        res.status(404).json({ status: "error", msg: "Ruta no encontrada", data: {} })
})
