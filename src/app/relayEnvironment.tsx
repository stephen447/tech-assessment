import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchGraphQL(params: any, variables: any) {
  const response = await fetch("https://your-graphql-api.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: params.text,
      variables,
    }),
  });

  return response.json();
}

const RelayEnvironment = new Environment({
  network: Network.create(fetchGraphQL),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;
