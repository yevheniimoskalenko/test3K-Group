<template>
  <div class="dashbord-panel">
    <div class="dashbord-panel-item">
      <div class="form-group">
        <label for="title">Название задачи</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Название"
          v-model="form.filter"
        />
      </div>
    </div>
    <div class="dashbord-panel-item">
      <div class="form-group">
        <label for="users">Задача для пользователя</label>
        <select class="form-control" id="user" v-model="form.user">
          <option v-for="user in getUsers" :value="user.id" :key="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        filter: "",
        user: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getUsers"]),
  },
  watch: {
    "form.filter"() {
      this.$emit("hendlerFilter", this.form.filter);
    },
    "form.user"() {
      this.$emit("hendlerFilterUser", this.form.user);
    },
  },
};
</script>
<style lang="scss" scoped>
.dashbord-panel {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  &-item {
    display: flex;
    flex-direction: column;
    &:nth-child(2) {
      margin-left: 20px;
    }
  }

  input {
    max-width: 300px;
    border: 1px solid #dfe1e6;
    &:focus {
      outline: none;
    }
  }
}
</style>
