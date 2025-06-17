import { getManyFrom, getOneFrom } from "convex-helpers/server/relationships";
import { MutationCtx } from "@/_generated/server";
import { ProductAggregate } from "./domain/product.aggregate";
import { NewProductEntity, ProductEntityId } from "./domain/product.model";
import { ProductRepository as IProductRepository } from "./domain/product.repository";

export class ProductRepository implements IProductRepository {
  constructor(private ctx: MutationCtx) {}

  async create(product: NewProductEntity) {
    await this.ctx.db.insert("products", product);
  }

  async delete(id: ProductEntityId) {
    await this.ctx.db.delete(id);
  }

  async getById(id: ProductEntityId) {
    const product = await this.ctx.db.get(id);

    if (!product) {
      throw new Error("Product not found");
    }
    return new ProductAggregate(product);
  }

  async getBySku(sku: string) {
    const product = await getOneFrom(this.ctx.db, "products", "by_sku", sku);

    if (!product) {
      throw new Error("Product not found");
    }
    return new ProductAggregate(product);
  }

  async getByCategory(category: string) {
    const products = await getManyFrom(
      this.ctx.db,
      "products",
      "by_category",
      category,
    );

    if (!products) {
      throw new Error("Products not found");
    }
    return products.map((product) => new ProductAggregate(product));
  }

  async save(productAggregate: ProductAggregate) {
    const entity = productAggregate.toEntity();
    await this.ctx.db.patch(entity._id, entity);
  }
}
