let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("oculto");
        contenedorCarritoProductos.classList.remove("oculto");
        contenedorCarritoAcciones.classList.remove("oculto");
        contenedorCarritoComprado.classList.add("oculto");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src=${producto.imagen} alt=${producto.nombre}>
                <div class="carrito-producto-titulo col-2">
                    <small>Producto</small>
                    <h3>${producto.nombre}</h3>
                </div>
                <div class="carrito-producto-cantidad col-2">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio col-2">
                    <small>Precio</small>
                    <p>$${Number(producto.precio).toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
                </div>
                <div class="carrito-producto-subtotal col-2">
                <small>Subtotal</small>
                <p>$${Number(producto.precio * producto.cantidad).toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
                </div>
                <button id="${producto.id}" class="carrito-producto-eliminar col-auto"><i class="fa-solid fa-trash-xmark"></i></button>
            `;
            contenedorCarritoProductos.append(div);
        })

    } else {

        contenedorCarritoVacio.classList.remove("oculto");
        contenedorCarritoProductos.classList.add("oculto");
        contenedorCarritoAcciones.classList.add("oculto");
        contenedorCarritoComprado.classList.add("oculto");
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

//VA A VARGAR TODO LO QUE ESTÉ EN EL LS//
cargarProductosCarrito();



function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    const totalFormateado = Number(totalCalculado).toLocaleString('es-AR', {
        minimumFractionDigits: 2
    });
    total.innerText = `$${totalFormateado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("oculto");
    contenedorCarritoProductos.classList.add("oculto");
    contenedorCarritoAcciones.classList.add("oculto");
    contenedorCarritoComprado.classList.remove("oculto");

}