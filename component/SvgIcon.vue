<template>
  <svg class="icon" :style="svgStyle">
    <use :xlink:href="`#${name}`" />
  </svg>
</template>

<script>
export default {
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 18
    },
    height: {
      type: Number,
      default: 18
    }
  },
  computed: {
    svgStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        verticalAlign: "middle"
      };
    }
  }
};
</script>
