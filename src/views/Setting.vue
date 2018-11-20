<template>
  <div class="setting-page">
    <schema-item v-for="(schema, index) in schemaList"
                 :schema="schema"
                 :key="schema.ukey"
                 @save="handleSaveSchema(index, $event)"
                 @delete="handleRemoveSchema(schema)" />
    <button @click="addOneMoreSchema">+</button>
    <button @click="openSettingPage">在新页面打开</button>
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
    handleRemoveSchema(schema) {
      this.$actions.updateSchema(schema, true);
    },
    openSettingPage() {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL("index.html#/setting"));
      }
    }
  }
};
</script>
