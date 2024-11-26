import '../styles/main.css';
import ProductoFisico from './ProductoFisico.js';
import ProductoDigital from './ProductoDigital.js';
import Carrito from './Carrito.js';

const showCartButton = document.getElementById('cartOpen');
const closeCartButton = document.getElementById('close-cart');
const searchResult = document.getElementById('searchResult');
const searchButton = document.getElementById('searchButton');

const carrito = new Carrito();

const stockProduct = [
	new ProductoFisico(
		1,
		'One Piece',
		16.1,
		5,
		'https://m.media-amazon.com/images/I/91NxYvUNf6L._SL1500_.jpg',
		0.6
	),
	new ProductoDigital(
		2,
		'One Piece nº8 (Ebook)',
		8.07,
		5,
		'https://m.media-amazon.com/images/I/718RsRagEeL._SL1200_.jpg',
		2
	),
	new ProductoFisico(
		3,
		'Dragon Ball ',
		12.5,
		10,
		'https://m.media-amazon.com/images/I/91AMvvbvzhL._SL1500_.jpg',
		0.3
	),
	new ProductoDigital(
		4,
		'Dragon Ball (Ebook)',
		6.95,
		10,
		'https://m.media-amazon.com/images/I/91I06ckvIqL._SL1500_.jpg',
		1.44
	),
	new ProductoFisico(
		5,
		'Naruto: Shippuden ',
		15.95,
		7,
		'https://m.media-amazon.com/images/I/814QsOQM9UL._SL1500_.jpg',
		0.5
	),
	new ProductoDigital(
		6,
		'Naruto: Shippuden (Ebook)',
		7.95,
		10,
		'https://m.media-amazon.com/images/I/819EllbX-UL._SL1500_.jpg',
		1.2
	),
	new ProductoFisico(
		7,
		'El Castillo Ambulante',
		17.95,
		3,
		'https://m.media-amazon.com/images/I/71ddWg2987L._SL1452_.jpg',
		0.7
	),
	new ProductoDigital(
		8,
		'El Castillo Ambulante (Ebook)',
		8.95,
		5,
		'https://m.media-amazon.com/images/I/61sBm3xJTqL.jpg',
		2.5
	),
	new ProductoFisico(
		9,
		'Sailor Moon ',
		6.8,
		15,
		'https://m.media-amazon.com/images/I/61S47OLhklL._SL1000_.jpg',
		0.3
	),
	new ProductoDigital(
		10,
		'Sailor Moon (Ebook)',
		4.95,
		20,
		'https://m.media-amazon.com/images/I/61KrI5zASXL._SL1000_.jpg',
		1
	),
];

showProducts();

//to make visible the cart
showCartButton.addEventListener('click', () => {
	const cartSection = document.getElementById('cart');
	cartSection.classList.add('cart-open');
	if (carrito.getProductos().length === 0) {
		alert('El carrito está vacio');
	}
	showProducts();
});

// to close the cart
closeCartButton.addEventListener('click', () => {
	const cartSection = document.getElementById('cart');
	cartSection.classList.remove('cart-open');
});

//function to create one div per product
function showProducts() {
	const productList = document.getElementById('product-list');
	productList.innerHTML = ''; //clean

	//create one div per product in stockProduct
	stockProduct.forEach((product) => {
		const productItem = document.createElement('div');
		productItem.classList.add('product');
		const img = document.createElement('img');
		img.src = product.getImage();
		img.alt = product.getName();
		img.classList.add('product-image');
		productItem.innerHTML = `<p>${product.mostrarDetalles()}</p>
            <input type="number" id="${product.getId()}"class="quantity-input" min="0" value="0">
            <button class="add-to-cart" data-id="${product.getId()}">Selecciona</button>`;

		productItem.insertBefore(img, productItem.firstChild);
		productList.appendChild(productItem);
	});

	//before to create the products link the buton
	const addToCartButtons = document.querySelectorAll('.add-to-cart');
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id, 10); //get id of data-attribute

			addToCart(productId);
		});
	});
}

