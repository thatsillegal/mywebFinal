<script>
import WorkItem from "@/components/WorkItem.vue"

import work1 from "@/assets/worksImages/work1.jpg"
import work2 from "@/assets/worksImages/work2.jpg"
import work3 from "@/assets/worksImages/work3.jpg"
import work4 from "@/assets/worksImages/work4.jpg"



export default{
  components:{
    WorkItem
  },
  data(){
    return{
      workitems:[
        {id:1,title:'Bookcover Design1',description:'this is a photo',src: work1},
        {id:2,title:'Bookcover Design2',description:'nihao',src: work2},
        {id:3,title:'Bookcover Design3',description:'nihao',src: work3},
        {id:4,title:'Bookcover Design4',description:'nihao',src: work4},
      ]
    }
  },
  created(){
    let workImagesList = import.meta.glob('@/assets/worksImages/*.*');
    

  }
}
</script>

<template>
  <div class="wrapper">
    <WorkItem v-for="workitem in workitems" v-bind="workitem"/>
  </div>
</template>

<style scoped>
  .wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-content: flex-start;
    align-items:start;
    gap:20px;
    padding:35px 10px 10px 10px; 
  }

  .flex-item{
    background-color: rgb(207, 232, 220);
    border: 2px solid rgb(79, 185, 227);
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
  }
</style>
