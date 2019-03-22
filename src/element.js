// 虚拟dom的类
class Element{
  constructor(type, props, children){
    this.type = type
    this.props = props
    this.children = children
  }
}

// 返回虚拟节点
function createElement(type, props, children) {
  return new Element(type, props, children)
}

// 设置属性
function setAttr(node, type, value){
  switch (type) {
    case 'value':
      if( node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA' ) {
        node.value = value
      } else {
        node.setAttribute(type, value)
      }
      break;
    case 'style':
      node.style.cssTest = value
      break;
    default:
      node.setAttribute(type, value)
      break;
  }
}

// 将虚拟节点转化真实dom
function render(eleObj){
  let ele = document.createElement(eleObj.type)
  for (let key in eleObj.props) {
    setAttr(ele, key, eleObj.props[key])
  }
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    ele.appendChild(child)
  });
  return ele
}

function renderDom(ele, target){
  target.appendChild(ele)
}

export { createElement, render, Element, renderDom, setAttr }