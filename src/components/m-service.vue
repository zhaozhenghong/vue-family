<template>
    <div class="m-service">
        <div class="scrollBox" ref="scrollBox">
            <div>
                <ul>
                    <li class="item" v-for="g in list" ref="scrollG">
                        <h1>{{g.title}}</h1>
                        <ul>
                            <li class="needsClick" v-for="item in g.items" @click.stop.prevent="showInfo(item)">
                                <img v-lazy="item.imgSrc" />
                                <span v-html="item.name"></span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list-nav" @touchstart="navClickFs" @touchmove.stop.prevent="navMoveFs">
            <ul>
                <li v-for="(itme, index) in navList" :data-index="index" :class="{active : index === currentIndex}">
                    {{itme}}
                </li>
            </ul>
        </div>
        <div  class="header" v-if="title" ref="title">{{title}}</div>
        <keep-alive>
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </keep-alive>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data() {
    return {
      list: [],
      title: '',
      currentIndex: 0   // 导航的起始下标
    }
  },
  created() {
    // 之所以把这个数据用this.这种方式保存，而不是直接放到data()里面，是因为data里面的数据会被VUE监听变化，而这种方式存的数据是不会监听变化的。此处的touch属性是不需要监听的，所以这样可以提升效率
    // 定义鼠标开始坐标和结束坐标，以及开始点击的导航索引下标
    this.touch = {
      y1: 0,
      y2: 0,
      index: 0
    }
    this.groupHeightP = [] // 定义每个分组开始位置的坐标
  },
  mounted() {
    this.setList()
    this.$nextTick(function() {
      this.getGroupHeight()
      this.scroll = new BScroll(this.$refs.scrollBox, {
        probeType: 3,
        click: true,
        observeDOM: false
      })
      this.scroll.on('scroll', (p) => {
        if (p.y > 0) {
          this.title = ''
        }
        for (let i = 0; i < this.groupHeightP.length; i++) {
          if (this.groupHeightP[i + 1] && -p.y >= this.groupHeightP[i] && -p.y < this.groupHeightP[i + 1]) {
            this.currentIndex = i
            this.title = this.list[i].title
            // 下一个组的坐标 - 当前坐标 如果小于了30个像素则让标题也滚动
            let c = this.groupHeightP[i + 1] - (-p.y)
            if (c < 30) {
              let p = 30 - c
              this.$refs.title.style.transform = `translate3d(0px, -${p}px, 0px)`
            } else if (this.$refs.title) {
              this.$refs.title.style.transform = `translate3d(0px, 0px, 0px)`
            }
          }
        }
      })
    })
  },
  watch: {
    list() {
      this.$nextTick(function() {
        // 如果数据发生变化需要重新计算每个组的高度
        this.getGroupHeight()
        // 重新设置当前位置
        for (let i = 0; i < this.groupHeightP.length; i++) {
          if (this.groupHeightP[i + 1] && -this.scroll.y >= this.groupHeightP[i] && -this.scroll.y < this.groupHeightP[i + 1]) {
            this.currentIndex = i
            this.title = this.list[i].title
          }
        }
      })
    }
  },
  computed: {
    navList() {
      return this.list.map((g) => {
        return g.title.substr(0, 1)
      })
    }
  },
  methods: {
    showInfo(item) {
      this.$router.push(`/service/${item.id}`)
    },
    setList() {
      this.list = [{
        title: '双亲',
        items: [{
          id: 1,
          imgSrc: '/static/img/1.jpg',
          name: '父亲'
        }, {
          id: 2,
          imgSrc: '/static/img/2.jpg',
          name: '母亲'
        }]
      },
      {
        title: '哥',
        items: [{
          id: 3,
          imgSrc: '/static/img/3.jpg',
          name: '伟哥'
        }, {
          id: 4,
          imgSrc: '/static/img/4.jpg',
          name: '亮哥'
        }]
      },
      {
        title: '姐',
        items: [{
          id: 5,
          imgSrc: '/static/img/5.jpg',
          name: '大姐'
        }, {
          id: 6,
          imgSrc: '/static/img/6.jpg',
          name: '姐姐'
        }]
      },
      {
        title: '弟',
        items: [{
          id: 7,
          imgSrc: '/static/img/7.jpg',
          name: '小舅子'
        }]
      },
      {
        title: '妻',
        items: [{
          id: 8,
          imgSrc: '/static/img/8.jpg',
          name: '老婆'
        }]
      },
      {
        title: '吾',
        items: [{
          id: 9,
          imgSrc: '/static/img/9.jpg',
          name: '我自己'
        }]
      },
      {
        title: '侄',
        items: [{
          id: 10,
          imgSrc: '/static/img/10.jpg',
          name: '大姐的大儿子'
        }, {
          id: 11,
          imgSrc: '/static/img/11.jpg',
          name: '姐姐的儿子'
        }, {
          id: 12,
          imgSrc: '/static/img/12.jpg',
          name: '大姐的小儿子'
        }]
      },
      {
        title: '子',
        items: [{
          id: 13,
          imgSrc: '/static/img/13.jpg',
          name: '我的女儿'
        }, {
          id: 14,
          imgSrc: '/static/img/14.jpg',
          name: '我的儿子'
        }]
      }]
    },
    getGroupHeight() {
      this.groupHeightP = []
      let upHeight = 0
      this.groupHeightP.push(0) // 第一个位置是0开始，第一个位置的高度就是第二个位置的开始坐标
      for (let i = 0; i < this.$refs.scrollG.length - 1; i++) {
        upHeight += this.$refs.scrollG[i].clientHeight // 每个组的高度
        this.groupHeightP.push(upHeight)
      }
      // console.log(this.groupHeightP)
    },
    navClickFs(e) {
      // touches[0] 表示第一个手指对象
      this.touch.y1 = e.touches[0].pageY
      let index = e.target.getAttribute('data-index')
      this.touch.index = index
      this.scroll.scrollToElement(this.$refs.scrollG[index], 400)
    },
    navMoveFs(e) {
      this.touch.y2 = e.touches[0].pageY
      let juli = this.touch.y2 - this.touch.y1
      // 计算偏移了几个Nav点，因为每一个字母行行是18
      let pianyiN = Math.floor(juli / 18)
      // 滚动的开始索引位置+偏移位置就是当前要显示的位置
      let index = parseInt(this.touch.index) + pianyiN
      if (index >= 0 && index < this.$refs.scrollG.length) {
        this.scroll.scrollToElement(this.$refs.scrollG[index], 400)
      }
    }
  }
}
</script>

