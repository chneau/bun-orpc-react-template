import { os } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { serve } from "bun";
import z from "zod";
import index from "./client/index.html";

// In-memory counter for demonstration purposes (resets on restart/reload)
let counter = 0;

const hello = os
	.input(z.string())
	.handler(
		async ({ input }) =>
			`Hello ${input}, from the server! My current counter is ${counter}.`,
	);

const increment = os.handler(async () => ++counter);

const router = {
	hello,
	increment,
};

const handler = new RPCHandler(router);

const server = serve({
	routes: {
		"/*": index,
		"/api/*": async (request) => {
			const { matched, response } = await handler.handle(request, {
				prefix: "/api",
			});
			return matched ? response : new Response("Not found", { status: 404 });
		},
	},
	development: Bun.env.NODE_ENV !== "production" && {
		hmr: true,
		console: true,
	},
});
console.log(`🚀 Server running at ${server.url}`);

export type AppRouter = typeof router;
