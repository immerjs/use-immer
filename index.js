var produce = require("immer").default;
var React = require("react");

module.exports.useImmer = function useImmer(initialValue) {
  const [val, updateValue] = React.useState(initialValue);
  return [
    val,
    updater => {
      updateValue(produce(updater));
    }
  ];
};

module.exports.useImmerReducer = function useImmerReducer(
  reducer,
  initialState,
  initialAction
) {
  return React.useReducer(produce(reducer), initialState, initialAction);
};
