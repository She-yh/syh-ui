import VirtualScroller from './virtual-scroller.vue'

//为组件加上install属性
const withInstall = comp => {
    comp.install = (app)=>{
        //注册组件
        app.component(comp.name,comp)
    }
    return comp
}
export default withInstall(VirtualScroller)