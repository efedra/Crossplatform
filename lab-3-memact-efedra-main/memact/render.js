import {TEXT_ELEMENT} from './create-element';

export function render(element, container){
  container.append(instantiate(element).dom);
}

function instantiate(element){
  if( typeof element.type === 'function'){
    const publicInstance = new element.type(element.props)
    const childElement = publicInstance.render()
    const childInstance = instantiate(childElement);
    const dom = childInstance.dom;
    return publicInstance._internalInstance = {dom, element, children: [childInstance], component: publicInstance}
  }
  if(element.type == TEXT_ELEMENT){
    const dom = document.createTextNode(element.props.nodeValue)
    return  {dom, element, children: []}
  }
  const dom = document.createElement(element.type);
  Object.entries(element.props).forEach(([key,value]) => {
    dom[domAttribute(key)] =value;
  })

  const children = element.children.map(instantiate)
  dom.append(...children.map(item=> item.dom))
  return {dom, element, children}
}

function domAttribute(propKey){
  return propKey.startsWith("on") ? propKey.toLowerCase(): propKey
}

export function reconcile(parentDom, prevInstance, nextElement) {
  if(prevInstance == null && nextElement == null){
    return null
  }
  if(nextElement == null && prevInstance != null){
    if(prevInstance.component){
      return reconcile(prevInstance.dom.parentElement, prevInstance.children[0], null)
    }
    parentDom.removeChild(prevInstance.dom);
    return null
  }
  if(prevInstance == null && nextElement != null){
    const instance = instantiate(nextElement)
    parentDom.append(instance.dom)
    return instance
  }

  if(prevInstance.element.type !== nextElement.type){
    const nextInstance = instantiate(nextElement)
    parentDom.replaceChild(nextInstance.dom,prevInstance.dom)
    return nextInstance
  }

  const props = prevInstance.element.props
  const newProps = nextElement.props
  const component = prevInstance.component
  if(component === undefined){
    for(let key in props){
      if(props[key] !== newProps[key]){
         props[key] = prevInstance.dom[domAttribute(key)] = newProps[key]
      }
    }
    for(let key in newProps){
      if(props[key]!== newProps[key]){
         props[key] = prevInstance.dom[domAttribute(key)] = newProps[key]
      }
    }
    for(let i=0; i< Math.max(prevInstance.children?.length || 0, nextElement.children?.length || 0); i++){

      const oldChild = prevInstance.children[i]
      const childKey = oldChild?.element.props.key;
      const newChild = childKey === undefined ? nextElement.children[i] : nextElement.children.find(child => child.props.key === childKey)
      prevInstance.children[i] = reconcile(prevInstance.dom, oldChild, newChild)
    }
    prevInstance.children = prevInstance.children?.filter(x=> x) || []
    return  prevInstance
  }
  for( let  key in props){
    if(props[key]!== newProps[key]){
      props[key] = newProps[key]
    }
  }
  for (let key in newProps){
    if(props[key]!== newProps[key]){
      props[key] = newProps[key]
    }
  }

  component.updateInstance()
  return component._internalInstance
}



