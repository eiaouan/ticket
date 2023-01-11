<template>
  <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="列车号"
      name="lpNum"
      :rules="[{ required: true, message: '列车号不能为空' }]"
    >
      <a-input v-model:value="formState.lpNum" />
    </a-form-item>
    <a-form-item
      label="起始站"
      name="dpStation"
      :rules="[{ required: true, message: '起始站不能为空' }]"
    >
      <a-input v-model:value="formState.dpStation" />
    </a-form-item>

    <a-form-item
      label="到达站"
      name="arrStation"
      :rules="[{ required: true, message: '到达站不能为空' }]"
    >
      <a-input v-model:value="formState.arrStation" />
    </a-form-item>
    <a-form-item label="经停站" name="stopStation">
      <a-input v-model:value="formState.stopStation" />
    </a-form-item>
    <a-form-item label="容量" name="cap">
      <a-input-number v-model:value="formState.cap" />
    </a-form-item>
    <a-form-item label="发车时间" name="dpTime">
      <a-input v-model:value="formState.dpTime" />
    </a-form-item>
    <a-form-item label="班车频次" name="frequeny">
      <a-input v-model:value="formState.frequeny" />
    </a-form-item>
    <a-form-item
      label="票价"
      name="price"
      :rules="[{ required: true, message: '票价不能为空' }]"
    >
      <a-input-number v-model:value="formState.price" />
    </a-form-item>
    <a-form-item
      label="总票数"
      name="ticketCount"
      :rules="[{ required: true, message: '总票数不能为空' }]"
    >
      <a-input-number v-model:value="formState.ticketCount" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="handleAddTrain"
        >Submit</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, reactive, withCtx } from "vue";
import { addTrain } from "@/api/train";
import { message } from "ant-design-vue";
interface FormState {
  lpNum: string;
  dpStation: string;
  stopStation?: string;
  arrStation: string;
  dpTime: string;
  cap?: number;
  frequeny?: string;
  price: number;
  ticketCount: number;
}
export default defineComponent({
  setup(props, ctx) {
    let defaultTrain = {
      lpNum: "",
      dpStation: "",
      stopStation: "",
      arrStation: "",
      dpTime: "",
      cap: 0,
      frequeny: "",
      price: 0,
      ticketCount: 0,
    };
    const formState = reactive<FormState>(defaultTrain);
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    // 插入数据
    const handleAddTrain = async () => {
      let res = await addTrain(formState);
      if (res.data.status == 20000) {
        message.success("添加成功");
        // 刷新页面
        ctx.emit("addSuccess"); // 成功刷新页面
      } else {
        message.error(res.data.message);
      }
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      handleAddTrain,
    };
  },
});
</script>
