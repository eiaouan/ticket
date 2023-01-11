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
    let allTrains = ref<Array<any>>([]);
    let dpStationOptions = computed(() => {
      let update = [];
      for (let item in allTrains.value) {
        console.log("item", item);
        if (allTrains.value[item].dpStation) {
          update.push(allTrains.value[item].dpStation);
        }
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
        if (allTrains.value[item].arrStation) {
          update.push(allTrains.value[item].arrStation);
        }
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
      allTrains.value = res.data.data;
      showedTrain.value = allTrains.value;
      console.log("所有车次的请求结果", allTrains.value);
      //解析数据，获取所有的城市名称
      loading.value = false;
    };
    onMounted(() => {
      getTrains(); //获取全部车次信息
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
