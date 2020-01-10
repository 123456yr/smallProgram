Component({
    properties: {
        hasMore: {
            type: Boolean,
            value: true,
            required: true
        },
        loadingText: {
            type: String,
            value: '加载中...'
        },
        finishText: {
            type: String,
            value: '没有更多了'
        },
        failText: {
            type: String,
            value: '加载失败，请重试'
        }
    },
    data: {
        showIcon: true,
        showThis: false,
        text: ''
    },
    methods: {
        getMore(){
            this.setData({
                showThis: true
            })
            if(this.properties.hasMore){
                this.setData({
                    text: this.properties.loadingText
                })
                this.triggerEvent('loadMoreFn')
            }else{
                this.setData({
                    text: this.properties.finishText
                })
            }
        },
        loadingFail() {
            // 加载失败
            this.setData({
                text: this.properties.failText
            })
        },
    },
    
})