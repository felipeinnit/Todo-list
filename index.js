//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#filter-todo");


//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", deleteCheck);

filterOption.addEventListener("change", filterTodo);

//functions

function addTodo(event){
    //prevent form from submiting
    event.preventDefault();

    //todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creat li
    const newTodo = document.createElement("li");
    newTodo.innerText= todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //add todo input value
    saveLocalTodos(todoInput.value);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //apped to list
    todoList.appendChild(todoDiv);

    //clear to input value
    todoInput.value="";
}

//
function deleteCheck(e){
 const item = e.target;

 //delete todo
 if(item.classList[0]==="trash-btn"){
     const todo = item.parentElement;

     //animation
     todo.classList.add("fall");
     removeLocalTodos(todo);
     todo.addEventListener("transitionend", function(){
        todo.remove();
     });
 }

 //check mark
 if(item.classList[0] === "complete-btn"){
     const todo = item.parentElement;
     todo.classList.toggle("completed");
 }
}

//grab the event
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")){
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    } 
                    break;
        }
    });
}

//local storage
function saveLocalTodos(todo){
    //check if theres something there

    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//delete from local storage
function getTodos(){
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    //todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //creat li
    const newTodo = document.createElement("li");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //apped to list
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos",JSON.stringify(todos)); 
}
