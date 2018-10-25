<template>
    <div class="setting-page">
        <schema-item v-for="(schema, index) in schemaList" :schema="schema" :key="schema.id" @save="handleSaveSchema(index, $event)" 
                     @delete="handleRemoveSchema(index)"/>
        <button @click="addOneMoreSchema">+</button>
    </div>
</template>
<script>
import cloneDeep from "lodash.clonedeep";
import SchemaItem from "@/components/SchemaItem.vue";
export default {
  components: {
    SchemaItem
  },
  data() {
    return {
      schemaList: [
        {
          name: "不做处理",
          keys: [{ name: "" }],
          pattern: ""
        }
      ]
    };
  },
  methods: {
    addOneMoreSchema() {
      this.schemaList.push({
        name: "",
        keys: [
          {
            name: "",
            truthValue: "",
            falseValue: ""
          }
        ],
        pattern: "",
        newAdd: true
      });
    },
    handleSaveSchema(index, nSchema) {
      this.schemaList.splice(index, 1, cloneDeep(nSchema));
    },
    handleRemoveSchema(index) {
      this.schemaList.splice(index, 1);
    }
  }
};
</script>
