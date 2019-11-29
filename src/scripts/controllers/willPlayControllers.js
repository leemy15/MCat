import willPlayView from '../views/willPlay.art'
import movieMainView from '../views/movieBody.art'
import willPlayListModel from '../models/willPlayListModels'
import willPlayMoreModel from '../models/willPlayMoreModels'
import willPlayListBottomModel from '../models/willPlayListBottomModels'
import movieHeader from '../views/movieHeader.art'
import movieListController from './movieControllers'
const BScroll = require('better-scroll')
class willPlayList{
    constructor() {
        this.willPlayIds;
        this.l=0;
        this.willPlay=[]
        this.timeArr=[]
        this.timelei;
    }

    cityBindClick3() {
        location.hash='movieList'
        movieListController.render()
        
    }
    swiperDetail(){
      console.log(1);
      
      let dataId=$(this).attr('data-id')
      location.hash='movieDetailMessage/'+dataId
    }

    renderer(willPlay,timeArr) {
        console.log(timeArr);
        
        let willPlayListHtml = willPlayView({
            willPlay,
            timeArr
        })
        $('main ul').html(willPlayListHtml)
        
      }
      cityBindClick() {
        location.hash = $(this).attr('data-to')
        // console.log(city);       
      }

   async render(){
        let that=this
        let willPlayListresult = await willPlayListModel.get()
        let willPlayListBottomresult = await willPlayListBottomModel.get()
        let willPlayListIds=willPlayListBottomresult.movieIds
        var r = [];
        var c=[];
        for(let i=0,len=willPlayListIds.length;i<len;i+=10){
          r.push(willPlayListIds.slice(i,i+10));
        }
        for(let i=0;i<r.length;i++)
        {
         c.push(r[i].join('%2C'))
        }
        
        
        // let willPlayMoreModelresult = await willPlayMoreModel.get(
        //     {
        //         willPlayIds:b[1]
        //     }
        // )
        let timelei=this.timelei=willPlayListBottomresult.coming;

        let arr2={};
        for(let i=0;i<timelei.length;i++){       
            if(!arr2[timelei[i].comingTitle])
            {
              arr2[timelei[i].comingTitle]=[];
            }
            arr2[timelei[i].comingTitle].push(timelei[i])
        } 
        let timeArr=Object.entries(arr2);
        // for(let key in arr2){
        //     timeArr.push([key,arr2[key]])
        // }  
        // timeArr.sort((n1,n2)=>{  
        //     if(n1[0]>n2[0])return 1
        //     else return -1
        // })

        //console.log(timeArr);
    
        
        let positionHtml = movieMainView({})
        let $main = $('main')
        $main.html(positionHtml)

        let willPlay=this.willPlay=willPlayListresult.coming
        this.timeArr=timeArr
        this.renderer(willPlay,timeArr)
        

        // let list = this.list = result.movieList
        // this.renderer(list)

        let $imgHead = $('.head img')
        let $imgFoot = $('.foot img')

        $('header').css('display','block')
         $('footer').css('display','block')
        var swiper = new Swiper('.swiper-container', {     
            slidesPerView: 3.5,
            spaceBetween: 20,      
        });

        if($('.wellPlay').length==0)
        {
            let $header=$('header')
            let movieHeaderHtml=movieHeader({})
            $header.html(movieHeaderHtml)
            if(window.city)
            {
              window.city=window.city
            }
            else{
              window.city='北京'
            }
            $('.nowcityone').html(window.city)
            $('.wellPlay').on('tap', this.cityBindClick3)
            $('.willPlay').addClass('wellPlaycss').siblings().removeClass('wellPlaycss')
            
        }

        let bScroll = new BScroll.default($main.get(0), {
          click: true
        })

         bScroll.scrollBy(0, -40)
  
        bScroll.on('scrollEnd', async function () {
          if (this.y >= 0) {
            
    
            $imgHead.attr('src', '/assets/images/ajax-loader.gif')
            let willPlayListBottomresult = await willPlayListBottomModel.get()
            let timelei=willPlayListBottomresult.coming;
            let arr2={};
            for(let i=0;i<timelei.length;i++){       
                if(!arr2[timelei[i].comingTitle])arr2[timelei[i].comingTitle]=[];
                arr2[timelei[i].comingTitle].push(timelei[i])
            } 
            let timeArr=[];
            for(let key in arr2){
                timeArr.push([key,arr2[key]])
            }
            timeArr.sort((n1,n2)=>{  
                if(n1[0]>n2[0])return 1
                else return -1
            })
  
            that.renderer(willPlay,timeArr)
            var swiper = new Swiper('.swiper-container', {     
                slidesPerView: 3,
                spaceBetween: 20,  
                preventClicks : false,
            });
            bScroll.scrollBy(0, -40)
            $imgHead.attr('src', '/assets/images/arrow.png')
            $imgHead.removeClass('up')
            $('.qiuqiu').on('click',that.swiperDetail)
            $('.willPlayList').on('tap',that.swiperDetail)
          }


         
          if (this.maxScrollY>= this.y) {
            {
              that.l++;
              $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
              //console.log(b);
               // console.log(c[1]);
              
               let willPlayMoreModelresult = await willPlayMoreModel.get(
                 {
                     willPlayIds:c[that.l]
                 }
                 )
                 console.log(willPlayMoreModelresult);
               

                let timelei=willPlayMoreModelresult.coming;
                that.timelei = [...that.timelei, ...timelei]
                let arr2={};
                for(let i=0;i<that.timelei.length;i++){       
                    if(!arr2[that.timelei[i].comingTitle])arr2[that.timelei[i].comingTitle]=[];
                    arr2[that.timelei[i].comingTitle].push(that.timelei[i])
                } 
                let timeArr=[];
                for(let key in arr2){
                    timeArr.push([key,arr2[key]])
                }
                timeArr.sort((n1,n2)=>{  
                    if(n1[0]>n2[0])return 1
                    else return -1
                })
                that.renderer(willPlay,timeArr)

                var swiper = new Swiper('.swiper-container', {     
                    slidesPerView: 3,
                    spaceBetween: 20,     
                    preventClicksPropagation : false,
                    preventClicks : false,
                });
             
              bScroll.scrollBy(0, 40)
              $imgFoot.attr('src', '/assets/images/arrow.png')
              $imgFoot.removeClass('down')
              $('.recceivedPsli').on('tap', that.bindTap)
              $('.qiuqiu').on('click',that.swiperDetail)
              $('.willPlayList').on('tap',that.swiperDetail)
            }
          }
         
          if(that.j>=c.length-1)
          {
             $imgFoot.attr('src', '/assets/images/sid.jpg')
             $('.foot b').html('没有更多电影数据了...')
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
        
        $('.nowcityone').html(window.city)
        $('.qiuqiu').on('click',this.swiperDetail)
        $('.willPlayList').on('tap',this.swiperDetail)
    }
}

export default new willPlayList()
