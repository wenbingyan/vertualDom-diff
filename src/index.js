import { createElement, render, renderDom } from './element'
import diff from './diff'
import {patch} from './patch'

let vertualDom1 = createElement('ul', {class: 'list'}, [
  createElement('li', {class: 'item'}, ['a']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('li', {class: 'item'}, ['c'])
])
let vertualDom2 = createElement('ul', {class: 'list-group'}, [
  createElement('li', {class: 'item'}, ['1']),
  createElement('li', {class: 'item'}, ['b']),
  createElement('div', {class: 'item'}, ['3'])
])

let ele = render(vertualDom1)
renderDom(ele, window.root)
// 先序深度优先遍历
let patches = diff(vertualDom1, vertualDom2)
console.log(patches)
patch(ele, patches)




