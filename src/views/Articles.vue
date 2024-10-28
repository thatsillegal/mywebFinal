<template>
   
    <v-card 
        id="cardEle"
        class="mx-auto"
        width="80vw"
    >
      <v-list lines="three">
        <v-list-item
          v-for= "(item,i) in items"
          :key="i"
          :title= item.title
          :subtitle= item.subtitle
           @click="openModal(item.embedCode)"
        />
      </v-list>
    </v-card>

    <!-- 使用 FloatingModal 组件 -->
    <FloatingModal 
        :content="currentEmbedCode" 
        :isVisible="isModalVisible" 
        @close="closeModal" 
    />
</template>

<script>
    import FloatingModal from "@/components/FloatingModal.vue";

    export default {
        components:{FloatingModal},
        data(){
            return{
                isModalVisible: false,        // 控制模态框显示
                currentEmbedCode: "",         // 当前的嵌入代码
                items: [
                    {
                    title: '海底世界',
                    value: 1,
                    subtitle:"海洋是天空的倒影，从海底来到天上，会是怎样？",
                    embedCode: "https://1drv.ms/w/s!AlDXLATEEYkClORSDcYxyrFHeLKXQQ?embed=1&em=2"
                    },
                    {
                    title: '多米诺体系中现浇楼盖的优化设计研究',
                    value: 2,
                    subtitle:"以3D打印模板建造的“应力线-索状” 楼盖为例",
                    embedCode:"https://1drv.ms/b/s!AlDXLATEEYkClORVZQEXdWP6mCPjTw?embed=1&em=2"
                    },
                    {
                    title: 'Item #3',
                    value: 3,
                    subtitle:"Lorem ipsum dolor sit amet consectetur adipisicing elit"
                    },
                ],
            }
        },
    methods: {
        openModal(embedCode) {
            this.currentEmbedCode = embedCode;
            this.isModalVisible = true;
            },
        closeModal() {
            this.isModalVisible = false;
            this.currentEmbedCode = "";
        }
    }
}
</script>

<style scoped>
    #cardEle{
        overflow: hidden;
    }
</style>