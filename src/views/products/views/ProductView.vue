<template>
  <div class="product-view">
    <BFormInput class="product-view--search-input" :debounce="300" placeholder="Search product" v-model="keyword"
                @keyup.enter="search(keyword)" @update="search(keyword)"/>
    <div>
      <h1 v-if="loading && products.length===0" class="loading">Loading...</h1>
      <h1 v-else-if="errorMsg" class="error">{{ errorMsg }}</h1>
      <ProductListing v-else :products="products"/>
      <div v-if="isUpdating" class="spinner"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Product, ProductRepository, ProductRepositoryImpl } from '@/core/product'
import ProductListing from '@/views/products/components/ProductListing.vue'
import { BFormInput } from 'bootstrap-vue'

@Component({
  components: { ProductListing, BFormInput }
})
export default class ProductView extends Vue {
  private static readonly SIZE = 20;
  private readonly repository: ProductRepository = new ProductRepositoryImpl();
  private products: Product[] = [];
  private loading = false;
  private errorMsg = '';
  private keyword = '';
  private from = 0;
  private total = -1;

  mounted () {
    this.init()
    window.addEventListener('scroll', this.handleScroll)
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  private async init () {
    await this.search(this.keyword)
  }

  protected async loadProduct (keyword: string, from: number) {
    try {
      if (this.loading) {
        return
      }
      if (this.total >= 0 && this.total === from) {
        return
      }
      this.loading = true
      const { products, limit, total } = await this.repository.list(keyword, from, ProductView.SIZE)
      this.from += limit
      this.total = total
      this.products = this.products.concat(products)
    } catch (ex) {
      console.error(ex)
      this.errorMsg = ex.toString()
    } finally {
      this.loading = false
    }
  }

  protected async search (keyword: string) {
    this.products = []
    return this.loadProduct(keyword, 0)
  }

  protected get isUpdating (): boolean {
    return this.loading && this.products.length > 0
  }

  private handleScroll () {
    const position = window.scrollY
    const viewportHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const isScrollToEnd = position === documentHeight - viewportHeight
    if (isScrollToEnd && !this.isUpdating) {
      return this.loadProduct(this.keyword, this.from)
    }
  }
}
</script>

<style lang="scss">
.product-view {
  &--search-input {
    position: sticky;
    top: 16px;
    width: 300px;
    height: 20px;
    padding: 10px;
    border: 1px solid #d6d6d6;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 16px;

    &::placeholder {
      color: #d6d6d6;
    }

    &:focus::placeholder {
      opacity: 0;
    }
  }

  .spinner {
    width: 16px;
    height: 16px;
    margin: 0 auto;
    border: 4px solid #ccc;
    border-radius: 50%;
    border-top-color: #000;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
