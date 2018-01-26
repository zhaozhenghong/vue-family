<template>
  <div id="app">
    <m-header></m-header>
    <m-nav></m-nav>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>

  </div>
</template>

<script>
    import MHeader from '@/components/m-header/m-header.vue'
    import MNav from '@/components/m-nav.vue'
    export default {
      components: {
        MHeader,
        MNav
      }
    }
</script>


<style>
body, html {
  line-height: 1;   /*意思是 根据该元素本身的字体大小 设置行高 比如该元素字体是15px line-height:1; 的行高*/
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', Arial, sans-serif, 'Droid Sans Fallback';
  user-select: none;    /*控制页面文字不能被选中*/
  -webkit-tap-highlight-color: transparent;  /*这个属性只用于iOS (iPhone和iPad)。当你点击一个链接或者通过Javascript定义的可点击元素的时候，它就会出现一个半透明的灰色背景。要重设这个表现，你可以设置-webkit-tap-highlight-color为任何颜色。*/
  -webkit-font-smoothing: antialiased;  /*文字更加清晰，抗锯齿*/
  -moz-osx-font-smoothing: grayscale;
  background: #161823;
}
a, abbr, acronym, address, applet, article, aside, audio, b, big, blockquote, body, canvas, caption, center, cite, code, dd, del, details, dfn, div, dl, dt, em, embed, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, html, i, iframe, img, input, ins, kbd, label, legend, li, mark, menu, nav, object, ol, output, p, pre, q, ruby, s, samp, section, small, span, strike, strong, sub, summary, sup, table, tbody, td, tfoot, th, thead, time, tr, tt, u, ul, var, video{
    margin: 0; 
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: 400;
    vertical-align: baseline;
}
li{list-style: none;}
</style>