import express from "express";
import fs from "fs"

export class ProductManager{
    constructor(path) {
        this.path = path;
        if (fs.existsSync(path)) {
            const productosString = fs.readFileSync(this.path, "utf-8")
            const productosFile = JSON.parse(productosString)
            this.products = productosFile
        } else {
            fs.writeFileSync(path, "[]")
            this.productos = []
        }
    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.file, JSON.stringify(data, null, 2)
            )
        } catch (err){
            console.log(`error: ${err}`);
        }
    }
    getAll = async() => {
        try{
            const productos = await fs.promises.readFile(this.file, "utf-8");
            return JSON.parse(productos);
        } catch (err){
            if(err.message.includes(`el archivo no fue encontrado`)) return[];
            console.log(`error: ${err}`);
        }
    }
    addProduct = async obj =>{
        const data = await this.getProduct()
        if (obj) {
            if (data.find((productos) => productos.code === obj.code)) {
                return ("El producto Existe");
            } else {
                data.push(obj);
                const productosString = JSON.stringify(data, null, 2)
                await fs.promises.writeFile(this.path, productosString)
            }
        }
    }
    getProduct = async obj =>{
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        return productosFile
    }
    getProductById = async id => {
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        const product = productosFile.find((productos) => productos.id === id);
        if (product) {
            return productos;
        } else {
            return ("No existe el producto");
        }
    }
    updateProduct = async id =>{
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        const productos = productosFile.find((productos) => productos.id == id);
        if (productos) {
            const updateProductos = { ...productos, ...object }
            const index = productosFile.indexOf(productos)
            productosFile.splice(index, 1, updateProductos)
            const productosString = JSON.stringify(productosFile, null, 2)
            await fs.promises.writeFile(this.path, productosString)
            return productos;
        }
    }
    deleteById = async id => {
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        const productos = productosFile.find((productos) => productos.id == id);
        if (productos) {
            const index = productosFile.indexOf(product)
            productosFile.splice(index, 1)
            const productosString = JSON.stringify(productosFile, null, 2)
            await fs.promises.writeFile(this.path, productosString)
            return productos;
        }
    }
}
}
