// pages/index/patients-edit/index.js
var app = getApp()
const config = require('../../../utils/config.js')
Page({
  data: {
    imgServer: app.globalData.imgPath,
    showModal: false,
    showHide:false,
    tip:[],
    patientIds:''
  },
  onLoad: function (options) {
    this.setData({
      patientIds:options.patientId
    })
    app.http.postRequest(config.getPatientTips, {
      patientId: options.patientId,
      doctorId: app.globalData.doctorId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
         this.setData({
           tip:res.data.data
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
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  handleClick() {
    app.http.postRequest(config.postModPatientTips, {
      patientId: this.data.patientIds,
      doctorId: app.globalData.doctorId,
      tips:this.data.tip
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
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
  // 删除
  handleDelete(){
    this.setData({
      showHide: true
    })
  },
  hideModalCon: function () {
    this.setData({
      showHide: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancelDel: function () {
    this.hideModalCon();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirmDel: function () {
    this.hideModalCon();
  },
})