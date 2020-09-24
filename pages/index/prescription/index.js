var app = getApp()
const config = require('../../../utils/config.js')

Page({
  data: {
    imgServer: app.globalData.imgPath,
    showModal: false,
    current: 0,
    max: 300,
    pharmacy: ['普通药品处方', ],
    pharmacyIndex: 0,
    medicine: ['普通药品处方', ],
    medicineIndex: 0,
    num: 1,
    minusStatus: 'disable',
    answer: [],
    values: ''
  },
  onLoad: function(options) {
    this.setData({
      orderId: options.orderId,
      idx: options.idx
    })
    //   
    app.http.postRequest(config.getPrescribingInfo, {
      patientId: this.data.idx,
      doctorId: app.globalData.doctorId,
      orderId: this.data.orderId
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
  /*点击减号*/
  bindMinus: function() {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*点击加号*/
  bindPlus: function() {
    var num = this.data.num;
    num++;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  /*输入框事件*/
  bindManual: function(e) {
    var num = e.detail.value;
    var minusStatus = num > 1 ? 'normal' : 'disable';
    this.setData({
      num: num,
      minusStatus: minusStatus
    })
  },
  bindPickerChange: function(e) {
    console.log(e);
    this.setData({
      pharmacyIndex: e.detail.value
    });
  },
  bindPickerMedicine: function(e) {
    console.log(e);
    this.setData({
      medicineIndex: e.detail.value
    });
  },
  /**
   * 弹窗
   */
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
  },
  limit: function(e) {
    var value = e.detail.value;
    this.setData({
      values: value
    })
    var length = parseInt(value.length);

    if (length > this.data.noteMaxLen) {
      return;
    }

    this.setData({
      current: length
    });
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
  formSubmit(e) {
    console.log(e.detail.value)
    var info = e.detail.value
    app.http.postRequest(config.postAddPrescription, {
      patientId: this.data.idx,
      doctorId: app.globalData.doctorId,
      orderId: this.data.orderId,
      payingWay: info.payingWay,
      diagnose: this.data.values,
      prescriptionType: info.prescriptionType,
      appoint: info.appoint,
      drugList: [{
        'id':0,
        'name': '阿莫西林胶囊',
        'num': '3',
        'specification': '0.5g*24粒',
        'usage': '顶顶顶饭后半小时口服，成人一次一粒，每6~8小时1次'
      }, {
          'id': 1,
          'name': '阿莫西林胶囊',
          'num': '3',
          'specification': '0.5g*24粒',
          'usage': '顶顶顶饭后半小时口服，成人一次一粒，每6~8小时1次'
        }]

    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data)
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    wx.navigateTo({
      url: '../review/index',
    })
  }
})