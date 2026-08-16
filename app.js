const productos = [
    {
        id: 1,
        nombre: "pastel",
        categoria: "Entradas",
        precio: 24,
        descripcion: "Empanada frita de queso.",
        imagen: ""
    },

    {
        id: 2,
        nombre: "empanada",
        categoria: "Entradas",
        precio: 15,
        descripcion: "Empanadas de queso horneadas.",
        imagen: ""
    },

    {
        id: 3,
        nombre: "...",
        categoria: "Entradas",
        precio: 14,
        descripcion: "....",
        imagen: ""
    },

    {
        id: 4,
        nombre: "donas",
        categoria: "Postres",
        precio: 12,
        descripcion: "masa frita con un glaseado encima.",
        imagen: ""
    },

    {
        id: 5,
        nombre: "...",
        categoria: "Postres",
        precio: 22,
        descripcion: "Cheesecake cremoso con té matcha.",
        imagen: ""
    },

    {
        id: 6,
        nombre: "....",
        categoria: "Postres",
        precio: 16,
        descripcion: "Panqueques japoneses con relleno dulce.",
        imagen: ""
    },

    {
        id: 7,
        nombre: "Café Latte",
        categoria: "Bebidas",
        precio: 18,
        descripcion: "Café espresso con leche vaporizada.",
        imagen: ""
    },

    {
        id: 8,
        nombre: "Tés",
        categoria: "Bebidas",
        precio: 20,
        descripcion: "Tés de diferentes hierbas.",
        imagen: ""
    },

    {
        id: 9,
        nombre: "Api",
        categoria: "Bebidas",
        precio: 14,
        descripcion: "Una bebida hecha de maiz morado y amarillo.",
        imagen: ""
    },

    {
        id: 10,
        nombre: "Agua",
        categoria: "Bebidas",
        precio: 16,
        descripcion: "El especial de la casa.",
        imagen: ""
    }

];


let carrito = [];

let categoriaActual = "Todos";


const contenedor =
    document.getElementById("productos");


// =====================================
// MOSTRAR MENU
// =====================================

