<template>
  <div>
    <div class="log">
      <div>
        <img src="../../assets/u45.png" />
        <div style="text-align: center">
          重庆江北建工职校
          <div>报名入口</div>
        </div>
      </div>
    </div>

    <div style="width: 90%; margin-left: 5%">
      <van-button color="#34495E" size="large" class="mt" @click="reExa"
        >补考缴费</van-button
      >
      <van-button color="#FFA847" size="large" class="mt" @click="continueExa"
        >继教报名</van-button
      >
      <van-button type="primary" size="large" class="mt" @click="newExa"
        >新生报名</van-button
      >
      <van-button type="primary" size="large" class="mt" color="#3c8be5" @click="searchPage"
        >报名查询</van-button
      >
    </div>
  </div>
</template>

<script>
import { getauthorize, createOrder, getUrlParam } from '../../utils/wxUtils'
export default {
  created() {
    
  },
  mounted(){
    this.authorizeClick()
  },
  methods: {
    newExa() {
      this.$router.push({
        path: '/newExa',
      })
    },
    reExa() {
      this.$router.push({
        path: '/reExa',
      })
    },
    continueExa() {
      this.$router.push({
        path: '/continueExa',
      })
    },
    searchPage() {
      this.$router.push({
        path: '/searchPage',
      })
    },
    async authorizeClick() {
      let code = getUrlParam('code')
      let openid = localStorage.getItem('openid', openid)
      if (!code) {
        getauthorize()
        return
      }
      let data = await this.$http.get('/jbjg/pay/getOpenId', {
        params: {
          code,
        },
      })
      if (!data || !data.data) {
        return
      }
      openid = data.data
      localStorage.setItem('openid', openid)
      localStorage.setItem('code', code)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../styles/common.scss';
.log {
  padding-top: px2rem(80);
  > div {
    margin-left: 5%;
    width: 90%;
    display: flex;
    font-size: px2rem(20);
    color: #008fd7;
    align-items: center;
    font-weight: 600;
  }
  img {
    width: px2rem(120);
  }
  width: 100%;
}
.mt {
  margin-top: px2rem(12);
}
</style>