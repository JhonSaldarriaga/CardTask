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
            let pa = document.createElement('h4');
            pa.innerHTML = title;
            container.appendChild(pa);
            for(let i=0 ; i<response.length ; i++){
                let taskDTO = response[i];
                let view = new CardView(taskDTO);
                view.onDeleteFinish = () =>{
                    container.removeChild(document.getElementById('taskCard-' + taskDTO.id));////////////
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
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    console.log(fecha);
    const task = new Task(title.value, description.value, "to_do", fecha);
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

toDoContainer.addEventListener('dragover', e=>{
    e.preventDefault();
    e.target.classList.add('hover');
});

toDoContainer.addEventListener('dragleave', e=>{
    e.target.classList.remove('hover');
});

toDoContainer.addEventListener('drop', e=>{
    e.target.classList.remove('hover');
    const id = e.dataTransfer.getData('id');
    const number = id.split('-')[1];
    toDoContainer.appendChild(document.getElementById(id));

    const updateCa = new UpdateCategory(number, "to_do");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState ===4 ){
            console.log(xhr.responseText);
        }
    })
    xhr.open("PUT", "http://localhost:8081/CardTask_war/api/task/updateca");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(updateCa));
    console.log(JSON.stringify(updateCa));
});

doingContainer.addEventListener('dragover', e=>{
    e.preventDefault();
    e.target.classList.add('hover');
});

doingContainer.addEventListener('dragleave', e=>{
    e.target.classList.remove('hover');
});

doingContainer.addEventListener('drop', e=>{
    e.target.classList.remove('hover');
    const id = e.dataTransfer.getData('id');
    const number = id.split('-')[1];
    doingContainer.appendChild(document.getElementById(id));

    const updateCa = new UpdateCategory(number, "doing");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState ===4 ){
            console.log(xhr.responseText);
        }
    })
    xhr.open("PUT", "http://localhost:8081/CardTask_war/api/task/updateca");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(updateCa));
    console.log(JSON.stringify(updateCa));
});

doneContainer.addEventListener('dragover', e=>{
    e.preventDefault();
    e.target.classList.add('hover');
});

doneContainer.addEventListener('dragleave', e=>{
    e.target.classList.remove('hover');
});

doneContainer.addEventListener('drop', e=>{
    e.target.classList.remove('hover');
    const id = e.dataTransfer.getData('id');
    const number = id.split('-')[1];
    doneContainer.appendChild(document.getElementById(id));

    const updateCa = new UpdateCategory(number, "done");
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState ===4 ){
            console.log(xhr.responseText);
        }
    })
    xhr.open("PUT", "http://localhost:8081/CardTask_war/api/task/updateca");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(updateCa));
    console.log(JSON.stringify(updateCa));
});
