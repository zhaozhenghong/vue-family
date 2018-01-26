<template>
    <div class="loading">
        <img src="./loading.gif" />
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '······正在努力加载······'
      }
    }
  }
</script>

<style scoped type="text/css">
    .loading{ text-align: center; font-size: 10px;}
    .loading p{ line-height: 40px; }
</style>