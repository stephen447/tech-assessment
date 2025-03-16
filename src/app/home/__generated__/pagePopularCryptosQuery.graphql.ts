/**
 * @generated SignedSource<<323be795945ec02146bf540262535d5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pagePopularCryptosQuery$variables = Record<PropertyKey, never>;
export type pagePopularCryptosQuery$data = {
  readonly ethereum: {
    readonly dexTrades: ReadonlyArray<{
      readonly baseCurrency: {
        readonly address: string | null | undefined;
        readonly name: string | null | undefined;
        readonly symbol: string | null | undefined;
      } | null | undefined;
      readonly tradeAmount: number | null | undefined;
      readonly trades: number | null | undefined;
    }> | null | undefined;
  } | null | undefined;
};
export type pagePopularCryptosQuery = {
  response: pagePopularCryptosQuery$data;
  variables: pagePopularCryptosQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Ethereum",
    "kind": "LinkedField",
    "name": "ethereum",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "options",
            "value": {
              "desc": "tradeAmount",
              "limit": 5
            }
          },
          {
            "kind": "Literal",
            "name": "quoteCurrency",
            "value": {
              "is": "0xdAC17F958D2ee523a2206206994597C13D831ec7"
            }
          }
        ],
        "concreteType": "EthereumDexTrades",
        "kind": "LinkedField",
        "name": "dexTrades",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Currency",
            "kind": "LinkedField",
            "name": "baseCurrency",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "symbol",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "address",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "in",
                "value": "USD"
              }
            ],
            "kind": "ScalarField",
            "name": "tradeAmount",
            "storageKey": "tradeAmount(in:\"USD\")"
          },
          {
            "alias": "trades",
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          }
        ],
        "storageKey": "dexTrades(options:{\"desc\":\"tradeAmount\",\"limit\":5},quoteCurrency:{\"is\":\"0xdAC17F958D2ee523a2206206994597C13D831ec7\"})"
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pagePopularCryptosQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pagePopularCryptosQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "1f30aa8d87ba579ea1409fe521a21019",
    "id": null,
    "metadata": {},
    "name": "pagePopularCryptosQuery",
    "operationKind": "query",
    "text": "query pagePopularCryptosQuery {\n  ethereum {\n    dexTrades(options: {limit: 5, desc: \"tradeAmount\"}, quoteCurrency: {is: \"0xdAC17F958D2ee523a2206206994597C13D831ec7\"}) {\n      baseCurrency {\n        symbol\n        name\n        address\n      }\n      tradeAmount(in: USD)\n      trades: count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0e050ebc4c715d286ba1b05ca1a5c33b";

export default node;
