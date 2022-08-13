export default function useBoxDrag(element: HTMLDivElement) {
  element.onmousedown = function (e) {
    let diffX = e.clientX - element.offsetLeft; // 鼠标点击物体时相对于物体左边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
    let diffY = e.clientY - element.offsetTop;

    document.onmousemove = function (e) {
      let left = e.clientX - diffX;
      let top = e.clientY - diffY;

      // 控制拖拽物体的范围只能在浏览器视窗内
      if (left < 0) {
        left = 0;
      } else if (left > window.innerWidth - element.offsetWidth) {
        left = window.innerWidth - element.offsetWidth;
      }

      if (top < 0) {
        top = 0;
      } else if (top > window.innerHeight - element.offsetHeight) {
        top = window.innerHeight - element.offsetHeight;
      }

      //移动时重新得到物品距离，解决拖动时出现晃动现象
      element.style.left = left + 'px';
      element.style.top = top + 'px';
    }

    // 鼠标移开时不再移动
    document.onmouseup = function (e) {
      this.onmouseup = null;
      this.onmousemove = null;
    }
  }
}