
const formulario = document.getElementById('formularioTarea');
const inputTarea = document.getElementById('tareaNueva');
const listaTareas = document.getElementById('lista-tareas');
const alertContainer = document.getElementById('alert-container');

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const textoTarea = inputTarea.value.trim();

    if (textoTarea === '') {
        formulario.classList.add('was-validated');
        return;
    }

    agregarTarea(textoTarea);

    mostrarAlerta('Tarea agregada con éxito!', 'success');


    inputTarea.value = '';
    formulario.classList.remove('was-validated');
});

// Función para crear agregar una nueva tarea con li
function agregarTarea(texto) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = texto;

    const botonEliminar = document.createElement('button');
    botonEliminar.className = 'btn btn-sm btn-danger eliminar-btn';
    botonEliminar.type = 'button';
    botonEliminar.innerHTML = '<i class="bi bi-trash"></i>'; 

    botonEliminar.addEventListener('click', function() {
        this.parentNode.remove(); 
        mostrarAlerta('Tarea eliminada.', 'warning');
    });

    li.appendChild(botonEliminar);


    listaTareas.appendChild(li);
}

// 5. Función para mostrar la alerta temporal 
function mostrarAlerta(mensaje, tipo) {
    alertContainer.innerHTML = ''; 

    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show`;
    alerta.setAttribute('role', 'alert');
    alerta.textContent = mensaje;

    alerta.innerHTML += `
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alerta);

    setTimeout(() => {
        const alertInstance = bootstrap.Alert.getOrCreateInstance(alerta);
        alertInstance.close();
    }, 3000);
}

document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentNode.remove();
        mostrarAlerta('Tarea eliminada.', 'warning');
    });
});