// pages/index/index.js
var app = getApp()
const config = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
   imgServer:app.globalData.imgPath,
   openid:''
  },
  handleClick() {
    console.log('ffff')
    app.http.postRequest(config.postLogin, {
      code: app.globalData.code,
      app:2,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      };
      if (res.data.code === 'GN00000') {
        var _self = this
        console.log(res)
        app.globalData.login = true
        wx.setStorageSync('token', res.data.data.token)
        wx.showToast({
          title: '登录成功',
          duration: app.globalData.duration
        });
        app.globalData.userId = res.data.data.userId
        app.globalData.sessionKey = res.data.data.userId
        app.globalData.doctorId = res.data.data.doctorId
        var familyId = res.data.data.familyId
        wx.setStorageSync("familyId", familyId)
        setTimeout(function() {
          wx.switchTab({
            url: '../index/index',
          });
        }, 500);
      } else {
        var that=this
        console.log('dddd')
        console.log(res.data.data.openId) 
        that.setData({
          openid: res.data.data.openId
        })
        app.globalData.openId = that.data.openid
        wx.showToast({
          title: '您还不是会员，请前往注册',
          icon: 'none',
          duration: app.globalData.duration
        });
        wx.switchTab({
          url: '../more/index',
        });
      };
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})