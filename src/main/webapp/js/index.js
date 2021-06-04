const createBtn = document.getElementById('createBtn');
const title = document.getElementById('titleTask');
const description = document.getElementById('descriptionTask');
const toDoContainer = document.getElementById('todo');
const doingContainer = document.getElementById('doing');
const doneContainer = document.getElementById('done');

const getAllTasks = () =>{
    getAllTasksFrom(toDoContainer,'alltodo','To Do');
    getAllTasksFrom(doingContainer,'alldoing', 'Doing');
    getAllTasksFrom(doneContainer,'alldone', 'Done');
}

const getAllTasksFrom = (container,path,title) =>{
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState === 4){
            let json = xhr.responseText;
            let response = JSON.parse(json);
            console.log(response);

            container.innerHTML = '';
            let pa = document.createElement('p');
            pa.innerHTML = title;
            container.appendChild(pa);
            for(let i=0 ; i<response.length ; i++){
                let taskDTO = response[i];
                let view;
                if(path == 'todo')
                    view = new CardToDoView(taskDTO);
                else {
                    if(path == 'todoing')
                        view = new CardDoingView(taskDTO);
                    else{
                        view = new CardDoneView(taskDTO);
                    }
                }
                view.onDeleteFinish = () =>{
                    container.removeChild(document.getElementById('taskCard' + taskDTO.id));
                };
                container.appendChild(view.render());
            }
        }
    });
    xhr.open("GET", "http://localhost:8081/CardTask_war/api/task/" + path);
    xhr.send();
}

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

    getAllTasks();
};
createBtn.addEventListener('click', addTask);

