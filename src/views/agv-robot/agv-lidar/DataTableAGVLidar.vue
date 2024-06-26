<template>
  <div class="text-center mb-5">
    <h2 class="text-white">Data AGV Lidar</h2>
  </div>
  <div class="card">
    <div class="card-body px-0 pt-0 pb-2 d-flex flex-column">
      <form
        class="card-header"
        @submit.prevent="($event) => addForm($event)"
        method="post"
        @reset="resetForm"
      >
        <base-input
          v-model="input.code"
          name="Code"
          class="input"
          placeholder="add AGV code"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.type"
          name="Type"
          class="input"
          placeholder="add type of AGV"
          required
        ></base-input>
        <br />

        <base-input
          v-model="input.description"
          name="Description"
          class="input"
          placeholder="add description"
          required
        ></base-input>
        <br />

        <div class="button-action">
          <argon-button
            type="reset"
            class="text-center button-cancel"
            color="danger"
            variant="gradient"
            fullWidth 
          >
            Cancel
          </argon-button>
          <argon-button
            type="submit"
            class="text-center button-submit"
            color="success"
            variant="gradient"
            fullWidth
          >
            {{ editing !== null ? "Update" : "Add" }}
          </argon-button>
        </div>
      </form>

      <div class="container table-responsive">
        <base-table
          class="table"
          :columns="table.columns"
          :data="g$getAGVs"
          @edit-row="handleEditEvent"
          @remove-row="handleRemoveEvent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import BaseTable from "../../components/BaseTable.vue";
import ArgonButton from "../../../components/ArgonButton.vue";
import BaseInput from "../../components/BaseInput.vue";
import useAgvStore from "@/store/agv";
import { useToast } from "vue-toastification";

const initialInput = {
  code: "",
  type: "",
  description: "",
};

export default {
  name: "ListViewAGVLidar",
  data() {
    return {
      input: { ...initialInput },
      editing: null,
      table: {
        columns: ["code", "type", "description"],
      },
    };
  },
  components: {
    BaseTable,
    ArgonButton,
    BaseInput,
  },
  computed: {
    ...mapState(useAgvStore, ["g$getAGVs", "g$getDetail"]),
  },
  async mounted() {
    await this.a$getAGVs();
  },
  methods: {
    ...mapActions(useAgvStore, [
      "a$addAGV",
      "a$getAGVs",
      "a$editAGV",
      "a$deleteAGV",
    ]),

    async addForm(event) {
      try {
        event.preventDefault();
        if (this.editing) {
          await this.a$editAGV({
            id: this.input._id,
            updatedAGVData: this.input,
          });
          const toast = useToast();
          toast.success(`AGV ${this.input.code} updated successfully`);
          this.editing = null;
        } else {
          await this.a$addAGV({ ...this.input });
          await this.a$getAGVs();
          const toast = useToast();
          toast.success(`AGV ${this.input.code} added successfully`);
        }
        this.resetForm();
      } catch (error) {
        console.error("Failed to add/edit entry:", error);
      }
    },

    handleEditEvent(row) {
      try {
        this.editing = row._id;
        console.log(row._id);
        this.input = { ...row };
      } catch (error) {
        console.error("Failed to prepare edit:", error);
      }
    },

    async handleRemoveEvent(row) {
      const toast = useToast();
      try {
        const idToRemove = row._id;
        await this.a$deleteAGV(idToRemove);
        await this.a$getAGVs();
        toast.success(`AGV with code ${row.code} deleted`);
      } catch (error) {
        console.error("Failed to remove row:", error);
      }
    },

    resetForm() {
      this.input = { ...initialInput };
    },
  },
};
</script>

<style scoped lang="scss">
.completed {
  margin-bottom: 1.4rem;
}
.button-action {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin: 1rem 0;
}
</style>
