class Producto {
	#id;
	#name;
	#price;
	#stock;
	#image;

	constructor(id, name, price, stock, image) {
		this.#id = id;
		this.#name = name;
		this.#price = price;
		this.#stock = stock;
		this.#image = image;
	}

	mostrarDetalles() {
		return `Id : ${this.#id}<br> 
                Nombre: ${this.#name} <br> 
                Precio: ${this.#price} € <br>
                Stock : ${this.#stock} uds<br>`;
	}

	//Setter

	setId(id) {
		this.#id = id;
	}

	setName(name) {
		this.#name = name;
	}

	setPrice(price) {
		this.#price = price;
	}

	setStock(stock) {
		this.#stock = stock;
	}

	//Getter

	getId() {
		return this.#id;
	}

	getName() {
		return this.#name;
	}

	getPrice() {
		return this.#price;
	}

	getStock() {
		return this.#stock;
	}

	getImage() {
		return this.#image;
	}
}

export default Producto;
