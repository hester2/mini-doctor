// pages/edit/index.js
var app = getApp()
const config = require('../../../../utils/config.js')
import WeCropper from '../../../../common/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 100;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    hospital: ['请选择'],
    hospitalIndex: 0,
    current: 0,
    max: 300,
    current_on: 0,
    max_on: 300,
    current_to: 0,
    max_to: 300,
    showModal: false,
    xx: false,
    hide: true,
    cropperOpt: {
      id: 'cropper',
      width: width, // 画布宽度
      height: height, // 画布高度
      scale: 2.5, // 最大缩放倍数
      zoom: 8, // 缩放系数
      cut: {
        x: (width - 250) / 2, 
        y: (height * 0.5 - 250 * 0.5), // 裁剪框y轴期起点
        width: 250, // 裁剪框宽度
        height: 250 // 裁剪框高度
      }
    },

    img: app.globalData.imgPath +'icon-archives_1.png', //确定裁剪后的图片
  },
  handleChange: function(e) {
    this.setData({
      hospitalIndex: e.detail.value
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
  limit1: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current_on: length
    });
  },
  limit2: function(e) {
    var value = e.detail.value;
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current_to: length
    });
  },
  formSubmit: function(e) {
    console.log(e.detail.value)
    var info=e.detail.value
    app.http.postRequest(config.postDoctorInfo, {
      doctorId: app.globalData.doctorId,
      avatar:this.data.img,
      name: info.nickname,
      section: info.section,
      title: info.title,
      adept: info.adept,
      intro: info.intro,
      talking: info.talking,
      organizationName: info.organizationName
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
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
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
  },

  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },

  handleUploadTap() {
    const self = this
    self.setData({
      showModal: false,
    })
    wx.chooseImage({
      count: 1, // 默认9
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res.tempFilePaths[0])
        self.setData({
          cutImage: 'show',
          addtribeConShow: 'hide',
          xx: true,
          hide: false
        })
        // debugger

        self.wecropper.pushOrign(res.tempFilePaths[0]);
      }
    })
  },

  getCropperImage() {
    let that = this;
    wx.showToast({
      title: '上传中',
      icon: 'loading',
      duration: 20000
    })
    that.setData({
      upload: false,
      showModal: false,
      hide: true
    })
    // debugger
    // 如果有需要两层画布处理模糊，实际画的是放大的那个画布

    that.wecropper.getCropperImage((src) => {
      console.log(src)
      if (src) {
        //此处添加用户确定裁剪后执行的操作 src是截取到的图片路径
        that.setData({
          xx: false,
          img: src,
        })
      }
    })
  
},

/**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    var that = this
    const {
      cropperOpt
    } = this.data
    new WeCropper(cropperOpt)
      .on('ready', (ctx) => { })
      .on('beforeImageLoad', (ctx) => {
        console.log(`before picture loaded, i can do something`)
        console.log(`current canvas context:`, ctx)
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        console.log(`picture loaded`)
        console.log(`current canvas context:`, ctx)
        wx.hideToast()
      })
      .on('beforeDraw', (ctx, instance) => {
        console.log(`before canvas draw,i can do something`)
        console.log(`current canvas context:`, ctx)
      })
      .updateCanvas();
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