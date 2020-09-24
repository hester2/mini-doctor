// pages/chat/index.js
var _self;
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    imgs: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4084155909,4089166316&fm=26&gp=0.jpg',
    filterHeight: 600,
    isHide: false,
    visible2: false,
    tempFilePaths: [],
    orderId:0,
    idx:0,
    doctor:[]
  },
  handlePatients() {
    wx.navigateTo({
      url: 'visits/index',
    })
  },
  handleHome(){
    wx.navigateTo({
      url: '../doctor-home/index',
    })
  },
  handlePre(){
    wx.navigateTo({
      url: '../../index/prescription/index?orderId=' + this.data.orderId+'&idx='+this.data.idx,
    })
  },
  handleUpload() {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认最多9张图片，可自行更改
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePath
        })
      }
    })
  },
  handleMera() {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认最多9张图片，可自行更改
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePath = res.tempFilePaths;
        that.setData({
          tempFilePaths: tempFilePath
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.idx)
    this.setData({
      orderId: options.daId,
      idx: options.idx,
    })
    app.http.postRequest(config.getSingleConsultDetail, {
      userId: app.globalData.userId,
      orderId: this.data.orderId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          doctor: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
  console.log(options)
  },
  handleDetail(){
   wx.navigateTo({
     url: 'user-detail/index',
   })
  },
  handleOut() {
    this.setData({
      visible2: true
    });
  },
  handleClose2() {
    this.setData({
      visible2: false
    });
  },
  scroll(e) {
    console.log(e)
    this.setData({
      isHide: false
    })
  },
  handleHide() {
    this.setData({
      isHide: false
    })
  },
  previewImage: function (e) {
    console.log(e.target.dataset.src)
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [this.data.imgs] // 需要预览的图片http链接列表  
    })
  },
  handleChange() {
    this.setData({
      isHide: !this.data.isHide
    })
  },
  onReady: function () {
    _self = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#grace-filter-header').fields({
          size: true,
        }, function (res) {
          //计算得出滚动区域的高度
          var sHeight = (windowHeight - res.height);
          _self.setData({
            filterHeight: sHeight + 'px'
          });
          console.log(_self.data.filterHeight)
        }).exec();
      }
    });
  },
  handleClick() {
    uni.navigateBack({
      delta: 1
    })
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