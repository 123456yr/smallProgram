//index.js
//获取应用实例
var app= getApp()
import common from '../../common'
var loadMoreView;
Page({
  data: {
    selectType: [
      {content: '按姓名查', id: 1},
      {content: '按医院查', id: 2},
      {content: '按科室查', id: 3},
    ],
    activeId: 1,
    searchMsg: '',
    page: 1,
    loadMoreText: '加载更多',
    doctorList: [],
    imgUrl: app.REQ_URL
  },
  onLoad(){
    this.getList()
    this.setData({
      longitude: wx.getStorageSync('longitude'),
      latitude: wx.getStorageSync('latitude')
    })
    loadMoreView= this.selectComponent('#loadMoreView')
    console.log(loadMoreView, '================')
  },
  getList(e){
    if(e){
      this.setData({
        searchMsg: e.detail
      })
    }
    var postData = {
      page: this.data.page, //页面
      size: '10',
      distance: '999999999', //距离
      y: this.data.latitude,
      x: this.data.longitude,
      search: this.data.searchMsg,
    };
    console.log(postData)
    try{
      common.req({
        url: 'ylt-v2/x2/user/doctors',
        data: postData,
        success: (res)=> {
          if(res.data.code === 200){
            var list= res.data.data.list;
            list.forEach(item => {
              if(item.photo.startsWith('mnt')){
                item.photo= app.REQ_URL + item.photo;
              }else if(item.photo.startsWith('files')){
                item.photo= app.FILE_URL + item.photo;
              }
            })
            if(list.length > 0){
              this.setData({
                hasMore: true
              })
            }else{
              this.setData({
                hasMore: false
              })
            }
            if(this.data.page > 1){
              // 如果下拉加载了
              list= this.data.doctorList.concat(list)
              loadMoreView.showThis= false;
            }
            this.setData({
              doctorList: list
            })
          }else{
            loadMoreView.loadingFail()
          }
        }
      })
    }catch(error){
      loadMoreView.loadingFail()
    }
  },
  imgError(e) {
    var index= e.currentTarget.dataset.index;
    var errObj = {};
    errObj["doctorList[" + index + "].photo"] = "http://yjt.sddingkao.com/imgFile/tou.png";
    this.setData(errObj);
  },
  onReachBottom(){
    // 下拉触底执行回调 可以设置距离  在距离内只执行一次
    loadMoreView.getMore()
  },
  loadMoreFn() {
    // 执行加载更多
    console.log('++++++++++++++++++++++++++++++++')
    this.setData({
      page: this.data.page + 1
    })
    this.getList()
  }
})