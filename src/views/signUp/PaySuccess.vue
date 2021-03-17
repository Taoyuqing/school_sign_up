<template>
  <div class="success">
    支付成功 页面跳转中...若跳转失败，请手动点击左下角返回
  </div>
</template>

<script>
export default {
  name: 'PaySuccess',
  mounted() {
    this.timer = setTimeout(() => {
      this.$router.go(-1)
    }, 1000)
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  data() {
    return {
      timer: null,
    }
  },
}
</script>

<style>
.success {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  padding: 40px;
  box-sizing: border-box;
}
</style>