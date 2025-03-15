/**
 * @generated SignedSource<<b9d4d1c82ec9ed436d08405a43afd871>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type pageCountriesQuery$variables = Record<PropertyKey, never>;
export type pageCountriesQuery$data = {
  readonly countries: ReadonlyArray<{
    readonly capital: string | null | undefined;
    readonly name: string;
  }>;
};
export type pageCountriesQuery = {
  response: pageCountriesQuery$data;
  variables: pageCountriesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Country",
    "kind": "LinkedField",
    "name": "countries",
    "plural": true,
    "selections": [
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
        "name": "capital",
        "storageKey": null
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
    "name": "pageCountriesQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pageCountriesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "91bc154be67df719e652a65eb8b62bbd",
    "id": null,
    "metadata": {},
    "name": "pageCountriesQuery",
    "operationKind": "query",
    "text": "query pageCountriesQuery {\n  countries {\n    name\n    capital\n  }\n}\n"
  }
};
})();

(node as any).hash = "d09106661f158c6e93566affcbf14e6f";

export default node;
