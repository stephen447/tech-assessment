/**
 * @generated SignedSource<<aec08e7b1a302bedc7bb207084fdece6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageTokenHistoryQuery$variables = Record<PropertyKey, never>;
export type pageTokenHistoryQuery$data = {
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
export type pageTokenHistoryQuery = {
  response: pageTokenHistoryQuery$data;
  variables: pageTokenHistoryQuery$variables;
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
    "name": "pageTokenHistoryQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageTokenHistoryQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "88b7fe02b1f6946c95080a4888dd5148",
    "id": null,
    "metadata": {},
    "name": "pageTokenHistoryQuery",
    "operationKind": "query",
    "text": "query pageTokenHistoryQuery {\n  EVM(network: eth, dataset: combined) {\n    DEXTrades(where: {Trade: {Buy: {Currency: {SmartContract: {is: \"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2\"}}}}, Block: {Time: {since: \"2025-03-10T00:00:00Z\", till: \"2025-03-18T00:00:00Z\"}}}, orderBy: {ascendingByField: \"Block_Time\"}) {\n      Block {\n        Date\n        Time\n      }\n      Trade {\n        Buy {\n          Currency {\n            Symbol\n            Name\n          }\n          Price\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "09e6b209349969b0a045311605aaed48";

export default node;
