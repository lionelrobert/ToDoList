
export type todo = {
        id: number;
        title: string;
        completed: boolean;
}

export function createTodoObject (id: number, title: string) {
        return {
                id: id,
                title: title,
                completed: false
        };
}