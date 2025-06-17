import { Id } from "@/_generated/dataModel";
import { StockAggregate } from "./stock.aggregate";
import { NewStock, StockId } from "./stock.model";

export interface StockRepository {
  create(stock: NewStock): Promise<void>;
  save(stock: StockAggregate): Promise<void>;
  delete(id: StockId): Promise<void>;
  getById(id: StockId): Promise<StockAggregate>;
  getByProductId(productId: Id<"products">): Promise<StockAggregate | null>;
}
