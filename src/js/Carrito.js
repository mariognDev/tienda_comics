import ProductoFisico from './ProductoFisico';
import ProductoDigital from './ProductoDigital';

class Carrito {
	#productos;

	constructor() {
		this.#productos = [];
	}

	//setter & getter

	setProductos(productos) {
		this.#productos = productos;
	}

	getProductos() {
		return this.#productos;
	}

	//search a id in array productos from carrito and return this object
	buscarProductoId(id) {
		return this.#productos.find((p) => p.getId() === id) || null;
	}

	//change the quantity of product in array productos
	cambiarCantidadProducto(id, cantidad) {
		const producto = this.buscarProductoId(id);
		const stockActual = producto.getStock();
		if (producto) {
			if (cantidad > 0) {
				producto.setStock(stockActual + 1);
			} else if (cantidad < 0 && stockActual > 1) {
				producto.setStock(stockActual - 1);
			} else if (cantidad < 0 && stockActual === 1) {
				this.borrarProducto(producto);
			}
		}
	}

	//add product in array productos
	anyadirProducto(producto, cantidad) {
		let productoNuevo;

		//create a copy of producto in productoNuevo

		if (producto instanceof ProductoFisico) {
			productoNuevo = new ProductoFisico(
				producto.getId(),
				producto.getName(),
				producto.getPrice(),
				cantidad,
				producto.getImage(),
				producto.getWeight()
			);
		} else if (producto instanceof ProductoDigital) {
			productoNuevo = new ProductoDigital(
				producto.getId(),
				producto.getName(),
				producto.getPrice(),
				cantidad,
				producto.getImage(),
				producto.getMb()
			);
		}

		const productoExistente = this.buscarProductoId(producto.getId());

		//if exist add one more in stock
		if (productoExistente) {
			productoExistente.setStock(productoExistente.getStock() + cantidad);
		} else {
			//if there is enough

			if (cantidad === 0) {
				alert('Esta intenando añadir 0 unidades al carrito');
				return;
			} else if (producto.getStock() >= cantidad) {
				productoNuevo.setStock(cantidad);

				this.#productos.push(productoNuevo);
			} else {
				alert('NO hay Stock suficiente');
				return;
			}
		}
	}

	// erase product in  cart (array productos)
	borrarProducto(producto) {
		const ProductoBorrar = this.buscarProductoId(producto.getId());
		// if there is enough, subtrac one in stock
		if (ProductoBorrar.getStock() > 1) {
			ProductoBorrar.setStock(ProductoBorrar.getStock() - 1);
		} else {
			this.#productos = this.#productos.filter((p) => p.getId() !== ProductoBorrar.getId());
			alert(`Producto ${ProductoBorrar.getName()} eliminado del carrito.`);
		}
	}

	// to find a name of product in cart (array productos)
	buscarProducto(nombre) {
		return (
			this.#productos.find((p) => p.getName().toLowerCase().includes(nombre.toLowerCase())) ||
			null
		);
	}
}

export default Carrito;
