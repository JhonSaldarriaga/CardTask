class CardToDoView{

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
        divOne.id = 'taskCard'+this.task.id;
        divOne.className = 'card';//<div class="article"></div>
        let divTwo = document.createElement('div'); //<div></div>
        divTwo.className = 'btnContainer';//<div class="btnContainer"></div>
        let divThree = document.createElement('div'); //<div></div>
        divThree.className = 'btnContainer';//<div class="btnContainer"></div>
        let eraseBtn = document.createElement('button'); //<button></button>
        eraseBtn.className = 'eraseBtn';
        eraseBtn.innerHTML = 'X'; //<button> X </button>
        let right = document.createElement('button'); //<button></button>
        right.className = 'categoryBtn';//<button class="categoryBtn"></button>
        let title = document.createElement('p');//<p></p>
        title.className = 'titleCard';//<p class="titleCard"></p>
        let description = document.createElement('p');//<p></p>
        let date = document.createElement('small');//<small></small>
        
        title.innerHTML = this.task.title;//<p class="titleCard">Title</p>
        description.innerHTML = this.task.description;//<p>Description</p>
        date.innerHTML = this.task.date;//<small>Date</small>

        divTwo.appendChild(eraseBtn);//<div class="btnContainer"> <button> X </button> </div>
        divThree.appendChild(right);//<div class="btnContainer"> <button class="categoryBtn"></button> </div>
        divOne.appendChild(divTwo);
        //<div class="article"> 
        //<div class="btnContainer"> <button> X </button> </div> 
        //</div>
        divOne.appendChild(title);
        //<div class="article">
        //<div class="btnContainer"> <button> X </button> </div> 
        //<p class="titleCard">Title</p>
        //</div>
        divOne.appendChild(description);
        //<div class="article">  
        //<div class="btnContainer"> <button> X </button> </div> 
        //<p class="titleCard">Title</p>
        //<p>Description</p>
        //</div>
        divOne.appendChild(date);
        //<div class="article"> 
        //<div class="btnContainer"> <button> X </button> </div> 
        //<p class="titleCard">Title</p>
        //<p>Description</p>
        //<small>Date</small>
        //</div>
        divOne.appendChild(divThree);
        //<div class="article">
        //<div class="btnContainer"> <button> X </button> </div> 
        //<p class="titleCard">Title</p>
        //<p>Description</p>
        //<small>Date</small>
        //<div class="btnContainer"> <button class="categoryBtn"></button> </div>
        //</div>

        eraseBtn.addEventListener('click', this.deleteTask);

        return divOne;
    }

}