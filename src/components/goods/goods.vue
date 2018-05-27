<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuwrapper">
        <ul>
          <li class="menu-item" v-for="(item,index) in goods" :key ="index" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
            <span class="text border-1px"></span>
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodswrapper">
        <ul>
          <li v-for="good in goods" :key="good.id" class="food-list food-list-hook" >
            <h1 class="title">{{good.name}}</h1>
            <ul  height="100">
              <li v-for="food in good.foods" @click="selectFood(food,$event)" :key="food" class="food-item border-1px" >
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="new">￥{{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                   <cartcontrol :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shopcart :select-foods="selectFoods"  :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from '../shop/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import food from '../food/food.vue'
  const ERR_OK = 0
  export default{
    data () {
      return {
          goods: [],
          listHeight: [],
          scrollY: 0,
          selectedFood: {}
        }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.classMap = [ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ]
      // this.$http.get('/api/goods').then((response) => { // 成功回调
      //   response = response.body
      //   if (response.errno === ERR_OK) {
      //     this.goods = response.data
      //     this.$nextTick(() => {
      //       this._initScroll()
      //       this._calculateHeight()
      //     })
      //   }
      // })
      this.$http.get('https://raw.githubusercontent.com/hzf0799/hzf0799.github.io/master/data.json').then((response) => { // 成功回调
        response = response.body
        this.goods = response.goods
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) {
          return
        }
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let ref = foodList[index]
        this.foodsScroll.scrollToElement(ref, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on("scroll", (p) => {
            let pheight = Math.abs(Math.round(p.y))
            this.scrollY = pheight
        })
        if (!this.foodsScroll) {
          this.foodsScroll = new BScroll(this.$refs.foodswrapper, {
            probeType: 3,
            click: true
          })
        } else {
          this.foodsScroll.refresh()
        }
      },
      _calculateHeight () {
        let foodList = this.$refs.foodswrapper.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      }
    },
    components: {
      'shopcart': shopcart,
      'cartcontrol': cartcontrol,
      'food': food
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            return i
          }
        }
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((goods) => {
          goods.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/mixin.styl";
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex:0 0 90px;
      width : 90px;
      background :#2b343c;
      color : #fff;
      .menu-item
        height :54px;
        width :66px;
        line-height :18px;
        display :table;
        padding : 0 12px;
        &.current
          position :relative;
          z-index:10;
          margin-top :-1px;
          background :#f3f5f7;
          color :black;
          font-weight :700;
          .text
            border-none();
            font-weight: 700;
        .icon
          display : inline-block;
          width : 12px;
          height : 12px;
          margin-right : 4px;
          background-size :12px 12px;
          background-repeat : no-repeat;
          &.decrease
            bg-image : ('decrease_3');
          &.discount
            bg-image : ('discount_3');
          &.guarantee
            bg-image : ('guarantee_3');
          &.invoice
            bg-image : ('invoice_3');
          &.special
            bg-image : ('special_3');
        .text
          display :table-row;
          font-size: 14px;
          width :66px;
          border-1px:(rgba(7,17,27,0.1));
    .foods-wrapper
      flex:1;
      ul
        .food-list
          .title
            padding-left :14px;
            height:26px;
            font-size :12px;
            line-height :26px;
            color :rgb(147,153,159);
            background :#f3f5f7;
            border-left :2px solid #d9dde1;
          .food-item
            display :flex;
            margin :18px;
            padding-bottom :18px;
            border-1px:(rgba(7,17,27,0.1));
            &:last-child{
              border-none:();
              margin-bottom :0;
            }
            .icon
              flex:0 0 57px;
            .content
              margin-left :10px;
              flex:1;
              .name
                margin :2px 0 8px 0;
                font-size :14px;
                color :rgb(7,17,27);
                line-height :14px;
              .desc,.extra
                margin-bottom :8px;
                font-size :10px;
                color :rgb(147,153,159);
                line-height :14px;
              .desc
                margin-bottom :8px;
              .extra
                .count
                  margin-right :12px;
              .price
                font-weight :700;
                .new
                  margin-right :8px;
                  font-size :14px;
                  color :rgb(240,20,20);
                .old
                  text-decoration :line-through;
                  font-size :10px;
                  color :rgb(147,153,159);
              .cartcontrol-wrapper
                position :absolute;
                right :0;
                bottom : 12px;
</style>
