<template>
  <div class="task">
    <form>
      <h2>Создать задачу</h2>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.form.task.$error }"
      >
        <label for="title">Название задачи</label>
        <input
          type="text"
          class="form-control"
          id="title"
          placeholder="Название"
          v-model="$v.form.task.$model"
        />
        <div class="error" v-if="!$v.form.task.required">Task is required.</div>
      </div>
      <label for="date">Дата завершення задачі</label>
      <vc-date-picker v-model="form.date" :min-date="new Date()">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            :value="inputValue"
            v-on="inputEvents"
            id="date"
            class="form-control"
          />
        </template>
      </vc-date-picker>
      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          class="form-control"
          v-model="form.description"
          id="description"
          rows="3"
        ></textarea>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.form.user.$error }"
      >
        <label for="users">Задача для пользователя</label>
        <select class="form-control" id="user" v-model="$v.form.user.$model">
          <option v-for="user in getUsers" :value="user.id" :key="user.id">
            {{ user.name }}
          </option>
        </select>
        <div class="error" v-if="!$v.form.user.required">Task is required.</div>
      </div>
      <div
        class="form-group"
        :class="{ 'form-group--error': $v.form.status.$error }"
      >
        <label for="users">Статус</label>
        <select class="form-control" id="user" v-model="$v.form.status.$model">
          <option
            v-for="status in getStatus"
            :value="status.id"
            :key="status.id"
          >
            {{ status.title }}
          </option>
        </select>
        <div class="error" v-if="!$v.form.status.required">
          Task is required.
        </div>
      </div>
      <input
        type="submit"
        value="Создать задачу"
        class="btn btn-primary"
        @click="create"
      />
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        date: new Date(),
        task: "",
        description: "",
        user: "",
        status: "",
      },
    };
  },
  validations: {
    form: {
      task: {
        required,
      },
      user: {
        required,
      },
      status: {
        required,
      },
    },
  },
  computed: {
    ...mapGetters(["getUsers", "getStatus"]),
  },
  methods: {
    create(e) {
      e.preventDefault();
      this.$v.$touch();

      if (!this.$v.$invalid) {
        const DataTask = {
          id: Date.now(),
          task: this.form.task,
          description: this.form.description,
          date: this.form.date,
          user: this.form.user,
          status: this.form.status,
        };
        this.$store.commit("ADD_TASK", DataTask);
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: center;
  form {
    width: 500px;
    display: flex;
    flex-direction: column;
    textarea {
      resize: none;
    }
    .error {
      color: red;
    }
  }
}
</style>
