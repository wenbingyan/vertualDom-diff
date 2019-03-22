import { Element, render, setAttr} from './element'
let index = 0
let allPatches
export function patch(node, patches){
  allPatches = patches
  walk(node)
}

function walk(node){
  console.log(1)
  let currentPatch = allPatches[index++]
  
  let childNodes = node.childNodes
  childNodes.forEach(child => walk(child, allPatches));
  currentPatch && doPatch(node, currentPatch)
}

function doPatch(node, patches){
  console.log(2)
  patches.forEach(patch => {
    switch (patch.type) {
      case 'TEXT':
        node.textContent = patch.text
        break;
      case 'REMOVE':
        node.parentNode.removeChild(node)
        break;
      case "REPLACE":
        let newNode = (patch.newNode instanceof Element)
                    ? render(patch.newNode)
                    : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break;
      case 'ATTRS':
        for (let key in patch.attrs) {
          let value = patch.attrs[key]
          value ? setAttr(node, key, value) : node.removeAttribute(key)
        }
        break;
      default:
        break;
    }
  });
}