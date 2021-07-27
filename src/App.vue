<template>
  <div class="container" id="app">

    <div class="control-block">
      <add-user-form
        @addNewUser="addNewUser($event)" :rosterArr="rosterArr" :lastUserId="lastUserId"
      />

      <el-button v-if="rosterArr.length > 0" @click="clear">Очистить таблицу</el-button>
    </div>

    <user-table
      v-if="rosterArr.length > 0" @sort="sort" :rosterArr="rosterArr" :sortKey="sortKey"
    />
  </div>
</template>

<script>
import { Button } from 'element-ui';
import AddUserForm from './components/addUserForm';
import UserTable from './components/userTable';

export default {
  name: 'App',
  data() {
    return {
      user: null,
      lastUserId: 1,
      usersArr: [],
      rosterArr: [],
      sortKey: false,
    };
  },
  components: {
    UserTable,
    AddUserForm,
    'el-button': Button,
  },
  mounted() {
    window.addEventListener('beforeunload', this.saveBeforeUnload);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('beforeunload', this.saveBeforeUnload);
    });

    this.usersArr = JSON.parse(localStorage.getItem('users')) || [];
    this.lastUserId = localStorage.getItem('lastUserId');
    this.getRoster(this.usersArr);
  },
  methods: {
    getRoster(arr) {
      arr.forEach((item) => {
        this.rosterArr.push(item);

        if (item.slugs.length > 0) {
          this.getRoster(item.slugs);
        }
      });
    },
    addNewUser(user) {
      if (user.chiefId) {
        this.addToChief(this.usersArr, user);
      } else {
        this.usersArr.push(user);
      }
      this.rosterArr = [];
      this.getRoster(this.usersArr);
      this.lastUserId += 1;
    },
    addToChief(arr, user) {
      arr.forEach((item) => {
        if (item.id === user.chiefId) {
          item.slugs.push(user);
        } else {
          this.addToChief(item.slugs, user);
        }
      });
    },
    sort() {
      if (this.sortKey) {
        this.usersArr.sort((a, b) => (a.name < b.name ? 1 : -1));
        this.sortKey = false;
      } else {
        this.usersArr.sort((a, b) => (a.name > b.name ? 1 : -1));
        this.sortKey = true;
      }

      this.rosterArr = [];
      this.getRoster(this.usersArr);
    },
    saveBeforeUnload() {
      localStorage.setItem('users', JSON.stringify(this.usersArr));
      localStorage.setItem('lastUserId', this.lastUserId);
    },
    clear() {
      this.usersArr = [];
      this.rosterArr = [];
    },
  },
};
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: left;
  }

  .container {
    width: 100%;
    max-width: 1280px;
    margin: 100px auto 0;
    padding: 0 20px;
  }

  .control-block {
    display: flex;
    margin-bottom: 50px;

    > div {
      margin-right: 16px;
    }
  }
</style>
