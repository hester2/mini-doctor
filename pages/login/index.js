var app = getApp()
const config = require('../../utils/config.js')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    rulesStatus: false,
    disable: false,
    time: '获取验证码',
    id: '2',
    phone: '',
    smsCode: '',
    userInfo: {
      'gender': '2',
      'nickName': '',
      'avatarUrl': 'https://health-mini-1255700284.cos.ap-chengdu.myqcloud.com/common/icon/commonAvatar.png'
    },
    imgName: app.globalData.imgServer + 'more/icon/person.png',
    imgSex: app.globalData.imgServer + 'common/icon/man-un.png',
    imgSex2: app.globalData.imgServer + 'common/icon/woman.png',
    avatar: app.globalData.imgServer + 'more/icon/avatar.png',
    imgLogo: app.globalData.imgServer + 'common/icon/logo.png',
    imgPhone: app.globalData.imgServer + 'common/icon/phone.png',
    imgMsg: app.globalData.imgServer + 'common/icon/msg.png',
    imgSelected: app.globalData.imgServer + 'common/icon/selected.png',
    imgUnselected: app.globalData.imgServer + 'common/icon/unselected.png'
  },
  // 获取用户输入的昵称
  enterLoginName: function(e) {
    this.setData({
      ['userInfo.nickName']: e.detail.value
    });
  },
  // 获取用户输入的手机号
  enterLoginPhone: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },
  //获取用户的性别
  changeSex: function(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      ['userInfo.gender']: id
    });
    if (id == 1) {
      this.setData({
        imgSex2: app.globalData.imgServer + 'common/icon/woman-un.png',
        imgSex: app.globalData.imgServer + 'common/icon/man.png',
      });
    } else if (id == 2) {
      this.setData({
        imgSex: app.globalData.imgServer + 'common/icon/man-un.png',
        imgSex2: app.globalData.imgServer + 'common/icon/woman.png',
      });
    };
  },
  // 请求验证码
  onClickGetSms: function() {
    if (this.data.phone.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: app.globalData.duration
      });
    } else {
      let that = this
      app.http.postRequest(config.postSms, {
        phone: that.data.phone
      }).then(res => {
        if (res.data.code === 'GN00000') {
          wx.showToast({
            title: '发送成功！',
            duration: app.globalData.duration
          });
          that.setData({
            disable: true
          });
          let currentTime = 59
          let interval = setInterval(function() {
            that.setData({
              time: (currentTime - 1) + " " + '秒'
            });
            currentTime--;
            if (currentTime <= 0) {
              clearInterval(interval)
              that.setData({
                time: '重新获取',
                disable: false
              });
            };
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: app.globalData.duration
          });
        };
      });
    };

  },
  // 获取用户输入的验证码
  enterSmsCode: function(e) {
    this.setData({
      smsCode: e.detail.value
    });
  },
  // 用户注册会员请求
  onClickRegister: function() {
    let userInfo = this.data.userInfo
    if (this.data.phone.length < 11) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: app.globalData.duration
      });
    } else {
      if (this.data.smsCode.length < 6) {
        wx.showToast({
          title: '请输入正确的验证码',
          icon: 'none',
          duration: app.globalData.duration
        });
      } else {
        if (this.data.id == 2) {
          if (wx.showLoading) {
            wx.showLoading({
              title: '注册中...',
              mask: true
            });
          } else {
            wx.showToast({
              title: '注册中...',
              icon: 'loading',
              mask: true,
              duration: 10000
            });
          };
          app.http.postRequest(config.postRegister, {
            openId: app.globalData.openId,
            phone: this.data.phone,
            smsCode: this.data.smsCode,
            sessionKey: app.globalData.sessionKey,
            userInfo: userInfo
          }).then(res => {
            if (wx.hideLoading) {
              wx.hideLoading();
            } else {
              wx.hideToast();
            };
            console.log(res.data)
            if (res.data.code === 'GN00000') {
              app.globalData.login = true
              wx.setStorageSync('token', res.data.data.token)
              wx.showToast({
                title: '注册成功',
                duration: app.globalData.duration
              });
              app.globalData.userId = res.data.data.userId
              setTimeout(function() {
                wx.switchTab({
                  url: '../index/index',
                });
              }, 500);
            } 
            else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: app.globalData.duration
              });
            };
          });
        } else if (this.data.id == 1) {
          wx.showToast({
            title: '请勾选已阅读并同意隐私政策',
            icon: 'none',
            duration: app.globalData.duration
          });
        };
      };
    };
  },
  // 改变选中条款状态
  onClickunSelected: function(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
    });
  },
  onClickUnselect: function(e) {
    this.setData({
      id: e.currentTarget.dataset.id,
    });
  },
  //查看隐私条例
  showRules: function() {
    this.setData({
      rulesStatus: true
    });
  },
  hideRules: function() {
    this.setData({
      rulesStatus: false
    });
  },
  confirmRules: function() {
    this.setData({
      id: '2'
    });
    this.hideRules();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo.nickName) {
      this.setData({
        userInfo: userInfo
      });
    };
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