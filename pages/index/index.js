//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/config.js')
var QQMapWX = require('../../utils/qqmap-wx-jssdk');
var qqmapsdk;
Page({
  data: {
    imgServer: app.globalData.imgPath,
    province: '',
    city: '',
    district: '',
    list: [
      'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2852083094,372235004&fm=26&gp=0.jpg',
      'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3595140452,1077552905&fm=26&gp=0.jpg',
      'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg'
    ],
    title_j:[
     {
       'id':0,
        'title':'伊好-互联网医院平台，正式上线啦。'
     },
     {
       'id': 1,
       'title': '伊医院平台，正式上线啦。'
     }
    ],
    order: [
      {
        'id': 1,
        'img': app.globalData.imgPath+'icon-searchs_8.png',
        'title': '待支付'
      }, {
        'id': 2,
        'img': app.globalData.imgPath +'icon-searchs_9.png',
        'title': '问诊中'
      }, {
        'id': 3,
        'img': app.globalData.imgPath +'icon-searchs_10.png',
        'title': '已完成'
      }, {
        'id': 4,
        'img': app.globalData.imgPath +'icon-searchs_11.png',
        'title': '评价/售后'
      }
    ],
    indicatorDots: false,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    hiddenName: true,
    hiddenNamet: false,
    hide: true,
    hiden: false
  },
  handleClick() {
    wx.navigateTo({
      url: 'visits/index',
    })
  },
  handleAll(){
    wx.navigateTo({
      url: 'visits/index?userId=' + 0,
    })
  },
  handleChange(e) {
    console.log(e)
    wx.navigateTo({
      url: 'visits/index?userId=' + e.currentTarget.dataset.index,
    })
  },
  handlePre(){
    // wx.navigateTo({
    //   url: 'prescription/index',
    // })
  },
  handleCancle() {
    this.setData({
      hiddenName: true,
      hiddenNamet: false,
      hide: true,
      hiden: false
    })
  },
  inputFocus() {
    this.setData({
      hiddenName: false,
      hiddenNamet: true,
      hide: false,
      hiden: true
    })
  },

  clearKey: function() {
    console.log('fff')
    this.setData({
      hiddenName: true
    })
    this.setData({
      searchClose: false,
      searchKey: ""
    });
  },
  onLoad: function() {
    qqmapsdk = new QQMapWX({
      key: 'Z2GBZ-6SQ3V-BNTPZ-UYHGV-DAXPQ-ZGBFO' //这里自己的key秘钥进行填充
    });
    app.http.postRequest(config.getYiHaoDoctorNotice, {
      code: app.globalData.code
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          title_j: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
    app.http.postRequest(config.getDoctorCarousel, {
      code: app.globalData.code
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data.imgs)
        this.setData({
          list: res.data.data.imgs
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
  handleClick(){
    wx.navigateTo({
      url: 'patients/index',
    })
  },
  handleHome(){
    wx.navigateTo({
      url: '../message/doctor-home/index',
    })
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        // console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        // console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        // console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        let district = res.result.ad_info.district
        vm.setData({
          province: province,
          city: city,
          district: district,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        // console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  }

})