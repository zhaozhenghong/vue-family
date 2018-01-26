<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot>
            </slot>
        </div>
        <div class="dots">
            <div class="dot" v-for="(item, index) in dots" :class="{ active: index === currentPageIndex}"></div>
        </div>
    </div>
</template>

<script>
    /* 在VUE中better-scroll初始化以后可能不会滚动甚至报错，只是因为在它初始化的时候vue组件没有真正渲染，或者高度宽度计算不正确，可以在mounted钩子中并且dom成功渲染完过后初始化better-scroll,可以使用$nextTick()方法来判断dom成功渲染 */
    import BScroll from 'better-scroll'
    import {addClass} from '@/common/util.js'

    export default {
      data() {
        return {
          dots: [],
          scroll: null, // better-scroll 对象
          autoTime: null,   // 自动滚动定时器对象
          currentPageIndex: 0   // 当前页下标
        }
      },
      mounted() {
        this.$nextTick(function() {
          this.setSliderWidth()
          this.initSlider()
          this.autoPlay()
        })

        // 监听浏览器窗口改变事件
        window.addEventListener('resize', () => {
          // 延迟60毫秒可以规避，浏览器窗口改变频率过快导致的某些错误，如某个元素的属性找不到（Cannot read property 'children' of undefined）
          if (this.scroll) {
            setTimeout(() => {
              this.setSliderWidth(true)
              this.scroll.refresh()
              this.autoPlay()
            }, 60)
          }
        })
      },
      activated() {
        // keep-alive 缓存组件被激活时调用。主要解决当前页面切换走了以后，再切换回来时自动滚动就无效的问题
        // 第一次打开不会被调用，因为还没有使用缓存
        if (this.scroll) {
          this.scroll.enable() // 重新启用滚动
          this.currentPageIndex = 0
          this.scroll.goToPage(0, 0, 0)
          this.autoPlay()
        }
      },
      deactivated() {
        // keep-alive 组件停用时调用。也是主要解决当前页面切换走了以后，再切换回来时自动滚动就无效的问题
        // 只要离开当前keep-alive组件的界面就会被调用
        if (this.scroll) {
          clearTimeout(this.autoTime)
          this.scroll.disable() // 禁用滚动
        }
      },
      beforeDestroy() {
        // 实例销毁之前调用。VUE示例销毁之前应该释放幻灯片资源
        if (this.scroll) {
          clearTimeout(this.autoTime)
          this.scroll.disable() // 禁用滚动
        }
      },
      methods: {
        setSliderWidth(isResize = false) {    // isResize=true 表示重新计算容器宽度
          let children = this.$refs.sliderGroup.children // 滚动容器里面的子元素列表
          let width = 0
          let sliderWidth = this.$refs.slider.clientWidth // 父容器的宽度,就是屏幕可视宽度

          for (let i = 0; i < children.length; i++) {
            children[i].style.width = sliderWidth + 'px'
            if (isResize !== true) {
              addClass(children[i], 'slider-item')
            }
            width += sliderWidth
            // console.log(children[i])
          }
          if (isResize !== true) {
            this.dots = new Array(children.length)
            width = (width + sliderWidth * 2) + 'px'
          } else {
            width = width + 'px'
          }
          this.$refs.sliderGroup.style.width = width
        },
        initSlider() {
          this.currentPageIndex = 0
          this.scroll = new BScroll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: {
              loop: true, // true-无缝轮播,会自动把第一张合最后一张各复制一份，所以滚动容器总宽度应该多两个子列表的宽度
              threshold: 0.3,
              speed: 400
            },
            bounce: false
          })
          // 监听滚动结束事件
          this.scroll.on('scrollEnd', () => {
            this.currentPageIndex = this.scroll.getCurrentPage().pageX
            this.autoPlay()
          })
        },
        autoPlay() {
          clearTimeout(this.autoTime)
          this.autoTime = setTimeout(() => {
            this.scroll.next(400)
          }, 4000)
        }
      },
      destroyed() {
        clearTimeout(this.autoTime)
      }
    }
</script>

<style scoped type="text/css">
.slider{ min-height: 1px; overflow: hidden; position: relative;}
.slider .slider-group{ position: relative; overflow: hidden; white-space: nowrap; }
.slider .slider-item{ float: left; box-sizing: border-box; overflow: hidden; text-align: center; }
.slider .slider-item a{ display: block; width: 100%; overflow: hidden; text-decoration: none; }
.slider .slider-item img{ display: block; width: 100%; }
.slider .dots{ position: absolute; right: 0; left: 0; bottom: 12px; text-align: center; font-size: 0; }
.slider .dots .dot{ display: inline-block; margin: 0 4px; width: 8px; height: 8px; background-color: #fff; border-radius: 50%;}
.slider .dots .dot.active{ width: 20px; border-radius: 5px;}
</style>