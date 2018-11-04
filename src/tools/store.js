import SchemaTool from "@/tools/schema.js";
import { isDef } from "@/tools/helper.js";

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

// store的内容
export default new Store({
  state: {
    schemaList: [
      {
        name: "墨非",
        keys: [
          {
            name: "白波",
            falseValue: "白波没有",
            truthValue: "白波有的有的"
          }
        ],
        pattern: "[[白波]]？这是？[[originalText]]",
        ukey: 1
      },
      {
        name: "DP2",
        keys: [
          {
            name: "标题2",
            truthValue: "notitlebar=1",
            falseValue: "notitlebar=0"
          }
        ],
        pattern: "dianping://web?[[标题2]]&url=[[encodedText]]",
        ukey: 2
      }
    ],
    currentSchema: {},
    currentKeys: [],
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
    changeCurrentSchema(index) {
      let { state } = this;
      state.currentSchema = state.schemaList[index];
    },
    updateQRText(text, options) {
      let { state } = this;
      state.qrcodeText = SchemaTool.convert(
        state.currentSchema.pattern,
        text,
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
        state.schemaList.splice(uIndex, 1, isRemove ? undefined : schema);
      }
    }
  }
});
