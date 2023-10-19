<template>
  <div class="product-item" @click="selectProduct(product)">
    <img class="product-item--thumbnail" :src="product.thumbnail" alt="thumbnail">
    <div class="product-item--info">
      <h5>{{ product.title }}</h5>
      <p>{{ product.description }}</p>
      <b>${{ product.price }} (<span style="color: red">-{{ product.discountPercentage }}%</span>)</b>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Product } from '@/core/product'

@Component({})
export default class ProductItem extends Vue {
  @Prop({ required: true })
  protected readonly product!: Product;

  protected selectProduct (product: Product) {
    this.$emit('select', product)
  }
}
</script>

<style lang="scss">

.product-item {
  display: flex;
  flex-direction: row;
  height: 96px;
  border-radius: 8px;
  padding: 8px 12px;

  &:hover {
    box-shadow: 0 0 0 1px #d6d6d6;
    cursor: pointer;
  }

  &--thumbnail {
    aspect-ratio: 16/9;
    margin-right: 8px;
    border-radius: 8px;
  }

  &--info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: start;
    max-width: 100%;

    h5, p {
      margin: unset;
      text-align: start;

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
