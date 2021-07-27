<template>
  <div class="form-container">
    <el-button @click="dialogVisible = true">Добавить пользователя</el-button>

    <el-dialog
      @open="clearUser"
      title="Добавление пользователя"
      :visible.sync="dialogVisible"
      width="25%">

      <el-form label-position="left" label-width="100px">
        <el-form-item label="Имя">
          <el-input :class="{'error': error.name}" v-model="newUser.name" />
        </el-form-item>

        <el-form-item label="Телефон">
          <el-input
            :class="{'error': error.phone}" v-mask="'+7 (###) ###-##-##'" v-model="newUser.phone"
          />
        </el-form-item>

        <el-form-item label="Начальник">
          <el-select style="width: 100%" v-model="newUser.chiefId" placeholder="">
            <el-option
              v-for="user in rosterArr"
              :key="user.id"
              :label="user.name"
              :value="user.id">

              <div @click="setNesting(user)">{{user.name}}</div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-button @click="validate">Сохранить</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  Button, Dialog, Input, Form, FormItem, Select, Option,
} from 'element-ui';
import { mask } from 'vue-the-mask';

function User(id) {
  this.id = id;
  this.name = '';
  this.phone = '';
  this.chiefId = null;
  this.slugs = [];
  this.nesting = 0;
}

export default {
  name: 'addUserForm',
  directives: { mask },
  components: {
    'el-button': Button,
    'el-dialog': Dialog,
    'el-input': Input,
    'el-form': Form,
    'el-form-item': FormItem,
    'el-select': Select,
    'el-option': Option,
  },
  props: ['rosterArr', 'lastUserId'],
  data() {
    return {
      dialogVisible: false,
      newUser: null,
      error: {
        name: false,
        phone: false,
      },
    };
  },
  created() {
    this.newUser = new User(this.lastUserId);
  },
  methods: {
    setNesting(user) {
      this.newUser.nesting = user.nesting + 1;
    },
    clearUser() {
      this.newUser = new User(this.lastUserId);
    },
    validate() {
      this.error.phone = !/^\+7\s\(\d{3}\)\s\d{3}(-\d{2}){2}$/.test(this.newUser.phone);
      this.error.name = this.newUser.name.length < 1;

      const allValid = Object.values(this.error).every((value) => !value);
      if (allValid) {
        this.saveUser();
      }
    },
    saveUser() {
      this.$emit('addNewUser', this.newUser);
      this.$nextTick(() => {
        this.clearUser();
      });
    },
  },
};
</script>

<style lang="scss">
  .dialog {
    width: 20%;
  }
  .error {
    border: 1px solid red;
  }
</style>
