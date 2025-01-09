/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param path
 * @param params 传递参数
 */
export function reLaunch(path, params = {}) {
  // 拼接参数到 URL
  const fullUrl = generateUrl(path, params);
  wx.reLaunch({
    url: fullUrl
  });
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param path
 */
export function switchTab(path) {
  wx.switchTab({
    url: path
  });
}

/**
 * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
 * @param path
 * @param params
 */
export function redirectTo(path, params = {}) {
  // 拼接参数到 URL
  const fullUrl = generateUrl(path, params);
  wx.redirectTo({
    url: fullUrl
  });
}

/**
 * 保留当前页面，跳转到应用内的某个页面。
 * 但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。
 * 小程序中页面栈最多十层。
 * https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html
 * @param path
 * @param params
 * @param callbackEvents 跳转到目标页面后，目标页面可以通过eventChannel发送通知，此event负责接收
 * @param success 跳转成功后，在此回调内通过回调参数获取eventChannel来发送event到目标页面
 */
export function navigateTo(path, params = {},
                           callbackEvents = {},
                           success = (res) => {
                           }) {
  // 拼接参数到 URL
  const fullUrl = generateUrl(path, params);
  wx.navigateTo({
    url: fullUrl,
    events: callbackEvents,
    success: success
  });
}

/**
 * 关闭当前页面，返回上一页面或多级页面。
 * 可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
export function back(delta = 1) {
  wx.navigateBack({ delta: delta });
}

/**
 * 获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。
 *
 * @returns PageObject[]
 */
export function currentPages() {
  return getCurrentPages();
}

/**
 * 拼接参数到 URL
 * @param path
 * @param params
 * @returns {string|*}
 * 示例： launch.navigateTo("/pages/auth/register/main", {}, {
 *         // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
 *         acceptDataFromOpenedPage: function(data) {
 *           console.log(data);
 *         },
 *         someEvent: function(data) {
 *           console.log(data);
 *         }
 *       }, function(res) {
 *         // 通过eventChannel向被打开页面传送数据
 *         res.eventChannel.emit("loginEvent", { data: "value by event" });
 *       });
 *
 * 目标页面接收示例：
 *    onLoad(options) {
 *     console.log("注册页获取参数：");
 *     //console.log(options.param);
 *     const eventChannel = this.$mp.page.getOpenerEventChannel()
 *     eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
 *     eventChannel.emit('someEvent', {data: 'test'});
 *     // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
 *     eventChannel.on('loginEvent', function(data) {
 *       console.log(data)
 *     })
 *   }
 */
function generateUrl(path, params = {}) {
  const query = Object.keys(params)
    .map(key => `${key}=${encodeURIComponent(params[key])}`)
    .join("&");
  return query ? `${path}?${query}` : path;
}

export default { reLaunch, switchTab, redirectTo, navigateTo, back, currentPages };
