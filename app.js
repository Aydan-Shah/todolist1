const form = document.querySelector("#todo-form");
const toInput = document.querySelector("#todo");
const todoList = document.getElementById("parentul");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButon = document.querySelector("#clear-todos");

eventListener();
function eventListener() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButon.addEventListener("click", clearAllTodos);
}
function clearAllTodos(e) {
    if(confirm("Hamsini silmeye eminmisiniz?")) {
        //arayuzden todolari temizleme
        // todoList.innerHTML = ""; //yavas bas verir
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }

 

}
function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none !important");
        } else {
            listItem.setAttribute("style", "display:block");
        }
    })
}

function deleteTodo(e) {
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStoge(e.target.parentElement.parentElement.textContent);

        showAlert("success", "Todo silindi");
    }
}
function deleteTodoFromStoge(deletetodo) {
    let todos = getTodosfromStorage();
    todos.forEach(function(todo,index) {
        if(todo===deletetodo) {
            todos.splice(index,1) //arraydan deyer silme
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function loadAllTodosToUI() {
    let todos = getTodosfromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    })
}
function addTodo(e) {
    const newTodo = toInput.value.trim();
    if(newTodo === "") {
        /*    <div class="alert alert-danger" role="alert">
                    This is a danger alert—check it out!
                </div> */

        showAlert("danger", "Todo elave edin...");
    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo elave edildi")
    }
    


    e.preventDefault();
}
function getTodosfromStorage() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoToStorage(newTodo) {
   let todos = getTodosfromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos", JSON.stringify(todos));
}
function showAlert(type,message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);
    // settimeout
    setTimeout(function() {
        alert.remove();
    }, 1000);
}
function addTodoToUI(newTodo) {
    /* <li class="list-group-item d-flex justify-content-between">
        Todo 1
        <a href="a" class="delete-item"><i class="fa fa-remove"></i></a>
    </li> */

    // Link item
    const listItem = document.createElement("li");

    // Link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class='fa fa-remove'></i>";
    listItem.className = "list-group-item d-flex justify-content-between";

    // Text node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    toInput.value = "";
}
