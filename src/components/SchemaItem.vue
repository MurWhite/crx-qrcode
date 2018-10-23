<template>
    <div class="schema-item-wrap">
        <div class="schema-key">
            <input type="text" >
        </div>
        <div class="schema-value"></div>
    </div>
</template>
<script>
export default {
  data() {},
  props: {
    key: String,
    value: String | Number,
    readonly: Boolean
  },
  methods: {}
};
</script>
