import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [
      { id: 1, name: "Person 1" },
      { id: 2, name: "Person 2" },
      { id: 3, name: "Person 3" },
    ],
    status: [
      {
        id: 1,
        title: "К выполнению",
      },
      {
        id: 2,
        title: "В процессе",
      },
      {
        id: 3,
        title: "Тестирование",
      },
      {
        id: 4,
        title: "Готово",
      },
    ],
    tasks: [],
  },
  getters: {
    getUsers: (state) => state.users,
    getStatus: (state) => state.status,
    getTasks: (state) => state.tasks,
  },
  mutations: {
    ADD_TASK(state, payload) {
      return state.tasks.push(payload);
    },
    SET_TASK(state, payload) {
      return state.tasks.map((x) => {
        if (x.id === payload.itemId) {
          x.status = payload.categoryId;
          return x;
        }
      });
    },
  },
  actions: {},
  modules: {},
});
