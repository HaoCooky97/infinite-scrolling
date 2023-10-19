import { Product, ProductListingResponse } from '../domain'

export abstract class ProductRepository {
    abstract list(keyword: string, from: number, size: number): Promise<ProductListingResponse>;
}

export class ProductRepositoryImpl extends ProductRepository {
  async list (keyword: string, from: number, size: number): Promise<ProductListingResponse> {
    const response = await fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=${size}&skip=${from}`)
    return await response.json()
  }
}
