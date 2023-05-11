import fs from "fs"

export default class ProductManager {
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

    async addProduct(obj) {
        const data = await this.getProducts()
        if (obj) {
            if (data.find((producto) => producto.code === obj.code)) {
                return ("El producto ya existe");
            } else {
                data.push(
                    obj
                );
                const productosString = JSON.stringify(data, null, 2)
                await fs.promises.writeFile(this.path, productosString)
            }
        }
    }

    async getProducts() {
        const productsString = await fs.promises.readFile(this.path, "utf-8")
        const productsFile = JSON.parse(productsString)
        return productsFile
    }

    async getProductById(id) {
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        const producto = productosFile.find((producto) => producto.id == id);
        if (producto) {
            return producto;
        } else {
            return ("No existe el producto");
        }
    }

    async updateProduct(id, object) {
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        const producto = productosFile.find((producto) => producto.id == id);
        if (producto) {
            const updateproducto = { ...producto, ...object }
            const index = productosFile.indexOf(producto)
            productosFile.splice(index, 1, updateproducto)
            const productosString = JSON.stringify(productosFile, null, 2)
            await fs.promises.writeFile(this.path, productosString)
            return producto
        }
    }

    async deleteProduct(id) {
        const productosString = await fs.promises.readFile(this.path, "utf-8")
        const productosFile = JSON.parse(productosString)
        const producto = productosFile.find((producto) => producto.id == id);
        if (producto) {
            const index = productosFile.indexOf(producto)
            productosFile.splice(index, 1)
            const productosString = JSON.stringify(productosFile, null, 2)
            await fs.promises.writeFile(this.path, productosString)
            return producto
        }
    }
}
