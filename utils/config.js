/**
 * 小程序配置文件
 */
//线上
const host = 'http://pico.imwork.net:21372'

const config = {
  //注册
  postRegister: host + '/consult/member/postDoctorRegister',
  //登录
  postLogin: host + '/consult/member/postDoctorLogin',
  //获取医护端的我的页
  getDoctorMyPage: host + '/consult/member/getDoctorMyPage',
  //医生查看自己的主页
  getDoctorInfo: host + '/doctor/getDoctorInfo',
  //获取与医生相关的评论（医生主页）（同客户端同名接口）
  getDoctorComment: host + '/comment/getDoctorComment',
  //医生主页获取医生服务
  getDoctorService: host + '/doctor/getDoctorService',
  //医生修改自己的主页内容
  postDoctorInfo: host + '/doctor/postDoctorInfo',
  //获取医护端平台公告
  getYiHaoDoctorNotice: host + '/home/getYiHaoDoctorNotice',
  //获取医护端轮播图
  getDoctorCarousel: host + '/home/getDoctorCarousel',
  //提交执业备案（文字）
  postPracticeRecord: host + '/archive/postPracticeRecord',
  //获取选择器参数（血型、婚育等）
  getSelectorParams: host + '/search/getSelectorParams',
  //提交执业备案证件照片
  postCertificateImg: host + '/archive/postCertificateImg',
  //获取医生的所有问诊会话（医护端消息页）
  getDoctorAllConsult: host + '/consult/getDoctorAllConsult',
  //获取单个问诊的会话明细
  getSingleConsultDetail: host + '/consult/getSingleConsultDetail',

  //获取患者信息（开处方）
  getPrescribingInfo: host + '/archive/getPrescribingInfo',

  //通过类型获取医生的订单列表
  getDoctorOrderByType: host + '/order/getDoctorOrderByType',

  //医生开处方
  postAddPrescription: host + '/archive/postAddPrescription',

  //获取单个处方
  getSinglePrescription: host + '/archive/getSinglePrescription',

  //提交处方复核
  postPrescriptionReCheck: host + '/archive/postPrescriptionReCheck',

  //医生患者列表（可分类查看）
  getDoctorAllPatient: host + '/patient/getDoctorAllPatient',

  //医生查看患者基本信息
  getPatientBaseInfo: host + '/patient/getPatientBaseInfo',

  //医生查看患者健康信息
  getPatientHealthInfo: host + '/patient/getPatientHealthInfo',

  //医生修改患者的标签
  postModPatientTips: host + '/patient/postModPatientTips',

  //获取患者标签
  getPatientTips: host + '/patient/getPatientTips',

  //医生查看病例
  getMedicalRecord: host + '/archive/getMedicalRecord',

  //医生查看处方
  getPrescription: host + '/archive/getPrescription',
}

module.exports = config