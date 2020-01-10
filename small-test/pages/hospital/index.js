
import common from '../../common'
Page({
  data: {
    latitude: null,
    longitude: null,
    searchHos: '',
    hosList: []
  },
  onLoad: function(options) {
    this.GPSsubmit()
  },
  GPSsubmit: function(e) {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        this.getList()
      }
    })
  },
  getList(e) {
    if(e){
      this.setData({
        searchHos: e.detail
      })
    }
    var params= {
      page: '1',
      size: '30',
      type: '0',
      distance: '999999999',
      isopen: '1',
      city: '',
      lat: this.data.latitude,
      lon: this.data.longitude,
      name: this.data.searchHos
    }
    console.log(params)
    try{
      common.req({
        url: 'ylt-v2/whole/hosmap/data/list',
        data: params,
        success: (res)=> {
          console.log(res)
          this.setData({
            hosList: res.data.data.list
          })
        }
      })
    }catch(error){
      console.log(error)
    }
    
  }
})