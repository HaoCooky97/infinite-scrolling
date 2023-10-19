import { Product } from './Product'

export interface ProductListingResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
