import Producto from './Producto.js';

class ProductoFisico extends Producto {
	#weight;

	constructor(id, name, price, stock, image, weight) {
		super(id, name, price, stock, image);
		this.#weight = weight;
	}

	mostrarDetalles() {
		return `${super.mostrarDetalles()}\nPeso: ${this.#weight} kg`;
	}

	//setter

	setId(id) {
		super.setId(id);
	}

	setName(name) {
		super.setName(name);
	}

	setPrice(price) {
		super.setPrice(price);
	}

	setStock(stock) {
		super.setStock(stock);
	}

	setWeight(weight) {
		this.#weight = weight;
	}

	//getter

	getId() {
		return super.getId();
	}

	getName() {
		return super.getName();
	}

	getPrice() {
		return super.getPrice();
	}

	getStock() {
		return super.getStock();
	}

	getImage() {
		return super.getImage();
	}

	getWeight() {
		return this.#weight;
	}

	getImage() {
		return super.getImage();
	}
}

export default ProductoFisico;
