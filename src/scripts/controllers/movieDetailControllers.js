import movieDetailView from '../views/movieDetail.art'
import movieDetailModel from '../models/movieDetailModels'
import movieDetailHeader from '../views/movieDetailHeader.art'
import cinemaModel from '../models/cinemaModel'
import cinemaMainView from '../views/cinemaList.art'
const BScroll = require('better-scroll')

class cinemaPosition {
    constructor() {
      this.cityId;
      this.nowday;
      this.cinemaList;
      this.cinemaNo=0;
    }

    renderer(cinemaList) {
      let cinemaMainHTML = cinemaMainView({
        cinemaList
      })
      $('.cinmaUl').html(cinemaMainHTML)
    }
    bindTap() {
      //let nowhash=$(this).attr('data-to')
      //location.hash=nowhash
      window.history.go(-1)
    }
    bindTap1(){
      let movieDetailMessage=$(this).attr('data-to')
      location.hash=movieDetailMessage+'/'+window.movieId
    }
    bindTap2() {
      //把影院列表详情的哈希值和点击他的Id结合成一个，设置hash值
        let nowhash=$(this).attr('data-to')
       let willhash=$(this).attr('data-id')
       console.log(1);
       location.hash=nowhash+'/'+willhash
    }
    async render() {
      let that=this;
      let hash=location.hash.substr(1)
      let reg = new RegExp('^(\\w+)(\\/\\w+)','g')
      let path= reg.exec(hash)[2]
      let movieId=path.substr(1)
      window.movieId=movieId

      let movieresult = await movieDetailModel.get({
        movieId
      })
      
      let movieDetailViewHtml=movieDetailView({
        movieresult
      })
      console.log(movieresult);
      
      let $main = $('main')
      $main.html(movieDetailViewHtml)
      let $header=$('header')
      let movieDetailHeaderHtml=movieDetailHeader({})
      $header.html(movieDetailHeaderHtml)
      $('footer').css('display','none')
      $('.detailListHeader').html(movieresult.detailMovie.nm)

      $('.backspace').on('tap',this.bindTap)
      $('.quckaryFont').on('tap',this.bindTap1)
      $('header').css('display','block')
      $('footer').css('display','block')



      var myDate = new Date;
      var year = myDate.getFullYear();
      var mon = myDate.getMonth() + 1;
      var date = myDate.getDate(); 
      var nowday=this.nowday=year+'-'+mon+'-'+date
      window.pickTownNowId=-1
      window.pickTownLiId=-1
      window.pickBrandNowId=-1
      window.lineId= -1
      window.stationId=-1
      window.special=-1
      window.ting=-1
      //获取城市列表里传来的cityId

      let cityId =this.cityId =localStorage.getItem('cityId')
      if(cityId)
      {
        
      }
      else
      {
        cityId=this.cityId=1
      }
      //let cityId=window.cityId;
      //传参给Models层，获取接口上的数据
      let cinemaResult = await cinemaModel.get({
        cinemaNo:0,
        cityId,
        nowday
      })
      console.log(cinemaResult);
      let cinemaList = this.cinemaList = cinemaResult.cinemas
      this.renderer(cinemaList)


      let bScroll = new BScroll.default($main.get(0), {
  
      })


      bScroll.on('scrollEnd', async function () {
        //上拉刷新时
        if (this.y >= 0) {
          let cinemaResult = await cinemaModel.get({
            cinemaNo:0,
            cityId:that.cityId,
            nowday:that.nowday
          })
          // console.log(cinemaResult);
  
          let cinemaList=cinemaResult.cinemas;
          //console.log(cinemaList);
          
          // that.cinemaList = [...that.cinemaList, ...cinemaList]
          that.renderer(cinemaList)
          $('.cinemaDetailTo').on('tap',that.bindTap2)
        }

        if (this.maxScrollY>= this.y) {
          {
          that.cinemaNo+=20;
          
          let cinemaResult = await cinemaModel.get({
            cinemaNo:that.cinemaNo,
            cityId:that.cityId,
            nowday:that.nowday
          })
          console.log(cinemaResult);
          
          let cinemaList  = cinemaResult.cinemas;
          that.cinemaList = [...that.cinemaList, ...cinemaList]
         // console.log(that.cinemaList);
          that.renderer(that.cinemaList)
          $('.cinemaDetailTo').on('tap',that.bindTap2)
        }

        }
      })
      
      
      $('.cinemaDetailTo').on('tap',this.bindTap2)
    }
  }
  export default new cinemaPosition()