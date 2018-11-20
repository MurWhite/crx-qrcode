<template>
  <div class="schema-item">
    <label class="schema-title">
      <span v-if="underEdit">名称:</span>
      <input v-model="schemaData.name"
             type="text"
             :readonly="!underEdit">
      <i class="icon btn-save"
         :class="`icon-${underEdit ? 'save':'edit'}`"
         @click="handleSaveClick"></i>
      <i v-if="this.underEdit"
         class="icon icon-cancel btn-save"
         @click="handleCancelClick"></i>
    </label>
    <div v-if="underEdit"
         class="schema-detail"
         :class="{editing: underEdit}">
      <div class="schema-options">
        <div v-for="(key, index) in schemaData.keys"
             class="option"
             :key="index">
          <span>键名:</span>
          <input type="text"
                 v-model="key.name">
          <br>
          <span>选中时的值:</span>
          <input class=""
                 type="text"
                 v-model="key.truthValue">
          <br>
          <span>未选中时的值:</span>
          <input class=""
                 type="text"
                 v-model="key.falseValue">
          <i class="icon icon-delete btn-remove"
             @click="removeOption(index)"></i>
        </div>
        <i class="icon icon-add-circle btn-add"
           @click="addOneMoreOption"></i>
      </div>
      <div class="schema-pattern">
        <textarea v-model="schemaData.pattern"
                  rows="3"
                  placeholder="Plz input the pattern"></textarea>
      </div>
      <div class="schema-preview">
        <div class="title">假设页面文字是 "{{sampleUrl}}", 且所有的选项都已选中</div>
        <p class="result">{{sampleResult}}</p>
      </div>
      <button @click="handleRemoveSelf"
              class="btn btn-warn btn-banner">删除此模式</button>
    </div>
  </div>
</template>
<script>
import cloneDeep from "lodash.clonedeep";
import SchemaTool from "@/tools/schema.js";
import { notEmpty, notExist } from "@/tools/helper.js";

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
    schemaValidate(schema) {
      if (notExist(schema.name)) {
        return Promise.reject("请填写schema名称");
      }
      let errMsg;
      schema.keys.every((key, index) => {
        if (notExist(key.name)) {
          errMsg = `请填写第${index + 1}项的键名`;
          return false;
        }
        return true;
      });
      if (errMsg) {
        return Promise.reject(errMsg);
      }
      return Promise.resolve();
    },
    handleSaveClick() {
      if (this.underEdit) {
        this.schemaValidate(this.schemaData)
          .then(() => {
            this.$emit("save", cloneDeep(this.schemaData));
            this.underEdit = false;
          })
          .catch(err => {
            alert(err);
          });
      } else {
        this.underEdit = !this.underEdit;
      }
    },
    handleCancelClick() {
      this.underEdit = false;
      if (this.schema.newAdd) {
        this.handleRemoveSelf();
      } else {
        this.schemaData = { ...cloneDeep(this.schema), newAdd: false };
      }
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
    .btn-save {
    }
  }
  .schema-detail {
    padding: 5px;
    .schema-options {
      position: relative;
      margin-bottom: 18px;
      min-height: 10px;
      .option {
        background-color: #efefef;
        padding: 5px;
        position: relative;
        border-radius: 3px;
        & + .option {
          margin-top: 5px;
        }
        .btn-remove {
          position: absolute;
          right: 0;
          top: 2px;
          cursor: pointer;
        }
      }
      .btn-add {
        position: absolute;
        cursor: pointer;
        right: 0;
        bottom: 0;
        transform: translate3d(0, 50%, 0);
      }
    }
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
