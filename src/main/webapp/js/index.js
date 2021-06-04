const createBtn = document.getElementById('createBtn');
const title = document.getElementById('titleTask');
const description = document.getElementById('descriptionTask');

addTask = () => {
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
}

createBtn.addEventListener('click', addTask);