Component({
    properties: {
        searchMsg: {
            type: String,
            default: ''
        }
    },
    methods: {
        getList(e) {
            console.log('================')
            this.triggerEvent('getList', e.detail.value)
        }
    }
    
})