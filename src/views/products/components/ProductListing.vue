<template>
  <div class="product-listing">
    <ProductItem class="product-listing--item" :product="product" v-for="(product, index) in products" :key="index" @select="selectProduct(product)"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Product } from '@/core/product'
import ProductItem from '@/views/products/components/ProductItem.vue'

@Component({
  components: { ProductItem }
})
export default class ProductListing extends Vue {
  @Prop({ required: true, default: () => [], type: Array })
  private readonly products!: Product[];

  protected selectProduct (product: Product) {
    //
  }
}
</script>

<style lang="scss">
.product-listing{
  display: grid;
  gap: 16px;
}
</style>
