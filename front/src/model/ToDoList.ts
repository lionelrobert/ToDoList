import { ToDoClass } from "./ToDo.ts";
import { type todo } from "../utils.ts";

export class ToDoListClass {
    list: ToDoClass[] = [];
    listDisplayFilter: ToDoClass[] = [];
    inc: number = 3;

    constructor(actuals: todo[]) {
        for (const actual of actuals) {
            this.list.push(new ToDoClass(actual));
        }
    }

    updateList(newList: todo[]) {
        this.list = [];
        for (const item of newList) {
            this.list.push(new ToDoClass(item));
        }
    }

    async add(title: string) {
        try {
            await fetch("http://localhost:4242/todos", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({"title": title, "completed" : false})
            })
        } catch (e) {
            throw new Error("Error add" + e);
        }
    }

    async deleteTodo(id: number) {
       try {
            await fetch(`http://localhost:4242/todos?id=${id}`, {
                method: "DELETE",
            });
       } catch (e) {
            throw new Error("Error deleteTodo" + e);
       }
    }

    async changeTodoDone (id: number) {
        const todo = this.list.find((todo) => todo.id === id) as ToDoClass;
        if (todo) {
            await todo.todoDone(); 
        }
    }

    displayFilter (filter: string) {
        if (filter === "done") {
            this.listDisplayFilter = this.list.filter((todo) => {
                if (todo.completed)
                    return todo;
            });
        } else if (filter === "todo") {
            this.listDisplayFilter = this.list.filter((todo) => {
                if (!todo.completed)
                    return todo;
            });
        } else {
            this.listDisplayFilter = this.list.slice();
        }
    }
}
