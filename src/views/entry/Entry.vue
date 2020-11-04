<template>
  <div>
    <div class="log">
      <div>
        <img src="../../assets/u45.png" />
        <div style="text-align: center;">
          重庆江北建共职校报名入口
        </div>
      </div>
    </div>

    <div style="width:90%;margin-left:5%">
      <van-button type="primary" size="large">新生报名</van-button>
      <van-button  color="#FFA847" size="large">继教报名</van-button>
      <van-button color="#34495E" size="large">补考报名</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
@import '../../styles/common.scss';
.log {
  padding-top: px2rem(80);
  > div {
    margin-left: 5%;
    width: 90%;
    display: flex;
    font-size: px2rem(24);
    color: #008fd7;
    align-items: center;
    font-weight: 600;
  }
  img {
    width: px2rem(120);
  }
  width: 100%;
}
</style>