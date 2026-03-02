var todos = [];
addBtn = document.getElementById("addTodoBtn");
my_list = document.getElementById("todo-list");
title_textbox = document.getElementById("text-title");
desc_textbox = document.getElementById("text-desc");
let id_to_edit = null;

document.addEventListener("DOMContentLoaded", function () {
    render_list();
})

function getNewId() {

    if (todos.length == 0) {
        return 1;
    }
    return todos.length + 1;
}
function render_list() {
    if (localStorage.getItem("mytodos") == null) {
        localStorage.setItem("mytodos", [])
    }
    todos = JSON.parse(localStorage.getItem("mytodos"));
    my_list.innerHTML = "";
    if (todos) {
        todos.forEach((x) => {
            let todo_card = `<div class="card p-2 w-50 m-auto my-2">
            <div class="card-title fs-3">${x.title}</div>
            <div>${x.desc}</div>
            <div class="flex">
            <button class="btn-danger w-25" id="${x.id}">Delete</button>
            <button class="btn-info w-25" id="${x.id}">Edit</button>
            </div>
            </div>`;
            my_list.innerHTML += todo_card;
        })
    }

}
document.addEventListener("click", function (e) {
    if (e.target.innerHTML == "Delete") {
        let id_to_delete = e.target.getAttribute("id");
        todos = todos.filter((x) => x.id != id_to_delete);
        localStorage.setItem("mytodos", JSON.stringify(todos));
        render_list();
    }
    if (e.target.innerHTML == "Edit") {
        id_to_edit = e.target.getAttribute("id");

        let todo = todos.map((x) => {
            if (id_to_edit == x.id) {
                title_textbox.value = x.title;
                desc_textbox.value = x.desc;
                document.getElementById("editTodoBtn").classList.remove("d-none");
                title_textbox.focus();
            }
        });

    }
    if (e.target.innerHTML == "Edit Item") {
        document.getElementById("editTodoBtn").classList.add("d-none");
        mytitle = document.getElementById("text-title").value;
        mydesc = document.getElementById("text-desc").value;
        todos.map((x) => {
            if (id_to_edit == x.id) {
                x.title = mytitle;
                x.desc = mydesc;
            }
        });
        localStorage.setItem("mytodos", JSON.stringify(todos));
        render_list();
        id_to_edit = null;
    }
})
addBtn.addEventListener("click", function () {
    id = getNewId();

    mytitle = document.getElementById("text-title").value;
    mydesc = document.getElementById("text-desc").value;
    let new_todo = {
        id: id,
        title: mytitle,
        desc: mydesc
    }
    todos.push(new_todo);
    let new_todo_card = `<div class="card p-2 w-50 m-auto my-2">
                <div class="card-title fs-3">${new_todo.title}</div>
                <div>${new_todo.desc}</div>
                <div class="flex">
                    <button class="btn-danger w-25" id="${new_todo.id}">Delete</button>
                    <button class="btn-info w-25" id="${new_todo.id}">Edit</button>
                </div>
            </div>`;
    my_list.innerHTML += new_todo_card;

    localStorage.setItem("mytodos", JSON.stringify(todos));
    render_list();
})