<template>
  <div class="table-body">
    <div class="table-column">
      <div @click="$emit('sort')" class="table-td cp">Имя <i class="el-icon-sort"/></div>
      <div :style="margin(user.nesting)"
           class="table-td" v-for="user in rosterArr" :key="user.id">
        {{user.name}}
      </div>
    </div>

    <div class="table-column">
      <div class="table-td">Телефон</div>
      <div class="table-td" v-for="user in rosterArr" :key="user.id">
        {{user.phone}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userTable',
  props: ['rosterArr'],
  methods: {
    margin(n) {
      return n > 0 ? { 'margin-left': `${n * 10}px` } : 0;
    },
  },
};
</script>

<style scoped lang="scss">
  .table-body {
    display: flex;
  }
  .table-column {
    border: solid gray;
    border-width: 1px 1px 0 0;
  }
  .table-td {
    border: 1px solid black;
    margin: -1px -1px;
    padding: 10px;
  }
  .cp {
    cursor: pointer;
  }
</style>
