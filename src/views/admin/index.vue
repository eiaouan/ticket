<template>
  <div class="">
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
      type="primary"
      >新增车次</a-button
    >
    <!-- drawer -->
    <a-drawer
      v-model:visible="visible"
      class="custom-class"
      style="color: red"
      title="列车信息"
      placement="right"
    >
      <addTrainForm @addSuccess="addSuccess"></addTrainForm>
    </a-drawer>

    <selectForm
      :arrStationOptions="arrStationOptions"
      :dpStationOptions="dpStationOptions"
      @searchTrain="searchTrain"
    ></selectForm>
    <myTable
      :dataSource="showedTrain"
      :columns="columns"
      @changePage="changePage"
    >
      <template #action="{ record }">
        <!-- 通过record.name获取参数 -->
        <a-button type="danger" @click="hanldDelete(record)">删除</a-button>
      </template>
    </myTable>
  </div>
</template>
<script lang="ts">
import { ref, createVNode, onMounted, computed } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import myTable from "@/components/myTable.vue";
import selectForm from "../index/components/selectForm.vue";
import { getAllTrains, deleteTrain } from "@/api/train";
import dayjs from "dayjs";
import addTrainForm from "./addTrainForm.vue";
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
    addTrainForm,
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
        col: 4,
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
    let allTrains = ref<Array<any>>([]);
    let visible = ref<boolean>(false);
    const handleAdd = () => {
      // 添加
      visible.value = true;
    };
    const delTrain = async (id: number) => {
      let res = await deleteTrain(id);
      console.log("删除车次", res);
      if (res.data.status == 20000) {
        message.success("删除成功");
        // 刷新页面
        getTrains(); //获取全部车次信息
      } else {
        message.error(res.data.message);
      }
    };
    const hanldDelete = (item: any) => {
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
          // 删除车次信息
          if (item.cap == item.ticketCount) {
            // 剩余票数没买
            delTrain(item.id);
          } else {
            message.error("已有车票，不能删除");
          }
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test",
      });

      // 确认或者取消
    };
    const changePage = (page: number, pageSize: number) => {
      // getData(page, pageSize);
    };
    const addSuccess = () => {
      getTrains();
      visible.value = false;
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
      message.info("查询成功");
    };

    const getTrains = async () => {
      loading.value = true;
      let res = await getAllTrains();
      allTrains.value = res.data.data;
      console.log("所有车次的请求结果", allTrains.value);
      //解析数据，获取所有的城市名称
      loading.value = false;
      showedTrain.value = allTrains.value;
    };

    onMounted(() => {
      getTrains(); //获取全部车次信息
    });
    return {
      dataSource,
      columns,
      hanldDelete,
      modalTitle,
      handleAdd,
      addData,
      changePage,
      dpStationOptions,
      arrStationOptions,
      searchTrain,
      showedTrain,
      visible,
      getTrains,
      addSuccess,
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
