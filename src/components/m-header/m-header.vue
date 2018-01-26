<template>
    <div class="m-header">
        <h1 class="text"><img height="18px" src="../../common/logo.png"><span>全家影像</span></h1>
        <div class="user-icon">
            <i class="fa fa-user-circle-o" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style type="text/css">
    .m-header{
        position: relative;
        height: 44px;
        text-align: center;
        color: #fff;
    }
    .m-header .text{
        display: inline-block;
        height: 44px;
        font-size: 18px;
    }
    .m-header .text img{ padding-top: 13px; }
    .m-header .text span{ display: inline-block; vertical-align: top; line-height: 44px; padding-left: 10px;}
    .m-header .user-icon{
        position: absolute;
        top: 0;
        right: 0;
    }
    .m-header .user-icon i{
        padding: 13px;
        font-size: 18px;
        color: #fff;
    }



</style>