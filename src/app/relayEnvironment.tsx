import { Environment, Network, RecordSource, Store } from "relay-runtime";

async function fetchGraphQL(params: any, variables: any) {
  const response = await fetch("https://countries.trevorblades.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY":
        "ory_at_8nesWYySKJ0OTZ9SlY6mz3QHfnl0pulqa8-NgdEfKGY.U7rk2vuvWj703Ibh4V-GJSiK_H_02j8a8EdQucqlFXI",
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