<style scoped type="text/css">
    .m-service{ position: fixed; top: 88px; left: 0; right: 0; bottom: 0; overflow: hidden; }
    .m-service .scrollBox{ height: 100%; overflow: hidden; }
    .m-service .item{ padding-bottom: 20px; font-size: 14px; box-sizing: border-box;}
    .m-service .item h1{ background-color: #313131; line-height: 30px; padding-left: 20px; color: hsla(0,0%,100%,.5); }
    .m-service .item li{ display: flex; align-items: center; color: hsla(0,0%,100%,.5); margin: 10px 20px 0 20px;}
    .m-service .item li img{ width: 50px; height: 50px; border-radius: 50%; margin-right: 20px;
    -webkit-filter: saturate(0.5);
    filter: saturate(0.5);}

    .m-service .list-nav{color: hsla(0,0%,100%,.5); position: absolute; top:50%; right: 0;
        transform:translateY(-50%);
        -ms-transform:translateY(-50%); /* IE 9 */
        -webkit-transform:translateY(-50%); /* Safari and Chrome */
    }
    .m-service .list-nav li{ padding: 6px 16px 0; line-height: 1; text-align: center;font-size: 12px;  }
    .m-service .list-nav .active{ color: #ffcd32; }
    .m-service .header{ height: 30px; position: absolute; top: 0; background-color: #313131; line-height: 30px; padding-left: 20px; color: hsla(0,0%,100%,.5); width: 100%; font-size: 14px;}
    .fade-enter-active, .fade-leave-active {
      transition: all .3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      transform: translate3d(100%,0,0);
    }
</style>