function diff(oldTree, newTree) {
  let patches = {}
  let index = 0
  walk(oldTree, newTree, index, patches)
  return patches
}

function diffAttr(oldAttrs, newAttrs){
  let patch = {}
  for( let key in oldAttrs){
    if(oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
    }
  }
  for ( let key in newAttrs){
    if(!oldAttrs.hasOwnProperty(key)){
      patch[key] = newAttrs[key]
    }
  }
  return patch
}
let Index = 0
function diffChildren(oldChildren, newChildren, index, patches){
  oldChildren.forEach((child, idx) => {
    walk(child, newChildren[idx], ++Index, patches)
  });
}

function isString(el) {
  return Object.prototype.toString.call(el) === '[object String]'
}

const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
function walk(oldNode, newNode, index, patches){
  let currentPatch = [] // 每个元素都有一个补丁对象
  if(!newNode){
    currentPatch.push({ type: REMOVE, index})
  } else if (isString(oldNode) && isString(newNode)){
    if (oldNode !== newNode ){
      currentPatch.push({ type: TEXT, text: newNode})
    }
  } else if (oldNode.type === newNode.type) {
    // 比较属性是否有更改
    let attrs =diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attrs).length > 0 ){
      currentPatch.push({type: ATTRS, attrs })
    }
    // 遍历children
    diffChildren(oldNode.children, newNode.children, index, patches)
  } else {
    currentPatch.push({type: REPLACE, newNode})
  }
  // 有补丁的话
  if (currentPatch.length > 0) {
    // 将元素和补丁对应起来 放到大补丁包中
    patches[index] = currentPatch
  }
}

export default diff

// 规则：当节点类型相同时，去看一下属性是否相同，产生一个属性补丁包 {type:'ATTRS', attrs: {class: 'list-group'}}
// 新的dom节点不存在 {type: 'REMOVE', index: ID}
// 节点类型不相同 直接采用替换模式 {type: 'REPLACE', newNode: newNode}
// 文本的变化 {type: 'TEXT', text: 1}