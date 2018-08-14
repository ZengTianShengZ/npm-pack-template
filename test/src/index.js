'use strict';

const test = require('ava');
const pack = require('../../src/index.js');


test('测试1', t => {
  const value = pack.test();
  t.deepEqual(value, {
    name: 'pack'
  });
});

test('测试2', t => {
  const value = pack.testBoolean();
  t.true(value);
});