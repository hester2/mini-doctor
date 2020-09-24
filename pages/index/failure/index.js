// pages/index/failure/index.js
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    max: 300,
    empNos:''
  },
  limit: function (e) {
    var value = e.detail.value;
    var length = parseInt(value.length);
    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      empNos: options.empNo
    })
  },
  formSubmit(e) {
    var info=e.detail.value
    app.http.postRequest(config.postPrescriptionReCheck, {
      doctorId: app.globalData.doctorId,
      isSuccess: "1",
      content: info.introduction
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
         wx.showToast({
           icon:'none',
           title: '提交成功',
         })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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