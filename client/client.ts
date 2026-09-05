import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { RouterClient } from "@orpc/server";
import { createRouterUtils } from "@orpc/tanstack-query";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import type { AppRouter } from "../server";

export const qc = new QueryClient();

const link = new RPCLink({
	url: `${window.location.origin}/api`,
});

const client = createORPCClient<RouterClient<AppRouter>>(link);
const orpc = createRouterUtils(client);

export const useHelloQuery = (name: string) =>
	useQuery(orpc.hello.queryOptions({ input: name }));

export const useIncrementMutation = () =>
	useMutation(
		orpc.increment.mutationOptions({
			onSuccess: () => qc.invalidateQueries({ queryKey: orpc.hello.key() }),
		}),
	);
