const createBtn = document.getElementById('createBtn');
const title = document.getElementById('titleTask');
const description = document.getElementById('descriptionTask');
const toDoContainer = document.getElementById('todo');

const getAllTasks = () => {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState === 4){
            let json = xhr.responseText;
            let response = JSON.parse(json);
            console.log(response);

            toDoContainer.innerHTML = ''
            for(let i=0 ; i<response.length ; i++){
                let taskDTO = response[i];
                let view = new CardToDoView(taskDTO);
                view.onDeleteFinish = () =>{
                    toDoContainer.removeChild(document.getElementById('taskCard' + taskDTO.id));
                };
                toDoContainer.appendChild(view.render());
            }
        }
    });
    xhr.open("GET", "http://localhost:8081/CardTask_war/api/task/all");
    xhr.send();
};
getAllTasks();

const addTask = () => {
    const task = new Task(title.value, description.value, "to_do", "2021-06-03");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState ===4 ){
            console.log(xhr.responseText);
        }
    })
    xhr.open("POST", "http://localhost:8081/CardTask_war/api/task/add");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(task));

    alert("Registro exitoso");
    const clean = () => {
        document.getElementById('titleTask').value = "";
        document.getElementById('descriptionTask').value = "";
    };
    clean();
};
createBtn.addEventListener('click', addTask);

