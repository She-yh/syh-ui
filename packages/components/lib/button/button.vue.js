"use strict";
const vue = require("vue");
const _sfc_main = {
  __name: "button",
  setup(__props) {
    let clickEvent = () => {
      console.log("click");
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", null, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(clickEvent) && vue.unref(clickEvent)(...args))
        }, "测试按钮")
      ]);
    };
  }
};
module.exports = _sfc_main;
