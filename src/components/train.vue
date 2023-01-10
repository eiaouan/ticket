<template>
  <!-- 车次信息 -->
  <div class="train">
    <div class="trainInfo">
      <div class="line1">
        <!-- 起点 -->
        <div class="dpStation">{{ item.dpStation }}</div>
        <div class="arrows">
          <swap-right-outlined class="arrows-right" />
          <!-- 车牌号 -->
          <div class="lpNum">{{ item.lpNum }}</div>
        </div>

        <!-- 终点 -->
        <div class="dpStation">{{ item.arrStation }}</div>
      </div>
      <div class="line2">
        <!-- 开车时间 -->
        <div class="dpTime">出发时间：{{ dpTime }}</div>
        <!-- 剩余票数 -->
        <div class="ticketCount">余票：{{ item.ticketCount }}</div>
        <div v-if="item.stopStation" class="stopStation">
          经停站：{{ item.stopStation }}
        </div>
      </div>
    </div>
    <div class="buy">
      <!-- 票价 -->
      <div class="price">￥{{ item.price }}</div>
      <!-- 购买 -->
      <a-button type="primary" @click="clickBuy">购买</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import dayjs from "dayjs";
import { ref, createVNode } from "vue";
import {
  SwapRightOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { addTicket } from "@/api/ticket";
import { message, Modal } from "ant-design-vue";
export default {
  props: ["item"],
  components: {
    SwapRightOutlined,
  },
  setup(props) {
    console.log("车次信息", props.item);
    let dpTime = dayjs(props.item.dpTime).format("YYYY-MM-DD HH:mm");
    let visible = ref<boolean>(false);
    const clickBuy = () => {
      visible.value = true;
      Modal.confirm({
        title: "Confirm",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确认购买该票",
        okText: "购买",
        cancelText: "取消",
        onOk: buyTicket,
      });
    };
    const buyTicket = async () => {
      // 做限流，用vuex
      // 页面转跳，确认购买
      console.log("购买车票", props.item.id);
      let res = await addTicket(props.item.id);
      if (res.data.status == 20000) {
        message.success("购买成功");
      } else {
        // 错误处理
        message.error(res.data.msg);
      }
    };
    return {
      props,
      dpTime,
      clickBuy,
      visible,
    };
  },
};
</script>
<style lang="less" scoped>
.train {
  display: flex;
}
.line1 {
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: 25px;
  width: 500px;
  .arrows {
    text-align: center;
    width: 120px;
  }
  .arrows-right {
    display: inline-block;
    font-size: 40px;
  }
  .lpNum {
    display: block;
    font-size: 16px;
  }
}

.dpTime,
.ticketCount,
.stopStation {
  color: #aaa;
}

.buy {
  flex-grow: 1;
  text-align: center;
  .price {
    font-size: 20px;
    color: red;
    margin-bottom: 20px;
  }
}
</style>
