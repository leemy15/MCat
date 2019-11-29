import cinemaBodyView from '../views/cinemaBody.art'
import cinemaMainView from '../views/cinemaList.art'
import cinemaModel from '../models/cinemaModel'
import AreaModel from '../models/AreaModels'
import cinemaHeader from '../views/cinemaHeader.art'
import cinemaPikeCityViews from '../views/cinemaPikeCity.art'
import cinemaPickCityListViews from '../views/cinemaPickCityList.art'
import cinemaPikeBrandLiViews from '../views/cinemaPikeBrandLi.art'
import cinemaPickAreaLiViews from '../views/cinemaPickAreaLi.art'
import cinemaPickServiceViews from '../views/cinemaPickService.art'
const BScroll = require('better-scroll')

class cinemaPosition {
    constructor() {
      //this.render()
      this.cinemaList = []
      this.cinemaNo = 0;
      this.cityFont1;
      this.cityId;
      this.nowday;
      this.limingyu=0
    }
  
    renderer(cinemaList) {
      let cinemaMainHTML = cinemaMainView({
        cinemaList
      })
      $('main ul').html(cinemaMainHTML)

      let $mianHeight=$('main').height()
      if($('.cinmaUl').height()<$('main').height())
      {
        $('.cinmaUl').height($mianHeight)
        
      }
      else
      {
        $('.cinmaUl').height(100+'%')
      }


    }
  
    bindClick() {
      //设置hash值
      location.hash = $(this).attr('data-to')
      // console.log(city);
    }
    bindTap2() {
      //把影院列表详情的哈希值和点击他的Id结合成一个，设置hash值
        let nowhash=$(this).attr('data-to')
       let willhash=$(this).attr('data-id')
       location.hash=nowhash+'/'+willhash
    }
    search(){
      location.hash='search'
    }

   async special(){
    console.log(window.special);
  

      this.bScroll.scrollTo(0, -40)
      let that=this
      //console.log(1);
      $('.clickBrand').css('display','none').removeClass('disa')
      $('.clickList').css('display','none').removeClass('disa')
      $('.clickspecial').toggle().toggleClass('disa')
      if( $('.clickspecial').hasClass('disa'))
      {
        $('main').css('overflow','hidden')
        this.bScroll.disable()
      }
      else{
        $('main').css('overflow','scroll')
        this.bScroll.enable()
      }
      let cityId=this.cityId
      let AreaResult = await AreaModel.get({
       cityId
      })

     let serviceResult=AreaResult.service.subItems
     let specialResult=AreaResult.hallType.subItems

      let cinemaPickServiceHtml = cinemaPickServiceViews({
        serviceResult,
        specialResult
      })
       let $clickspecial = $('.clickspecial')
       $clickspecial.html(cinemaPickServiceHtml)
      
       if(window.special!=-1){
        let qqq=~~window.special
        for(let i=0;i<$('.specialContentLi').length;i++)
        {
            if($('.specialContentLi').eq(i).attr('data-id')==qqq)
            {
              $('.specialContentLi').eq(i).addClass('specialContentLiNow')
            }
        }
      }
      else{
           $('.specialContentLi').eq(0).addClass('specialContentLiNow')
      }

      if(window.ting!=-1){
        let yyy=~~window.ting
        for(let i=0;i<$('.tingContent').length;i++)
        {
            if($('.tingContent').eq(i).attr('data-id')==yyy)
            {
              $('.tingContent').eq(i).addClass('specialContentLiNow')
            }
        }
      }
      else{
        $('.tingContent').eq(0).addClass('specialContentLiNow')
       }


      $('.specialContentLi').on('tap',function(){
        window.special=$(this).attr('data-id')
        $(this).addClass('specialContentLiNow').siblings().removeClass('specialContentLiNow')
      })

      $('.tingContent').on('tap',function(){
        window.ting=$(this).attr('data-id')
        $(this).addClass('specialContentLiNow').siblings().removeClass('specialContentLiNow')
      })

      $('.clickspecialQue').on('tap',async function(){
          let special=window.special
          let ting=window.ting
          let nowday=that.nowday
          let cityId=that.cityId
          let pickTownNowId=window.pickTownNowId
          let pickBrandNowId=window.pickBrandNowId
          let pickTownLiId=window.pickTownLiId
          let lineId1= window.lineId
          let stationId1=window.stationId
          let cinemaResult = await cinemaModel.get({
            cinemaNo:0,
            cityId,
            nowday,
            pickTownNowId,
            pickTownLiId,
            pickBrandNowId,
            lineId1,
            stationId1,
            special,
            ting
          })
          let cinemaList  = cinemaResult.cinemas
          that.renderer(cinemaList)

          that.bScroll.enable()
          $('.clickspecial').removeClass('disa')
          $('.cinemaDetailTo').on('tap',that.bindTap2)
      })

      $('.clickspecialChong').on('tap',async function(){
        window.special=-1
        window.ting=-1
        $('.tingContent').eq(0).addClass('specialContentLiNow').siblings().removeClass('specialContentLiNow')
        $('.specialContentLi').eq(0).addClass('specialContentLiNow').siblings().removeClass('specialContentLiNow')

      })
    }




