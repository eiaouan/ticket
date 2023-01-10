<template>
  <div class="">
    <a-button
      class="editable-add-btn"
      style="margin-bottom: 8px"
      @click="handleAdd"
      type="primary"
      >Add</a-button
    >

    <!-- 选择器 -->
    <a-cascader
      v-model:value="condition"
      :options="selectOptions"
      placeholder="选择学院班级"
    />
    <!-- 搜索按钮 -->
    <a-button @click="searchInfo" type="primary">搜索</a-button>
    <!-- 导出文件 -->
    <excel :data="dataSource" />
    <a-modal
      v-model:visible="visibleAdd"
      title="新建信息"
      @ok="handleAddOk"
      :footer="[]"
    >
      <modalForm @changeValue="addInfo" :oldData="addData"></modalForm>
    </a-modal>
    <a-modal
      v-model:visible="visibleUpdate"
      title="编辑信息"
      @ok="handleAddOk"
      :footer="[]"
    >
      <modalForm :oldData="oldData" @changeValue="updateData"></modalForm>
    </a-modal>

    <!-- <a-table :dataSource="dataSource" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click="updateInfo(record)">编辑</a-button>
          <a-button type="danger" @click="hanldDelete(record.key)"
            >删除</a-button
          >
        </template>
      </template>
    </a-table> -->
    <myTable
      :dataSource="dataSource"
      :columns="columns"
      @changePage="changePage"
    >
      <template #action="{ record }">
        <!-- 通过record.name获取参数 -->
        <a-button type="primary" @click="updateInfo(record)">编辑</a-button>
        <a-button type="danger" @click="hanldDelete(record.key)">删除</a-button>
      </template>
    </myTable>
  </div>
</template>
<script lang="ts">
import { ref, createVNode, onMounted } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { message, Modal } from "ant-design-vue";
import { getData } from "../../api/test";
import modalForm from "./modalForm.vue";
import type { CascaderProps } from "ant-design-vue";
import excel from "./excel.vue";
import myTable from "./myTable.vue";
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
    modalForm,
    excel,
    myTable,
  },
  setup() {
    let dataSource = ref([]);
    let columns = [
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        width: 120,
        col: 4,
      },
      {
        title: "年龄",
        dataIndex: "age",
        key: "age",
        width: 120,
        col: 2,
      },
      {
        title: "学院",
        dataIndex: "apartment",
        key: "apartment",
        width: 120,
        col: 4,
      },
      {
        title: "班级",
        dataIndex: "class",
        key: "class",
        width: 120,
        col: 4,
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
        width: 120,
        col: 2,
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        width: 180,
        col: 8,
      },
    ];
    let visibleAdd = ref<boolean>(false);
    let visibleUpdate = ref<boolean>(false);
    let oldData = ref<FormState>({
      key: 0,
      name: "",
      age: null,
      sex: "男",
      apartment: "",
      class: "",
      status: "",
    });
    let addData = ref<FormState>({
      key: 0,
      name: "",
      age: null,
      sex: "男",
      apartment: "",
      class: "",
      status: "",
    });
    let modalTitle = ref<string>("新增信息");
    const selectOptions: CascaderProps["options"] = [
      {
        value: "计算机学院",
        label: "计算机学院",
        children: [
          {
            value: "20级（1）班",
            label: "20级（1）班",
          },
          {
            value: "20级（2）班",
            label: "20级（2）班",
          },
        ],
      },
      {
        value: "信息工程学院",
        label: "信息工程学院",
        children: [
          {
            value: "20级（1）班",
            label: "20级（1）班",
          },
          {
            value: "20级（2）班",
            label: "20级（2）班",
          },
        ],
      },
    ];
    let allData;
    const getInfo = async () => {
      let res = await getData();

      dataSource.value = res.data;
      allData = res.data;
    };

    const handleAdd = () => {
      // 弹窗
      visibleAdd.value = true;
      // 表单
      //确认
    };
    const handleAddOk = () => {
      // 点击确认
    };
    const updateInfo = (record: any) => {
      oldData.value = record;
      console.log("old", oldData);
      visibleUpdate.value = true;
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
    const addInfo = () => {
      dataSource.value.push(addData.value);
      visibleAdd.value = false;
      message.info("添加成功");
    };
    const updateData = () => {
      for (let index in dataSource.value) {
        // 遍历对象
        if (dataSource.value[index].key == oldData.value.key) {
          dataSource.value[index] = oldData.value;
        }
      }
      visibleUpdate.value = false;
      message.info("修改成功");
    };
    // searchInfo
    let condition = ref([]); // ['计算机学院','20（1）班']
    const searchInfo = () => {
      let newArr = [];
      // 查找该条件下信息
      if (condition.value.length > 1) {
        for (let i in allData) {
          if (
            allData[i].apartment == condition.value[0] &&
            allData[i].class == condition.value[1]
          ) {
            newArr.push(allData[i]);
          }
        }
        dataSource.value = newArr;
      }
    };
    const changePage = (page: number, pageSize: number) => {
      // getData(page, pageSize);
    };

    onMounted(() => {
      getInfo();
    });
    return {
      dataSource,
      columns,
      handleAdd,
      updateInfo,
      hanldDelete,
      visibleAdd,
      handleAddOk,
      modalTitle,
      visibleUpdate,
      oldData,
      addInfo,
      updateData,
      addData,
      searchInfo,
      condition,
      selectOptions,
      changePage,
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
