import cinemaDetailHeaderView from '../views/cinemaDetailHeader.art'
import cinemaDetailMainView from '../views/cinemaDetailMain.art'
import cinemaDetailModel from '../models/cinemaDetailModels.js'
import cinemaDetailListView from '../views/cinemaDetailList.art'
import cinemaPlayDetailView from '../views/cinemaPlayDetail.art'
const BScroll = require('better-scroll')

class CinemaDetail{
    constructor() {
    }
    bindTap() {
        // let nowhash=$(this).attr('data-to')
        //  location.hash=nowhash 
        window.history.go(-1)
      }
      timebindClick(){
        let num=$(this).index()
        $(this).addClass('activeList').siblings().removeClass('activeList')
        let movieList=window.cinemaDetailresult.showData.movies[window.movieIndex].shows[num].plist
        let cinemaPlayDetailHtml=cinemaPlayDetailView({
          movieList,
       })
       let $ListUl=$('.ListUl')
       $ListUl.html(cinemaPlayDetailHtml)
       $('.no-seat').css('display','none')
       if(movieList.length==0)
        {
          $('.no-seat').css('display','flex')
        }
        else{
          $('.no-seat').css('display','none')
        }
    }

   async render(){
        let that=this;
        //分解hash值，获取到对应电影院ID值
        let hash=location.hash.substr(1)
        let reg = new RegExp('^(\\w+)(\\/\\w+)','g')
        let path= reg.exec(hash)[2]
        let cinemaDetailId=path.substr(1)
        
        //传参获取数据
        let cinemaDetailresult = await cinemaDetailModel.get({
            cinemaDetailId
        })
        //console.log(cinemaDetailresult);
        //把数据定义到全局变量中去，以便于其他地方有用到
         window.cinemaDetailresult=cinemaDetailresult
         //分解数据

         //电影院的基本数据
         let cinemaDetailresultMovie=cinemaDetailresult.showData.movies
         
         
         //单人餐
         if(cinemaDetailresult.dealList.divideDealList[1]!=undefined)
         {
         var one=cinemaDetailresult.dealList.divideDealList[1].dealList
         }
         else{
          var one=null
         }
         //双人餐
         if(cinemaDetailresult.dealList.divideDealList[0]!=undefined)
         {
         var two=cinemaDetailresult.dealList.divideDealList[0].dealList
         }
         else{
          var two=null
         }
         let cinemaDetailHtml = cinemaDetailMainView({
            cinemaDetailresultMovie,
            one,
            two
        })

        let $main = $('main')
        $main.html(cinemaDetailHtml)
        let $header=$('header')
        let cinemaDetailHeaderHtml=cinemaDetailHeaderView({})
        
        $header.html(cinemaDetailHeaderHtml)
         $('header').css('display','block')
         $('footer').css('display','block')
         let vipIfon=cinemaDetailresult.showData.vipInfo
         let dayTime=cinemaDetailresult.showData.movies[0].shows
         let movieList=cinemaDetailresult.showData.movies[0].shows[0].plist
          console.log(movieList);
          
         //时间和UL框页面
         let cinemaDetailListHtml=cinemaDetailListView({
            vipIfon,
            dayTime,
         })
         //播放电影列表页面，这样写的目的是便于渲染里面的数据，只让里面的List重新渲染即可
         let cinemaPlayDetailHtml=cinemaPlayDetailView({
            movieList,
         })
         let $playList = $('.playList')
         $playList.html(cinemaDetailListHtml)
         let $ListUl=$('.ListUl')
         $ListUl.html(cinemaPlayDetailHtml)
        //初始化页面的基本数据，让他们的默认值为第一个swiper的数据
         $('.name').html(cinemaDetailresultMovie[0].nm)
         $('.pinfen').html(cinemaDetailresultMovie[0].sc+'分')
         $('#cinemaDetailmoviePage').html(cinemaDetailresultMovie[0].desc)
         $('.detailListHeader1').html(cinemaDetailresult.showData.cinemaName)
         $('.cinemaNa').html(cinemaDetailresult.cinemaData.nm)
         $('.cinemaAd').html(cinemaDetailresult.cinemaData.addr)
         //编辑一下背景图片数据，使后续操作更简单点
         let zhezhaoimg="url('"+cinemaDetailresultMovie[0].img.replace(/w\.h/,"148.208")+"')"
         $('.zhezhao').css('background-image',zhezhaoimg)
         let bScroll = new BScroll.default($main.get(0), {
  
          })
         //swiper
         var swiper = new Swiper('.swiper-container', {
           //一个页面显示的个数
            slidesPerView: 3,
          //间隔
            spaceBetween: 20,
          //在中间
            centeredSlides: true,
          //可以点击
            slideToClickedSlide: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            on: {
                //滑动结束后触发的事件
                slideChangeTransitionEnd: function(){
                    //获得滑动结束后当前目标的索引值
                    let index=this.activeIndex
                    //把索引值定义到全局变量上，以至于后面点击事件更方便的去获取
                     window.movieIndex=index
                     //根据这个索引，把对应swiper的那一条数据渲染到每个页面上
                    $('.name').html(cinemaDetailresultMovie[index].nm)
                    $('.pinfen').html(cinemaDetailresultMovie[index].sc+'分')
                    $('#cinemaDetailmoviePage').html(cinemaDetailresultMovie[index].desc)
                    let zhezhaoimg="url('"+cinemaDetailresultMovie[index].img.replace(/w\.h/,"148.208")+"')"
                    $('.zhezhao').css('background-image',zhezhaoimg)
                    let dayTime=cinemaDetailresult.showData.movies[index].shows
                    let movieList=cinemaDetailresult.showData.movies[index].shows[0].plist
                    //console.log(dayTime);
                    
                    let cinemaDetailListHtml=cinemaDetailListView({
                        vipIfon,
                        dayTime,
                    })
                    let cinemaPlayDetailHtml=cinemaPlayDetailView({
                        movieList,
                     })

                     console.log(movieList);
                     console.log(movieList.length==0);
                     
                     let $playList = $('.playList')
                     $playList.html(cinemaDetailListHtml)
            
                     let $ListUl=$('.ListUl')
                     $ListUl.html(cinemaPlayDetailHtml)
                     $('.no-seat').css('display','none')
                     if(movieList.length==0)
                      {
                        $('.no-seat').css('display','flex')
                      }
                      else{
                        $('.no-seat').css('display','none')
                      }
                     //当滑动swiper的时候要渲染初始值给元素
                    $('.day').eq(0).addClass('activeList')
                    //当点击时间列表的时候可以触发事件，重新渲染下面对应时间电影详情列表
                    $('.day').on('tap',that.timebindClick)
                    //让时间列表可以滑动
                    var swiper = new Swiper('.swiper-container1', {
                        
                    });
                   
                },
              },
          });

        //   var swiper = new Swiper('.swiper-container1', {
        // });

          
          //渲染初始值
          window.movieIndex=0;
          $('.backspace1').on('tap',this.bindTap)
          $('footer').css('display','none')
          $('.day').eq(0).addClass('activeList')
          $('.day').on('tap',this.timebindClick)
          var swiper = new Swiper('.swiper-container1', {            
            });
          if(one==null&&two==null)
          {
            $('.taocan').css('display','none')
            $('.huidai').css('display','none')
          }
          else{
            $('.taocan').css('display','block')
            $('.huidai').css('display','block')
          }
          $('.no-seat').css('display','none')
          if(movieList.length==0)
           {
             $('.no-seat').css('display','flex')
           }
           else{
             $('.no-seat').css('display','none')
           }
          
    }
}





  
export default new CinemaDetail()
