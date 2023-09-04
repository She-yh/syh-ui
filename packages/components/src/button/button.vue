<template>
    <div>
        <button @click="clickEvent">测试按钮</button>
    </div>
</template>
<script setup>
let clickEvent = () => {
    console.log("click")
}
</script>
