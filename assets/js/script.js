const btnAgregar = document.querySelector("#newTask");
const task = document.querySelector("#newTask");
const tbodyTasks = document.querySelector("#tasks");
const tasksList = [];
const totalTask = document.querySelector("#totalTasks");
const taskReady = document.querySelector("#taskReady");

// Al apretar enter ejecuta la funcion addTask
btnAgregar.addEventListener("keypress", function (e) {
	if (e.keyCode === 13) {
		addTask();
	}
});

// Crea una nueva tarea
const addTask = () => {
	if (task.value === "") {
		alert("debe ingresar una tarea");
		return;
	}
	// Crea el objeta newTask, que es una nueva tarea
	const newTask = {
		id: tasksList.length + 1,
		name: task.value,
		status: false,
	};

	// agrega newTask al array tasksList
	tasksList.push(newTask);
	console.log(tasksList);
	updateList();
};

const updateList = () => {
	let html = "";
	let countTaskReady = 0;
	for (let task of tasksList) {
		if (task.status) {
			countTaskReady++;
		}
		console.log("==>", task);
		html += `
        <tr class = ${task.status ? "bg-success" : "bg-light"}>
        <td>${task.id}</td>
        <td>${task.name}</td>
        
        <td class="text-right">
        <button onclick="updateStatus(${task.id})" class="btn btn-${
			task.status ? "success" : "warning"
		}" >
                ${task.status ? "Realizada" : "Pendiente"}
                </button></td>
                
        <td class ="text-right"><button onclick="deleteTask(${
					task.id
				})" class= "btn btn-danger">Eliminar</button></td>
		</tr>
        `;
	}
	task.value = "";
	tbodyTasks.innerHTML = html;

	totalTask.innerHTML = tasksList.length;
	taskReady.innerHTML = countTaskReady;
};

const updateStatus = (taskId) => {
	const index = tasksList.findIndex((task) => task.id === taskId);
	if (tasksList[index].status === false) {
		tasksList[index].status = true;
	} else {
		tasksList[index].status = false;
	}
	updateList();
};

const deleteTask = (taskId) => {
	const confirmation = confirm("Esta seguro de eliminar la tarea?");
	if (confirmation) {
		const index = tasksList.findIndex((task) => task.id === taskId);
		tasksList.splice(index, 1);
		updateList();
	}
};
