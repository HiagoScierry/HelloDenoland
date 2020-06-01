import { Application } from "https://deno.land/x/abc@v1.0.0-rc8/mod.ts";
import { HandlerFunc } from "https://deno.land/x/abc@v1.0.0-rc8/types.ts";
import { acceptWebSocket } from "https://deno.land/std@0.53.0/ws/mod.ts";

const app = new Application();

const hello: HandlerFunc = async (connection) => {
    const { conn, headers, r: bufReader, w: bufWriter } = connection.request;
    const ws = await acceptWebSocket({
        conn,
        headers,
        bufReader,
        bufWriter,
    });

    for await (const event of ws) {
        console.log(event);
        await ws.send('Hello Socket !!!');

    }
};

app
    .get("/ws", hello)
    .file("/", "./index.html")
    .start({ port: 8001 });
