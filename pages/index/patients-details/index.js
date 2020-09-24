var _self;
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgServer: app.globalData.imgPath,
    currentIndex: 0,
    filterHeight: 600,
    showModal: false,
    answer:[],
    answer_hz:[],
    answer_bl:[],
    answer_cf:[],
    patientIds:''
  },
  /**
 * 弹窗
 */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  onLoad: function (options) {
    console.log(options)
    _self = this
    _self.setData({
      patientIds: options.patientId
    })

    app.http.postRequest(config.getPatientBaseInfo, {
      patientId: options.patientId,
      doctorId: app.globalData.doctorId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
        this.setData({
          answer: res.data.data
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
 
  //swiper切换时会调用
  pagechange: function (e) {
    var that=this
    if (this.data.currentIndex==0){
      app.http.postRequest(config.getPatientBaseInfo, {
        patientId: that.data.patientIds,
        doctorId: app.globalData.doctorId,
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data.data)
          this.setData({
            answer: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    } else if (this.data.currentIndex == 1){
      app.http.postRequest(config.getPatientHealthInfo, {
        patientId: that.data.patientIds,
        doctorId: app.globalData.doctorId,
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data.data)
          this.setData({
            answer_hz: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })


    } else if (this.data.currentIndex == 2) {
      app.http.postRequest(config.getMedicalRecord, {
        patientId: that.data.patientIds,
        userId: app.globalData.userId, 
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data.data)
          this.setData({
            answer_bl: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })


    } else if (this.data.currentIndex == 3) {
      app.http.postRequest(config.getPrescription, {
        patientId: that.data.patientIds,
        userId: app.globalData.userId,
      }).then(res => {
        if (wx.hideLoading) {
          wx.hideLoading();
        } else {
          wx.hideToast();
        }
        if (res.data.code === 'GN00000') {
          console.log(res.data.data)
          this.setData({
            answer_cf: res.data.data
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          })
        }
      })
    }
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 3
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },



  handleClick() {
    wx.navigateTo({
      url: '../cases-details/index',
    })
  },
  handlePresc() {
    wx.navigateTo({
      url: '../prescription-details/index',
    })
  }
})