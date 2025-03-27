import { fetchGraphQL } from "../../app/relayEnvironment"; // Adjust path if needed

describe("fetchGraphQL", () => {
  // set up before each test
  beforeEach(() => {
    // Mocking the fetch function to return some sample json data - dont want to actually send request to api server
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { test: true } }),
      })
    ) as jest.Mock;

    // Mocking the API key stored in the .env file
    process.env.NEXT_PUBLIC_API_URL = "mock-api-key";
  });

  it("sends a POST request to the correct URL with proper headers and body", async () => {
    // Test params and variables
    const params = { text: "query TestQuery { test }" };
    const variables = { id: 123 };

    // Call fetchGraphQL function
    const response = await fetchGraphQL(params, variables);

    // Expect the fetch function to have been called with the correct parameters including the api url, auth token, variables and querys
    expect(global.fetch).toHaveBeenCalledWith(
      "https://streaming.bitquery.io/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mock-api-key",
        },
        body: JSON.stringify({
          query: "query TestQuery { test }",
          variables: { id: 123 },
        }),
      }
    );
    // Expect the response to be the sample json data
    expect(response).toEqual({ data: { test: true } });
  });
});