   async allCity(){
    // let $pikeCity=$('.pikeCity')


    // let bScroll = new BScroll.default($pikeCity.get(0), {
  
    // })



      this.bScroll.scrollTo(0, -40)
       let that=this
       $('.clickBrand').css('display','none').removeClass('disa')
      $('.clickspecial').css('display','none').removeClass('disa')
       $('.clickList').toggle().toggleClass('disa')
      
      if( $('.clickList').hasClass('disa'))
      {
        $('main').css('overflow','hidden')
        this.bScroll.disable()
      }
      else{
        $('main').css('overflow','scroll')
        this.bScroll.enable()
      }


       let cityId=this.cityId
       let AreaResult = await AreaModel.get({
        cityId
       })
       let PickCity = AreaResult.district.subItems;
      
      
       let cinemaPikeCityHtml = cinemaPikeCityViews({
       })
        let $pikeCity = $('.pikeCity')
        $pikeCity.html(cinemaPikeCityHtml)
        
        let cinemaPickAreaLiHtml = cinemaPickAreaLiViews({
          PickCity
        })
         let $pickAreaUl = $('.pickAreaUl')
         $pickAreaUl.html(cinemaPickAreaLiHtml)
        $('.pickAreaLi').eq(0).addClass('pickAreaLiNow')
        $('.shangqu').on('tap',async function(){
        $(this).addClass('pikeCityHeaderNow').siblings().removeClass('pikeCityHeaderNow')
        
      
        let PickCity = AreaResult.district.subItems;
         let cinemaPickAreaLiHtml = cinemaPickAreaLiViews({
           PickCity
         })
          let $pickAreaUl = $('.pickAreaUl')
          $pickAreaUl.html(cinemaPickAreaLiHtml)

          $('.pickAreaLi').on('tap',function(){
            $(this).addClass('pickAreaLiNow').siblings().removeClass('pickAreaLiNow')
            let pickAreaLiClick=$(this).index()
            let PickCityList=PickCity[pickAreaLiClick].subItems
            
            let cinemaPickCityListHtml = cinemaPickCityListViews({
              PickCityList
            })
            let $pickTownUl = $('.pickTownUl')
            $pickTownUl.html(cinemaPickCityListHtml)
            window.lineId=$(this).attr('data-id')
            // $('.diqu').eq(0).addClass('pickTownNow')
            // $('.dui').eq(0).html('√')
            $('.diqu').on('tap',async function(){
              
              $(this).addClass('pickTownNow').siblings().removeClass('pickTownNow')
              $('.dui').each(function(){
                $('.dui').html('')
              })
              $(this).children().eq(0).html('√')
              window.stationId=$(this).attr('data-id')
              let nowday=that.nowday
              let cityId=that.cityId
              let pickBrandNowId=window.pickBrandNowId
              let pickTownNowId=window.pickTownNowId
              let pickTownLiId=window.pickTownLiId
              let special=window.special
              let ting=window.ting
              let lineId1= -1
              let stationId1=-1
  
              let cinemaResult = await cinemaModel.get({
                cinemaNo:0,
                cityId,
                nowday,
                pickBrandNowId,
                lineId1,
                stationId1,
                special,
                ting
              })
              
              let cinemaList  = cinemaResult.cinemas
              //console.log(cinemaList);
              
              that.renderer(cinemaList)
              that.bScroll.enable()
              $('.clickList').removeClass('disa')
              let $pickTownLi=$(this).children().eq(1).html()
     
              $('.quancheng').html($pickTownLi)
              $('.cinemaDetailTo').on('tap',that.bindTap2)
             })
           })


       })


       $('.ditie').on('tap',function(){ 
       
         let PickCity=AreaResult.subway.subItems;
         //let pickAreaLiClick=$(this).index()
      //   //let PickCityList=PickCity[pickAreaLiClick].subItems
         let cinemaPickAreaLiHtml = cinemaPickAreaLiViews({
           PickCity
         })
          let $pickAreaUl = $('.pickAreaUl')
          $pickAreaUl.html(cinemaPickAreaLiHtml)
          $(this).addClass('pikeCityHeaderNow').siblings().removeClass('pikeCityHeaderNow')


         //console.log(PickCity);
         $('.pickAreaLi').on('tap',function(){
          $(this).addClass('pickAreaLiNow').siblings().removeClass('pickAreaLiNow')
          let pickAreaLiClick=$(this).index()
          let PickCityList=PickCity[pickAreaLiClick].subItems
          
          let cinemaPickCityListHtml = cinemaPickCityListViews({
            PickCityList
          })
          let $pickTownUl = $('.pickTownUl')
          $pickTownUl.html(cinemaPickCityListHtml)
          window.lineId=$(this).attr('data-id')
          // $('.diqu').eq(0).addClass('pickTownNow')
          // $('.dui').eq(0).html('√')
          $('.diqu').on('tap',async function(){
            
            $(this).addClass('pickTownNow').siblings().removeClass('pickTownNow')
            $('.dui').each(function(){
              $('.dui').html('')
            })
            $(this).children().eq(0).html('√')
            window.stationId=$(this).attr('data-id')
            let nowday=that.nowday
            let cityId=that.cityId
            let pickBrandNowId=window.pickBrandNowId
            window.pickTownNowId=-1
            window.pickTownLiId=-1
            let special=window.special
            let ting=window.ting
            let lineId1= window.lineId
            let stationId1=window.stationId

            let cinemaResult = await cinemaModel.get({
              cinemaNo:0,
              cityId,
              nowday,
              pickBrandNowId,
              lineId1,
              stationId1,
              special,
              ting
            })
            
            let cinemaList  = cinemaResult.cinemas
            //console.log(cinemaList);
            
            that.renderer(cinemaList)
            that.bScroll.enable()
            $('.clickList').removeClass('disa')
            let $pickTownLi=$(this).children().eq(1).html()
   
            $('.quancheng').html($pickTownLi)
            $('.cinemaDetailTo').on('tap',that.bindTap2)
           })
         })
         $('.pickAreaUl').children().eq(0).on('tap',async function(){
             //cinemaListController.render()
             window.lineId=-1;
             window.stationId=-1
             let lineId1= window.lineId
             let stationId1=window.stationId
             let nowday=that.nowday
             let cityId=that.cityId
             let pickBrandNowId=window.pickBrandNowId
             let special=window.special
             let ting=window.ting
             let cinemaResult = await cinemaModel.get({
              cinemaNo:0,
              cityId,
              nowday,
              pickBrandNowId,
              lineId1,
              stationId1,
              special,
              ting
            })
            let cinemaList  = cinemaResult.cinemas
            that.renderer(cinemaList)
            that.bScroll.enable()
            $('.clickList').removeClass('disa')
            let $allCityFont=$(this).html()
            $('.quancheng').html($allCityFont)
            $('.cinemaDetailTo').on('tap',that.bindTap2)
         })
       })


        $('.pickAreaLi').on('tap',function(){
        $(this).addClass('pickAreaLiNow').siblings().removeClass('pickAreaLiNow')
        let pickAreaLiClick=$(this).index()
        let PickCityList=PickCity[pickAreaLiClick].subItems
        
        let cinemaPickCityListHtml = cinemaPickCityListViews({
          PickCityList
        })
        let $pickTownUl = $('.pickTownUl')
        $pickTownUl.html(cinemaPickCityListHtml)
        let $pickTownLiId=window.pickTownLiId=$(this).attr('data-id')
        $('.diqu').eq(0).addClass('pickTownNow')
        $('.dui').eq(0).html('√')

        $('.diqu').on('tap',async function(){
          
          $(this).addClass('pickTownNow').siblings().removeClass('pickTownNow')
          $('.dui').each(function(){
            $('.dui').html('')
          })
          $(this).children().eq(0).html('√')
          window.pickTownNowId=$(this).attr('data-id')
          let special=window.special
          let ting=window.ting
          let nowday=that.nowday
          let cityId=that.cityId
          let pickBrandNowId=window.pickBrandNowId
          let pickTownNowId=window.pickTownNowId
          let pickTownLiId=window.pickTownLiId
          window.lineId1=-1
          window.stationId1=-1
          let cinemaResult = await cinemaModel.get({
            cinemaNo:0,
            cityId,
            nowday,
            pickTownNowId,
            pickTownLiId,
            pickBrandNowId,
            special,
            ting
          })
          
          let cinemaList =cinemaResult.cinemas
          that.cinemaList=[]
          that.renderer(cinemaList)

          that.bScroll.enable()
          $('.clickList').removeClass('disa')
          let $pickTownLi=$(this).children().eq(1).html()
 
          $('.quancheng').html($pickTownLi)
          $('.cinemaDetailTo').on('tap',that.bindTap2)
         })
         $('.pickAreaUl').children().eq(0).on('tap',async function(){
          window.lineId=-1;
          window.stationId=-1
          let lineId1= window.lineId
          let stationId1=window.stationId
          let nowday=that.nowday
          let cityId=that.cityId
          let pickBrandNowId=window.pickBrandNowId
          let special=window.special
          let ting=window.ting
          let cinemaResult = await cinemaModel.get({
           cinemaNo:0,
           cityId,
           nowday,
           pickBrandNowId,
           lineId1,
           stationId1,
           special,
           ting
         })
         let cinemaList  = cinemaResult.cinemas
         that.renderer(cinemaList)
         that.bScroll.enable()
         $('.clickList').removeClass('disa')
         let $allCityFont=$(this).html()
         $('.quancheng').html($allCityFont)
         $('.cinemaDetailTo').on('tap',that.bindTap2)
         })
       })


       $('.pickAreaUl').children().eq(0).on('tap',async function(){
        window.lineId=-1;
        window.stationId=-1
        let lineId1= window.lineId
        let stationId1=window.stationId
        let nowday=that.nowday
        let cityId=that.cityId
        let pickBrandNowId=window.pickBrandNowId
        let special=window.special
        let ting=window.ting
        let cinemaResult = await cinemaModel.get({
         cinemaNo:0,
         cityId,
         nowday,
         pickBrandNowId,
         lineId1,
         stationId1,
         special,
         ting
       })
       let cinemaList  = cinemaResult.cinemas
       that.renderer(cinemaList)
       that.bScroll.enable()
       $('.clickList').removeClass('disa')
       let $allCityFont=$(this).html()
       $('.quancheng').html($allCityFont)
       $('.cinemaDetailTo').on('tap',that.bindTap2)
       })





    }

