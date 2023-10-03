<script setup>
import { Button, VScroller } from 'sheyh-ui'
import faker from 'faker'
let data = [];
for (let i = 0; i < 1000; i++) {
  data.push({ id: i, value: faker.lorem.sentences() });
}
</script>

<template>
  <Button></Button>
  <VScroller :listData="data" :estimatedItemSize="100"></VScroller>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
