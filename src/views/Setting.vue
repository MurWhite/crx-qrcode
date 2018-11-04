<template>
  <div class="setting-page">
    <schema-item v-for="(schema, index) in schemaList"
                 :schema="schema"
                 :key="schema.ukey"
                 @save="handleSaveSchema(index, $event)"
                 @delete="handleRemoveSchema(index)" />
    <button @click="addOneMoreSchema">+</button>
  </div>
</template>
<script>
import SchemaItem from "@/components/SchemaItem.vue";
export default {
  components: {
    SchemaItem
  },
  data() {
    return {
      schemaList: this.$state.schemaList
    };
  },
  methods: {
    addOneMoreSchema() {
      this.$actions.updateSchema();
    },
    handleSaveSchema(index, nSchema) {
      this.$actions.updateSchema(nSchema);
    },
    handleRemoveSchema(index) {
      this.schemaList.splice(index, 1);
    }
  }
};
</script>
