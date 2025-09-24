import { ToDoClass } from "../model/ToDo.ts";


export class ToDoViewClass {
    listElement;
    buttonAdd;
    form;
    inputText;
    filterDiv;

    constructor () {
        this.listElement = document.querySelector(".html-list") as HTMLUListElement;
        this.buttonAdd = document.querySelector(".add-todo") as HTMLButtonElement;
        this.form = document.querySelector(".todo-form") as HTMLFormElement;
        this.inputText = document.querySelector(".todo-form-input") as HTMLInputElement;
        this.filterDiv = document.querySelector(".action-filter-div") as HTMLDivElement;
    }

    renderList(list: ToDoClass[]) {
        if (this.listElement) 
            this.listElement.innerHTML = "";
        for (const item of list) {
            this.listElement?.append(this.createTodoElement(item))
        }
    }

    createTodoElement(todo: ToDoClass): HTMLLIElement {
        const liElement = document.createElement("li") as HTMLLIElement;
        if (todo.completed) {
            liElement.className = `list-item done`;
        } else {
            liElement.className = `list-item`;
        }
        liElement.dataset.id = todo.id.toString();

        liElement.innerHTML = `
            <h3 class="list-item-title">${todo.title}</h3>
            <div class="list-item-btn">
            <button class="todo-done">Terminer</button>
            <button class="todo-delete">Supprimer</button>
            </div>
        `;

        return liElement;
    }

    bindAddTodo(handler: (title: string) => void) {

        const handleSubmitFormTodo = (e: SubmitEvent) => {
            const data = new FormData(e.target as HTMLFormElement);
            const titleObj = Object.fromEntries(data.entries());
            if (!titleObj.title.toString()) {
                return ;
            }
            if (this.inputText)
                this.inputText.value = "";
            handler(titleObj.title.toString());
        }

        const handleClickAddButton = () => {
                const dialog = document.querySelector(".todo-dialog") as HTMLDialogElement;
                if (dialog) {
                    dialog.showModal();
                    const ButtonClose = dialog.querySelector(".todo-form-close") as HTMLButtonElement;
                    ButtonClose.addEventListener("click", () => {
                        dialog.close();
                    });
                    this.form.addEventListener("submit", handleSubmitFormTodo, {once: true});
                }
        }

        this.buttonAdd?.addEventListener("click", handleClickAddButton);
    }

    bindToggleDone(handler: (id: number) => void) {

        const handleClick = (e: Event) => {
           if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains("todo-done")) {
                    const li = e.target.closest("li");
                    if(li && li.dataset.id) {
                        handler(Number(li.dataset.id));
                    }
                }
           }
        } 

        this.listElement?.addEventListener("click", handleClick);
    }

    bindDeleteTodo (handler: (id: number) => void) {

        const handleClick = (e: Event) => {
           if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains("todo-delete")) {
                    const li = e.target.closest("li");
                    if(li && li.dataset.id) {
                        handler(Number(li.dataset.id));
                    }
                }
           }
        } 

        this.listElement?.addEventListener("click", handleClick);
    }

    bindFilter (handler: (filter: string) => void) {

        const handleFilter = (e: Event) => {
           if (e.target instanceof HTMLElement) {
                for (let i = 0; i < this.filterDiv.children.length; i++) {
                     this.filterDiv.children[i].classList.remove("active");
                }
                if (e.target.classList.contains("action-filter-all")) {
                    handler("all");
                    e.target.classList.add("active");
                    return ;
                } else if (e.target.classList.contains("action-filter-done")) {
                    handler("done");
                    e.target.classList.add("active");
                    return ;
                } else if (e.target.classList.contains("action-filter-todo")) {
                    handler("todo");
                    e.target.classList.add("active");
                    return ;
                }
           }
        }

        this.filterDiv.addEventListener("click", handleFilter);
    }
}