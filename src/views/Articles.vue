<template>
    <v-container>
      <v-list lines="three">
        <v-list-item
          v-for="n in 3"
          :key="n"
          :title="'Item ' + n"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
        ></v-list-item>
      </v-list>
    </v-container>
</template>

<script>
</script>

<style scoped>
    .v-container{
        width:80vw;
    }
</style>