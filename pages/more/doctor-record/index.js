// pages/more/doctor-record/index.js
var app = getApp()
const config = require('../../../utils/config.js')
Page({

  data: {
    imgServer: app.globalData.imgPath,
    checked: false,
    previewImageArrs: [
      app.globalData.imgPath +'icon-figure_6.png',
      app.globalData.imgPath +'icon-figure_6.png'
    ],
    previewImageArr: [],
    previewImageArrs_title: [
      app.globalData.imgPath +'icon-figure_6.png',
      app.globalData.imgPath +'icon-figure_6.png'
    ],
    previewImageArr_title: [],
    previewImageArrs_pro: [
      app.globalData.imgPath +'icon-figure_6.png',
      app.globalData.imgPath +'icon-figure_6.png'
    ],
    previewImageArr_pro: [],
    previewImageArrs_identity: [
      app.globalData.imgPath +'icon-archives_3.png',
      app.globalData.imgPath +'icon-archives_4.png'
    ],
    previewImageArr_identity: [],
    previewImageArrs_positive: [
      app.globalData.imgPath +'icon-pro-1.png',
    ],
    previewImageArr_positive: [],
    fileIds:[],
    fileIds_title:[],
    fileIds_pro:[],
    fileIds_positive:[],
    fileIds_identity:[],
    filePath:'',
    filePath_title:'',
    filePath_pro:'',
    filePath_positive:'',
    filePath_identity:''
  },
  formSubmit(){
    if (this.data.checked==false){
      wx.showToast({
        icon:'none',
        title: '请同意《知情通知书》',
      })
      return ;
    }
    app.http.postRequest(config.postCertificateImg, {
      doctorId: app.globalData.doctorId,
      idCardImg: this.data.filePath_identity,
      medicalCertificateImg: this.data.filePath,
      practicingCertificateImg: this.data.filePath_title,
      titleCertificate: this.data.filePath_pro,
      personalPhoto: this.data.filePath_positive
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
  handleAnimalChange({ detail = {} }) {
    this.setData({
      checked: detail.current
    });

    console.log(detail)
  },
  // 身份证
  handleUpload_identity() {
    var self = this;
    if (this.data.previewImageArr_identity.length === 1) {
      wx.showToast({
        title: '最多上传5张图片！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            let filePath = res.tempFilePaths[0];
            wx.uploadFile({
              url: 'http://pico.imwork.net:21372/index/upload',
              filePath: filePath,
              name: 'file_identity',
              success(res) {
                console.log(JSON.parse(res.data))
                let json = JSON.parse(res.data)
                let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
                let filePath = json.data
                console.log(filePath)
                let newfileIds = that.data.fileIds_identity
                let newImgs = that.data.previewImageArr_identity
                newfileIds.push(filePath)
                newImgs.push(img)
                console.log(newImgs)
                that.setData({
                  fileIds_identity: newfileIds,
                  previewImageArr_identity: newImgs,
                  filePath_identity: filePath
                });
              },
              fail(res) {
                wx.showToast({
                  title: '图片上传失败，请稍后重试！',
                  icon: 'none',
                  duration: app.globalData.duration
                })
              }
            })
          } else {
            wx.showToast({
              title: '上传图片大小不能大于5M！',
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
      })
    }
  },
  previewImg_identity: function (e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr_identity
    })
  },
  deleteImage_identity(e) {
    var _self = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var previewImageArrs = _self.data.previewImageArr_identity
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          previewImageArrs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr_identity: previewImageArrs
        });
      }
    })
  },


  // 资格证
  handleUpload() {
    var self = this;
    if (this.data.previewImageArr.length === 8) {
      wx.showToast({
        title: '最多上传5张图片！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            let filePath = res.tempFilePaths[0];
            wx.uploadFile({
              url:'http://pico.imwork.net:21372/index/upload',
              filePath: filePath,
              name: 'file',
              success(res) {
                console.log(JSON.parse(res.data))
                let json = JSON.parse(res.data)
                let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
                let filePath = json.data
                console.log(filePath)
                let newfileIds = that.data.fileIds
                let newImgs = that.data.previewImageArr
                newfileIds.push(filePath)
                newImgs.push(img)
                console.log(newImgs)
                that.setData({
                  fileIds: newfileIds,
                  previewImageArr: newImgs,
                  filePath: filePath
                });
              },
              fail(res) {
                wx.showToast({
                  title: '图片上传失败，请稍后重试！',
                  icon: 'none',
                  duration: app.globalData.duration
                })
              }
            })

          } else {
            wx.showToast({
              title: '上传图片大小不能大于5M！',
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
      })
    }
  },

  previewImg: function(e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr
    })
  },
  deleteImage(e) {
    var _self = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var previewImageArrs = _self.data.previewImageArr
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          previewImageArrs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr: previewImageArrs
        });
      }
    })
  },
  // 执业证
  handleUpload_title() {
    var self = this;
    if (this.data.previewImageArr_title.length === 8) {
      wx.showToast({
        title: '最多上传5张图片！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            let filePath = res.tempFilePaths[0];
            wx.uploadFile({
              url: 'http://pico.imwork.net:21372/index/upload',
              filePath: filePath,
              name: 'file_title',
              success(res) {
                console.log(JSON.parse(res.data))
                let json = JSON.parse(res.data)
                let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
                let filePath = json.data
                console.log(filePath)
                let newfileIds = that.data.fileIds_title
                let newImgs = that.data.previewImageArr_title
                newfileIds.push(filePath)
                newImgs.push(img)
                console.log(newImgs)
                that.setData({
                  fileIds_title: newfileIds,
                  previewImageArr_title: newImgs,
                  filePath_title: filePath
                });
              },
              fail(res) {
                wx.showToast({
                  title: '图片上传失败，请稍后重试！',
                  icon: 'none',
                  duration: app.globalData.duration
                })
              }
            })

          } else {
            wx.showToast({
              title: '上传图片大小不能大于5M！',
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
      })
    }
  },
  previewImg_title: function(e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr_title
    })
  },
  deleteImage_title(e) {
    var _self = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var previewImageArrs = _self.data.previewImageArr_title
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          previewImageArrs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr_title: previewImageArrs
        });
      }
    })
  },
  // 职称证
  handleUpload_pro() {
    var self = this;
    if (this.data.previewImageArr_pro.length === 8) {
      wx.showToast({
        title: '最多上传5张图片！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            let filePath = res.tempFilePaths[0];
            wx.uploadFile({
              url: 'http://pico.imwork.net:21372/index/upload',
              filePath: filePath,
              name: 'file_pro',
              success(res) {
                console.log(JSON.parse(res.data))
                let json = JSON.parse(res.data)
                let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
                let filePath = json.data
                console.log(filePath)
                let newfileIds = that.data.fileIds_pro
                let newImgs = that.data.previewImageArr_pro
                newfileIds.push(filePath)
                newImgs.push(img)
                console.log(newImgs)
                that.setData({
                  fileIds_pro: newfileIds,
                  previewImageArr_pro: newImgs,
                  filePath_pro: filePath
                });
              },
              fail(res) {
                wx.showToast({
                  title: '图片上传失败，请稍后重试！',
                  icon: 'none',
                  duration: app.globalData.duration
                })
              }
            })
          } else {
            wx.showToast({
              title: '上传图片大小不能大于5M！',
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
      })
    }
  },
  previewImg_pro: function(e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr_pro
    })
  },
  deleteImage_pro(e) {
    var _self = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var previewImageArrs = _self.data.previewImageArr_pro
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function(res) {
        if (res.confirm) {
          previewImageArrs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr_pro: previewImageArrs,
        });
      }
    })
  },
  // 正面照
  handleUpload_positive() {
    var self = this;
    if (this.data.previewImageArr_positive.length === 1) {
      wx.showToast({
        title: '最多上传5张图片！',
        icon: 'none',
        duration: app.globalData.duration
      })
    } else {
      let that = this
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilesSize = res.tempFiles[0].size;
          if (tempFilesSize <= 5000000) {
            let filePath = res.tempFilePaths[0];
            wx.uploadFile({
              url: 'http://pico.imwork.net:21372/index/upload',
              filePath: filePath,
              name: 'file_positive',
              success(res) {
                console.log(JSON.parse(res.data))
                let json = JSON.parse(res.data)
                let img = app.globalData.uploadHost + '/health/file/download?filepath=' + json.data
                let filePath = json.data
                console.log(filePath)
                let newfileIds = that.data.fileIds_positive
                let newImgs = that.data.previewImageArr_positive
                newfileIds.push(filePath)
                newImgs.push(img)
                console.log(newImgs)
                that.setData({
                  fileIds_positive: newfileIds,
                  previewImageArr_positive: newImgs,
                  filePath_positive: filePath
                });
              },
              fail(res) {
                wx.showToast({
                  title: '图片上传失败，请稍后重试！',
                  icon: 'none',
                  duration: app.globalData.duration
                })
              }
            })

          } else {
            wx.showToast({
              title: '上传图片大小不能大于5M！',
              icon: 'none',
              duration: app.globalData.duration
            })
          }
        },
      })
    }
  },
  previewImg_positive: function (e) {
    var self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: self.data.previewImageArr_positive
    })
  },
  deleteImage_positive(e) {
    var _self = this
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    var previewImageArrs = _self.data.previewImageArr_positive
    wx.showModal({
      title: '系统提醒',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          previewImageArrs.splice(index, 1);
        } else if (res.cancel) {
          return false;
        }
        _self.setData({
          previewImageArr_positive: previewImageArrs
        });
      }
    })
  },
})