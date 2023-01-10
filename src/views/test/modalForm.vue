<template>
  <a-form
    :model="props.oldData"
    name="basic"
    :label-col="{ span: 5 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="姓名"
      name="name"
      :rules="[{ required: true, message: '请输入姓名!' }]"
    >
      <a-input v-model:value="props.oldData.name" />
    </a-form-item>

    <a-form-item
      label="年龄"
      name="age"
      :rules="[{ required: true, message: '请输入年龄!' }]"
    >
      <a-input v-model:value="props.oldData.age" />
    </a-form-item>
    <a-form-item
      label="性别"
      name="sex"
      :rules="[{ required: true, message: '请输入性别!' }]"
    >
      <a-radio-group v-model:value="props.oldData.sex">
        <a-radio :value="'男'">男</a-radio>
        <a-radio :value="'女'">女</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="学院" name="apartment">
      <a-input v-model:value="props.oldData.apartment" />
    </a-form-item>
    <a-form-item label="班级" name="class">
      <a-input v-model:value="props.oldData.class" />
    </a-form-item>
    <a-form-item label="状态" name="status">
      <a-input v-model:value="props.oldData.status" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="changeValue"
        >确认</a-button
      >
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, ref } from "vue";

interface FormState {
  key: number;
  name: string;
  age: number;
  sex: string;
  apartment?: string;
  class?: string;
  status?: string;
}
export default defineComponent({
  props: {
    oldData: {
      type: Object as PropType<FormState>,
      default: () => ({
        key: 0,
        name: "",
        age: null,
        sex: "男",
        apartment: "",
        class: "",
        status: "",
      }),
    },
  },
  setup(props, ctx) {
    let dataDefault = {
      key: 0,
      name: "",
      age: null,
      sex: "男",
      apartment: "",
      class: "",
      status: "",
    };

    // let formState = ref<FormState>(dataDefault);
    // if (props.oldData) {
    //   formState.value = props.oldData;
    // }
    const onFinish = (values: any) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    const changeValue = () => {
      ctx.emit("changeValue");
    };
    return {
      //   formState,
      onFinish,
      onFinishFailed,
      props,
      changeValue,
    };
  },
});
</script>
