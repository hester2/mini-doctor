// pages/message/doctor-home/index.js
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    starIndex4: 4,
    starIndext: 4,
    isFold: true,
    showModalStatus: false,
    animationData: '',
    login: true,
    doctor: [],
    doctorInfo: [],
    organization: [],
    common: [],
    total: '',
    service:[]
  },
  handleEdit(){
wx.navigateTo({
  url: 'edit/index',
})
  },
  handleTu() {
    this.setData({
      login: true
    });
  },
  handlePh() {
    this.setData({
      login: false
    });
  },
  showAll: function (e) {
    this.setData({
      isFold: !this.data.isFold,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.http.postRequest(config.getDoctorInfo, {
      userId: app.globalData.userId,
      doctorId: app.globalData.doctorId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          doctor: res.data.data.doctor,
          doctorInfo: res.data.data.doctorInfo,
          organization: res.data.data.organization,
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getDoctorComment, {
      userId: app.globalData.userId,
      doctorId: app.globalData.doctorId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data)
        this.setData({
          common: res.data.data.comments,
          total: res.data.data.total
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    // 开通服务
    app.http.postRequest(config.getDoctorService, {
      doctorId: app.globalData.doctorId
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data)
        this.setData({
          service:res.data.data
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