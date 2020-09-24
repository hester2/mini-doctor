// pages/message/index.js
var app = getApp()
const config = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    message: [],
    patientInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    app.http.postRequest(config.getDoctorAllConsult, {
      doctorId: app.globalData.doctorId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          message: res.data.data,
          patientInfo: res.data.data.patientInfo
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
  handleClick(e) {
    console.log(e.currentTarget.dataset.name)
    var answer = e.currentTarget.dataset.name
    console.log(e.currentTarget.dataset.idx)
    var that=this
    wx.navigateTo({
      url: 'chat/index?daId=' + e.currentTarget.dataset.id + '&idx=' + e.currentTarget.dataset.idx,
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