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
import { ref, createVNode, onMounted } from "vue";
import { selectTicket } from "@/api/ticket";
import { message } from "ant-design-vue";
import ticket from "@/components/ticket.vue";

export default {
  components: {
    ticket,
  },
  setup() {
    let myOrders = ref([]);
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
    onMounted(() => {
      getMyOders();
    });
    return {
      myOrders,
      columns,
      loading,
    };
  },
};
</script>
<style lang="scss" scoped></style>
