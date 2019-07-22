<template>
  <div>
    <div class="edit-drag-border edit-top-border" :style="topBorder">
      <span class="drag-dot" :style="dragDot"> </span>
      <span class="tra-span-dot" @mousedown="dragMove($event)" @mouseup="dragOver($event)" :style="traSpanDat"> </span>
    </div>
    <div class="edit-drag-border edit-right-border" :style="rightBorder"></div>
    <div class="edit-drag-border edit-bottom-border" :style="bottomBorder"></div>
    <div class="edit-drag-border edit-left-border" :style="leftBorder"></div>
  </div>
</template>

<script>
export default {
  name: "DragSpan",
  props: {
    drag: Object,
    dragSpanShow: Boolean
  },
  data() {
    return {
      //是否正在拖拽
      isDrag: false,
      //是否向上
      isUp: false,
      //向上拉取高度
      upDragHeight: 0,
      //拖拽过程中向左右偏移的量
      leftDragHeight: 0
    };
  },
  inject: ["edit"],
  computed: {
    selectHeight() {
      let height = 0;
      this.edit.selectArr.forEach(x => {
        height += this.edit.tdHeight[x];
      });
      return height;
    },
    topBorder() {
      let style = {
        height: 0,
        borderTop: "2px solid rgba(71, 134, 255, 1)",
        left: this.drag.clientX - this.parentScrollX + "px",
        top: this.dragTop + "px",
        width: this.drag.width + "px"
      };
      return style;
    },
    rightBorder() {
      let style = {
        height: this.edit.currentRowIndex != -1 ? this.selectHeight + "px" : 0 + "px",
        borderRight: "2px solid rgba(71, 134, 255, 1)",
        left: this.drag.clientX - this.parentScrollX + this.drag.width + "px",
        top: this.dragTop + "px",
        width: 0
      };
      return style;
    },
    bottomBorder() {
      let style = {
        height: 0,
        borderTop: "2px solid rgba(71, 134, 255, 1)",
        left: this.drag.clientX - this.parentScrollX + "px",
        top: this.dragTop + this.selectHeight + "px",
        width: this.drag.width + "px"
      };
      return style;
    },
    leftBorder() {
      let style = {
        height: this.edit.currentRowIndex != -1 ? this.selectHeight + "px" : 0 + "px",
        borderLeft: "2px solid rgba(71, 134, 255, 1)",
        left: this.drag.clientX - this.parentScrollX - 1 + "px",
        top: this.dragTop + "px",
        width: 0
      };
      return style;
    },
    dragDot() {
      let style = {
        left: this.drag.width - 4 + "px",
        top: this.edit.currentRowIndex != -1 ? this.selectHeight - 6 + "px" : 0 + "px"
      };
      return style;
    },
    traSpanDat() {
      let style = {
        left: this.drag.width + this.leftDragHeight - 7 + "px",
        top: this.drag.cirTop + this.upDragHeight - 5 + "px"
      };
      return style;
    },

    dragTop() {
      var self = this;
      if (this.isUp) {
        if (this.edit.dragSelect == 1) {
          self.edit.drag.clientY = this.edit.initY;
        } else {
          self.edit.drag.clientY = this.edit.initY - (this.selectHeight - this.edit.tdHeight[this.selectArr[0]]);
        }
      } else {
        self.edit.drag.clientY = this.edit.initY;
      }
      return this.edit.drag.clientY - this.edit.scrollY - this.upDragHeight;
      // return 0;
    },
    parentScrollX() {
      return this.edit.scrollX;
    }
  },
  methods: {
    dragClick() {
      if (this.isDrag) {
        this.isDrag = false;
        this.edit.dragSpanShow = false;
        // this.edit.isEdit = false;
        this.edit.editClickCount = 0;
      } else {
        this.isDrag = false;
        this.edit.dragSpanShow = false;
        // this.edit.isEdit = true;
        this.edit.editClickCount = 0;
      }
      this.edit.isEdit = true;
    },

    /*
     * dragMove拖拽开始
     * */
    dragMove(el) {
      var self = this;
      this.upDragHeight = 0;
      this.leftDragHeight = 0;
      self.isDrag = true;
      //获取目标元素
      let odiv = el.target;
      //获取到的是触发点相对浏览器可视区域左上角距离，不随页面滚动而改变。
      let disX = el.clientX;
      let disY = el.clientY;
      // let oldScrollY = self.edit.scrollY;
      if (typeof el.target.setCapture != "undefined") {
        el.target.setCapture();
      }
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        //鼠标位置减去小圆点的相对位置，得到相对的leftwidth 和相对的topWidth
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
        if (e.clientX > window.innerWidth - odiv.offsetWidth) {
          left = window.innerWidth - disX;
        }
        if (e.clientY > window.innerHeight - odiv.offsetHeight) {
          top = window.innerHeight - disY;
        }
        //计算选中了多少行
        if (top > 0) {
          self.isUp = false;
          this.selectCount(top);
          self.upDragHeight = 0;
          if (this.edit.selectArr[this.edit.selectArr.length - 1] == this.edit.data.length - 1) {
            top = this.selectHeight;
            return;
          } else {
            if (self.edit.allTableHeight < e.clientY + 40) {
              self.edit.scrollY = e.clientY + 53 - self.edit.allTableHeight;
            }
          }
        } else {
          //向上拉取选中
          self.isUp = true;
          this.upSelectCount(top);
          let upDragHeight = 0;
          this.edit.selectArr.forEach((x, index) => {
            index == 0 ? (upDragHeight = 0) : (upDragHeight += self.edit.tdHeight[x]);
          });
          self.upDragHeight = upDragHeight;
          if (this.edit.selectArr[this.edit.selectArr.length - 1] <= 0) {
            return;
          } else {
            if (e.clientY - this.edit.tableClientY - 43 < 0 && this.edit.scrollY > 0) {
              this.edit.scrollY += e.clientY - this.edit.tableClientY - 43;
            }
          }
        }

        //绑定元素位置到positionX和positionY上面
        self.edit.drag.cirLeft = left;
        // self.edit.drag.cirTop = top + this.edit.tableTdHeight;
        self.edit.drag.cirTop = top + this.edit.drag.height;
        this.leftDragHeight = left;

        //拖拽结束，脱离
        document.onmouseup = () => {
          self.dragOver(el);
        };
      };
    },
    /*
     * 向上拉取选中了几条数据
     * */
    upSelectCount(top) {
      this.edit.select = [this.edit.currentRowIndex];
      let newArr = [this.edit.currentRowIndex];
      let comHeight = this.edit.tdHeight[this.edit.currentRowIndex];
      if (-top > comHeight) {
        let select = this.computedUpHeight(newArr, this.edit.currentRowIndex, -top);
        this.edit.selectArr = select.arr;
      }
    },
    /*
     * 计算向上拉取的高度和选中的行数
     * */
    computedUpHeight(newArr, rowIndex, top) {
      let newHeight = this.edit.tdHeight[rowIndex];
      newArr.forEach((x, index) => {
        if (newArr.length - 1 == index) {
          newHeight += this.edit.tdHeight[x] / 2;
        } else {
          newHeight += this.edit.tdHeight[x];
        }
      });
      if (top > newHeight) {
        if (rowIndex - 1 < 0) {
          return {
            arr: newArr,
            height: newHeight
          };
        } else {
          newArr = [...newArr, rowIndex - 1];
          return this.computedUpHeight(newArr, rowIndex - 1, top);
        }
      } else {
        return {
          arr: newArr,
          height: newHeight
        };
      }
    },
    /*
     * 判断选中了几条数据
     * */
    selectCount(top) {
      this.edit.selectArr = [this.edit.currentRowIndex];
      let newArr = [this.edit.currentRowIndex];
      let comHeight = this.edit.tdHeight[this.edit.currentRowIndex];
      if (top > comHeight) {
        let select = this.computedHeight(newArr, this.edit.currentRowIndex, top);
        this.edit.selectArr = select.arr;
      } else {
        return;
      }
      // let dragSelect = Math.round(top / self.edit.tableTdHeight);
      // if(dragSelect)
    },
    /*
     * 计算向下拉取的高度和选中的行数
     * */
    computedHeight(newArr, rowIndex, top) {
      let newHeight = 0;
      newArr.forEach((x, index) => {
        if (newArr.length - 1 == index) {
          newHeight += this.edit.tdHeight[x] / 2;
        } else {
          newHeight += this.edit.tdHeight[x];
        }
      });
      if (top > newHeight) {
        if (rowIndex + 2 > this.edit.data.length) {
          return {
            arr: newArr,
            height: newHeight
          };
        } else {
          newArr = [...newArr, rowIndex + 1];
          return this.computedHeight(newArr, rowIndex + 1, top);
        }
      } else {
        return {
          arr: newArr,
          height: newHeight
        };
      }
    },
    /*
     * dragOver拖拽结束
     * */
    dragOver(e) {
      var self = this;
      self.leftDragHeight = 0;
      // this.edit.isEdit = false;
      self.edit.drag.cirLeft = this.edit.drag.width - 4;
      self.edit.drag.cirTop = this.edit.drag.height - 4;
      let name = self.edit.headers[self.edit.currentColIndex].name;
      let value = self.edit.data[self.edit.currentRowIndex][name];
      self.edit.selectArr.forEach(x => {
        self.$set(self.edit.data[x], name, value);
      });
      this.$emit("editDragEnd", this.edit.currentColIndex, self.edit.selectArr, name, value);
      self.isUp = false;
      self.upDragHeight = 0;
      this.edit.currentColIndex = -1;
      this.edit.currentRowIndex = -1;
      this.edit.selectArr = [];
      document.onmousemove = null;
      document.onmouseup = null;
      //修复低版本ie bug
      if (typeof e.target.releaseCapture != "undefined") {
        e.target.releaseCapture();
      }
    }
  }
};
</script>

<style lang="scss">
.dragSpan {
  position: absolute;
  z-index: 101;
}
.edit-drag-border {
  position: absolute;
  z-index: 100;
}
.drag-div {
  // border: 2px solid rgba(71, 134, 255, 1);
  z-index: 1;
  background-color: transparent;
  box-sizing: border-box;
}
.drag-dot {
  width: 6px;
  height: 6px;
  background: rgba(71, 134, 255, 1);
  position: absolute;
  z-index: 101;
  // bottom: -2px;
  // right: -2px;
}
.tra-span-dot {
  width: 14px;
  height: 14px;
  // background: pink;
  position: absolute;
  z-index: 1000;
}
.tra-span-dot:hover {
  /*cursor: crosshair;*/
  cursor: move;
}
</style>
