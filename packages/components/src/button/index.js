import button from './button.vue'

//为组件加上install属性
const withInstall = comp => {
    comp.install = (app)=>{
        //注册组件
        app.component(comp.name,comp)
    }
    return comp
}
const Button = withInstall(button)
export default Button
