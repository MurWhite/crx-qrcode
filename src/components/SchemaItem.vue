<template>
    <div class="schema-item">
        <label class="schema-title">
            <span v-if="underEdit">名称:</span>
            <input v-model="schemaData.name" type="text" :readonly="!underEdit">
            <span @click="underEdit=!underEdit">{{underEdit?'保存':'编辑'}}</span>
        </label>
        <div v-if="underEdit" class="schema-detail" :class="{editing: underEdit}">
            <div class="schema-option" data-type="boolean">
                <div v-for="(key, index) in schemaData.keys" class="option" :key="index">
                    <span>键名:</span>
                    <input type="text" v-model="key.name">
                    <button @click="removeOption(index)">-</button>
                </div>
                <button @click="addOneMoreOption">+</button>
                <div class="schema-pattern">
                    <textarea v-model="schemaData.pattern" rows="3" placeholder="Plz input the pattern"></textarea>
                </div>
                <div class="schema-preview">
                    <div class="title">假设页面Url是 "{{sampleUrl}}"</div>
                    <p class="result">{{sampleResult}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SchemaTool from "@/tools/schema.js";
export default {
  model: {
    prop: "schema",
    event: "change"
  },
  props: {
    schema: Object
  },
  data() {
    return {
      schemaData: {
        name: "",
        keys: [
          {
            name: "",
            type: Boolean
          }
        ],
        pattern: ""
      },
      keySample: {
        name: "",
        type: Boolean
      },

      underEdit: true,
      sampleUrl: "https://example.com/path?key=value&foo=bar#baz",
      sampleResult: ""
    };
  },
  computed: {
    computedSchema() {
      return this.schema || this.schemaData;
    }
  },
  watch: {
    "schemaData.pattern": {
      immediate: true,
      handler(to) {
        this.sampleResult = SchemaTool.convert(to, this.sampleUrl, {
          name: "John"
        });
      }
    }
  },
  methods: {
    changeSchema() {
      this.$emit("change", {
        keyName: this.keyName,
        truthValue: this.truthValue
      });
    },
    addOneMoreOption() {
      this.schemaData.keys.push({ ...this.keySample });
    },
    removeOption(index) {
      this.schemaData.keys.splice(index, 1);
    }
  }
};
</script>
<style scoped lang="scss">
.schema-item {
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d7d7d7;
  .schema-title {
    padding: 5px;
    display: flex;
    background-color: #d7d7d7;
    input {
      flex: 1;
    }
  }
  .schema-detail {
    padding: 5px;
    .schema-pattern {
      textarea {
        width: 100%;
      }
    }
    .schema-preview {
      .title {
        font-size: 10px;
        color: #999999;
      }
      .result {
        white-space: normal;
        word-break: break-all;
      }
    }
  }
}
</style>
