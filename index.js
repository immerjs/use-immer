var produce = require("immer");

module.exports.useImmer = function useImmer(initialValue) {
    const [val, updateValue] = useState(initialValue);
    return [
      val,
      updater => {
        updateValue(produce(updater));
      }
    ];
  }