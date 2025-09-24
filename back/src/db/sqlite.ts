import { Database } from "@db/sqlite";
import { type Todo } from "../utils.ts";

export const db = new Database("./database.sqlite");

db.exec("CREATE TABLE IF NOT EXISTS todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, completed BOOLEAN)");

export async function findTodos(): Promise<Todo[]> {
    return await db.prepare("SELECT * FROM todo").all() as Todo[];
}

export async function findLastTodo() :Promise<Todo[]> {
    return await db.prepare("SELECT * FROM todo ORDER BY id DESC LIMIT 1").get() as Todo[];
}

export async function createTodo(param: {title: string, completed: boolean}): Promise<Todo[]> {
    if (!param) {
        throw new Error("Invalid todo parameter !");
    }
    db.exec("INSERT INTO todo (title, completed) VALUES (?,?)", param.title, param.completed);
    
    return await findLastTodo();
}

export async function removeTodo(id: number): Promise<boolean> {
    const returnDelete: number = db.prepare("DELETE FROM todo WHERE id = ?").run(id);

   if (returnDelete) {
        return await true;
    } else {
        return await false;
    }
}

export async function updateTodo(id: number, param: {completed: boolean}): Promise<Todo[]> {
   
    
    db.prepare("UPDATE todo SET completed = ? WHERE id = ?").run(
        param.completed,
        id
    );

    const todo = db.prepare("SELECT * FROM todo WHERE id = ?").get(id) as Todo[];
    return todo;
}