/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as catalog_api_mutations from "../catalog/api/mutations.js";
import type * as catalog_domain_ProductAggregate from "../catalog/domain/ProductAggregate.js";
import type * as catalog_domain_ProductModel from "../catalog/domain/ProductModel.js";
import type * as catalog_domain_ProductRepository from "../catalog/domain/ProductRepository.js";
import type * as catalog_repository from "../catalog/repository.js";
import type * as http from "../http.js";
import type * as inventory_api_mutations from "../inventory/api/mutations.js";
import type * as inventory_domain from "../inventory/domain.js";
import type * as inventory_repository from "../inventory/repository.js";
import type * as myFunctions from "../myFunctions.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  "catalog/api/mutations": typeof catalog_api_mutations;
  "catalog/domain/ProductAggregate": typeof catalog_domain_ProductAggregate;
  "catalog/domain/ProductModel": typeof catalog_domain_ProductModel;
  "catalog/domain/ProductRepository": typeof catalog_domain_ProductRepository;
  "catalog/repository": typeof catalog_repository;
  http: typeof http;
  "inventory/api/mutations": typeof inventory_api_mutations;
  "inventory/domain": typeof inventory_domain;
  "inventory/repository": typeof inventory_repository;
  myFunctions: typeof myFunctions;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
