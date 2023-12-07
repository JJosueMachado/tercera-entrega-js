//ARRAYS DE TODOS LOS PRODUCTOS:
console.log("conectado");

const productos = [
  {
    id: 1,
    img: "./imagenes/4-fotor.png",
    nombre: "Vela soja con aroma citrico",
    descripcion: " Vela de soja con alto punto de fusion y aroma citríco.",
    precio: 6000,
    categoria: "Velas",
  },
  {
    id: 2,
    img: "./imagenes/26-fotor.png",
    nombre: "Vela soja con aroma vainilla",
    descripcion: "Vela de soja con alto punto de fusión y aroma a vainilla.",
    precio: 11000,
    categoria: "Velas",
  },
  {
    id: 3,
    img: "./imagenes/7-fotor.png",
    nombre: "Vela soja con aroma lavanda",
    descripcion: "Vela de soja con punto de fusión medio y aroma a lavanda.",
    precio: 7000,
    categoria: "Velas",
  },
  {
    id: 4,
    img: "./imagenes/6-fotor.png",
    nombre: "Vela soja con aroma rosas",
    descripcion:
      "Vela de soja con punto de fusión alto y aroma a rosas y jazmín.",
    precio: 6500,
    categoria: "Velas",
  },

  {
    id: 5,
    img: "./imagenes/9.jpg",
    nombre: "Aceite floral primavera",
    descripcion:
      "Aceite aromatico con olor primaveral, con efecto refrescante.",
    precio: 7000,
    categoria: "Aceites",
  },
  {
    id: 6,
    img: "./imagenes/8.jpg",
    nombre: "Aceite fruta tropical",
    descripcion:
      "Aceite aromatico, con olor kiwi, especial para después de la ducha.",
    precio: 6500,
    categoria: "Aceites",
  },
  {
    id: 7,
    img: "./imagenes/21.jpg",
    nombre: "Aceite con efecto calor",
    descripcion:
      "Aceite aromatico, con olor vainilla y efecto calor, especial para masajes.",
    precio: 7500,
    categoria: "Aceites",
  },
  {
    id: 8,
    img: "./imagenes/10.jpg",
    nombre: "Aceite floral refrescante ",
    descripcion:
      "Aceite aromatico con olor a rosas, para masaje en cuero cabelludo.",
    precio: 7000,
    categoria: "Aceites",
  },

  {
    id: 9,
    img: "./imagenes/31-fotor.jpg",
    nombre: "Frangancia olor naranja",
    descripcion:
      " Aromatiza tu hogar con con esta delicada fragancia de olor a naranjas frescas.",
    precio: 6500,
    categoria: "Fragancias",
  },
  {
    id: 10,
    img: "./imagenes/30-fotor.png",
    nombre: "Frangancia olor a menta",
    descripcion:
      "Aromatiza tu hogar con con esta delicada fragancia de olor a menta y limón.",
    precio: 7000,
    categoria: "Fragancias",
  },
  {
    id: 11,
    img: "./imagenes/32-fotor.jpg",
    nombre: "Frangancia olor lavanda",
    descripcion:
      "Aromatiza tu hogar con con esta delicada fragancia de olor a lavanda.",
    precio: 7500,
    categoria: "Fragancias",
  },
  {
    id: 12,
    img: "./imagenes/34-fotor.jpg",
    nombre: "Frangancia olor a Coco",
    descripcion:
      "Aromatiza tu hogar con con esta delicada fragancia de olor a coco.",
    precio: 8000,
    categoria: "Fragancias",
  },

  {
    id: 13,
    img: "./imagenes/27-fotor.jpg",
    nombre: "Masajeador electrico",
    descripcion:
      "Masajeador electrico para el cuerpo. Duración de bateria 72 horas.",
    precio: 35000,
    categoria: "Equipos",
  },
  {
    id: 14,
    img: "./imagenes/35-fotor.png",
    nombre: "Masajeador manual",
    descripcion: "Masajeador manual de madera para: espalda, piernas y brazos.",
    precio: 12000,
    categoria: "Equipos",
  },
  {
    id: 15,
    img: "./imagenes/36-fotor.jpg",
    nombre: "Masajeador para cabeza",
    descripcion: "Masajeador manual de aluminio para nervios craneales.",
    precio: 10000,
    categoria: "Equipos",
  },
  {
    id: 16,
    img: "./imagenes/37-fotor.jpg",
    nombre: "Masajeador para pies",
    descripcion:
      "Masajeador rotativo manual de madera (puntas con relieve) para pies.",
    precio: 14000,
    categoria: "Equipos",
  },

  {
    id: 17,
    img: "./imagenes/25-fotor.jpg",
    nombre: "Combos para rostro",
    descripcion:
      "Vela de soja con olor a coco, Dos jabones de avena y paño para el cuidado del rostro.",
    precio: 15000,
    categoria: "Combos",
  },
  {
    id: 18,
    img: "./imagenes/12-fotor.jpg",
    nombre: "Piedras para masaje",
    descripcion:
      "Piedras elaboradas con acero esmaltado y con acero recubierto de polvo y basalto.",
    precio: 18000,
    categoria: "Combos",
  },
];

