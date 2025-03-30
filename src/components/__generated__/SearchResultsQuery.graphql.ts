/**
 * @generated SignedSource<<c944963bb62e49952040e802b87d590c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SearchResultsQuery$variables = {
  since: any;
  tokenName: string;
};
export type SearchResultsQuery$data = {
  readonly EVM: {
    readonly DEXTradeByTokens: ReadonlyArray<{
      readonly Trade: {
        readonly Currency: {
          readonly Name: string | null | undefined;
          readonly SmartContract: string | null | undefined;
          readonly Symbol: string | null | undefined;
        } | null | undefined;
        readonly current_price: number | null | undefined;
      } | null | undefined;
      readonly trade_count: number | null | undefined;
      readonly volume_usd: number | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type SearchResultsQuery = {
  response: SearchResultsQuery$data;
  variables: SearchResultsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "since"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "tokenName"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "network",
        "value": "eth"
      }
    ],
    "concreteType": "EVMData",
    "kind": "LinkedField",
    "name": "EVM",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "limit",
            "value": {
              "count": 20
            }
          },
          {
            "kind": "Literal",
            "name": "orderBy",
            "value": {
              "descendingByField": "Trade_current_price_maximum"
            }
          },
          {
            "fields": [
              {
                "fields": [
                  {
                    "fields": [
                      {
                        "kind": "Variable",
                        "name": "since",
                        "variableName": "since"
                      }
                    ],
                    "kind": "ObjectValue",
                    "name": "Time"
                  }
                ],
                "kind": "ObjectValue",
                "name": "Block"
              },
              {
                "fields": [
                  {
                    "fields": [
                      {
                        "fields": [
                          {
                            "kind": "Variable",
                            "name": "includesCaseInsensitive",
                            "variableName": "tokenName"
                          }
                        ],
                        "kind": "ObjectValue",
                        "name": "Name"
                      }
                    ],
                    "kind": "ObjectValue",
                    "name": "Currency"
                  }
                ],
                "kind": "ObjectValue",
                "name": "Trade"
              }
            ],
            "kind": "ObjectValue",
            "name": "where"
          }
        ],
        "concreteType": "DEXTradeByTokensResult",
        "kind": "LinkedField",
        "name": "DEXTradeByTokens",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TradeByTokenResult",
            "kind": "LinkedField",
            "name": "Trade",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CurrencyResult",
                "kind": "LinkedField",
                "name": "Currency",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "Name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "Symbol",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "SmartContract",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "current_price",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "maximum",
                    "value": "Block_Time"
                  }
                ],
                "kind": "ScalarField",
                "name": "PriceInUSD",
                "storageKey": "PriceInUSD(maximum:\"Block_Time\")"
              }
            ],
            "storageKey": null
          },
          {
            "alias": "volume_usd",
            "args": [
              {
                "kind": "Literal",
                "name": "of",
                "value": "Trade_Side_AmountInUSD"
              }
            ],
            "kind": "ScalarField",
            "name": "sum",
            "storageKey": "sum(of:\"Trade_Side_AmountInUSD\")"
          },
          {
            "alias": "trade_count",
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": "EVM(network:\"eth\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchResultsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SearchResultsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "1bea3771c6ccab45313a6a510e8991f8",
    "id": null,
    "metadata": {},
    "name": "SearchResultsQuery",
    "operationKind": "query",
    "text": "query SearchResultsQuery(\n  $tokenName: String!\n  $since: DateTime!\n) {\n  EVM(network: eth) {\n    DEXTradeByTokens(where: {Trade: {Currency: {Name: {includesCaseInsensitive: $tokenName}}}, Block: {Time: {since: $since}}}, limit: {count: 20}, orderBy: {descendingByField: \"Trade_current_price_maximum\"}) {\n      Trade {\n        Currency {\n          Name\n          Symbol\n          SmartContract\n        }\n        current_price: PriceInUSD(maximum: Block_Time)\n      }\n      volume_usd: sum(of: Trade_Side_AmountInUSD)\n      trade_count: count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3853059159316cf49a5a83ff62748bbc";

export default node;
