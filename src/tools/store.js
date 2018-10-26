export default {
  state: {
    schemaList: [
      {
        name: "DP",
        keys: [
          {
            name: "标题",
            truthValue: "notitlebar=1",
            falseValue: "notitlebar=0"
          }
        ],
        pattern: "dianping://web?[[标题]]&url=[[encodedText]]"
      }
    ]
  },
  action: {}
};
