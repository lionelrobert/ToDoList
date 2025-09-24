import { findTodos, createTodo, removeTodo, updateTodo } from "./db/sqlite.ts";

export async function index(req: Request, url: URL): Promise<Response> {
    const ret = await findTodos();

    return new Response(JSON.stringify(ret), {
        status: 200,
        headers: {
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173"
        }
    });
} 

export async function create(req: Request, url: URL): Promise<Response> {
   const ret =  await createTodo(await req.json()); 

  return new Response(JSON.stringify(ret), {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5173"
    }
  })  
}

export async function remove(req: Request, url: URL): Promise<Response> {
    const id = parseInt(url.searchParams.get("id") as string, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({error: "False Id removeTodo"}), {
        status: 404,
        headers : {
          "Access-Control-Allow-Origin": "http://localhost:5173"
        }
      });
    }
    const returnRemove = await removeTodo(id);
    if (returnRemove === true) {
      return new Response(null, {
        status: 204,
        headers : {
          "Access-Control-Allow-Origin": "http://localhost:5173"
        }
      });
    } else {
      return new Response(JSON.stringify({error: "Todo not Found"}), {
        status: 404,
        headers : {
          "Access-Control-Allow-Origin": "http://localhost:5173"
        }
      });
    }
}

export async function update(req: Request, url: URL): Promise<Response> {
  
    const id = parseInt(url.searchParams.get("id") as string, 10);
    if (isNaN(id)) {
      return new Response(JSON.stringify({error: "False Id removeTodo"}), {
        status: 404,
        headers : {
          "Access-Control-Allow-Origin": "http://localhost:5173"
        }
      });
    }
    const ret = await updateTodo(id, await req.json());
  
  return new Response(JSON.stringify(ret), {
        status: 200,
        headers: {
          "Content-Type":"application/json",
          "Access-Control-Allow-Origin": "http://localhost:5173"
        }
  });
}