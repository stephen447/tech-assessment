/**
 * @generated SignedSource<<49497e74f7523d091e381c62e7b806fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type PopularCryptoListQuery$variables = Record<PropertyKey, never>;
export type PopularCryptoListQuery$data = {
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
export type PopularCryptoListQuery = {
  response: PopularCryptoListQuery$data;
  variables: PopularCryptoListQuery$variables;
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
            "concreteType": "TradeResult",
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
    "name": "PopularCryptoListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PopularCryptoListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "32a4b3b165cf0d755729c1117469196f",
    "id": null,
    "metadata": {},
    "name": "PopularCryptoListQuery",
    "operationKind": "query",
    "text": "query PopularCryptoListQuery {\n  EVM(network: eth) {\n    DEXTradeByTokens(where: {Block: {Time: {since: \"2025-03-16T00:00:00Z\"}}, Trade: {AmountInUSD: {gt: \"1000\"}}}, orderBy: {descendingByField: \"trade_count\"}, limit: {count: 20}) {\n      Trade {\n        Currency {\n          Symbol\n          Name\n          SmartContract\n        }\n        current_price: PriceInUSD(maximum: Block_Time)\n      }\n      volume_usd: sum(of: Trade_AmountInUSD)\n      unique_traders: uniq(of: Trade_Buyer)\n      trade_count: count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "acfe67a94201885710d84568bab752ef";

export default node;
