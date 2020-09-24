var _self;
const app = getApp()
const config = require('../../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    filterHeight: 600,
    order:[]
  },
  onLoad: function (options) {
    _self = this
    _self.setData({
      currentIndex: options.userId
    })
    console.log(_self.data.currentIndex)
    app.http.postRequest(config.getDoctorOrderByType, {
      doctorId: app.globalData.doctorId,
      orderType: _self.data.currentIndex
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data.imgs)
        this.setData({
          order: res.data.data
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
  hanldleMy() {
    wx.navigateTo({
      url: 'my-evaluation/index',
    })
  },
  //swiper切换时会调用
  pagechange: function (e) {
    console.log(e)
    app.http.postRequest(config.getDoctorOrderByType, {
      doctorId: app.globalData.doctorId,
      orderType:e.detail.current
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        console.log(res.data.data.imgs)
        this.setData({
          order: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: app.globalData.duration
        })
      }
    })
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
  hanldeClick() {
    wx.navigateTo({
      url: 'evaluation/index',
    })
  }
})