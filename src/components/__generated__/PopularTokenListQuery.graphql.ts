/**
 * @generated SignedSource<<5b4c1ec0c5d44f29d642c7963b4ba00b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PopularTokenListQuery$variables = Record<PropertyKey, never>;
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
            "kind": "Literal",
            "name": "where",
            "value": {
              "Block": {
                "Time": {
                  "since": "2025-03-16T00:00:00Z"
                }
              },
              "Trade": {
                "AmountInUSD": {
                  "gt": "1000"
                }
              }
            }
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
        "storageKey": "DEXTradeByTokens(limit:{\"count\":20},orderBy:{\"descendingByField\":\"trade_count\"},where:{\"Block\":{\"Time\":{\"since\":\"2025-03-16T00:00:00Z\"}},\"Trade\":{\"AmountInUSD\":{\"gt\":\"1000\"}}})"
      }
    ],
    "storageKey": "EVM(network:\"eth\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PopularTokenListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PopularTokenListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0bebb40b819fa8892d920b2a7bb22e69",
    "id": null,
    "metadata": {},
    "name": "PopularTokenListQuery",
    "operationKind": "query",
    "text": "query PopularTokenListQuery {\n  EVM(network: eth) {\n    DEXTradeByTokens(where: {Block: {Time: {since: \"2025-03-16T00:00:00Z\"}}, Trade: {AmountInUSD: {gt: \"1000\"}}}, orderBy: {descendingByField: \"trade_count\"}, limit: {count: 20}) {\n      Trade {\n        Currency {\n          Symbol\n          Name\n          SmartContract\n        }\n        current_price: PriceInUSD(maximum: Block_Time)\n      }\n      volume_usd: sum(of: Trade_AmountInUSD)\n      unique_traders: uniq(of: Trade_Buyer)\n      trade_count: count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "72de9d5737dabb3d79b4cb091124297e";

export default node;
