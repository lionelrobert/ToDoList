import { routes } from "./src/routes.ts";

Deno.serve({ port: 4242, hostname: "localhost" }, async (req) => {


    const url = new URL(req.url, `http://${req.headers.get("host")}`);
    const endPoint = `${req.method}:${url.pathname}`;

    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "http://127.0.0.1:5173",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        });
    }

    try {
        const handler = routes[endPoint];

        const ret = await handler(req, url);

        return ret;
    } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
            return new Response(JSON.stringify({ error: "Not Found" + e }), { 
                status: 404,
                headers : {
                    "Access-Control-Allow-Origin": "http://127.0.0.1:5173"
                } 
            });
        } else {
            return new Response(JSON.stringify({ error: "Internal Server Error" + e }), {
                status: 500,
                headers : {
                    "Access-Control-Allow-Origin": "http://127.0.0.1:5173"
                }
            });
        }
    }
});