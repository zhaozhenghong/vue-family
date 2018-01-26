<template>
  <div class="index">
    <div class="scrollBox" ref="scrollBox">
      <div>
        <div v-if="sliders.length > 0" class="slider-wrapper">
          <slider>
            <div v-for="item in sliders">
              <a :href="item.linkUrl"><img :src="item.picUrl" /></a>
            </div>
          </slider>
        </div>
        <div class="recommend">
          <h1 class="header"><i class="fa fa-heart"></i> 最新记忆 <i class="fa fa-heart"></i></h1>
          <ul>
            <li v-for="item in recommends" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
          <div class="loading-box" v-show="recommends.length <= 0">
            <loading title="······正在努力加载······"></loading>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/base/loading/loading.vue'
import Jsonp from '@/common/jsonp.js'
import Slider from '@/base/slider/slider.vue'
// import axios from 'axios'
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      sliders: [],
      recommends: []
    }
  },
  created() {
    this.getSliders()
    this.getRecommends()
  },
  mounted() {
    this.$nextTick(function() {
      this.scroll = new BScroll(this.$refs.scrollBox)
    })
  },
  components: {
    Slider,
    Loading
  },
  methods: {
    getSliders() {
      Jsonp('https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&platform=h5&uin=0&needNewCode=1', {
        param: 'jsonpCallback'
      }).then((data) => {
        this.sliders = data.data.slider
      }, (err) => {
        console.log(err)
      })
    },
    getRecommends() {
      let recommends = [{
        name: '涩涩的大棕熊',
        dissname: '混搭风Mix：当古典大提琴遇上流行乐',
        imgurl: 'http://p.qpic.cn/music_cover/qB1icvKIehIKmroV6TNic9D7ppBa7D9gicibVJPuMfcDJP2zrsSduHUKhw/600?n=1'
      },
      {
        name: '哲哲',
        dissname: '浮游时光 | 品一杯慢情调的韩系布鲁斯',
        imgurl: 'http://p.qpic.cn/music_cover/yGMcxIOCOW5CtiaFibCDFHDKIYlA0Thy65BR0icuxmN5KicDhsXYZuRMTw/600?n=1'
      },
      {
        name: '少女',
        dissname: '手控福利：钢琴前奏，温柔到毫无抵抗能力',
        imgurl: 'http://p.qpic.cn/music_cover/5jvDX14RLylr9k5PnsA7jtoCb5FSH3zGibztYGmnh3Wj4UF9BucLzicA/600?n=1'
      },
      {
        name: 'DJ顾念晨',
        dissname: '日系摇滚：为Rock的小姐姐们躁动起来！',
        imgurl: 'http://p.qpic.cn/music_cover/8HhavvWNIicpyjlv0UnT5TZu4HqfCibfdXxhiaFK7LSFQ7lw20mCcKeWQ/600?n=1'
      },
      {
        name: '默念余笙',
        dissname: '轻快电子：网络写手深夜码字加速器',
        imgurl: 'http://p.qpic.cn/music_cover/aaxX4Babic4VicBPicJOwr5xiarATJiaHYTGlfoejkvx88Ya8dvZ3S2kYKQ/600?n=1'
      },
      {
        name: '孤独的一点点患者',
        dissname: '港乐 | 当他们的歌声染上颜色',
        imgurl: 'http://p.qpic.cn/music_cover/7ib5z5gTa2MbAYjQY4P8NcPVhKADXJDNPBNp3OSuia4qKFLOh3JVWw9g/600?n=1'
      },
      {
        name: 'LoVe',
        dissname: '灵感涌现：奇幻轻音造就的风华笔墨',
        imgurl: 'http://p.qpic.cn/music_cover/hBibLwnyBfQncfrhVAHPPayAdewmxrXic750KOeibQrk3vm8jELTErGxA/600?n=1'
      },
      {
        name: '心如刀割',
        dissname: '「摇滚向」安迪·沃霍尔的唱片封面艺术',
        imgurl: 'http://p.qpic.cn/music_cover/J0SdMIyhAqoMF6JibUibJZDiaZDeGMW0QBiaPGNn4Qqc0Tf3Y6LT4oN0iag/600?n=1'
      },
      {
        name: '风少',
        dissname: '韩语爵士：暖流来袭，纵享别样风情',
        imgurl: 'http://p.qpic.cn/music_cover/llTQ9l2AeicK2OLIORnsUdvjFpQwHSRxibibiaQCKDy3eZGmTHu2PsaCUA/600?n=1'
      },
      {
        name: 'ChaCha',
        dissname: '今日份的夜宵！天冷，给自己点个双人火锅',
        imgurl: 'http://p.qpic.cn/music_cover/tHzMbKzYyUqgJIqHZCoy9dZV9qplProXfib7Nnzk6j4iarWYLVWosQRA/600?n=1'
      },
      {
        name: '私に闻いて风i',
        dissname: '年度总结！2017年1月-12月新番大合集',
        imgurl: 'http://p.qpic.cn/music_cover/qH8rLHHhL8O8Iibm56uPzJy4mNzibugoib1iabvjIvGpVic9gqz3N4BL9OQ/600?n=1'
      },
      {
        name: 'HOPE-T',
        dissname: '清新暖色系：冬日中速跑纯电音精选',
        imgurl: 'http://p.qpic.cn/music_cover/DYAIOgq83epmFYdfqYEs6gq6hIgqxRzDibxAq5GP8S8vZ2EPU1MLRQg/600?n=1'
      }]

      // axios.get('http://y.gtimg.cn/music/photo_new/T003R720x288M0000021y6uX0peAJG.jpg', {
      //   pkNumber: 'jsh01'
      // }).then((response) => {
      //   this.recommends = recommends
      //   console.log(response)
      // }).catch((error) => {
      //   this.recommends = recommends
      //   console.log(error)
      // })

      setTimeout(() => {
        this.recommends = recommends
      }, 4000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index{ color: #fff; position: fixed; top: 88px; left: 0; right: 0; bottom: 0;}
.scrollBox{ height: 100%; overflow: hidden;  }
.recommend .header{ text-align: center; line-height: 40px; color: #fff; }
.recommend .header i{ color: red; }
.recommend .item{ height: 100px;  overflow: hidden; display:-webkit-flex; display:-ms-flex; display:-moz-flex; display:flex; box-sizing: border-box; padding: 0 15px 15px;}
.recommend .item .icon{ flex:0 0 100px; width: 100px;  overflow: hidden; border-radius: 6px;}
.recommend .item .text{ -webkit-flex:1; -ms-flex:1; -moz-flex:1; flex: 1; display:-webkit-flex; display:-ms-flex; display:-moz-flex; display:flex; -webkit-justify-content: center; flex-direction:column; justify-content: center; padding-left: 15px; line-height: 20px; font-size: 14px;}
.recommend .item .text .name{ margin-bottom: 10px; }
.recommend .item .text .desc{ color:hsla(0,0%,100%,.3) }
.loading-box{ padding-top: 20px; }
</style>