function mostrarProductos() {

    let lista = productos;

    if (categoriaActual !== "Todos") {

        lista =
            productos.filter(
                producto =>
                    producto.categoria === categoriaActual
            );
    }


    contenedor.innerHTML = "";


    lista.forEach(producto => {

        const tarjeta =
            document.createElement("article");

        tarjeta.className = "producto";


        tarjeta.innerHTML = `

            <div class="producto-img">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">

            </div>

            <div class="producto-info">

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    ${producto.descripcion}
                </p>

                <div class="producto-abajo">

                    <span class="precio">
                        Bs ${producto.precio.toFixed(2)}
                    </span>

                    <button
                        class="btn"
                        onclick="agregar(${producto.id})">

                        Agregar

                    </button>

                </div>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


// =====================================
// FILTROS
// =====================================

document
    .querySelectorAll(".categoria")
    .forEach(boton => {

        boton.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".categoria")
                    .forEach(
                        b =>
                            b.classList.remove("activa")
                    );


                boton.classList.add("activa");


                categoriaActual =
                    boton.dataset.categoria;


                mostrarProductos();

            }
        );

    });


// =====================================
// CARRITO
// =====================================

function agregar(id) {

    const existente =
        carrito.find(
            producto =>
                producto.id === id
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: id,

            cantidad: 1

        });

    }


    actualizarCarrito();

    abrirCarrito();

}


function cambiarCantidad(id, cambio) {

    const producto =
        carrito.find(
            item =>
                item.id === id
        );


    if (!producto) return;


    producto.cantidad += cambio;


    if (producto.cantidad <= 0) {

        carrito =
            carrito.filter(
                item =>
                    item.id !== id
            );

    }


    actualizarCarrito();

}


function actualizarCarrito() {

    const contenedorCarrito =
        document.getElementById(
            "itemsCarrito"
        );


    contenedorCarrito.innerHTML = "";


    let total = 0;

    let cantidad = 0;


    carrito.forEach(item => {

        const producto =
            productos.find(
                p =>
                    p.id === item.id
            );


        const subtotal =
            producto.precio *
            item.cantidad;


        total += subtotal;

        cantidad += item.cantidad;


        const elemento =
            document.createElement("div");


        elemento.className = "item";


        elemento.innerHTML = `

            <div>

                <h4>
                    ${producto.nombre}
                </h4>

                <p>
                    Bs ${subtotal.toFixed(2)}
                </p>

            </div>


            <div class="controles">

                <button
                    onclick="cambiarCantidad(
                        ${producto.id},
                        -1
                    )">

                    −

                </button>

                <strong>
                    ${item.cantidad}
                </strong>

                <button
                    onclick="cambiarCantidad(
                        ${producto.id},
                        1
                    )">

                    +

                </button>

            </div>

        `;


        contenedorCarrito.appendChild(
            elemento
        );

    });


    document.getElementById(
        "cantidadCarrito"
    ).textContent = cantidad;


    document.getElementById(
        "totalCarrito"
    ).textContent =
        total.toFixed(2);

}


// =====================================
// ABRIR CARRITO
// =====================================

function abrirCarrito() {

    document
        .getElementById("carrito")
        .classList.add("activo");

    document
        .getElementById("fondoCarrito")
        .classList.add("activo");

}


function cerrarCarrito() {

    document
        .getElementById("carrito")
        .classList.remove("activo");

    document
        .getElementById("fondoCarrito")
        .classList.remove("activo");

}


document
    .getElementById("abrirCarrito")
    .addEventListener(
        "click",
        abrirCarrito
    );


document
    .getElementById("cerrarCarrito")
    .addEventListener(
        "click",
        cerrarCarrito
    );


document
    .getElementById("fondoCarrito")
    .addEventListener(
        "click",
        cerrarCarrito
    );


// =====================================
// PEDIDO
// =====================================

document
    .getElementById("confirmarPedido")
    .addEventListener(
        "click",
        () => {

            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío 🛒"
                );

                return;
            }


            const nombre =
                document
                    .getElementById("cliente")
                    .value
                    .trim();


            const telefono =
                document
                    .getElementById("telefonoPedido")
                    .value
                    .trim();


            if (!nombre || !telefono) {

                alert(
                    "Escribe tu nombre y teléfono."
                );

                return;
            }


            const total =
                carrito.reduce(
                    (suma, item) => {

                        const producto =
                            productos.find(
                                p =>
                                    p.id === item.id
                            );

                        return suma +
                            producto.precio *
                            item.cantidad;

                    },
                    0
                );


            alert(
                "🦊 ¡Pedido recibido!\\n\\n" +
                "Cliente: " +
                nombre +
                "\\n" +
                "Total: Bs " +
                total.toFixed(2) +
                "\\n\\n" +
                "Gracias por elegir Kitsune Kissaten."
            );


            carrito = [];

            actualizarCarrito();

            document
                .getElementById("cliente")
                .value = "";

            document
                .getElementById("telefonoPedido")
                .value = "";

        }
    );


// =====================================
// RESERVA
// =====================================

document
    .getElementById("formReserva")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const nombre =
                document
                    .getElementById("nombre")
                    .value;


            const fecha =
                document
                    .getElementById("fecha")
                    .value;


            const hora =
                document
                    .getElementById("hora")
                    .value;


            const personas =
                document
                    .getElementById("personas")
                    .value;


            document
                .getElementById(
                    "mensajeReserva"
                )
                .textContent =
                "🦊 ¡Reserva realizada! " +
                nombre +
                ", te esperamos el " +
                fecha +
                " a las " +
                hora +
                " para " +
                personas +
                " persona(s).";


            event.target.reset();

        }
    );


// =====================================
// INICIAR
// =====================================

mostrarProductos();

actualizarCarrito();