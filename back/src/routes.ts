import { index, create, remove, update } from "./controller.ts";

export const routes: Record<string, (req: Request, url: URL) => Response | Promise<Response>> = {
    "GET:/todos": index,
    "POST:/todos": create,
    "DELETE:/todos": remove,
    "PUT:/todos": update
};