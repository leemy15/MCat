import cityListView from '../views/cityList.art'
import cityListModel from '../models/cityListModel'
const BScroll = require('better-scroll')

class cityList{
    constructor() {
        this.hotList={}
    }

    bindClick() {
        //点击设置哈希值，跳转回详情页面
       // location.hash = $(this).attr('data-to')
        if($(this).hasClass("qq"))
        {
           
            let cityFont123=$(this).html()
            let cityId123=$(this).attr('data-cityid')
            //console.log(window.cityId);
            localStorage.setItem('cityId',cityId123)
            localStorage.setItem('cityFont',cityFont123)
        }
        window.history.go(-1)
      }

   async render(){
       
        let cityListResult = await cityListModel.get({
            
        })
        let cityListList=cityListResult.cts
        this.hotList=cityListList.slice(0,10);
        let arrFont=[];
        //console.log(cityListList);
        //切城市数据
        cityListList.forEach(item=>{
            let num=item.py.substr(0,1).charCodeAt()-97;
            //console.log(arrFont[num]);
        if(!arrFont[num]){
            arrFont[num]={};
            arrFont[num].city=[];
            arrFont[num].code=String.fromCharCode(item.py.substr(0,1).charCodeAt()-32);
        };
        arrFont[num].city.push(item);
        })
        //console.log(arrFont);

        let cityListHtml = cityListView({
            hotList:this.hotList,
            cityListList,
            arrFont,
        })
        let $main = $('main')
        $main.html(cityListHtml)
        new BScroll.default($main.get(0), { 
        })

        $('.hotCity').on('tap', this.bindClick)
        $('.allCity').on('tap', this.bindClick)
        $('header').css('display','none')
        $('footer').css('display','none')
    }
}

export default new cityList