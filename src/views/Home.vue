<template>
  <div class="dashbord">
    <h1>Доска задач</h1>
    <div class="dashbord-panel">
      <app-form
        @hendlerFilter="filterHendler"
        @hendlerFilterUser="filterUser"
      />
      <router-link to="addTask" class="btn addTask">Создать задачу</router-link>
    </div>
    <div class="dashbord-container">
      <div class="row">
        <div
          class="col"
          v-for="status in getStatus"
          :key="status.id"
          @drop="onDrop($event, status.id)"
          @dragover.prevent
          @dragenter.prevent
        >
          <div class="dashbord-container-card">
            <div class="dashbord-container-card_header">
              <h3>{{ status.title }}</h3>
            </div>
            <div
              class="dashbord-container-card_item"
              v-for="task in getTaskFilter(status.id)"
              :key="task.id"
              @dragstart="onDragStart($event, task)"
              draggable="true"
            >
              {{ task.task }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import appForm from "@/components/dashboardPanel.vue";
export default {
  name: "Home",
  components: { appForm },
  data() {
    return {
      filter: "",
      userFilter: 0,
    };
  },
  computed: {
    ...mapGetters(["getStatus", "getTasks"]),
  },
  methods: {
    onDragStart(e, item) {
      e.dataTransfer.dropEffect = "move";
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("itemId", item.id.toString());
    },
    onDrop(e, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData("itemId"));
      this.$store.commit("SET_TASK", { itemId, categoryId });
    },
    getTaskFilter(filter) {
      return this.getTasks
        .filter((el) => el.status === filter)
        .filter(
          (el) =>
            !this.filter ||
            el.task.toLowerCase().includes(this.filter.toLowerCase())
        )
        .filter((el) => !this.userFilter || el.user === this.userFilter);
    },
    filterHendler(item) {
      this.filter = item;
    },
    filterUser(item) {
      this.userFilter = item;
    },
  },
  watch: {
    filter() {
      this.getTaskFilter(this.filter);
    },
  },
};
</script>
<style lang="scss" scoped>
.dashbord {
  .dashbord-panel {
    display: flex;
    justify-content: space-between;
  }
  .addTask {
    color: #42526e;
    background: #f5f6f8;
    padding: 10px;
    text-decoration: none;
    align-self: center;
    &:hover {
      background: #e2e3e7;
    }
  }
  &-container {
    margin: 20px 0;
    &-card {
      padding: 10px 20px;
      max-width: 250px;
      min-height: 150px;
      background: #f4f5f7;
      border-radius: 4px;
    }
  }
}
</style>
