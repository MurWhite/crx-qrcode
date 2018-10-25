<template>
    <div class="schema-item">
        <label class="schema-title">
            <span v-if="underEdit">名称:</span>
            <input v-model="schemaData.name" type="text" :readonly="!underEdit">
            <span @click="handleSaveClick">{{underEdit?'保存':'编辑'}}</span>
        </label>
        <div v-if="underEdit" class="schema-detail" :class="{editing: underEdit}">
            <div class="schema-option" data-type="boolean">
                <div v-for="(key, index) in schemaData.keys" class="option" :key="index">
                    <span>键名:</span>
                    <input type="text" v-model="key.name">
                    <br>
                    <span>选中时的值</span>
                    <input class="small" type="text" v-model="key.truthValue" placeholder="选中时的值">
                    <br>
                    <span>未选中时的值</span>
                    <input class="small" type="text" v-model="key.falseValue" placeholder="未选中时的值">
                    <button @click="removeOption(index)">-</button>
                </div>
                <button @click="addOneMoreOption">+</button>
                <div class="schema-pattern">
                    <textarea v-model="schemaData.pattern" rows="3" placeholder="Plz input the pattern"></textarea>
                </div>
                <div class="schema-preview">
                    <div class="title">假设页面文字是 "{{sampleUrl}}", 且所有的选项都已选中</div>
                    <p class="result">{{sampleResult}}</p>
                </div>
                <button @click="handleRemoveSelf" class="btn btn-warn btn-banner">删除此模式</button>
            </div>
        </div>
    </div>
</template>
<script>
import cloneDeep from "lodash.clonedeep";
import SchemaTool from "@/tools/schema.js";
export default {
  props: {
    schema: Object
  },
  data() {
    return {
      schemaData: {
        name: "",
        keys: [],
        pattern: ""
      },
      keySample: {
        name: "",
        truthValue: "",
        falseValue: ""
      },

      underEdit: false,
      sampleUrl: "https://example.com/path?key=value&foo=bar#baz",
      sampleResult: ""
    };
  },
  computed: {},
  watch: {
    schema: {
      immediate: true,
      deep: true,
      handler(to) {
        if (to.newAdd) {
          this.underEdit = true;
        }
        this.schemaData = { ...cloneDeep(to), newAdd: false };
      }
    },
    schemaData: {
      immediate: true,
      deep: true,
      handler(to) {
        this.updateSampleResult();
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
    },
    handleSaveClick() {
      if (this.underEdit) {
        this.$emit("save", this.schemaData);
      }
      this.underEdit = !this.underEdit;
    },
    handleRemoveSelf() {
      this.$emit("delete");
    },
    updateSampleResult() {
      const sampleOptions = {};
      this.schemaData.keys.map(key => {
        sampleOptions[key.name] = key.truthValue;
      });
      this.sampleResult = SchemaTool.convert(
        this.schemaData.pattern,
        this.sampleUrl,
        sampleOptions
      );
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
        word-break: break-all;
      }
      .result {
        white-space: normal;
        word-break: break-all;
      }
    }
  }

  & + .schema-item {
    margin-top: 10px;
  }
}
</style>
