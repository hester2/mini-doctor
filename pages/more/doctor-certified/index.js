// pages/more/doctor-certified/index.js
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hospital: ['请选择'],
    hospitalIndex: 0,
    department: ['请选择'],
    departmentIndex: 0,
    tit: [],
    titIndex: 0,
    current: 0,
    max: 300,
    current_on: 0,
    max_on: 300,
    current_to: 0,
    max_to: 300,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self=this
    app.http.postRequest(config.getSelectorParams, {
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        self.setData({
          tit:res.data.data.doctorTitle
        })
        console.log(this.data.tit)

      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  },
  handleSignature() {
    wx.navigateTo({
      url: '../signature/index',
    })
  },
  handleClick() {
  },
  handleChange: function(e) {
    this.setData({
      hospitalIndex: e.detail.value
    });
  },
  handledePartment: function(e) {
    this.setData({
      departmentIndex: e.detail.value
    });
  },
  handledeTitles: function(e) {
    this.setData({
      titIndex: e.detail.value
    });
  },
  limit: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length 
    });
  },

  formSubmit: function(e) {
    wx.navigateTo({
      url: '../doctor-record/index',
    })
    var info = e.detail.value
    app.http.postRequest(config.postPracticeRecord, {
      doctorId: app.globalData.doctorId,
      sectionId: info.sectionId,
      organizationId: info.organizationId,
      name: info.name,
      phone: info.phone,
      referralCode: info.referralCode,
      title: this.data.tit[this.data.titIndex],
      adept: info.adept,
      sign: info.sign,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({})
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