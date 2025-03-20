/**
 * @generated SignedSource<<ffd7d9dbc9379a835c4841fbbe501ad4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageTokenQuery$variables = {
  since: any;
  symbol: string;
  till: any;
};
export type pageTokenQuery$data = {
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
            readonly SmartContract: string | null | undefined;
            readonly Symbol: string | null | undefined;
          } | null | undefined;
          readonly Price: number | null | undefined;
        } | null | undefined;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type pageTokenQuery = {
  response: pageTokenQuery$data;
  variables: pageTokenQuery$variables;
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
  "name": "symbol"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "till"
},
v3 = [
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
            "name": "limit",
            "value": {
              "count": 10
            }
          },
          {
            "kind": "Literal",
            "name": "limitBy",
            "value": {
              "by": "Block_Date",
              "count": 1
            }
          },
          {
            "kind": "Literal",
            "name": "orderBy",
            "value": {
              "ascendingByField": "Block_Time"
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
                      },
                      {
                        "kind": "Variable",
                        "name": "till",
                        "variableName": "till"
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
                            "fields": [
                              {
                                "kind": "Variable",
                                "name": "includesCaseInsensitive",
                                "variableName": "symbol"
                              }
                            ],
                            "kind": "ObjectValue",
                            "name": "Symbol"
                          }
                        ],
                        "kind": "ObjectValue",
                        "name": "Currency"
                      }
                    ],
                    "kind": "ObjectValue",
                    "name": "Buy"
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
                "name": "Time",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "Date",
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
        "storageKey": null
      }
    ],
    "storageKey": "EVM(dataset:\"combined\",network:\"eth\")"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageTokenQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "pageTokenQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "d6c82d7795aef73ab027e813949c476f",
    "id": null,
    "metadata": {},
    "name": "pageTokenQuery",
    "operationKind": "query",
    "text": "query pageTokenQuery(\n  $symbol: String!\n  $since: DateTime!\n  $till: DateTime!\n) {\n  EVM(network: eth, dataset: combined) {\n    DEXTrades(limit: {count: 10}, where: {Trade: {Buy: {Currency: {Symbol: {includesCaseInsensitive: $symbol}}}}, Block: {Time: {since: $since, till: $till}}}, orderBy: {ascendingByField: \"Block_Time\"}, limitBy: {by: Block_Date, count: 1}) {\n      Block {\n        Time\n        Date\n      }\n      Trade {\n        Buy {\n          Currency {\n            Symbol\n            Name\n            SmartContract\n          }\n          Price\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8f8b9d017c13acbb8479c96564eb95b0";

export default node;
