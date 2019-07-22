import { addResizeListener, removeResizeListener } from "element-ui/lib/utils/resize-event";

export default {
  data() {
    return {
      scrollX: 0,
      scrollY: 0,
      clientWidth: 0,
      clientHeight: 0
    };
  },
  computed: {
    actualHeight() {
      return 100;
    },
    actualWidth() {
      return 100;
    },
    // 水平方向移动百分比
    hMove() {
      return (this.scrollX * 100) / this.clientWidth;
    },
    // 垂直方向移动百分比
    vMove() {
      return (this.scrollY * 100) / this.clientHeight;
    },
    hBarSize() {
      return (this.clientWidth * 100) / this.actualWidth;
    },
    vBarSize() {
      return (this.clientHeight * 100) / this.actualHeight;
    },
    scrollXMax() {
      const result = this.actualWidth - this.clientWidth;
      return result > 0 ? result : 0;
    },
    scrollYMax() {
      const result = this.actualHeight - this.clientHeight;
      return result > 0 ? result : 0;
    }
  },
  mounted() {
    addResizeListener(this.$el, this.sizeChanged);
  },
  beforeDestroy() {
    removeResizeListener(this.$el, this.sizeChanged);
  },
  methods: {
    sizeChanged() {
      this.clientWidth = this.$el.clientWidth;
      this.clientHeight = this.$el.clientHeight;
      this.$nextTick(() => {
        if (this.scrollX > this.scrollXMax) this.scrollX = this.scrollXMax;
        if (this.scrollY > this.scrollYMax) this.scrollY = this.scrollYMax;
      });
    },
    vScroll(percent) {
      this.scrollY = (this.actualHeight * percent) / 100;
    },
    hScroll(percent) {
      this.scrollX = (this.actualWidth * percent) / 100;
    },
    wheel(e) {
      e.preventDefault();
      if (e.deltaX) {
        let x = this.scrollX + e.deltaX;
        if (x < 0) x = 0;
        if (x > this.scrollXMax) x = this.scrollXMax;
        if (this.scrollX != x) this.scrollX = x;
      }
      if (e.deltaY) {
        let y = this.scrollY + e.deltaY;
        if (y < 0) y = 0;
        if (y > this.scrollYMax) y = this.scrollYMax;
        if (this.scrollY != y) this.scrollY = y;
      }
    }
  }
};
