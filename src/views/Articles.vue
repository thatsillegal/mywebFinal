<template>
        <div class="container">
            <v-list lines="three">
                <v-list-item
                    v-for= "(item,i) in items"
                    :key="i"
                    :title= item.title
                    :subtitle= item.subtitle
                    @click="openModal(item.embedCode)"
                />
            </v-list>
        </div>

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
                        title: '【学术】多米诺体系中现浇楼盖的优化设计研究',
                        value: 1,
                        subtitle:"以3D打印模板建造的“应力线-索状” 楼盖为例",
                        embedCode:"https://1drv.ms/b/s!AlDXLATEEYkClORVZQEXdWP6mCPjTw?embed=1&em=2"
                    },
                    {
                        title: '【学术】钢筋混凝土梁的拓扑优化设计与3D打印模具',
                        value: 2,
                        subtitle:"拓扑优化法适用于建筑结构的设计，该方法大多探索单一均质材料的优化，无法有效指导钢筋混凝土复合材料的设计。本文探讨了钢筋混凝土材料的拓扑优化方法，使混凝土与钢筋的材料性能得到更加合理充分的发挥。拓扑优化后的结构往往是异形的，因此本文探讨了基于3D打印技术的模具设计方法，使优化后的结构采用现浇的方式得以建造。本文通过建造实验，验证了钢混结构的拓扑优化设计与利用异形3D打印模具进行建造的可行性。",
                        embedCode:"https://1drv.ms/w/s!AlDXLATEEYkClOkz8b3zZbCqJuq98A?embed=1&em=2"
                    },
                    {
                        title: '【学术】基于多智能体的滨水景观生成 ',
                        value: 3,
                        subtitle:"Waterfront Landscape Generation based on Multi-agent System",
                        embedCode: "https://1drv.ms/b/s!AlDXLATEEYkClOkyH9WEHsAwIt4i5Q?embed=1&em=2"
                    },
                    {
                        title: '【学术】Digital Nervi',
                        value: 4,
                        subtitle:"Performance-based Design of Lightweight Isostatic Ribbed Slab with 3D-Printed Concrete Formwork",
                        embedCode: "https://1drv.ms/b/s!AlDXLATEEYkClOlhl-aKsAzkWSA3pw?embed=1&em=2"
                    },
                    {
                        title: '【个人】海底世界',
                        value: 5,
                        subtitle:"海洋是天空的倒影，从海底来到天上，会是怎样？",
                        embedCode: "https://1drv.ms/w/s!AlDXLATEEYkClORSDcYxyrFHeLKXQQ?embed=1&em=2"
                    }
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
        },
    };
</script>

<style scoped>
    .container{
        display: flex;
        overflow: hidden;
        height: calc(100vh - 50px);
        align-items: center;
        justify-content: center;
    }
    .v-list{
        max-width: 80%;
        overflow-x: hidden;
    }
</style>