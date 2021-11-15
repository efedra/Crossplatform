import { createElement } from '../memact';

test('createElement base', () => {
  expect(
    createElement(
      'div',
      { className: 'test' },
      { type: 'p', props: { className: 'test-p' } }
    )
  ).toEqual({
    type: 'div',
    props: { className: 'test' },
    children: [{ type: 'p', props: { className: 'test-p' } }],
  });
});

test('createElement children array', () => {
  expect(
    createElement('div', {}, [{ type: 'p', props: { className: 'test-p' } }])
  ).toEqual({
    type: 'div',
    props: {},
    children: [{ type: 'p', props: { className: 'test-p' } }],
  });
});

test('createElement no props', () => {
  expect(createElement('div', undefined, [])).toEqual({
    type: 'div',
    props: {},
    children: [],
  });
});

test('createElement no children', () => {
  expect(createElement('div', {})).toEqual({
    type: 'div',
    props: {},
    children: [],
  });
});

test('createElement null child', () => {
  expect(createElement('div', {}, null)).toEqual({
    type: 'div',
    props: {},
    children: [],
  });
});

test('createElement text child', () => {
  expect(createElement('p', {}, 'Test string')).toEqual({
    type: 'p',
    props: {},
    children: [
      {
        type: 'TEXT_ELEMENT',
        props: { nodeValue: 'Test string' },
        children: [],
      },
    ],
  });
});
