<template>
  <div class="rr-scrollbar" :class="{ vertical, horizontal }" @mousedown="clickTrack">
    <div class="rr-scrollbar__thumb" ref="thumb" :style="thumbStyle" @mousedown="clickThumb" />
  </div>
</template>
<script>
export default {
  name: "ScrollBar",

  props: {
    vertical: Boolean,
    size: Number,
    move: Number
  },
  computed: {
    thumbStyle() {
      if (this.vertical) {
        const translate = `translateY(${this.move}%)`;
        return {
          height: this.size + "%",
          transform: translate,
          msTransform: translate,
          webkitTransform: translate
        };
      } else {
        const translate = `translateX(${this.move}%)`;
        return {
          width: this.size + "%",
          transform: translate,
          msTransform: translate,
          webkitTransform: translate
        };
      }
    },
    horizontal() {
      return !this.vertical;
    }
  },
  methods: {
    clickTrack(e) {
      if (this.vertical) {
        const offset = Math.abs(e.target.getBoundingClientRect().top - e.clientY);
        const thumbHalf = this.$refs.thumb.offsetHeight / 2;
        this.scrollTo(((offset - thumbHalf) * 100) / this.$el.offsetHeight);
      } else {
        const offset = Math.abs(e.target.getBoundingClientRect().left - e.clientX);
        const thumbHalf = this.$refs.thumb.offsetWidth / 2;
        this.scrollTo(((offset - thumbHalf) * 100) / this.$el.offsetWidth);
      }
    },

    clickThumb(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;
      document.addEventListener("mousemove", this.mouseMoveHandler, false);
      document.addEventListener("mouseup", this.mouseUpHandler, false);
      document.onselectstart = () => false;
      this.Origin = this.vertical
        ? e.target.offsetHeight - (e.clientY - e.target.getBoundingClientRect().top)
        : e.target.offsetWidth - (e.clientX - e.target.getBoundingClientRect().left);
    },

    mouseMoveHandler(e) {
      if (this.cursorDown === false) return;
      if (!this.Origin) return;
      if (this.vertical) {
        const offset = e.clientY - this.$el.getBoundingClientRect().top;
        const thumbClickPosition = this.$refs.thumb.offsetHeight - this.Origin;
        this.scrollTo(((offset - thumbClickPosition) * 100) / this.$el.offsetHeight);
      } else {
        const offset = e.clientX - this.$el.getBoundingClientRect().left;
        const thumbClickPosition = this.$refs.thumb.offsetWidth - this.Origin;
        this.scrollTo(((offset - thumbClickPosition) * 100) / this.$el.offsetWidth);
      }
    },

    mouseUpHandler() {
      this.cursorDown = false;
      this.X = this.Y = 0;
      document.removeEventListener("mousemove", this.mouseMoveHandler);
      document.onselectstart = null;
    },

    scrollTo(percent) {
      if (percent < 0) percent = 0;
      if (percent + this.size > 100) percent = 100 - this.size;
      this.$emit("scroll", percent);
    }
  },

  destroyed() {
    document.removeEventListener("mouseup", this.mouseUpHandler);
  }
};
</script>
<style lang="scss">
@import "~element-ui/packages/theme-chalk/src/common/var";
.rr-scrollbar {
  position: absolute;
  right: 2px;
  bottom: 2px;
  z-index: 114;
  border-radius: 4px;
  opacity: 1;

  &:hover {
    opacity: 1;
  }
  &.vertical {
    width: 6px;
    top: 44px;
    &:hover {
      width: 10px;
    }
    > div {
      width: 100%;
    }
  }

  &.horizontal {
    height: 6px;
    left: 2px;
    &:hover {
      height: 10px;
    }
    > div {
      height: 100%;
    }
  }
}
.rr-scrollbar__thumb {
  position: relative;
  display: block;
  width: 0;
  height: 0;
  cursor: pointer;
  border-radius: inherit;
  background-color: $--scrollbar-background-color;
  transition: 0.3s background-color;
  &:hover {
    background-color: $--scrollbar-hover-background-color;
  }
}
</style>
