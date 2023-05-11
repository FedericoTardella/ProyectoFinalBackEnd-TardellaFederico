import fs from "fs"

export default class CartManager{
    constructor(path) {
        this.path = path;
        if (fs.existsSync(path)) {
            const productosString = fs.readFileSync(this.path, "utf-8")
            const productosFile = JSON.parse(productosString)
            this.productos = productosFile
        } else {
            fs.writeFileSync(path, "[]")
            this.productos = []
        }
    }

    async addCart(object){
        try{
            const data = await this.getCarts()
            if (data.length > 0){ 
                const ultimoId = data[data.length - 1].id + 1
                const nuevoCarrito = { ... object, id: ultimoId}
                data.push(nuevoCarrito)
                const productosString = JSON.stringify(data, null, 2)
                fs.writeFileSync(this.path, productosString)
                return nuevoCarrito
            } else {
                const nuevoCarrito = { ...object, id: 1}
                data.push(nuevoCarrito)
                const productosString = JSON.stringify(data, null, 2)
                fs.writeFileSync(this.path, productosString)
                return nuevoCarrito
            }
        }   catch (err){
            console.log(err)
        }
    }

    async getCartById(id){
        try{
            const data = await this.getCarts()
            const carrito = data.find((carrito) => carrito.id === id);
            if (carrito){
                return carrito;
            } else{
                return (`no existe el carrito con el id: ${id}`);
            }
        } catch (err){
            console.log(err)
        }
    }

    async updateCart(id, productoId){
        const data = await this.getCarts()
        const carrito = data.find((carrito) => carrito.id == id);
        if(carrito){
            const producto = carrito.productos.find((producto) => producto.idProducto == productoId);
            if (producto){
                producto.quantity = producto.quantity + 1
                const index = carrito.productos.indexOf(producto)
                carrito.productos.splice(index, 1, producto)
                const indexCarrito = data.indexOf(carrito)
                data.splice(indexCarrito, 1, carrito)
                const productosString = JSON.stringify(data, null, 2)
                fs.writeFileSync(this.path, productosString)
                return producto
            } else {
                carrito.productos.push({idProducto: productoId, quantity: 1})
                const indexCarrito = data.indexOf(carrito)
                data.splice(indexCarrito, 1, cart)
                const productosString = JSON.stringify(data, null, 2)
                fs.writeFileSync(this.path, productosString)
            }
        } else {
            return ("el carrito no existe");
        }
    } catch (err){
        console.log(err)
    }

    async getCarts(){
        if (!fs.existsSync("carrito.json")){
            fs.writeFileSync("carrito.json", "[]", "utf-8")
            return ("carrito creado")
        } else {
            const leer = await fs.promises.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            return data
        }
    }

    async deleteCart(id){
        try{
            const data = await this.getCarts()
            const carrito = data.finde((carrito) => carrito.id == id);
            if (carrito){
                const index = data.indexOf(carrito)
                data.splice(index, 1)
                const productosString = JSON.stringify(data, null, 2)
                fs.writeFileSync(this.path, productosString)
                return ("carrito eliminado");
            } else {
                return ("no existe el carrtio");
            }
        } catch (err){
            console.log(err)
        }
    }

    async deleteAll(){
        try{
            fs.writeFileSync("carts.json", "[]", "utf-8")
            return ("carritos eliminados");
        } catch (err){
            console.log(err)
        }
    }
}