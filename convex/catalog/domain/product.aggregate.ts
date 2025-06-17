import { ProductEntity, ProductEntityId } from "./product.model";

export class ProductAggregate {
  constructor(private product: ProductEntity) {}

  toEntity(): ProductEntity {
    return { ...this.product };
  }

  update(product: Partial<ProductEntity>) {
    this.product = {
      ...this.product,
      ...product,
    };
    return this;
  }

  disable() {
    this.product.status = "inactive";
    return this;
  }

  activate(hasStock: boolean) {
    if (this.product.status === "active") {
      throw new Error("Product is already active");
    }

    if (!hasStock) {
      throw new Error("Cannot activate product: no stock available");
    }

    this.product.status = "active";
    return this;
  }

  markOutOfStock() {
    this.product.status = "outOfStock";
    return this;
  }

  getId(): ProductEntityId {
    return this.product._id;
  }

  getStatus(): string {
    return this.product.status;
  }

  isActive(): boolean {
    return this.product.status === "active";
  }

  isOutOfStock(): boolean {
    return this.product.status === "outOfStock";
  }
}
