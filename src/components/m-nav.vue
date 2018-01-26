<template>
    <div class="nav">
        <router-link tag="div" class="item" to="/index">
            <span class="link">特推</span>
        </router-link>
        <router-link tag="div" class="item" to="/activity">
            <span class="link">影音图像</span>
        </router-link>
        <router-link tag="div" class="item" to="/service">
            <span class="link">亲情树</span>
        </router-link>
        <router-link tag="div" class="item" to="/user">
            <span class="link">大记事</span>
        </router-link>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .nav{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
    }
    .nav .item{
        -webkit-box-flex:1;
        -ms-flex:1;
        flex: 1;
        text-align: center;
    }
    .nav .item .link{
        padding-bottom: 5px;
        color: hsla(0,0%,100%,.5);
    }
    .nav .item.router-link-active .link{
        color: #ffcd32;
        border-bottom: 2px solid #ffcd32;
    }
</style>