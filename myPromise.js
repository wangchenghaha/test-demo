
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor (executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve 和 reject 方法
    executor(this.resolve, this.reject)
  }
  // 储存状态的变量，初始值是pending
  status = PENDING
  // 成功之后的值
  value = null
  // 失败之后的原因
  reason = null
  // 存储成功回调的数组
  onFulfilledCallbacks = []
  // 存储失败回调的数组
  onRejectedCallbacks = []
  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if(this.status === PENDING){
      // 修改为成功的状态
      this.status = FULFILLED
      // 保存成功之后的值
      this.value = value
      // this.onFulfilledCallback && this.onFulfilledCallbacks(value)
      while(this.onFulfilledCallbacks.length){
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  }
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态的修改
    if(this.status === PENDING){
      // 修改为失败的状态
      this.status = REJECTED
      // 保存失败后的原因
      this.reason = reason
      // this.onRejectedCallback && this.onRejectedCallback(reason)
      while(this.onRejectedCallbacks.length){
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  // then的实现
  then (onFulfilled, onRejected) {
    // 判断状态
    if(this.status === FULFILLED){
      // 调用成功的回调
      onFulfilled(this.value)
    } else if (this.status === REJECTED) {
      // 调用失败的回调
      onRejected(this.reason)
    } else if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(onFulfilled)
      this.onRejectedCallbacks.push(onRejected)
    }
  }
}

module.exports = MyPromise