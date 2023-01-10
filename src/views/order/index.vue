<template>
  <div>
    <!-- 待使用，已过期 -->
    <a-card>
      <ticket v-for="(item, index) in myOrders" :key="index" :item="item">
      </ticket>
    </a-card>
  </div>
</template>
<script lang="ts">
import { ref, createVNode } from "vue";
import { selectTicket } from "@/api/ticket";
import { message } from "ant-design-vue";
import ticket from "@/components/ticket.vue";

export default {
  components: {
    ticket,
  },
  setup() {
    let myOrders = ref([
      {
        id: 3,
        arrStation: "广州南站",
        dpStation: "饶平站",
        lpNum: "G6313",
        trainId: 1,
        userId: 2,
        userName: "杨彬烜",
        price: 220,
        createTime: "2020-06-18T15:59:59.000+00:00",
        updateTime: "2020-06-18T15:59:59.000+00:00",
        is_deleted: null,
      },
      {
        id: 4,
        arrStation: "饶平站",
        dpStation: "广州南站",
        lpNum: "G6313",
        trainId: 2,
        userId: 2,
        userName: "杨彬烜",
        price: 220,
        createTime: "2023-01-09T14:02:18.000+00:00",
        updateTime: "2023-01-09T14:02:20.000+00:00",
        is_deleted: null,
      },
      {
        id: 5,
        arrStation: "深圳北站",
        dpStation: "饶平站",
        lpNum: "G6314",
        trainId: 3,
        userId: 2,
        userName: "杨彬烜",
        price: 170,
        createTime: "2020-06-18T15:59:59.000+00:00",
        updateTime: "2020-06-18T15:59:59.000+00:00",
        is_deleted: null,
      },
    ]);
    let loading = ref<boolean>(true);
    let activeKey = ref(); // 折叠面板

    let columns = [
      {
        title: "起始站",
        dataIndex: "dpStation",
        key: "dpStation",
        width: 120,
        col: 2,
        activeKey,
      },
    ];
    const getMyOders = async () => {
      let res = await selectTicket();
      if (res.data.status == 20000) {
        message.success("查询成功");
        myOrders.value = res.data.data;
      }
    };
    return {
      myOrders,
      columns,
      loading,
    };
  },
};
</script>
<style lang="scss" scoped></style>