   async allBrand(){
      this.bScroll.scrollTo(0, -40)
      let that=this
      //console.log(1);
      $('.clickspecial').css('display','none').removeClass('disa')
      $('.clickList').css('display','none').removeClass('disa')
      $('.clickBrand').toggle().toggleClass('disa')
      if( $('.clickBrand').hasClass('disa'))
      {
        $('main').css('overflow','hidden')
        this.bScroll.disable()
      }
      else{
        $('main').css('overflow','scroll')
        this.bScroll.enable()
      }
      let cityId=that.cityId
      let AreaResult = await AreaModel.get({
        cityId
       })
       let PickCity = AreaResult.brand.subItems;
       //console.log(PickCity);
       
      let cinemaPikeBrandLiHtml = cinemaPikeBrandLiViews({
        PickCity
      })
       let $pikeBrandUl = $('.pikeBrandUl')
       $pikeBrandUl.html(cinemaPikeBrandLiHtml)
       $('.pikeBrandLi').eq(0).addClass('pikeBrandLiNow').children().eq(0).html('√')
       $('.pikeBrandLi').on('tap',async function(){
        
        $(this).addClass('pikeBrandLiNow').siblings().removeClass('pikeBrandLiNow')
        $('.dui').each(function(){
          $('.dui').html('')
        })
        $(this).children().eq(0).html('√')

        window.pickBrandNowId=$(this).attr('data-id')
          let special=window.special
          let ting=window.ting
          let nowday=that.nowday
          let cityId=that.cityId
          let pickTownNowId=window.pickTownNowId
          let pickBrandNowId=window.pickBrandNowId
          let pickTownLiId=window.pickTownLiId
          let lineId1= window.lineId
          let stationId1=window.stationId
          let cinemaResult = await cinemaModel.get({
            cinemaNo:0,
            cityId,
            nowday,
            pickTownNowId,
            pickTownLiId,
            pickBrandNowId,
            lineId1,
            stationId1,
            special,
            ting
          })
          let cinemaList  = cinemaResult.cinemas
          that.renderer(cinemaList)

          that.bScroll.enable()
          $('.clickBrand').removeClass('disa')
          let $pickTownLi=$(this).children().eq(1).html()
          $('.zonghe').html($pickTownLi)
          $('.cinemaDetailTo').on('tap',that.bindTap2)
 
       })

     

    }



