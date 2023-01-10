<template>
  <div class="train-from">
    <!-- 表单  -->
    <!-- 起始地 -->
    <a-row>
      <a-col :span="6"
        >起始地：<a-select
          v-model:value="formdata.dpStation"
          style="width: 70%"
          placeholder="选择起始地"
          :options="props.dpStationOptions"
        ></a-select
      ></a-col>
      <a-col :span="6">
        目的地：<a-select
          v-model:value="formdata.arrStation"
          style="width: 70%"
          placeholder="选择目的地"
          :options="props.arrStationOptions"
        ></a-select
      ></a-col>
      <a-col :span="6"
        ><!-- 时间 -->
        出发时间：<a-date-picker v-model:value="formdata.dpTime"></a-date-picker
      ></a-col>
      <a-col :span="6"
        ><a-button type="primary" @click="search">查询</a-button></a-col
      >
    </a-row>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { message } from "ant-design-vue";
// import dayjs, { Dayjs } from "dayjs";
export default {
  props: {
    dpStationOptions: {
      type: Array<any>,
      default: () => [{ value: "广州", label: "广州" }],
    },
    arrStationOptions: {
      type: Array<any>,
      default: () => [{ value: "北京", label: "北京" }],
    },
  },
  setup(props, ctx) {
    let formdata = ref<any>({});
    const search = () => {
      let dpTime;
      if (!formdata.value.dpStation) {
        message.error("请填写起始地");
      } else if (!formdata.value.arrStation) {
        message.error("请填写目的地");
      } else {
        // 发送请求

        ctx.emit("searchTrain", formdata.value);
      }
    };

    return {
      formdata,
      props,
      search,
    };
  },
};
</script>
<style lang="less" scoped>
.train-from {
  margin-top: 20px;
  padding: 30px 10px;
  background-color: #f0f0f0;
}
</style>
