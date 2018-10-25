var produce = require("immer").default;
var React = require("react")

module.exports.useImmer = function useImmer(initialValue) {
    const [val, updateValue] = React.useState(initialValue);
    return [
      val,
      updater => {
        updateValue(produce(updater));
      }
    ];
  }