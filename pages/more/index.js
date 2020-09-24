var app = getApp()
const config = require('../../utils/config.js')
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    loginStates:'请先登录',
    latitude: '',
    longitude: '',
    sec: 59,
    userInfo: {
      'name': '登录/注册',
      'avatarUrl': app.globalData.imgServer + 'more/icon/avatar.png'
    },
    loginModal: false,
    loginData: {
      'loginDay': 0
    },
    imgWeather: app.globalData.imgServer + 'more/icon/weather.png',
    imgBg: app.globalData.imgServer + 'more/icon/bg.png',
    imgLoad: app.globalData.imgServer + 'more/icon/load.png',
    imgUnload: app.globalData.imgServer + 'more/icon/unload.png',
    imgFollow: app.globalData.imgServer + 'more/icon/follow.png',
    imgRight: app.globalData.imgServer + 'more/icon/right.png',
    imgWallet: app.globalData.imgServer + 'more/icon/wallet.png',
    imgNotification: app.globalData.imgServer + 'more/icon/notification.png',
    imgInvite: app.globalData.imgServer + 'more/icon/invite.png',
    imgHelp: app.globalData.imgServer + 'more/icon/help.png',
    imgAbout: app.globalData.imgServer + 'more/icon/about.png',
    order: [
      {
        'id': 1,
        'img': app.globalData.imgPath+'icon-mores_2.png',
        'title': '待支付'
      }, {
        'id': 2,
        'img': app.globalData.imgPath+'icon-mores_3.png',
        'title': '问诊中'
      }, {
        'id': 3,
        'img': app.globalData.imgPath +'icon-mores_4.png',
        'title': '已完成'
      }, {
        'id': 4,
        'img': app.globalData.imgPath +'icon-mores_5.png',
        'title': '评价/售后'
      }
    ]
  },

  hideModal: function () {
    this.setData({
      loginModal: false
    })
  },
  // 获取用户授权
  getUserInfo(event) {
    let that = this
    const userInfo = event.detail.userInfo
    if (userInfo) {
      wx.setStorage({
        key: "userInfo",
        data: userInfo
      })
    };
    this.hideModal()
    wx.navigateTo({
      url: '../login/index',
    })
  },
  // 点击跳转到个人信息页面
  goToInfoDetail: function () {
    if (app.globalData.login === true) {
      wx.navigateTo({
        url: 'user-info/index',
      })
    } else {
      this.setData({
        loginModal: true
      })
    }
  },
  goNextPage: function () {
    wx.navigateTo({
      url: '../login/index',
    })
  },
  //点击跳转到我的家人页面
  goToFamilydetail: function () {
    wx.navigateTo({
      url: 'family/index',
    })
  },

  // 点击跳转到我的星币页面
  goToWalletdetail: function () {
    wx.navigateTo({
      url: 'wallet/index',
    })
  },
  // 点击跳转到通知提醒页面
  goToNotificationDetail: function () {
    wx.navigateTo({
      url: 'notification/index',
    })
  },
  // 点击跳转到邀请好友页面
  goToInviteDetail: function () {
    wx.navigateTo({
      url: 'invite/index',
    })
  },
  // 点击跳转到反馈与帮助页面
  goToFeedbackDetail: function () {
    wx.navigateTo({
      url: 'feedback/index',
    })
  },
  // 点击跳转到关于页面
  goToAboutDetail: function () {
    wx.navigateTo({
      url: 'about/index',
    })
  },
  // 点击刷新天气信息
  getWeather: function () {
    let that = this
    if (that.data.errMsg === 'getLocation:ok') {
      if (that.data.sec == 59) {
        that.updateWeather()
        let timer = setInterval(function () {
          let newSec = that.data.sec - 1
          that.setData({
            sec: newSec
          })
          if (newSec == 0) {
            clearInterval(timer)
            that.setData({
              sec: 59
            })
          }
        }, 1000);
      } else {
        wx.showToast({
          title: '刷新频繁，请稍后再试！',
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    } else {

    }
  },
  updateWeather: function () {
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    } else {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      });
    };
    let userId = app.globalData.userId
    let longitude = this.data.longitude
    let latitude = this.data.latitude
    app.http.postRequest(config.getDoctorMyPage, {
      userId: userId,
      // latitude: latitude,
      // longitude: longitude
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          weather: res.data.data.weather
        })
        wx.showToast({
          title: '刷新成功',
          icon: 'success',
          duration: app.globalData.duration
        })
      } else {
        wx.showToast({
          title: rea.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })

  },
  handleClick() {
    wx.navigateTo({
      url: 'visits/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this
    wx.login({
      success: res => {
        // console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },
  getPageInfo: function (latitude, longitude) {
    let that = this
    let userId = app.globalData.userId
    if (wx.showLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    } else {
      wx.showToast({
        title: '加载中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      });
    };
    app.http.postRequest(config.getDoctorMyPage, {
      userId: userId,
      // latitude: latitude,
      // longitude: longitude
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res)
        that.setData({
          userInfo: res.data.data.nameCard,
          loginData: res.data.data.loginData,
          weather: res.data.data.weather,
          loginStates: res.data.data.loginState,
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })

  },

  getWeatherLocation: function (login) {
    let that = this
    if (login === true) {
      wx.getLocation({
        type: 'wgs84',
        success(res) {
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            errMsg: res.errMsg
          });
          let latitude = res.latitude
          let longitude = res.longitude
          that.getPageInfo(latitude, longitude)
        },
        fail(res) {
          let errMsg = res.errMsg
          that.getPageInfo(that.data.latitude, that.data.longitude)
        },
      });
    } else {
      that.getPageInfo(that.data.latitude, that.data.longitude)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.login === true) {
      this.getWeatherLocation(app.globalData.login)
    }
  },
  handleChange(e) {
    console.log(e)
    wx.navigateTo({
      url: 'visits/index?userId=' + e.currentTarget.dataset.index,
    })
  },

  handleBsic() {
    wx.navigateTo({
      url: '../message/doctor-home/index'
    })
  },

  handleHealth() {
    wx.navigateTo({
      url: 'doctor-certified/index'
    })
  },
  handleSetup() {
    wx.navigateTo({
      url: 'setup/index'
    })
  },

  handleColle() {
    wx.navigateTo({
      url: 'collectibles/index',
    })
  },
  handleMessage() {
    wx.navigateTo({
      url: 'message/index',
    })
  },
  handleCard() {
    wx.navigateTo({
      url: 'cardVolume/index',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})