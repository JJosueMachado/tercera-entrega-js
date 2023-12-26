function validarFormulario(e) {
  e.preventDefault();

  const nombreCompleto = document.getElementById("nombre").value;

  function nombreValido(nombre) {
    return /^[A-Za-z\s]+$/.test(nombre);
  }

  if (!nombreCompleto || !nombreValido(nombreCompleto)) {
    alert(
      "Por favor, ingresa un nombre válido. Los campos no pueden quedar vacíos y deben contener solo letras."
    );
    document.getElementById("nombre").value = "";
    return;
  }

  const mail = document.getElementById("correo").value;
  const telefono = document.getElementById("cellphone").value;
  const id = document.getElementById("cedula").value;
  const direccion = document.getElementById("direccion").value;
  const nota = document.getElementById("mensaje").value;

  if (!mail || !telefono || !id || !direccion || !nota) {
    alert(
      "Por favor, completa todos los campos antes de enviar el formulario."
    );
    return;
  }

  ////SWEET ALERT////
  Swal.fire({
    position: "center",
    icon: "success",
    title: "ENVIADO CON ÉXITO",
    showConfirmButton: false,
    timer: 1500,
  });
  setTimeout(() => {
    contactoFormulario.reset();
  }, 1500);
}

const contactoFormulario = document.getElementById("contacto");
contactoFormulario.addEventListener("submit", validarFormulario);
