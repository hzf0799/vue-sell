<template>
  <div class="cartcontrol">
  <transition name="move">
    <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="decreaseCart" v-show="food.count > 0">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
  </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
    export default {
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        addCart (event) {
        // 只执行一次
        if (!event._constructed) {
          return
        } if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
          } else {
          this.food.count++
          }
        },
        decreaseCart () {
        if (!event._constructed) {
          return
        } if (this.food.count) {
          this.food.count--
        }
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
.move-enter-active, .move-leave-active
  transition:all .4s  ;
.move-enter, .move-leave-to
  opacity :0;
  transform :rotate(180px);
  transform :translate3d(24px, 0, 0);
.cartcontrol
  font-size :0;
  .cart-decrease
    display :inline-block;
    padding :6px;
    transform :translate3d(0, 0, 0);
    .inner
      display :inline-block;
      font-size :24px;
      line-height :24px;
      color:#CD8162;
      transform :rotate(0);
  .cart-count
    display :inline-block;
    vertical-align :top;
    width :12px;
    padding-top :6px;
    line-height :24px;
    text-align :center;
    font-size :10px;
    color :rgb(147,153,159);
  .cart-add
    display :inline-block;
    color:#CD8162;
    padding :6px; // 加用户点击触摸大小
    font-size :24px;
    line-height :24px;
</style>
