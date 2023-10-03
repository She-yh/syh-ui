<template>
    <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
        <div ref='phantom' class="infinite-list-phantom"></div>
        <div ref='content' class="infinite-list">
            <div ref="items" class="infinite-list-item" v-for="item in visibleData" :key="item._index" :id="item._index">
                <div>{{ item.value }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, onMounted, onUpdated, nextTick } from 'vue'
import { getStartIndex } from './hook';
const props = defineProps({
    //所有列表数据
    listData: {
        type: Array,
        default: () => []
    },
    estimatedItemSize: {
        type: Number,
        default: 100,
        required: true
    },
    bufferScale: {
        type: Number,
        default: 1
    },
})
const list = ref();
const content = ref();
const phantom = ref();
const start = ref(0) //“可视区”的第一个元素下标（从零开始算）
const items = ref([])
let screenHeight = ref(null)
const positions = props.listData.map((item, index) => {
    return {
        index,
        height: props.estimatedItemSize,
        top: index * props.estimatedItemSize, //上边界距离0的高度
        bottom: (index + 1) * props.estimatedItemSize //下边界距离0的高度
    }
})
let visibleCount = ref(null);
const end = ref(0) //可视区的最后一个元素的下标（从零开始）
//获取真实显示列表数据
const _listData = computed(() => {
    return props.listData.map((item, index) => {
        return {
            _index: `_${index}`,
            value: item.value
        }
    })
})
const aboveCount = computed(() => {  // start往上的元素数量 做缓冲区
    return Math.min(start.value, props.bufferScale * visibleCount.value)
})
const belowCount = computed(() => {
    return Math.min(props.listData.length - end.value, props.bufferScale * visibleCount.value);
})
const visibleData = computed(() => {    // 别被名字误导了，这个是所有可渲染的数据，不是可视区的
    let start1 = start.value - aboveCount.value;
    let end1 = end.value + belowCount.value;
    return _listData.value.slice(start1, end1);
})


onMounted(() => {
    screenHeight = ref(list.value.clientHeight)
    visibleCount = computed(() => {
        return Math.ceil(screenHeight.value / props.estimatedItemSize)
    })
    end.value = start.value + visibleCount.value
})

const setStartOffset = () => {
    let startOffset;
    if (start.value >= 1) {
        let size = positions[start.value].top - (positions[start.value - aboveCount.value] ? positions[start.value - aboveCount.value].top : 0);
        startOffset = positions[start.value - 1].bottom - size;
    } else {
        startOffset = 0;
    }
    content.value.style.transform = `translate3d(0,${startOffset}px,0)`
}
onUpdated(() => {
    // 需要在每次渲染之后获取真实的元素高度，并做缓存
    const updateItemsSize = () => {
        let nodes = items.value
        nodes.forEach((node) => {
            let height = node.clientHeight;
            let index = +node.id.slice(1)
            let oldHeight = positions[index].height;
            let dValue = oldHeight - height;
            //存在差值

            if (dValue) {
                positions[index].bottom = positions[index].bottom - dValue;
                positions[index].height = height;
                for (let k = index + 1; k < positions.length; k++) {
                    positions[k].top = positions[k - 1].bottom;
                    positions[k].bottom = positions[k].bottom - dValue;
                }
            }
        })
    }
    // updated里dom已更新，可以取到真实的大小来缓存
    if (!items.value || !items.value.length) {
        return;
    }
    //获取真实元素大小，修改对应的尺寸缓存
    updateItemsSize();
    //更新列表总高度
    let height = positions[positions.length - 1].bottom;
    phantom.value.style.height = height + 'px'
})

let scrollEvent = () => {
    //当前滚动位置
    let scrollTop = list.value.scrollTop;
    //此时的开始索引
    start.value = getStartIndex(positions, scrollTop)
    //此时的结束索引
    end.value = start.value + visibleCount.value;
    setStartOffset();
}

</script>
  
  
<style scoped>
.infinite-list-container {
    height: 500px;
    width: 500px;
    overflow: auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
}

.infinite-list-item {
    padding: 10px;
    color: #555;
    box-sizing: border-box;
    border-bottom: 1px solid #999;
}
</style>