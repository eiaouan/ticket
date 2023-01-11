<template>
  <div class="my-table">
    <div class="cloums">
      <a-row>
        <a-col
          class="title-col"
          v-for="(item, index) in props.columns"
          :key="index"
          :span="item.col"
          >{{ item.title }}</a-col
        >
      </a-row>
    </div>
    <div class="datas">
      <a-row v-for="(item, index) in props.dataSource" :key="index">
        <a-col
          class="data-col"
          v-for="(itemCol, indexCol) in props.columns"
          :key="indexCol + index"
          :span="itemCol.col"
          >{{ item[itemCol.key] }}
          <slot
            v-if="itemCol.key == 'action'"
            name="action"
            :record="item"
          ></slot
        ></a-col>
      </a-row>
    </div>
    <!-- <a-pagination
      class="pagination"
      v-model:current="current"
      :total="30"
      show-less-items
      @change="changePage"
    /> -->
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
export default {
  props: {
    dataSource: {
      type: Array<any>,
      default: () => [],
    },
    columns: {
      type: Array<any>,
      default: () => [],
    },
  },
  setup(props, ctx) {
    let current = ref<number>(1);
    const changePage = (page: number, pageSize: number) => {
      ctx.emit("changePage", page, pageSize);
    };
    return { props, current, changePage };
  },
};
</script>
<style lang="less" scoped>
.title-col {
  background-color: #fafafa;
  border-bottom: 1px solid #f0f0f0;
  border-right: 1px solid #eee;

  height: 50px;
  line-height: 50px;
  padding: 5px;
}

.data-col {
  border-bottom: 1px solid #f0f0f0;
  height: 50px;
  line-height: 50px;
  padding: 5px;
}

.my-table {
  position: relative;
  min-width: 780px;

  .pagination {
    position: absolute;
    right: 0;
    margin-top: 20px;
  }
}
</style>
