
import { ToDoListClass } from "./model/ToDoList.ts";
import { ToDoViewClass } from "./view/ToDoView.ts";
import {type todo } from "./utils.ts";

export async function getTodo(): Promise<todo[]> {
    try { 
        const response = await fetch("http://localhost:4242/todos", {
            method: "GET"
        });
        const data = await response.json();
        return data;
    } catch (e) {
        throw new Error("Error Fetch backend" + e);
    }
}

const ToDoList = new ToDoListClass(await getTodo());
const ToDoView = new ToDoViewClass();

export async function onAddTodo(title: string) {
    try {
        await ToDoList.add(title);
        ToDoList.updateList(await getTodo());
        ToDoView.renderList(ToDoList.list);
    } catch (e) {
        throw new Error("Error onAddTodo" + e);
    }
}

export async function onChangeTodoDone(id: number) {
    try {
        await ToDoList.changeTodoDone(id);
        ToDoList.updateList(await getTodo());
        ToDoView.renderList(ToDoList.list);
    } catch(e) {
        throw new Error("Error update todo" + e);
    }
}

export async function onDeleteTodo(id: number) {
    try {
        await ToDoList.deleteTodo(id);
        ToDoList.updateList(await getTodo());
        ToDoView.renderList(ToDoList.list);
    } catch (e) {
        throw new Error("Error onDeleteTodo" + e);
    }
}

export function onDisplayFilter (filter: string) {
    ToDoList.displayFilter(filter);
    ToDoView.renderList(ToDoList.listDisplayFilter);
}

export function init() {
    ToDoView.renderList(ToDoList.list);
    ToDoView.bindToggleDone(onChangeTodoDone);
    ToDoView.bindDeleteTodo(onDeleteTodo);
    ToDoView.bindAddTodo(onAddTodo);
    ToDoView.bindFilter(onDisplayFilter);
}

init();
