import { mutation } from "../../_generated/server";
import { createProductRepository } from "../product.repository";
import { ProductSchema } from "../domain/product.model";
import { catalogSchema } from "../schema";
import { createStockRepository } from "../../inventory/stock.repository";
import { v } from "convex/values";

export const createProduct = mutation({
  args: {
    product: ProductSchema,
  },
  handler: async (ctx, args) => {
    const productRepository = createProductRepository(ctx);
    await productRepository.create(args.product);
  },
});

export const updateProduct = mutation({
  args: {
    product: v.object({
      id: v.id("products"),
      ...catalogSchema.products.validator.fields,
    }),
  },
  handler: async (ctx, args) => {
    const productRepository = createProductRepository(ctx);
    const productAggregate = await productRepository.getById(args.product.id);
    productAggregate.update(args.product);
    await productRepository.save(productAggregate);
  },
});

export const disableProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    const productRepository = createProductRepository(ctx);
    const productAggregate = await productRepository.getById(args.id);
    productAggregate.disable();
    await productRepository.save(productAggregate);
  },
});

export const activateProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    const productRepository = createProductRepository(ctx);
    const stockRepository = createStockRepository(ctx);

    // Get the product aggregate
    const productAggregate = await productRepository.getById(args.id);

    // Check stock availability - this is the transactional consistency check
    const stockAggregate = await stockRepository.getByProductId(args.id);
    const hasStock = stockAggregate
      ? stockAggregate.hasAvailableStock()
      : false;

    // The aggregate enforces the business rule: can't activate without stock
    productAggregate.activate(hasStock);

    // Save the changes
    await productRepository.save(productAggregate);
  },
});

export const markProductOutOfStock = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    const productRepository = createProductRepository(ctx);
    const productAggregate = await productRepository.getById(args.id);

    productAggregate.markOutOfStock();
    await productRepository.save(productAggregate);
  },
});