///////////////////////////////////MODAL CARRITO/////////////////////////////////////////////////////////
let carrito = [];

function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];
  actualizarListaCarrito();
  actualizarTotales();
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarListaCarrito();
  mostrarModal();
  actualizarTotales();
  guardarCarritoLocalStorage();
}

function mostrarModal() {
  const modalElement = document.getElementById("staticBackdropLive");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function actualizarListaCarrito() {
  const listaCarrito = document.getElementById("listaProducto");
  listaCarrito.innerHTML = "";

  carrito.map((productos, index) => {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.innerHTML = `
    <span class="d-flex justify-content-between align-items-start">${productos.nombre} - CLP ${productos.precio} 
  
    <span class=" text-end mr-0 fas fa-trash-alt " style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></span>
    `;
    listaCarrito.appendChild(item);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarListaCarrito();
  actualizarTotales();
  guardarCarritoLocalStorage();
}

document.addEventListener("DOMContentLoaded", function () {
  cargarCarritoDesdeLocalStorage();
  const limpiarCarritoBtn = document.getElementById("limpiarCarrito");
  limpiarCarritoBtn.addEventListener("click", limpiarCarrito);
});

function limpiarCarrito() {
  carrito = [];
  actualizarListaCarrito();
  localStorage.removeItem("carrito");
  actualizarTotales();
  guardarCarritoLocalStorage();
}

function actualizarTotales() {
  const valorTotalCarrito = carrito.reduce(
    (total, { precio }) => total + precio,
    0
  );
  const cantidadProductosEnCarrito = carrito.length;

  const valorTotalCarritoElement = document.getElementById("valorTotalCarrito");
  valorTotalCarritoElement.textContent = `$${valorTotalCarrito.toFixed(2)}`;

  const cantidadProductosEnCarritoElement = document.getElementById(
    "cantidadProductosEnCarrito"
  );
  cantidadProductosEnCarritoElement.textContent = cantidadProductosEnCarrito;

  const totalPagar = carrito.reduce((total, { precio }) => total + precio, 0);

  const totalPagarElement = document.getElementById("totalPagar");
  totalPagarElement.textContent = `$${totalPagar.toFixed(2)}`;
}
////////////////////////////////////////////////////MOSTRAR Y FILTRAR PRODUCTOS////////////////////////////////////////////////

function mostrarProductos(productosFiltrados) {
  const contenedor = document.getElementById("contenedorProductos");
  contenedor.innerHTML = "";
  productosFiltrados.map((productos) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("card", "m-2");
    divProducto.style.width = "18rem";
    divProducto.innerHTML = `
          <div class="card-body">
          <img src="${productos.img}" class="card-img-top" alt="Imagen de ${productos.nombre}">
              <h5 class="card-title">${productos.nombre}</h5>
              <p class="card-text">${productos.descripcion}</p>
              <p class="card-text">Precio: ${productos.precio}</p>
              <button class="btn btn-primary" onclick="agregarAlCarrito('${productos.nombre}', ${productos.precio})">Agregar al Carrito</button>
          </div>
      `;
    contenedor.appendChild(divProducto);
  });
}

function filtrarProductos() {
  const textoBusqueda = document
    .getElementById("buscadorProductos")
    .value.toLowerCase();
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(textoBusqueda)
  );
  mostrarProductos(productosFiltrados);
}

document
  .getElementById("buscadorProductos")
  .addEventListener("input", filtrarProductos);

mostrarProductos(productos);
