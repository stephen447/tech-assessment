/**
 * @generated SignedSource<<4a3b4d196fd384a7c18e716d5bed52d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageTokenPriceQuery$variables = Record<PropertyKey, never>;
export type pageTokenPriceQuery$data = {
  readonly EVM: {
    readonly DEXTrades: ReadonlyArray<{
      readonly Block: {
        readonly Date: string | null | undefined;
        readonly Time: any | null | undefined;
      } | null | undefined;
      readonly Trade: {
        readonly Buy: {
          readonly Currency: {
            readonly Name: string | null | undefined;
            readonly Symbol: string | null | undefined;
          } | null | undefined;
          readonly Price: number | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type pageTokenPriceQuery = {
  response: pageTokenPriceQuery$data;
  variables: pageTokenPriceQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "dataset",
        "value": "combined"
      },
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
            "name": "orderBy",
            "value": {
              "ascendingByField": "Block_Time"
            }
          },
          {
            "kind": "Literal",
            "name": "where",
            "value": {
              "Block": {
                "Time": {
                  "since": "2025-03-10T00:00:00Z",
                  "till": "2025-03-18T00:00:00Z"
                }
              },
              "Trade": {
                "Buy": {
                  "Currency": {
                    "SmartContract": {
                      "is": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
                    }
                  }
                }
              }
            }
          }
        ],
        "concreteType": "DEXTradesResult",
        "kind": "LinkedField",
        "name": "DEXTrades",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "BlockResult",
            "kind": "LinkedField",
            "name": "Block",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "Date",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "Time",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                "concreteType": "BuySellResult",
                "kind": "LinkedField",
                "name": "Buy",
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
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "Price",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "DEXTrades(orderBy:{\"ascendingByField\":\"Block_Time\"},where:{\"Block\":{\"Time\":{\"since\":\"2025-03-10T00:00:00Z\",\"till\":\"2025-03-18T00:00:00Z\"}},\"Trade\":{\"Buy\":{\"Currency\":{\"SmartContract\":{\"is\":\"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}}}}})"
      }
    ],
    "storageKey": "EVM(dataset:\"combined\",network:\"eth\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageTokenPriceQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageTokenPriceQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "7c53428e4d6245e4e72a0f9b167e16da",
    "id": null,
    "metadata": {},
    "name": "pageTokenPriceQuery",
    "operationKind": "query",
    "text": "query pageTokenPriceQuery {\n  EVM(network: eth, dataset: combined) {\n    DEXTrades(where: {Trade: {Buy: {Currency: {SmartContract: {is: \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}}}}, Block: {Time: {since: \"2025-03-10T00:00:00Z\", till: \"2025-03-18T00:00:00Z\"}}}, orderBy: {ascendingByField: \"Block_Time\"}) {\n      Block {\n        Date\n        Time\n      }\n      Trade {\n        Buy {\n          Currency {\n            Symbol\n            Name\n          }\n          Price\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "287ee7763f7083850cbaa52d4eddf058";

export default node;
