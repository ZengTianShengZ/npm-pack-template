### 工程构建命令

```
npm install     // install 依赖包
npm run test    // 自动化测试
npm run nyc     // 测试覆盖率
npm run report  // 生成测试报告
npm run pack    // 打包工程

```

### AVA 做自动化测试

####

```
test([title], implementation)                     基本测试
test.serial([title], implementation)              串行运行测试
test.cb([title], implementation)                  回调函数形式
test.only([title], implementation)                运行指定的测试
test.skip([title], implementation)                跳过测试
test.todo(title)                                  备忘测试
test.failing([title], implementation)             失败的测试
test.before([title], implementation)              钩子函数，这个会在所有测试前运行
test.after([title], implementation)               钩子函数，这个会在所有测试之后运行
test.beforeEach([title], implementation)          钩子函数，这个会在每个测试之前运行
test.afterEach([title], implementation)           钩子函数，这个会在每个测试之后运行
test.after.always([title], implementation)        钩子函数，这个会在所有测试之后运行，不管之前的测试是否失败
test.afterEach.always([title], implementation)    钩子函数，这个会在每个测试之后运行，不管之前的测试是否失败
```

####  内置断言

```
.pass([message])                                  测试通过
.fail([message])                                  断言失败
.truthy(value, [message])                         断言 value 是否是真值
.falsy(value, [message])                          断言 value 是否是假值
.true(value, [message])                           断言 value 是否是 true
.false(value, [message])                          断言 value 是否是 false
.is(value, expected, [message])                   断言 value 是否和 expected 相等
.not(value, expected, [message])                  断言 value 是否和 expected 不等
.deepEqual(value, expected, [message])            断言 value 是否和 expected 深度相等
.notDeepEqual(value, expected, [message])         断言 value 是否和 expected 深度不等
.throws(function|promise, [error, [message]])     断言 function 抛出一个异常，或者 promise reject 一个错误
.notThrows(function|promise, [message])           断言 function 没有抛出一个异常，或者 promise resolve
.regex(contents, regex, [message])                断言 contents 匹配 regex
.notRegex(contents, regex, [message])             断言 contents 不匹配 regex
.ifError(error, [message])                        断言 error 是假值
.snapshot(expected, [message])                    将预期值与先前记录的快照进行比较
.snapshot(expected, [options], [message])         将预期值与先前记录的快照进行比较
```