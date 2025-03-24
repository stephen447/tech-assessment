import { Environment, Network, RecordSource, Store } from "relay-runtime";

/**
 * Function for executing the GraphQL query.
 * @param params - GraphQL query
 * @param variables - Query variables
 * @returns response of the query
 */
/* eslint-disable-next-line */
async function fetchGraphQL(params: any, variables: any) {
  const response = await fetch("https://streaming.bitquery.io/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_API_URL,
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
