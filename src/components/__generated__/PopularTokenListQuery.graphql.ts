/**
 * @generated SignedSource<<c16c2515d70d20a7b6a8fbc8e066af6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PopularTokenListQuery$variables = {
  since: any;
};
export type PopularTokenListQuery$data = {
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
      readonly unique_traders: number | null | undefined;
      readonly volume_usd: number | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type PopularTokenListQuery = {
  response: PopularTokenListQuery$data;
  variables: PopularTokenListQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "since"
  }
],
v1 = [
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
              "descendingByField": "trade_count"
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
                "kind": "Literal",
                "name": "Trade",
                "value": {
                  "AmountInUSD": {
                    "gt": "1000"
                  }
                }
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
                    "name": "Symbol",
                    "storageKey": null
                  },
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
                "value": "Trade_AmountInUSD"
              }
            ],
            "kind": "ScalarField",
            "name": "sum",
            "storageKey": "sum(of:\"Trade_AmountInUSD\")"
          },
          {
            "alias": "unique_traders",
            "args": [
              {
                "kind": "Literal",
                "name": "of",
                "value": "Trade_Buyer"
              }
            ],
            "kind": "ScalarField",
            "name": "uniq",
            "storageKey": "uniq(of:\"Trade_Buyer\")"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PopularTokenListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PopularTokenListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "21a2d53e367011d25b5583631c2264be",
    "id": null,
    "metadata": {},
    "name": "PopularTokenListQuery",
    "operationKind": "query",
    "text": "query PopularTokenListQuery(\n  $since: DateTime!\n) {\n  EVM(network: eth) {\n    DEXTradeByTokens(where: {Block: {Time: {since: $since}}, Trade: {AmountInUSD: {gt: \"1000\"}}}, orderBy: {descendingByField: \"trade_count\"}, limit: {count: 20}) {\n      Trade {\n        Currency {\n          Symbol\n          Name\n          SmartContract\n        }\n        current_price: PriceInUSD(maximum: Block_Time)\n      }\n      volume_usd: sum(of: Trade_AmountInUSD)\n      unique_traders: uniq(of: Trade_Buyer)\n      trade_count: count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5d5ced2f7f138bca9011db701f9bb6a0";

export default node;
