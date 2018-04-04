import CancellablePromise  from '../utils/cancellable-promise.js'


describe('CancellablePromise', () => {
  it('cancel a promise', () => {
    const promise = new Promise((accept, reject) => {
      setTimeout(() => {
        accept(1)
      }, 1000)
    })
    const cancellable = new CancellablePromise(promise)
    cancellable.cancel()
    return cancellable.promise.catch(({isCanceled}) => {
      expect(isCanceled).toBe(true)
    })
  })
  it('cancel a promise', () => {
    const promise = new Promise((accept, reject) => {
      setTimeout(() => {
        accept(1)
      }, 1000)
    })
    const cancellable = new CancellablePromise(promise)
    return cancellable.promise.then((value) => {
      expect(value).toBe(1)
    })
  })

  it('cancel a promise', () => {
    const promise = new Promise((accept, reject) => {
      setTimeout(() => {
        reject(1)
      }, 1000)
    })
    const cancellable = new CancellablePromise(promise)
    cancellable.cancel()
    return cancellable.promise.catch(({isCanceled}) => {
      expect(isCanceled).toBe(true)
    })
  })
})