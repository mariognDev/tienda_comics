import Producto from './Producto';

class ProductoDigital extends Producto {
	#mb;

	constructor(id, name, price, stock, image, mb) {
		super(id, name, price, stock, image);
		this.#mb = mb;
	}

	mostrarDetalles() {
		return `${super.mostrarDetalles()} Tamaño de archivo: ${this.#mb} MB <br>`;
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

	setMb(mb) {
		this.#mb = mb;
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

	getMb() {
		return this.#mb;
	}

	getImage() {
		return super.getImage();
	}
}

export default ProductoDigital;
