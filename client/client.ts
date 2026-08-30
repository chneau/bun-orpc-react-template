import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { AppRouter } from "../server";

export const qc = new QueryClient();

const link = new RPCLink({
	url:
		typeof window !== "undefined"
			? `${window.location.origin}/api`
			: "http://localhost:3000/api",
});

const client = createORPCClient<RouterClient<AppRouter>>(link);

export const useHelloQuery = (name: string) =>
	useQuery({
		queryKey: ["hello", name],
		queryFn: () => client.hello(name),
	});

export const useIncrementMutation = () =>
	useMutation({
		mutationKey: ["increment"],
		mutationFn: () => client.increment(),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["hello"] }),
	});
