import { Product } from "./product";

export interface Items {
    info: Product | undefined, 
    order: number, 
    total: number
}
