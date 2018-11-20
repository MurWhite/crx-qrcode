import Vue, { PluginFunction } from "vue";

export declare class Store {
  constructor();
  static install: PluginFunction<never>;
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    store?: Store;
  }
}
