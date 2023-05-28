// DECLARANDO VARIABLE GLOBAL VACIA DONDE CARGA EL LOS DATOS DEL JSON //
let productos = [];

// DECLARANDO LA FUNCIÓN ASINCRÓNICA OBTENERPRODUCTOS
async function obtenerProductos() {
  try {
    // VERIFICA SI FETCH ESTÁ DEFINIDA
    if (typeof fetch !== 'undefined') {
      // SOLICITUD DEL FETCH PARA OBTENER EL JSON
      const productosJSON = await fetch('/assets/json/productos.json');
      // CONVIRTIENDO JSON EN JS
      const data = await productosJSON.json();
      // ASIGNADNDO LOS DATOS OBTENIDOS AL ARRYA DE PRODUCTOS
      productos = data;
    } else {
      // AVISO DE ERROR SI FETCH NO ESTÁ EN EL ENTORNO
      throw new Error('La función fetch no está disponible en este entorno.');
    }
  } catch (error) {
    // CAPTURA Y MUESTRA ERRORES OBTENIDOS DURANTE LA OBTENCIÓN DEL ARRAY
    console.error('Error al obtener los productos:', error);
  } finally {
    // MENSAJE DE CARGA FINALIZADA
    console.log('La función obtenerProductos ha finalizado');
  }
}

// LLAMANDO A OBTENERPRODUCTOS A LA ESPERA DE QUE SE COMPLETE
obtenerProductos().then(() => {
  // MUESTREO DE LOS PRODUCTOS DEL ARRAY EN LA CONSOLA
  console.log(productos);
}).catch(error => {
  // CAPTURA Y MUESTRA ERRORES OBTENIDOS DURANTE LA OBTENCIÓN DEL ARRAY
  console.error('ERROR AL CARGAR EL ARCHIVO JSON:', error);
}).finally(() => {
  // MENSAJE DE CONFIRMACIÓN DE CARGA DE LOS PRODUCTOS
  console.log('SE COMPLETÓ LA CARGA DE LOS OBJETOS DENTRO DEL ARRAY');
});


//DECLARACIONES DEL SCOPE GLOBAL
const contenedorProductos = document.querySelector("#productos-contenedor");
const botonesCategorias = document.querySelectorAll(".filtro-categoria");
let botonesAgregar = document.querySelectorAll(".agregar-producto");
const NumeroTotal = document.querySelector("#numero-cantidad");


// MOSTRANDO LA PÁGINA ORDENADA ALFABÉTICAMENTE POR MARCA Y NOMBRE AL CARGAR LA PÁGINA//
productos.sort((a, b) => {
    if (a.marca < b.marca) {
        return -1;
    }
    if (a.marca > b.marca) {
        return 1;
    }
    return a.nombre.localeCompare(b.nombre);
});

window.addEventListener("load", () => {
    cargarProductos(productos);
});

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
      <img class="producto-imagen" src=${producto.imagen} alt=${producto.nombre}>
      <div class="mas-info row col-10 mx-auto py-2 justify-content-between">
        <div class="col-auto align-items-center">
          <i class="fa-solid fa-crosshairs"></i>
          <span class="ml-1">${producto.sensibilidad}K</span>
        </div>
        <div class="col-auto align-items-center">
          <i class="fa-solid fa-weight-hanging"></i>
          <span class="ml-1">${producto.peso}gr</span>
        </div>
        <div class="col-auto align-items-center">
          <i class="fa-brands fa-usb"></i>
          <span class="ml-1">${producto.conexion}</span>
        </div>
      </div>
      <div class="producto-info">
        <h3 class="producto-titulo">${producto.nombre}</h3>
        <div class="row col-12 justify-content-between align-items-center p-0 m-0">
          <h4 class="producto-marca col-auto text-start p-0">${producto.marca}</h4>
          <p class="producto-precio col-auto text-end p-0">$${Number(producto.precio).toLocaleString('es-AR', {minimumFractionDigits: 2})}</p>
          <button class="agregar-producto col-8 my-4 m-auto" id=${producto.id}><i class="icono-agregar fa-solid fa-cart-circle-plus"></i> Agregar</button>
        </div>
      </div>
    `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active2"));
        e.currentTarget.classList.add("active2");

        const categoriaSeleccionada = e.currentTarget.id.split("-")[1];
        let productosFiltrados = [];

        if (categoriaSeleccionada === "todos" || categoriaSeleccionada === "corsair" || categoriaSeleccionada === "logitech" || categoriaSeleccionada === "razer" || categoriaSeleccionada === "rog" || categoriaSeleccionada === "steelseries" || categoriaSeleccionada === "vaxee" || categoriaSeleccionada === "zowie") {
            // FILTRO POR MARCA CON PRIORIDAD ALFABETICA EN MARCA Y LUEGO NOMBRE
            const marcaSeleccionada = categoriaSeleccionada === "todos" ? "" : categoriaSeleccionada;
            productosFiltrados = productos.filter(producto => producto.marca.toLowerCase().includes(marcaSeleccionada.toLowerCase()));
            // FILTRO POR MARCA CON PRIORIDAD ALFABETICA EN NOMBRE
            productosFiltrados.sort((a, b) => {
                if (a.marca < b.marca) {
                    return -1;
                }
                if (a.marca > b.marca) {
                    return 1;
                }
                return a.nombre.localeCompare(b.nombre);
            });
        } else {
            // FILTRO POR PRECIO, SENSIBILIDAD, PESO Y CONEXION
            switch (categoriaSeleccionada) {
                case "precio":
                    productosFiltrados = productos.sort((a, b) => a.precio - b.precio);
                    break;
                case "sensibilidad":
                    productosFiltrados = productos.sort((a, b) => {
                        if (a.sensibilidad === b.sensibilidad) {
                            if (a.marca === b.marca) {
                                return a.nombre.localeCompare(b.nombre);
                            }
                            return a.marca.localeCompare(b.marca);
                        }
                        return b.sensibilidad - a.sensibilidad;
                    });
                    break;
                case "peso":
                    productosFiltrados = productos.sort((a, b) => {
                        if (a.peso === b.peso) {
                            if (a.marca === b.marca) {
                                return a.nombre.localeCompare(b.nombre);
                            }
                            return a.marca.localeCompare(b.marca);
                        }
                        return a.peso - b.peso;
                    });
                    break;
                case "conexion":
                    const wirelessProducts = productos.filter(producto => producto.conexion === "Wireless")
                        .sort((a, b) => (a.marca + a.nombre).localeCompare(b.marca + b.nombre));
                    const ambosProducts = productos.filter(producto => producto.conexion === "Ambos")
                        .sort((a, b) => (a.marca + a.nombre).localeCompare(b.marca + b.nombre));
                    const cableProducts = productos.filter(producto => producto.conexion === "Cable")
                        .sort((a, b) => (a.marca + a.nombre).localeCompare(b.marca + b.nombre));
                    productosFiltrados = wirelessProducts.concat(ambosProducts, cableProducts);
                    break;
                default:
                    productosFiltrados = productos;
            }
        }
        cargarProductos(productosFiltrados);
    });
});


//REASIGNANDO CADA BOTON DE AGREGAR PRODUCTO PARA EVITAR QUE SE VUELVAN A CARGAR CADA VEZ QUE CAMBIO DE FILTRO//
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar-producto");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroTotal();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumeroTotal();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumeroTotal() {
    let nuevoNumeroTotal = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    NumeroTotal.innerText = nuevoNumeroTotal;

}