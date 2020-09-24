// pages/index/patients/index.js
var app = getApp()
const config = require('../../../utils/config.js')
var _self;
Page({
  data: {
    imgServer: app.globalData.imgPath,
    priceOrder: 1,
    priceOrder1: 1,
    priceOrder2: 1,
    menu1Show: false,
    menu1Top: 44,
    showModal: false,
    //被展示的菜单
    showingIndex: 0,
    //第二个选项相关
    cateIndex: 0,
    cateList: ['全部患者'],
    department: '疾病筛选',
    departmentIndex: 0,
    dateValue: "请选择",
    departindex: 0,
    departid: null,
    subdepartindex: 0,
    subdepartid: null,
    sname: '',
    hiddenName: true,
    hide: true,
    hiden: false,
    hiddenHo: false,
    // 省市区
    current: 0,
    province: ['1', '1', '1'],
    city: ['2', '2', '2'],
    region: ['3', '3', '3'],
    town: ['4', '4', '4'],
    areaSelectedStr: '全国',
    maskVisual: 'hidden',
    provinceName: '请选择',
    filterHeight:'',
    patients:[]
  },
  onLoad: function (options) { //加载数据渲染页面
    _self = this
    _self.fetchTestData();
    _self.fetchFilterData();
    // 
    app.http.postRequest(config.getDoctorAllPatient, {
      doctorId: app.globalData.doctorId,
    }).then(res => {
      if (wx.hideLoading) {
        wx.hideLoading();
      } else {
        wx.hideToast();
      }
      if (res.data.code === 'GN00000') {
        this.setData({
          patients:res.data.data
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
  provinceTapped: function (e) {
    // 标识当前点击省份，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // current为1，使得页面向左滑动一页至市级列表
    // provinceIndex是市区数据的标识
    this.setData({
      provinceName: this.data.province[index],
      cityName: '',
      regionName: '',
      townName: '',
      provinceIndex: index,
      cityIndex: -1,
      regionIndex: -1,
      townIndex: -1,
    });
    var that = this;
  },
  cityTapped: function (e) {
    // 标识当前点击县级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // current为1，使得页面向左滑动一页至市级列表
    // cityIndex是市区数据的标识
    this.setData({
      cityIndex: index,
      regionIndex: -1,
      townIndex: -1,
      cityName: this.data.city[index],
      regionName: '',
      townName: '',
    });
    var that = this;

  },
  regionTapped: function (e) {
    // 标识当前点击镇级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // current为1，使得页面向左滑动一页至市级列表
    // regionIndex是县级数据的标识
    this.setData({
      regionIndex: index,
      townIndex: -1,
      regionName: this.data.region[index],
      townName: ''
    });
    var that = this;
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
  },
  townTapped: function (e) {
    // 标识当前点击镇级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // townIndex是镇级数据的标识
    this.setData({
      townIndex: index,
      townName: this.data.town[index]
    });
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName + this.data.townName;
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
    this.cascadeDismiss();
  },
  currentChanged: function (e) {
    // swiper滚动使得current值被动变化，用于高亮标记
    var current = e.detail.current;
    this.setData({
      current: current
    });
  },
  changeCurrent: function (e) {
    // 记录点击的标题所在的区级级别
    var current = e.currentTarget.dataset.current;
    this.setData({
      current: current
    });
  },
  // 搜索
  handleCancle() {
    this.setData({
      hiddenName: true,
      hide: true,
      hiden: false,
      hiddenHo: false,
    })
  },
  handleClick(e) {
    wx.navigateTo({
      url: '../../chat/doctor-home/index?daId=' + e.currentTarget.dataset.id,
    })
  },
  handleChange(e) {
    var name = e.currentTarget.dataset.name.name
    if (name == '图文问诊') {
      wx.navigateTo({
        url: '../../chat/doctor-home/figure-visits/index',
      })
    } else if (name == '电话问诊') {
      wx.navigateTo({
        url: '../../chat/doctor-home/phone-visits/index',
      })
    }
  },
  inputFocus() {
    this.setData({
      hiddenName: false,
      hide: false,
      hiden: true,
      hiddenHo: true,
    })
  },
  searchNow() {
    this.setData({
      hiddenName: true,
      hide: true,
      hiden: false,
      hiddenHo: false,
    })
  },
  clearKey: function () {
    console.log('fff')
    this.setData({
      hiddenName: true
    })
    this.setData({
      searchClose: false,
      searchKey: ""
    });
  },

  fetchFilterData: function () { //获取筛选条件
    this.setData({
      filterdata: {
        "depart": [{
          "id": 20,
          "name": "内科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        },
        {
          "id": 21,
          "name": "外科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        },
        {
          "id": 22,
          "name": "妇产科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        },
        {
          "id": 23,
          "name": "儿科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        },
        {
          "id": 24,
          "name": "皮肤科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        },
        {
          "id": 25,
          "name": "耳鼻喉科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        },
        {
          "id": 26,
          "name": "眼科",
          "zone": [{
            "id": 0,
            "name": "不限"
          },
          {
            "id": 1,
            "name": "胸外科"
          },
          {
            "id": 2,
            "name": "心血管外科"
          },
          {
            "id": 3,
            "name": "普外科"
          },
          {
            "id": 4,
            "name": "肝胆外科"
          },
          {
            "id": 5,
            "name": "血管外科"
          },
          {
            "id": 6,
            "name": "乳腺外科"
          },
          ]
        }
        ]
      }
    })
  },
  fetchTestData: function () { //获取科室列表
    let _this = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
  },
  setdepartIndex: function (e) { //科室一级索引
    const d = this.data;
    console.log(e)
    const dataset = e.currentTarget.dataset;
    this.setData({
      departindex: dataset.departindex,
      departid: dataset.departid,
      department: dataset.name,
      subdepartindex: d.departindex == dataset.departindex ? d.subdepartindex : 0
    })
    console.log('所在地区：一级id__' + this.data.departid + ',二级id__' + this.data.subdepartid);
  },
  setSubdepartIndex: function (e) { //科室二级索引
    console.log(e)
    const dataset = e.currentTarget.dataset;
    this.setData({
      subdepartindex: dataset.subdepartindex,
      subdepartid: dataset.subdepartid,
      sname: dataset.name,
    })
    console.log('所在地区：一级id__' + this.data.departid + ',二级id__' + this.data.subdepartid);
  },
  goback: function () {
    wx.navigateBack({});
  },
  changeOrder: function (e) {
    var tapIndex = e.target.dataset.itemid;
    this.setData({
      orderIndex: tapIndex
    });
    this.setData({
      showingIndex: 0
    });
    this.getList();
  },
  showOptions0: function () {
    if (this.data.priceOrder == 1) {
      this.setData({
        priceOrder: 2
      });
    } else {
      this.setData({
        priceOrder: 1
      });
    }
    if (this.data.showingIndex != 0) {
      this.setData({
        showingIndex: 0
      });
      return;
    }
    this.setData({
      showingIndex: 3
    });
  },
  showOptions1: function () {
    if (this.data.priceOrder1 == 1) {
      this.setData({
        priceOrder1: 2
      });
    } else {
      this.setData({
        priceOrder1: 1
      });
    }
    if (this.data.showingIndex != 0) {
      this.setData({
        showingIndex: 0
      });
      return;
    }
    this.setData({
      showingIndex: 1
    });
  },

  showOptions2: function () {
    
  },

  changeCate: function (e) {
    var tapIndex = e.target.dataset.itemid;
    this.setData({
      cateIndex: tapIndex
    });
    this.getList();
  },
  onReady: function () {
    _self = this;
    wx.getSystemInfo({
      success: function (res) {
        var windowHeight = res.windowHeight;
        //获取头部标题高度
        wx.createSelectorQuery().select('#yh-filter-header').fields({
          size: true,
        }, function (res) {
          //计算得出滚动区域的高度
          var sHeight = (windowHeight - res.height) - 50;
          _self.setData({
            filterHeight: sHeight + 'px'
          });
          console.log(sHeight+'111')
        }).exec();
      }
    });
  },

  //提交条件
  formsubmit: function (e) {
    wx.showModal({
      title: '请观察控制台',
      content: '条件以表单形式提交 ^_^'
    });
    _self.setData({
      showingIndex: 0
    });
    this.getList();
    console.log(e)
  },
  //重置表单
  formReset: function () {
    this.getList();
    _self.setData({
      genderIndex: 0
    })
    console.log(_self.data.genderIndex)
  },


  //条件更新后执行统一函数（如重新读取数据等）
  getList: function () {
    console.log("orderIndex : " + this.data.orderIndex);
    console.log("cateIndex : " + this.data.cateIndex);
    console.log("priceOrder : " + this.data.priceOrder);
    console.log('条件更新后执行统一函数（如重新读取数据等）');
  },
  closeAll: function () {
    this.setData({
      showingIndex: 0
    });
  },
  nomove: function () { },
  showDate1: function () {
    this.setData({
      show1: true
    });
  },
  // 弹框
  handleDel() {
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
  handleEdit(e){
    wx.navigateTo({
      url: '../patients-edit/index?patientId=' +e.currentTarget.dataset.id,
    })
  },
  handleDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '../patients-details/index?patientId=' + e.currentTarget.dataset.id,
    })
  }
})