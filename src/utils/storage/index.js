/**
 * 同步方式保存
 * @param key
 * @param value
 */
export function save(key, value) {
  console.log("同步方式保存", key + "--" + value);
  wx.setStorageSync(key, value);
}

/**
 * 异步保存
 * @param key
 * @param value
 */
export function saveAsync(key, value) {
  wx.setStorage(key, value);
}

/**
 * 获取缓存-同步
 * @param key
 * @returns {*}
 */
export function getLocal(key){
  try {
    return wx.getStorageSync(key);
  } catch (e) {
    return e;
  }
}

/**
 * 移除指定缓存
 * @param key
 */
export function remove(key) {
  if (key) {
    try {
      //异步方式
      wx.removeStorage({ key: key });
    } catch (e) {
      console.log("removeStorageSync", e);
    }
  }
}

/**
 * 移除所有缓存
 */
export function removeAll() {
  try {
    //获取全部本地缓存
    const res = wx.getStorageInfoSync();
    for (const resKey in res.keys) {
      remove(resKey);
    }
    // console.log(res.keys)
    // console.log(res.currentSize)
    // console.log(res.limitSize)
  } catch (e) {
    // Do something when catch error
  }
}

//缓存保存到本地
export default { save, saveAsync, getLocal, remove, removeAll };
