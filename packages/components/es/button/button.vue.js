import { openBlock, createElementBlock, createElementVNode, unref } from "vue";
const _sfc_main = {
  __name: "button",
  setup(__props) {
    let clickEvent = () => {
      console.log("click");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => unref(clickEvent) && unref(clickEvent)(...args))
        }, "测试按钮")
      ]);
    };
  }
};
export {
  _sfc_main as default
};
