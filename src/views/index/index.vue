<template>
  <div>
    <selectFrom
      :dp-station-options="dpStationOptions"
      :arr-station-options="arrStationOptions"
      @searchTrain="searchTrain"
    ></selectFrom>
    <!-- 车次表 -->
    <a-card :loading="loading" title="车次">
      <div class="train-card" v-for="(item, index) in showedTrain" :key="index">
        <train :item="item">111</train>
      </div>
    </a-card>
  </div>
</template>
<script lang="ts">
import selectFrom from "./components/selectForm.vue";
import { ref, onMounted, computed } from "vue";
import { getAllTrains } from "@/api/train";
import train from "@/components/train.vue";
import dayjs from "dayjs";
export default {
  components: {
    selectFrom,
    train,
  },
  setup() {
    let allTrains = ref<Array<any>>([
      {
        id: 19,
        createTime: "2023-01-08T05:44:01.000+00:00",
        updateTime: "2023-01-08T05:44:01.000+00:00",
        isDeleted: 0,
        lpNum: "G6313",
        dpStation: "广州11",
        arrStation: "厦门11",
        stopStation: "北京11",
        cap: 5,
        dpTime: "2023-01-05 15:40:11",
        frequeny: "每日1次",
        price: 100,
        ticketCount: 100,
      },
      {
        id: 20,
        createTime: "2023-01-08T06:15:05.000+00:00",
        updateTime: "2023-01-08T06:15:05.000+00:00",
        isDeleted: 0,
        lpNum: "G6313",
        dpStation: "广11",
        arrStation: "厦11",
        stopStation: "北11",
        cap: 5,
        dpTime: "2022-01-05 15:40:11",
        frequeny: "每日1次",
        price: 100,
        ticketCount: 100,
      },
      {
        id: 21,
        createTime: "2023-01-08T06:24:11.000+00:00",
        updateTime: "2023-01-08T06:24:11.000+00:00",
        isDeleted: 0,
        lpNum: "G6313",
        dpStation: "广11",
        arrStation: "厦11",
        stopStation: "北11",
        cap: 5,
        dpTime: "2022-01-05 15:40:11",
        frequeny: "每日1次",
        price: 100,
        ticketCount: 100,
      },
    ]);
    let dpStationOptions = computed(() => {
      let update = [];
      for (let item in allTrains.value) {
        update.push(allTrains.value[item].dpStation);
      }
      // 去重
      update = [...new Set(update)];
      let res = [];
      for (let item in update) {
        res.push({
          value: update[item],
          label: update[item],
        });
      }
      return res;
    });
    let arrStationOptions = computed(() => {
      let update = [];
      for (let item in allTrains.value) {
        update.push(allTrains.value[item].arrStation);
      }
      // 去重
      update = [...new Set(update)];
      let res = [];
      for (let item in update) {
        res.push({
          value: update[item],
          label: update[item],
        });
      }
      return res;
    });
    let loading = ref<boolean>(false);
    let showedTrain = ref<Array<any>>([]);
    const searchTrain = ({ dpStation, arrStation, dpTime }: any) => {
      loading.value = true;
      // 搜索
      showedTrain.value = [];
      // 遍历车次
      for (let index in allTrains.value) {
        let date = allTrains.value[index].dpTime.split(" ")[0];
        if (
          allTrains.value[index].dpStation == dpStation &&
          allTrains.value[index].arrStation == arrStation &&
          date == dayjs(dpTime).format("YYYY-MM-DD")
        ) {
          showedTrain.value.push(allTrains.value[index]);
        }
      }
      loading.value = false;
    };

    const getTrains = async () => {
      loading.value = true;
      let res = await getAllTrains();
      allTrains.value = res.data;
      console.log("所有车次的请求结果", allTrains.value);
      //解析数据，获取所有的城市名称
      loading.value = false;
    };
    onMounted(() => {
      // getTrains(); 获取全部车次信息
    });
    return {
      dpStationOptions,
      arrStationOptions,
      searchTrain,
      loading,
      showedTrain, //展示列表
    };
  },
};
</script>
<style lang="scss" scoped></style>
