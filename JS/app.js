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
  const cantidad = 1;
  const productoEnCarrito = carrito.find((item) => item.nombre === nombre);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }

  actualizarListaCarrito();

  actualizarTotales();
  guardarCarritoLocalStorage();
  ////SWEET ALERT////
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Producto agregado al carrito de compras",
    showConfirmButton: false,
    timer: 1500,
  });
}

function aumentarCantidad(index) {
  carrito[index].cantidad++;
  actualizarListaCarrito();
  guardarCarritoLocalStorage();
  actualizarTotales();
}

function disminuirCantidad(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1);
  }

  actualizarListaCarrito();
  guardarCarritoLocalStorage();
  actualizarTotales();
}

function mostrarModal() {
  const modalElement = document.getElementById("staticBackdropLive");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();
}

function actualizarListaCarrito() {
  const listaCarrito = document.getElementById("listaProducto");
  listaCarrito.innerHTML = "";

  carrito.map((producto, index) => {
    const item = document.createElement("li");
    item.classList.add("list-group-item");
    item.innerHTML = `
      <span class="d-flex justify-content-between align-items-start">
        ${producto.nombre} - CLP ${producto.precio} - Cantidad: ${producto.cantidad}
        <span class="text-end">
          <i class="fas fa-plus" style="cursor: pointer;" onclick="aumentarCantidad(${index})"></i>
          <i class="fas fa-minus" style="cursor: pointer;" onclick="disminuirCantidad(${index})"></i>
          <i class="fas fa-trash-alt" style="cursor: pointer;" onclick="eliminarDelCarrito(${index})"></i>
        </span>
      </span>
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
    (total, { precio, cantidad }) => total + precio * cantidad,
    0
  );
  const cantidadProductosEnCarrito = carrito.reduce(
    (total, { cantidad }) => total + cantidad,
    0
  );

  const valorTotalCarritoElement = document.getElementById("valorTotalCarrito");
  valorTotalCarritoElement.textContent = `$${valorTotalCarrito.toFixed(2)}`;

  const cantidadProductosEnCarritoElement = document.getElementById(
    "cantidadProductosEnCarrito"
  );
  cantidadProductosEnCarritoElement.textContent = cantidadProductosEnCarrito;

  const totalPagar = valorTotalCarrito;

  const totalPagarElement = document.getElementById("totalPagar");
  totalPagarElement.textContent = `${totalPagar.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  })}`;
}

// /////////////SIMULACION DE LLAMADO A UNA API//////////////
function obtenerProductos() {
  return new Promise((resolve, reject) => {
    fetch("../Json/productos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar el JSON");
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

async function main() {
  try {
    const informacionProductos = await obtenerProductos();

    function mostrarProductos(productosFiltrados) {
      const contenedor = document.getElementById("contenedorProductos");
      contenedor.innerHTML = "";
      productosFiltrados.map((informacionProductos) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("card", "m-2");
        divProducto.style.width = "18rem";
        divProducto.innerHTML = `
              <div class="card-body">
              <img src="${informacionProductos.img}" class="card-img-top" alt="Imagen de ${informacionProductos.nombre}">
                  <h5 class="card-title">${informacionProductos.nombre}</h5>
                  <p class="card-text">${informacionProductos.descripcion}</p>
                  <p class="card-text">Precio: ${informacionProductos.precio}</p>
                  <button class="btn btn-primary" onclick="agregarAlCarrito('${informacionProductos.nombre}', ${informacionProductos.precio})">Agregar al Carrito</button>
              </div>
          `;
        contenedor.appendChild(divProducto);
      });
    }

    function filtrarProductos() {
      const textoBusqueda = document
        .getElementById("buscadorProductos")
        .value.toLowerCase();
      const productosFiltrados = informacionProductos.filter(
        (informacionProductos) =>
          informacionProductos.nombre.toLowerCase().includes(textoBusqueda)
      );
      mostrarProductos(productosFiltrados);
    }

    document
      .getElementById("buscadorProductos")
      .addEventListener("input", filtrarProductos);

    mostrarProductos(informacionProductos);
  } catch (error) {
    console.error("Error en la app", error);
  }
}
main();
