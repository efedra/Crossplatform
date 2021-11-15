export const TEXT_ELEMENT = 'TEXT_ELEMENT';

export function createElement(type, props, ...children) {
   props = props ? props: {}
   children = children.map(item => typeof item === 'string' ?
     createTextElement(item) : item).flat().filter(item => item);

  return {
    type: type,
    props: props,
    children: children
  }
}

 function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

