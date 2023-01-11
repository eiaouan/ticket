<template>
  <div class="ticket">
    <a-descriptions title="订单详情">
      <a-descriptions-item label="起始站">{{
        item.dpStation
      }}</a-descriptions-item>
      <a-descriptions-item label="终点站">{{
        item.arrStation
      }}</a-descriptions-item>
      <a-descriptions-item label="乘客">{{
        item.userName
      }}</a-descriptions-item>
      <a-descriptions-item label="价格">{{ item.price }}</a-descriptions-item>
      <a-descriptions-item label="列车号">{{ item.lpNum }}</a-descriptions-item>

      <a-descriptions-item label="乘坐时间">{{ dpTime }}</a-descriptions-item>
      <!-- 超时不允许退票 -->
      <a-descriptions-item v-if="!outOfDate">
        <a-button type="danger" @click="clickRefund(item.id)">退票</a-button>
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script lang="ts">
import { deleteTicket } from "@/api/ticket";
import { getTrainById } from "@/api/train";
import { ref, onMounted, createVNode } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import dayjs from "dayjs";

export default {
  props: ["item"],
  setup(props) {
    let outOfDate = ref<boolean>(false);
    let dpTime = ref(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const clickRefund = async (trainId: number) => {
      Modal.confirm({
        title: "Confirm",
        icon: createVNode(ExclamationCircleOutlined),
        content: "确认退票",
        okText: "确认",
        cancelText: "取消",
        onOk: async () => {
          let res = await deleteTicket(trainId);
          console.log(res);
          if (res.data.status == 20000) {
            message.success("退票成功");
          } else {
            message.error(res.data.message);
          }
        },
      });
    };
    const isOutOfDate = async () => {
      let res = await getTrainById(props.item.trainId);
      if (res.data.status == 20000) {
        // 查找成功，判断有无过期
        dpTime.value = res.data.data.dpTime;
        if (dpTime.value < dayjs().format("YYYY-MM-DD HH:mm:ss")) {
          outOfDate.value = true;
        }
      } else {
        message.error(res.data.msg);
      }
    };
    onMounted(() => {
      isOutOfDate();
    });
    return {
      props,
      clickRefund,
      outOfDate,
      dpTime,
    };
  },
};
</script>
<style lang="less" scoped>
.ticket {
  border-bottom: 1px solid #ddd;
}
</style>
