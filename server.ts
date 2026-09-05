import { os } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { serve } from "bun";
import z from "zod";
import index from "./client/index.html";

// In-memory counter for demonstration purposes (resets on restart/reload)
let counter = 0;

const elapsed = (start: number) =>
	`${(performance.now() - start).toFixed(2)}ms`;

const logged = os.use(async ({ next, path }) => {
	const start = performance.now();
	const procedureName = path.join("/") || "root";
	try {
		const result = await next();
		console.log(`[oRPC] ${procedureName} -> 200 OK (${elapsed(start)})`);
		return result;
	} catch (error) {
		console.error(
			`[oRPC] ${procedureName} -> ERROR (${elapsed(start)}):`,
			error,
		);
		throw error;
	}
});

const hello = logged
	.input(z.string())
	.handler(
		async ({ input }) =>
			`Hello ${input}, from the server! My current counter is ${counter}.`,
	);

const increment = logged.handler(async () => ++counter);

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
