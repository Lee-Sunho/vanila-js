const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
let toDos = [];
const TODOS_KEY = "todos";

function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    const newToDoObj = {
        text : newToDo,
        id : Date.now()
    };
    toDoInput.value = "";
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON. stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter((todo) => {return todo.id !== parseInt(li.id)});
    li.remove();
    saveToDos();
}

function paintToDo(newToDoObj){
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    span.innerText = newToDoObj.text;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    toDoList.appendChild(li);
}
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos != null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}
