<template>
  <a-button type="primary" @click="downloadExcel">下载表格</a-button>
</template>
<script lang="ts">
export default {
  props: {
    data: Array,
  },
  setup(props) {
    const downloadExcel = () => {
      // 第一行是标题(表头)每一列用半角逗号隔开。
      let csvStr = props.data.map((item) => {
        // 加\t是为了不让数字以科学计数法显示。
        let valueList = Object.keys(item).map((key) => item[key]);
        return valueList.join(",\t");
      });
      csvStr = "序号,姓名,年龄,学院,班级,性别,状态\n" + csvStr.join(",\n");

      // encodeURIComponent解决中文乱码。
      const href =
        "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(csvStr);
      const aHtml = document.createElement("a");
      aHtml.download = "fe_table.csv";
      aHtml.href = href;
      aHtml.click();
    };
    return {
      downloadExcel,
    };
  },
};
</script>
