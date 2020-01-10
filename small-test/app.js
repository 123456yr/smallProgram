//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: 'true',
      success: (res) => {
        wx.setStorage({
          key: 'longitude',
          data: res.longitude,
        });
        wx.setStorage({
          key: 'latitude',
          data: res.latitude,
        });
      }
    })
  },

  globalData: {
    userInfo: null
  },
  REQ_URL: 'https://yjt.sddingkao.com/',
  FILE_URL: 'http://dk.sdmda.org.cn/',
})