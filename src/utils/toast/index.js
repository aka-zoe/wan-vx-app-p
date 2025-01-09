function toast(title, icon = "none", mask = true, duration = 1500) {
  wx.showToast({
    title: title,
    icon: icon,
    mask: mask,
    duration: duration
  });
}

function loading(content) {
  let msg = "加载中...";
  if (content) {
    msg = content;
  }
  wx.showLoading({
    title: msg,
    mask: true
  });
}

function dismiss() {
  wx.hideLoading();
}

export default { toast, loading, dismiss };
