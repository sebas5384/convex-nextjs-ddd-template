import { MutationCtx } from "@/_generated/server";
import { StockAggregate } from "./domain/stock.aggregate";
import { NewStock, StockId } from "./domain/stock.model";
import { StockRepository as IStockRepository } from "./domain/stock.repository";
import { ProductEntityId } from "@/catalog/domain/product.model";
import { getOneFrom } from "convex-helpers/server/relationships";

export class StockRepository implements IStockRepository {
  constructor(private ctx: MutationCtx) {}

  async create(stock: NewStock) {
    await this.ctx.db.insert("stocks", stock);
  }

  async save(stockAggregate: StockAggregate) {
    const entity = stockAggregate.toEntity();
    await this.ctx.db.patch(entity._id, entity);
  }

  async delete(id: StockId) {
    await this.ctx.db.delete(id);
  }

  async getById(id: StockId) {
    const stock = await this.ctx.db.get(id);
    if (!stock) {
      throw new Error("Stock not found");
    }
    return new StockAggregate(stock);
  }

  async getByProductId(productId: ProductEntityId) {
    const stock = await getOneFrom(
      this.ctx.db,
      "stocks",
      "by_product",
      productId,
    );

    if (!stock) {
      return null;
    }
    return new StockAggregate(stock);
  }
}
