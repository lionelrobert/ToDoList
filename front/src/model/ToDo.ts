import { type todo } from "../utils.ts";

export class ToDoClass {

    id: number;
    title: string;
    completed: boolean;

    constructor(todo: todo) {
        this.id = todo.id;
        this.title = todo.title;
        this.completed = todo.completed;
    }

    async todoDone() {
       try {
            const response = await fetch(`http://localhost:4242/todos?id=${this.id}`, {
                method: "PUT",
                headers : {"Content-Type":"application/json"},
                body : JSON.stringify({"completed": !this.completed})
            });
            return await response.json();
       } catch (e) {
            throw new Error("Error update todo" + e);
       }
    } 
    
}