// to create a div in cart
function showItemCart() {
	const cartItemsContainer = document.getElementById('cart-items');
	cartItemsContainer.innerHTML = ''; // clean
	let total = 0;
	let totalkg = 0;
	let totalMB = 0;
	//create div per product in cart (array productos)
	carrito.getProductos().forEach((producto) => {
		const cartProducto = document.createElement('div');
		cartProducto.classList.add('cart-item');
		const img = document.createElement('img');
		img.src = producto.getImage();
		img.classList.add('product-img');

		const detallesProducto = document.createElement('p');
		detallesProducto.innerHTML = producto.mostrarDetalles();

		const buttonPlus = document.createElement('button');
		buttonPlus.classList.add('plus');
		buttonPlus.dataset.id = producto.getId();
		buttonPlus.textContent = '+';

		const buttonLess = document.createElement('button');
		buttonLess.classList.add('less');
		buttonLess.dataset.id = producto.getId();
		buttonLess.textContent = '-';

		const buttonDelete = document.createElement('button');
		buttonDelete.classList.add('delete');
		buttonDelete.dataset.id = producto.getId();
		buttonDelete.textContent = '🗑️';

		cartProducto.appendChild(img);
		cartProducto.appendChild(detallesProducto);
		cartProducto.appendChild(buttonPlus);
		cartProducto.appendChild(buttonLess);
		cartProducto.appendChild(buttonDelete);

		cartItemsContainer.appendChild(cartProducto);

		total += producto.getPrice() * producto.getStock();
		if (producto instanceof ProductoFisico) {
			totalkg += producto.getWeight() * producto.getStock();
		} else {
			totalMB += producto.getMb() * producto.getStock();
		}
	});

	document.getElementById('cart-total').textContent = total.toFixed(2);
	document.getElementById('cart-totalkg').textContent = totalkg.toFixed(2);
	document.getElementById('cart-totalMB').textContent = totalMB.toFixed(2);

	//before to create the products link the butons to add an subtract
	const addToCartButtons = document.querySelectorAll('.plus');
	addToCartButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id, 10);
			addOneToCart(productId);
		});
	});

	const lessToCartButtons = document.querySelectorAll('.less');
	lessToCartButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id, 10);
			lessToCart(productId);
		});
	});

	const deleteToCartButtons = document.querySelectorAll('.delete');
	deleteToCartButtons.forEach((button) => {
		button.addEventListener('click', (event) => {
			const productId = parseInt(event.target.dataset.id, 10);
			deleteToCart(productId);
		});
	});
}

//function to add product in cart
function addToCart(productId) {
	const product = foundStockProduct(productId);

	const quantityInput = document.getElementById(`${productId}`);
	const quantity = parseInt(quantityInput.value, 10);

	if (product) {
		if (product.getStock() >= quantity) {
			carrito.anyadirProducto(product, quantity); //add in cart
			alert('Producto añadido');

			product.setStock(product.getStock() - quantity); // reduce stock in stockProduct
		} else {
			alert('No hay suficiente Stock');
		}
	}

	showProducts();
	showItemCart();
}

//reduce or delete a product
function lessToCart(productId) {
	const productFromCart = carrito.buscarProductoId(productId);
	const product = foundStockProduct(productId);
	if (productFromCart) {
		carrito.borrarProducto(productFromCart); //delete in cart
		product.setStock(product.getStock() + 1); // add in stockProduct
	}
	showProducts();
	showItemCart();
}

// search product in array stockProduct by id
function foundStockProduct(id) {
	return stockProduct.find((p) => p.getId() === id) || null;
}

function deleteToCart(productoId) {
	const carritoProduct = carrito.buscarProductoId(productoId);
	if (carritoProduct) {
		carrito.setProductos(carrito.getProductos().filter((p) => p.getId() !== productoId));
		const stockProductItem = stockProduct.find((p) => p.getId() === productoId);
		if (stockProductItem) {
			stockProductItem.setStock(stockProductItem.getStock() + carritoProduct.getStock());
			alert(`Producto ${carritoProduct.getName()} eliminado del carrito.`);
		}
	}

	showItemCart();
	showProducts();
}

//function to add product in cart
function addOneToCart(productId) {
	const product = foundStockProduct(productId);

	if (product) {
		if (product.getStock() > 0) {
			carrito.cambiarCantidadProducto(productId, 1); //add in cart

			product.setStock(product.getStock() - 1); // reduce stock in stockProduct
		} else {
			alert('No hay suficiente Stock ');
		}
	}
	showProducts();
	showItemCart();
}

searchButton.addEventListener('click', cartSearchByName);

function cartSearchByName() {
	const inputSearch = document.getElementById('searchInput');
	const searchTerm = inputSearch.value.trim().toLowerCase();

	if (searchTerm === '') {
		alert('El campo de búsqueda está vacío');
	} else {
		const foundProduct = carrito.buscarProducto(searchTerm);

		if (foundProduct) {
			searchResult.innerHTML = `Producto encontrado <br>
                                     ${foundProduct.mostrarDetalles()}`;
		} else {
			searchResult.innerHTML = 'Producto no encontrado';
		}
	}
}
