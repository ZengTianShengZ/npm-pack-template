'use strict'
const test = require('ava')
const pack = require('../../dis/index.js')


test('测试1', t => {
  const value = pack.test()
  t.deepEqual(value, {
    name: 'pack'
  })
})

test('测试2', async t => {
  const value = pack.testBoolean()
  t.true(value)
})