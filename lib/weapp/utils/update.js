let updateManager;

export function handleUpdateMiniProgram() {
  updateManager = uni.getUpdateManager();

  updateManager.onCheckForUpdate(onCheckForUpdate);
}

function onCheckForUpdate(res) {
  // 请求完新版本信息的回调
  if (res.hasUpdate) {
    updateManager.onUpdateReady(onUpdateReady);
    updateManager.onUpdateFailed(onUpdateFailed);
  }
}

function onUpdateReady() {
  uni.showModal({
    title: "更新提示",
    content: "新版本已经准备好，是否重启应用？",
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate();
      }
    },
  });
}

function onUpdateFailed() {
  uni.showModal({
    title: "提示",
    content: "新版本下载失败，请删除小程序，重新搜索",
  });
}
