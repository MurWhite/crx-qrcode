import SchemaTool from "@/tools/schema";
import { isDef } from "@/tools/helper";
import Access from "@/tools/access";

// 超级简单版的vuex
export class Store {
  constructor({ state, actions }) {
    this.state = state;
    this.actions = {};
    Object.keys(actions).map(funcName => {
      this.actions[funcName] = actions[funcName].bind(this);
    });
  }
}

Store.install = function install(Vue) {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        this._stateRoot = this;
        Vue.util.defineReactive(this._stateRoot.$options, "store");
      } else {
        this._stateRoot = (this.$parent && this.$parent._stateRoot) || this;
      }
    }
  });
  Object.defineProperty(Vue.prototype, "$state", {
    get: function get() {
      return this._stateRoot.$options.store.state;
    }
  });
  Object.defineProperty(Vue.prototype, "$actions", {
    get: function get() {
      return this._stateRoot.$options.store.actions;
    }
  });
};
const schemaSample = {
  name: "默认",
  keys: [
    {
      name: "名字",
      falseValue: "noname",
      truthValue: "havename"
    }
  ],
  pattern: "[[originalText]]&[[名字]]",
  ukey: 0
};
// store的内容
export default new Store({
  state: {
    schemaList: [schemaSample],
    currentSchema: {},
    currentKeys: [],
    originalText: location.href,
    qrcodeText: "OoO",
    emptySchema: {
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
    }
  },
  actions: {
    initalData() {
      Access.obtain("schemaList").then(data => {
        this.state.schemaList = data.filter(s => !!s) || [schemaSample];
        this.actions.changeCurrentSchema(0);
      });
    },
    changeCurrentSchema(index) {
      let { state } = this;
      state.currentSchema = state.schemaList[index];
    },
    updateOriginalText(text) {
      this.state.originalText = text;
    },
    updateQRText(options) {
      let { state } = this;
      state.qrcodeText = SchemaTool.convert(
        state.currentSchema.pattern,
        state.originalText,
        options
      );
    },
    updateSchema(data, isRemove = false) {
      let { state } = this;
      let schema, uIndex;
      if (data && data.ukey) {
        const ukey = data.ukey;
        state.schemaList.every((s, index) => {
          if (s.ukey === ukey) {
            uIndex = index;
            return false;
          }
          return true;
        });
      } else {
        const ukey = `${+new Date()}${Math.random().toFixed(3) * 1000}`;
        schema = {
          ukey,
          ...JSON.parse(JSON.stringify(state.emptySchema))
        };
        uIndex = state.schemaList.length;
        state.schemaList.push(schema);
      }
      if (isDef(uIndex)) {
        schema = {
          ...schema,
          ...data
        };
        if (isRemove) state.schemaList.splice(uIndex, 1);
        else state.schemaList.splice(uIndex, 1, schema);
      }

      Access.save("schemaList", state.schemaList);
    }
  }
});
