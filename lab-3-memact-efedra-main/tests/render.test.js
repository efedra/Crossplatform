import { reconcile, render } from '../memact/render';

test('render base', () => {
  const dom = document.createElement('div');
  dom.id = 'app-container';

  const memactElement = {
    type: 'p',
    props: { className: 'test-classname' },
    children: [
      {
        type: 'TEXT_ELEMENT',
        props: { nodeValue: 'Test string' },
        children: [],
      },
    ],
  };

  render(memactElement, dom);

  const renderedElement = dom.querySelector('p');

  expect(renderedElement).toEqual(expect.anything());
  expect(renderedElement.className).toBe('test-classname');
  expect(renderedElement.textContent).toBe('Test string');
});

test('reconcile null both', () => {
  const dom = document.createElement('div');
  expect(reconcile(dom, null, null)).toBe(null);
});

test('reconcile null prev', () => {
  const testElement = {
    type: 'p',
    props: {},
    children: [
      {
        type: 'TEXT_ELEMENT',
        props: { nodeValue: 'Test string 2' },
        children: [],
      },
    ],
  };

  const dom = document.createElement('div');

  reconcile(dom, null, testElement);

  const newElement = dom.querySelector('p');

  expect(newElement?.textContent).toBe('Test string 2');
});

test('reconcile null next', () => {
  const parentDom = document.createElement('div');
  const childDom = document.createElement('p');
  childDom.textContent = 'Test string';
  parentDom.appendChild(childDom);

  const instance = { dom: childDom };

  reconcile(parentDom, instance, null);

  expect(parentDom.hasChildNodes()).toBe(false);
});

test('reconcile diff types', () => {
  const parentDom = document.createElement('div');
  const childDom = document.createElement('p');
  childDom.textContent = 'Nothing here';
  parentDom.appendChild(childDom);

  const instance = {
    dom: childDom,
    element: {
      type: 'p',
      props: {},
      children: [
        {
          type: 'TEXT_ELEMENT',
          props: { nodeValue: 'Nothing here' },
          children: [],
        },
      ],
    },
  };

  const nextElement = {
    type: 'input',
    props: { placeholder: 'Type value here...' },
    children: [],
  };

  reconcile(parentDom, instance, nextElement);

  const inputChildElements = parentDom.getElementsByTagName('input');

  expect(parentDom.childElementCount).toBe(1);
  expect(inputChildElements.length).toBe(1);
});

test('reconcile update props', () => {
  const parentDom = document.createElement('div');
  const instanceDom = document.createElement('p');
  instanceDom.className = 'class';
  parentDom.appendChild(instanceDom);

  const instance = {
    element: {
      type: 'p',
      props: { className: 'class' },
      children: [],
    },
    dom: instanceDom,
    childInstances: [],
  };

  const element = {
    type: 'p',
    props: { className: 'new-class' },
    children: [],
  };

  reconcile(parentDom, instance, element);

  expect(instanceDom.className).toBe('new-class');
  expect(instance.element).toEqual(element);
});
