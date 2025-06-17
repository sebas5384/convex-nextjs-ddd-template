import { mutation } from "@/_generated/server";
import { StockRepository } from "../stock.repository";
import { ProductRepository } from "../../catalog/product.repository";
import { StockSchema } from "../domain/stock.model";
import { v } from "convex/values";

export const createStock = mutation({
  args: {
    stock: StockSchema,
  },
  handler: async (ctx, args) => {
    const stockRepository = new StockRepository(ctx);
    await stockRepository.create(args.stock);
  },
});

export const updateStockQuantity = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const stockRepository = new StockRepository(ctx);
    const productRepository = new ProductRepository(ctx);

    // Get the stock aggregate
    const stockAggregate = await stockRepository.getByProductId(args.productId);
    if (!stockAggregate) {
      throw new Error("Stock not found for product");
    }

    // Update the stock quantity
    stockAggregate.updateQuantity(args.quantity);
    await stockRepository.save(stockAggregate);

    // Cross-domain consistency: if stock goes to zero, mark product as out of stock
    const productAggregate = await productRepository.getById(args.productId);
    if (args.quantity === 0 && productAggregate.isActive()) {
      productAggregate.markOutOfStock();
      await productRepository.save(productAggregate);
    }
  },
});

export const reserveStock = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const stockRepository = new StockRepository(ctx);
    const productRepository = new ProductRepository(ctx);

    // Get the stock aggregate
    const stockAggregate = await stockRepository.getByProductId(args.productId);
    if (!stockAggregate) {
      throw new Error("Stock not found for product");
    }

    // Reserve the stock (this will throw if insufficient stock)
    stockAggregate.reserve(args.quantity);
    await stockRepository.save(stockAggregate);

    // Cross-domain consistency: if stock goes to zero, mark product as out of stock
    const productAggregate = await productRepository.getById(args.productId);
    if (stockAggregate.getQuantity() === 0 && productAggregate.isActive()) {
      productAggregate.markOutOfStock();
      await productRepository.save(productAggregate);
    }
  },
});

export const restockProduct = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const stockRepository = new StockRepository(ctx);
    const productRepository = new ProductRepository(ctx);

    // Get the stock aggregate
    const stockAggregate = await stockRepository.getByProductId(args.productId);
    if (!stockAggregate) {
      throw new Error("Stock not found for product");
    }

    // Restock the product
    stockAggregate.restock(args.quantity);
    await stockRepository.save(stockAggregate);

    // Cross-domain consistency: if product was out of stock and now has stock,
    // it can potentially be activated (but we don't auto-activate, that's a business decision)
    const productAggregate = await productRepository.getById(args.productId);
    if (productAggregate.isOutOfStock()) {
      // Note: We don't auto-activate here - that should be an explicit business decision
      // But we could add a flag to the mutation args to allow auto-activation
      console.log(
        `Product ${args.productId} is back in stock and could be activated`,
      );
    }
  },
});