    async render() {
      
      let that = this
      //获取当前时间传参给Models层
      var myDate = new Date;
      var year = myDate.getFullYear();
      var mon = myDate.getMonth() + 1;
      var date = myDate.getDate(); 
      var nowday=this.nowday=year+'-'+mon+'-'+date
    //console.log(nowday);
    
      window.pickTownNowId=-1
      window.pickTownLiId=-1
      window.pickBrandNowId=-1
      window.lineId= -1
      window.stationId=-1
      window.special=-1
      window.ting=-1
      //获取城市列表里传来的cityId

      let cityId =this.cityId =localStorage.getItem('cityId')
      let cityFont1=this.cityFont1=localStorage.getItem('cityFont')

      if(cityId)
      {
        
      }
      else
      {
        cityId=this.cityId=1
        cityFont1=this.cityFont1='北京'
      }
      //let cityId=window.cityId;
      //传参给Models层，获取接口上的数据
      let cinemaResult = await cinemaModel.get({
        cinemaNo:0,
        cityId,
        nowday
      })
      
      //渲染main header页面
      let cinemapositionHtml = cinemaBodyView({
      })
      let $main = $('main')
      $main.html(cinemapositionHtml)
      let $header=$('header')
      let cinemaHeaderHtml=cinemaHeader({})
      $header.html(cinemaHeaderHtml)
      let cinemaList = this.cinemaList = cinemaResult.cinemas
      //console.log(cinemaList);
      this.renderer(cinemaList)
      $('header').css('display','block')
      $('footer').css('display','block')
      //判断默认的city是否有值，用来改变渲染上面头部信息里HTML的值
     
      $('.nowcity').html(cityFont1)
      //console.log(window.city);
      
      //点击上面的城市按钮触发定义好的bindClick事件，设置hash值跳转页面
      $('header #headerList .activeCity .nowcity').on('click', this.bindClick)
      //点击电影院列表设置hash值，跳转到影院详情界面
      $('.cinemaDetailTo').on('tap',this.bindTap2)

      let $imgHead = $('.head img')
      let $imgFoot = $('.foot img')
  
      // bScroll 是BetterScroll实例，将来可以用来调用API
      let bScroll = new BScroll.default($main.get(0), {
  
      })
      this.bScroll=bScroll;
      
      // if($('main').height()>$('ul').height())
      // {
      //   $('ul').height($('main').height()+80)
      // }
      // else{
      //   $('ul').height( $('ul').height())
      // }


      let $mianHeight=$('main').height()
      //console.log($('.cinmaUl').height(),$('main').height(),$('.cinmaUl').height()<=$('main').height());
      
      // if($('.cinmaUl').height()<$('main').height())
      // {
      //   $('.cinmaUl').height($mianHeight)
      // }
      // 开始要隐藏下拉刷新的div
      //console.log($('.cinmaUl').height());
      
      bScroll.scrollBy(0, -40)
      bScroll.on('scrollEnd', async function () {
        //上拉刷新时
        let pickTownNowId=window.pickTownNowId
        let pickTownLiId=window.pickTownLiId
        let pickBrandNowId=window.pickBrandNowId
        let lineId1= window.lineId
        let stationId1=window.stationId
        let special=window.special
        let ting=window.ting
        // let nowday=that.nowday
        // let cityId=that.cityId
        if (this.y >= 0) {
          $imgHead.attr('src', '/assets/images/ajax-loader.gif')
          let cinemaResult = await cinemaModel.get({
            cinemaNo:0,
            nowday:that.nowday,
            cityId:that.cityId,
            pickTownNowId,
            pickTownLiId,
            pickBrandNowId,
            lineId1,
            stationId1,
            special,
            ting
          })
          // console.log(cinemaResult);
  
          let cinemaList=cinemaResult.cinemas;
          //console.log(cinemaList);
          
          // that.cinemaList = [...that.cinemaList, ...cinemaList]
          that.renderer(cinemaList)
          if($('.cinmaUl').height()<=$('main').height())
          {
            $('.cinmaUl').height($mianHeight)
          }
          bScroll.scrollBy(0, -40)
          $imgHead.attr('src', '/assets/images/arrow.png')
          $imgHead.removeClass('up')
          $('.cinemaDetailTo').on('tap',that.bindTap2)
     
        }
       //下拉加载时
        if (this.maxScrollY>= this.y) {
          {
           
            let pickTownNowId=window.pickTownNowId
            let pickTownLiId=window.pickTownLiId
            let pickBrandNowId=window.pickBrandNowId
            let lineId1= window.lineId
            let stationId1=window.stationId  
            let special=window.special
            let ting=window.ting
           // console.log(pickTownNowId,pickTownLiId,pickBrandNowId,lineId1,stationId1);
            
            $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
            if(special!=-1||ting!=-1||pickTownNowId!=-1||pickTownLiId!=-1||pickBrandNowId!=-1||lineId1!=-1||stationId1!=-1)
            {
              console.log(1);
              that.cinemaNo+=20;
              if(that.limingyu==0)
              { 
                console.log(2);
                that.cinemaNo=0;
                that.cinemaList=[]
              }
              that.limingyu++
            }
            else{
              console.log(3);
              that.limingyu=0
              that.cinemaNo+=20;
            }
            //console.log(that.cinemaNo);
            //请求更多的影院列表数据
            let cinemaResult = await cinemaModel.get({
                cinemaNo:that.cinemaNo,
                nowday:that.nowday,
                cityId:that.cityId,
                pickTownNowId,
                pickTownLiId,
                pickBrandNowId,
                lineId1,
                stationId1,
                special,
                ting
            })
             
            //把老数据和新的数据拼接成一个数据，渲染到页面上
            let cinemaList  = cinemaResult.cinemas;
            console.log(cinemaList);
            console.log(that.cinemaList);
            
            that.cinemaList = [...that.cinemaList, ...cinemaList]
            console.log(that.cinemaList);
            that.renderer(that.cinemaList)
            if($('.cinmaUl').height()<=$('main').height())
            {
              $('.cinmaUl').height($mianHeight)
            }
            bScroll.scrollBy(0, 40)
            $imgFoot.attr('src', '/assets/images/arrow.png')
            $imgFoot.removeClass('down')
            $('.cinemaDetailTo').on('tap',that.bindTap2)
          }
        }
      })
  
      bScroll.on('scroll', function () {
        if (this.y > 0) {
          $imgHead.addClass('up')
        }
        if (this.maxScrollY > this.y) {
          $imgFoot.addClass('down')
        }
      })

        $('.allCityFont').on('tap',this.allCity.bind(this))
        $('.comprehensive').on('tap',this.allBrand.bind(this))
        $('.characteristic').on('tap',this.special.bind(this))
        $('.search').on('tap',this.search)
        
    }
  }
  export default new cinemaPosition()