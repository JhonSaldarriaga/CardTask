class CardView{

    constructor(task){
        this.task = task;
        this.onDeleteFinish = null;
    }

    deleteTask = ()=>{
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', ()=>{
            if(xhr.readyState === 4){
               if(this.onDeleteFinish !== null) this.onDeleteFinish();
            }
        });
        xhr.open('DELETE','http://localhost:8081/CardTask_war/api/task/delete/' + this.task.id);
        xhr.send();
    }

    render = () => {
        let divOne = document.createElement('div'); //<div></div>
        divOne.draggable = true;
        divOne.id = 'taskCard-'+this.task.id;
        divOne.className = 'card';
        divOne.dataset.id = this.task.id;
        let divTwo = document.createElement('div');
        divTwo.className = 'btnContainer';
        let eraseBtn = document.createElement('button'); 
        eraseBtn.id = 'eraseBtn-'+this.task.id;
        eraseBtn.innerHTML = 'X';
        let title = document.createElement('h4');
        title.className = 'card-title';
        let description = document.createElement('p');
        let date = document.createElement('small');
        
        title.innerHTML = this.task.title;
        description.innerHTML = this.task.description;
        date.innerHTML = this.task.date;
        
        title.id = 'title-'+this.task.id;
        description.id = 'description-'+this.task.id;
        date.id = 'date-'+this.task.id;

        divTwo.appendChild(eraseBtn);
        divOne.appendChild(divTwo);
        divOne.appendChild(title);
        divOne.appendChild(description);
        divOne.appendChild(date);

        eraseBtn.addEventListener('click', this.deleteTask);
        
        divOne.addEventListener('dragstart', e=>{
            e.dataTransfer.setData('id', e.target.id);
        });

        return divOne;
    }

}