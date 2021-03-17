<template>
  <div class="container">
    <div class="log">
      <div>
        <img src="../../assets/u45.png" />
        <div style="text-align: center">报名记录查询</div>
      </div>
    </div>
    <form action="/">
      <van-search v-model="value" placeholder="请输入手机号" @search="search" />
    </form>
    <div class="contentContainer" style="border: none" v-if="list.length !== 0">
      <div class="content">
        <div class="label">姓名：</div>
        <div class="fl">{{ list[0].ksname }}</div>
      </div>
      <div class="content">
        <div class="label">身份证号：</div>
        <div class="fl">
          {{ list[0].kscardno.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2') }}
        </div>
      </div>
    </div>
    <div class="none" v-if="isShow">未查询到报名记录</div>
    <div style="flex: 1; overflow: scroll">
      <div
        class="contentContainer"
        v-for="(item, index) in list"
        :key="'search' + index"
      >
        <div class="content">
          <div class="label">专业：</div>
          <div class="fl fr">{{ item.zyname }}</div>
        </div>
        <div class="content">
          <div class="label">缴费状态：</div>
          <div class="fl fr">已缴费</div>
        </div>
        <div class="content">
          <div class="label">报名类型：</div>
          <div class="fl fr">{{ item.bmtype }}</div>
        </div>
        <div class="content">
          <div class="label">报名时间：</div>
          <div class="fl fr">{{ item.bmtime }}</div>
        </div>
      </div>
    </div>
    <van-button type="primary" size="large" class="mt" @click="back"
      >返回首页</van-button
    >

    <!-- <div class="contentContainer" style="margin-top:10px">
      <div class="content">
        <div class="label">专业</div>
        <div class="fl">5407</div>
      </div>
      <div class="content">
        <div class="label">身份证号：</div>
        <div class="fl">5407</div>
      </div>
      <div class="content">
        <div class="label">身份证号：</div>
        <div class="fl">5407</div>
      </div>
      <div class="content">
        <div class="label">身份证号：</div>
        <div class="fl">5407</div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { phoneValidator } from '../../utils/validator'
import { Toast } from 'vant'
export default {
  mounted() {},
  data() {
    return {
      value: '',
      list: [],
      isShow: false,
    }
  },
  mounted() {},
  methods: {
    search() {
      if (!phoneValidator(this.value)) {
        Toast('请输入正确的手机号码')
        return
      }
      this.getData()
    },
    back() {
      this.$router.go(-1)
    },
    getData() {
      this.$http
        .get('/jbjg/enroll/search.action?telno=' + this.value)
        .then((res) => {
          this.list = res.data.rows
          this.isShow = false
          if (this.list.length === 0) {
            this.isShow = true
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.none {
  width: 100vw;
  color: red;
  margin-top: 20px;
  padding-left: 20px;
}
.container {
  font-size: px2rem(16);
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.log {
  padding-top: px2rem(20);
  > div {
    width: 90%;
    display: flex;
    justify-content: center;
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
.content {
  overflow: hidden;
  padding-top: px2rem(6);
  .label {
    float: left;
    width: px2rem(100);
  }
}
.contentContainer {
  border: 1px solid #ededed;
  border-radius: 5px;
  overflow: hidden;
  color: #999999;
  margin: 0px 10px;
  margin-top: 10px;
  padding: px2rem(10) px2rem(10) px2rem(6) px2rem(10);
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>