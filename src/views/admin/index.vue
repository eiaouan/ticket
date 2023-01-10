<template>
  <div class="">
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
      type="primary"
      >新增车次</a-button
    >
    <selectForm
      :arrStationOptions="arrStationOptions"
      :dpStationOptions="dpStationOptions"
      @searchTrain="searchTrain"
    ></selectForm>
    <myTable
      :dataSource="dataSource"
      :columns="columns"
      @changePage="changePage"
    >
      <template #action="{ record }">
        <!-- 通过record.name获取参数 -->
        <a-button type="danger" @click="hanldDelete(record.key)">删除</a-button>
      </template>
    </myTable>
  </div>
</template>
<script lang="ts">
import { ref, createVNode, onMounted, computed } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { getData } from "../../api/test";
import myTable from "@/components/myTable.vue";
import selectForm from "../index/components/selectForm.vue";
import { getAllTrains } from "@/api/train";
import dayjs from "dayjs";
interface FormState {
  key: number;
  name: string;
  age: number;
  sex: string;
  apartment?: string;
  class?: string;
  status?: string;
}
export default {
  components: {
    myTable,
    selectForm,
  },
  setup() {
    let dataSource = ref([]);
    let columns = [
      {
        title: "列车号",
        dataIndex: "lpNum",
        key: "lpNum",
        width: 120,
        col: 4,
      },
      {
        title: "起始站",
        dataIndex: "dpStation",
        key: "dpStation",
        width: 120,
        col: 3,
      },
      {
        title: "目的地",
        dataIndex: "arrStation",
        key: "arrStation",
        width: 120,
        col: 3,
      },
      {
        title: "发车时间",
        dataIndex: "dpTime",
        key: "dpTime",
        width: 120,
        col: 4,
      },
      {
        title: "频次",
        dataIndex: "frequeny",
        key: "frequeny",
        width: 120,
        col: 3,
      },
      {
        title: "容量",
        dataIndex: "cap",
        key: "cap",
        width: 120,
        col: 3,
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        width: 120,
        col: 3,
      },
    ];
    let addData = ref<FormState>();
    let modalTitle = ref<string>("新增信息");
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
    const getInfo = async () => {
      let res = await getData();
      dataSource.value = res.data;
      allTrains.value = res.data;
    };
    const handleAdd = () => {
      // 添加
    };
    const hanldDelete = (key: string) => {
      // 弹窗
      Modal.confirm({
        title: "确认删除该信息？",
        icon: createVNode(ExclamationCircleOutlined),
        // content: createVNode(
        //   "div",
        //   { style: "color:red;" },
        //   "Some descriptions"
        // ),
        okType: "danger",
        onOk() {
          dataSource.value = dataSource.value.filter(
            (item: any) => item.key !== key
          );
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test",
      });

      // 确认或者取消
    };
    // searchInfo
    let condition = ref([]); // ['计算机学院','20（1）班']
    const searchInfo = () => {
      console.log("search");
    };
    const changePage = (page: number, pageSize: number) => {
      // getData(page, pageSize);
    };

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
    };

    const getTrains = async () => {
      loading.value = true;
      let res = await getAllTrains();
      allTrains.value = res.data;
      console.log("所有车次的请求结果", allTrains.value);
      //解析数据，获取所有的城市名称
      loading.value = false;
    };
    dataSource.value = allTrains.value;
    onMounted(() => {
      getInfo();
      // getTrains(); 获取全部车次信息
    });
    return {
      dataSource,
      columns,
      hanldDelete,
      modalTitle,
      handleAdd,
      addData,
      searchInfo,
      condition,
      changePage,
      dpStationOptions,
      arrStationOptions,
      searchTrain,
    };
  },
};
</script>

<style lang="less" scoped>
.ant-btn {
  margin: 5px;
  padding: 5px;
}
</style>
