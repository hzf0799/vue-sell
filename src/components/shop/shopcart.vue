<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleLise">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalContent > 0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalContent > 0}"></i>
            </div>
            <div v-show="totalContent > 0" class="num">{{totalContent}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice   > 0}">￥{{totalPrice}}元</div>
          <div class="desc">另需配送费:￥{{deliveryPrice}}元</div>
        </div>
        <!-- stop.prevent取消冒泡 -->
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <transition name="fold">
        <div class="shoplist" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="food in selectFoods" :key="food.id">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  <transition name="fade">
    <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
    export default{
      data () {
        return {
          fold: true
        }
      },
      props: {
        selectFoods: {
          type: Array,
          default () {
            return [
              {
                price: 0,
                count: 0
              }
            ]
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      components: {
        'cartcontrol': cartcontrol
      },
      computed: {
        totalPrice () {
          let total = 0
          this.selectFoods.forEach((food) => {
              total += food.price * food.count
          })
          return total
        },
        totalContent () {
          let count = 0
          this.selectFoods.forEach((food) => {
           count += food.count
          })
          return count
        },
        payDesc () {
          if (this.totalPrice === 0) {
            return `￥${this.minPrice}元起送`
          } else if (this.totalPrice < this.minPrice) {
            let diff = this.minPrice - this.totalPrice
            return `还差￥${diff}元起送`
          } else {
            return '去结算'
          }
        },
        payClass () {
          if (this.totalPrice < this.minPrice) {
            return 'not-enough'
          } else {
            return 'enough'
          }
        },
        listShow () {
          if (!this.totalContent) {
            this.fold = true
            return false
          }
          let show = !this.fold
          if (show) {
            this.$nextTick(() => {
              if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
              } else {
                this.scroll.refresh()
              }
            })
          }
          return show
        }
      },
      methods: {
        toggleLise () {
          // 展开收下
          if (!this.totalContent) {
            return
          }
          this.fold = !this.fold
        },
        empty () {
          this.selectFoods.forEach((food) => {
            food.count = 0
          })
        },
        hideList () {
          this.fold = true
        },
        pay () {
          if (this.totalPrice < this.minPrice) {
            return
          }
          window.alert(`支付${this.totalPrice}元`)
        }
      }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
.fold-enter-active, .fold-leave-active
  transition: all .5s;
.fold-enter,.fold-leave-to
  opacity :0;
  transform :translate3d(0 , 183px, 0)
.fade-enter-active, .fade-leave-active
  transition: all .5s;
.fade-enter,.fade-leave-to
  opacity :0;
.shopcart
  position :fixed;
  left :0;
  bottom  :0;
  z-index: 100;
  width :100%;
  height :48px;
  .content
    display :flex;
    background :#141d27;
    font-size :0;
    .content-left
      flex :1;
      .logo-wrapper
        display :inline-block;
        position :relative;
        top: -10px;
        margin : 0 12px;
        padding : 6px;
        width : 56px;
        height : 56px;
        box-sizing: border-box;
        vertical-align :top;
        border-radius: 50%;
        background :#141d27;
        .logo
          width :100%;
          height :100%;
          border-radius: 50%;
          background :#2b343c;
          text-align :center;
          &.highlight
            background : #D2B48C;
          .icon-shopping_cart
            line-height :44px;
            font-size:24px;
            color : #80858a;
            &.highlight
              color :#fff;
        .num
          position :absolute;
          top:0;
          right :0;
          width :24px;
          height :16px;
          line-height :16px;
          text-align :center;
          border-radius :32px;
          font-size :9px;
          color :#fff;
          background :#EE6363;
          box-shadow : 0 4px 8px 0 rgba(0,0,0,0.4);
      .price
        display :inline-block;
        vertical-align :top;
        margin-top :12px;
        line-height :24px;
        padding-right :12px;
        box-sizing: border-box;
        border-right :1px solid rgba(255,255,255,0.1);
        font-size :16px;
        font-weight :700;
        color :rgba(255,255,255,0.4);
        @media only screen and (max-width :320px) {
          font-size :12px;
        }
        &.highlight
          color : #fff;
      .desc
        display :inline-block;
        vertical-align :top;
        line-height :24px;
        margin : 12px 0 0 12px;
        color :rgba(255,255,255,0.4);
        font-size : 10px;
        @media only screen and (max-width :320px) {
          margin : 0;
        }
    .content-right
      flex: 0 0 105px;
      width : 105px;
      .pay
        height :48px;
        line-height :48px;
        font-size: 12px;
        font-size:700;
        color :rgba(255,255,255,0.4);
        background :#2b333b;
        text-align :center;
        &.not-enough
          background :#2b333b;
        &.enough
          background : #D2B48C;
          color :#fff;
  .shoplist
    position :absolute;
    top : -217px;
    left :0;
    z-index :-1;
    width : 100%;
    height :217px;
    background :#f3f5f7;
    .list-header
      height :40px;
      line-height :40px;
      padding : 0 18px;
      background :#2b343c;
      border-bottom :1px solid rgba(7,17,27,0.1)
      .title
        float :left;
        font-size :12px;
        color :#fffafa;
      .empty
        float :right;
        font-size :12px;
        color :#fffafa;
    .list-content
      padding: 0 18px;
      max-height :177px;
      overflow :hidden;
      background :#fff;
      .food
        position :relative;
        padding: 12px 0;
        box-sizing:border-box;
        border-1px:(rgba(7,17,27,0.1));
        .name
          line-height :24px;
          font-size :14px;
          color :rgb(7,17,27);
        .price
          position :absolute;
          right :90px;
          bottom :12px;
          line-height :24px;
          font-size :14px;
          font-weight:700;
          color :rgb(240, 20, 20);
        .cartcontrol-wrapper
          position :absolute;
          right : 0;
          bottom : 6px;
.list-mask
  position :fixed;
  top:0;
  left :0;
  width :100%;
  height :100%;
  z-index :40;
  background :rgba(7,17,27,0.6);
</style>
