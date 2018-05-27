<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <nav class="tab border-1px">
      <div class="tab-item">
        <router-link to='/goods' >商品</router-link>
        </div>
      <div class="tab-item">
        <router-link to='/ratings'>评论</router-link>
        </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </nav>
    <keep-alive>
    <router-view :seller="seller" > </router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header.vue'
const ERR_OK = 0
export default{
  data () {
    return {
    seller: {}
     }
  },
  created () {
      // this.$http.get('api/seller').then((response) => { // 成功回调
    //   response = response.body
    //   if (response.errno === ERR_OK) {
    //     this.seller = response
    //   }
    //   console.log(response)
    // })
    this.$http.get('https://raw.githubusercontent.com/hzf0799/hzf0799.github.io/master/data.json').then((response) => { // 成功回调
      response = response.body
      this.seller = response.seller
    })
  },
 components: {
    'v-header': header
 }
}
</script>
<style rel="stylesheet" lang="stylus">
  @import "./common/stylus/mixin.styl";
  .tab
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px:(rgba(7,17,27,0.1));
    .tab-item
      flex: 1; /*等比例占满*/
      text-align: center;
      &>a
        display: block;
        font-size: 16px;
        color: rgb(77,85,93);
        &.active
          color: rgb(240, 20, 20);
</style>
