const taskForm = document.getElementById('formularioTarea');
const taskInput = document.getElementById('tareaNueva');
const taskList = document.getElementById('lista-tareas');
const alertContainer = document.getElementById('alert-container');

taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        taskForm.classList.add('was-validated');
        return;
    }

    addTask(taskText); 

    showAlert('Tarea agregada con éxito!', 'success');


    taskInput.value = '';
    taskForm.classList.remove('was-validated');
});

// funcion nueva tarea
function addTask(text) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-sm btn-danger eliminar-btn';
    deleteButton.type = 'button';
    deleteButton.innerHTML = '<i class="bi bi-trash"></i>'; 

    deleteButton.addEventListener('click', function() {
        this.parentNode.remove(); 
        showAlert('Tarea eliminada.', 'warning'); 
    });

    li.appendChild(deleteButton);



    taskList.appendChild(li);
}

// alerta funcion
function showAlert(message, type) {
    alertContainer.innerHTML = ''; 

    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.setAttribute('role', 'alert');
    alert.textContent = message;

    alert.innerHTML += `
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alert);

    setTimeout(() => {
        const alertInstance = bootstrap.Alert.getOrCreateInstance(alert);
        alertInstance.close();
    }, 3000);
}

document.querySelectorAll('.eliminar-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentNode.remove();
        showAlert('Tarea eliminada.', 'warning');
    });
});