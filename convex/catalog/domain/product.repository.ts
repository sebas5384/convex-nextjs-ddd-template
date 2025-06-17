import { ProductAggregate } from "./product.aggregate";
import { NewProductEntity, ProductEntityId } from "./product.model";

export interface ProductRepository {
  create(product: NewProductEntity): Promise<void>;
  save(product: ProductAggregate): Promise<void>;
  delete(id: ProductEntityId): Promise<void>;
  getById(id: ProductEntityId): Promise<ProductAggregate>;
  getBySku(sku: string): Promise<ProductAggregate>;
  getByCategory(category: string): Promise<ProductAggregate[]>;
}
