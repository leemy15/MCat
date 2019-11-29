import movieMainView from '../views/movieBody.art'
import movieModel from '../models/movieModel'
import moreMovieModel from '../models/moreMovieModel'
import movieListView from '../views/movieList.art'
import movieHeader from '../views/movieHeader.art'
import willPlayListController from '../controllers/willPlayControllers'
//import BScroll from 'better-scroll'
const BScroll = require('better-scroll')

class Position {
  constructor() {
    //this.render()
    this.list = []
    this.key = 1
    this.j=0
  }

  renderer(list) {
    let movieListViewHTML = movieListView({
      list
    })
    $('main ul').html(movieListViewHTML)
  }

  async nowPlay(){
     let that=this
    let result = await movieModel.get(
      )
     // console.log(result);
      
      let arr=result.movieIds
      
      var a = [];
      var b=[];
      for(let i=0,len=arr.length;i<len;i+=12){
        a.push(arr.slice(i,i+12));
      }
      for(let i=0;i<a.length;i++)
      {
       b.push(a[i].join('%2C'))
      }
      // let cinemaResult = await cinemaModel.get(
      //   )
      //   console.log(cinemaResult.cinemas);
  
      //   let html1 = positionView({
      //     cinemaList:cinemaResult.cinemas,
      // })
      let positionHtml = movieMainView({})
      let $main = $('main')
      $main.html(positionHtml)
      
      let list = this.list = result.movieList
      
      
      this.renderer(list)
      $('header').css('display','block')
      $('footer').css('display','block')
      
      //$main.html(html1)
      let $imgHead = $('.head img')
      let $imgFoot = $('.foot img')
  
      // bScroll 是BetterScroll实例，将来可以用来调用API
      let bScroll = new BScroll.default($main.get(0), {
  
      })
  
      // 开始要隐藏下拉刷新的div
      bScroll.scrollBy(0, -40)
  
      bScroll.on('scrollEnd', async function () {
        if (this.y >= 0) {
          
  
          $imgHead.attr('src', '/assets/images/ajax-loader.gif')
          let result = await movieModel.get()
          // console.log(result);
  
          let list = result.movieList;
          // console.log(list);
  
          // that.list =[...list, ...that.list]
          that.renderer(list)
          // console.log(that.list);
          $('.recceivedPsli').on('tap', that.bindTap)
          bScroll.scrollBy(0, -40)
          $imgHead.attr('src', '/assets/images/arrow.png')
          $imgHead.removeClass('up')
        }
       
        if (this.maxScrollY >= this.y&&that.j<b.length-1) {
          {
            that.j++;
            $imgFoot.attr('src', '/assets/images/ajax-loader.gif')
            //console.log(b);
            let result = await moreMovieModel.get({
              key:b[that.j]
            })
            let list = result.coming;
            that.list = [...that.list, ...list]
            that.renderer(that.list)
            // console.log(that.j);
            bScroll.scrollBy(0, 40)
            $imgFoot.attr('src', '/assets/images/arrow.png')
            $imgFoot.removeClass('down')
            $('.recceivedPsli').on('tap', that.bindTap)
          }
        }
       
        if(that.j>=b.length-1)
        {
           $imgFoot.attr('src', '/assets/images/sid.jpg')
           $('.foot b').html('下拉加载更多...')
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
      $('willPlay').addClass('wellPlaycss')
      $('.recceivedPsli').on('tap', this.bindTap)
      $('.activeCity').on('tap', this.cityBindClick)

  }

  bindTap() {
    let nowhash=$(this).attr('data-to')
     let willhash=$(this).attr('data-id')
     location.hash=nowhash+'/'+willhash
  }
  cityBindClick() {
    location.hash = $(this).attr('data-to')
    // console.log(city);
  }
  cityBindClick2() {
    location.hash='willPlay'
    willPlayListController.render()
    $('.willPlay').addClass('wellPlaycss').siblings().removeClass('wellPlaycss')
   
  }
  cityBindClick3() {
    location.hash='movieList'
    $('.wellPlay').addClass('wellPlaycss').siblings().removeClass('wellPlaycss')
    this.nowPlay()
  }
  
  async render() {    

    let $header=$('header')
    let movieHeaderHtml=movieHeader({})
    $header.html(movieHeaderHtml)


      let cityFont1=this.cityFont1=localStorage.getItem('cityFont')

      if(cityFont1)
      {
        
      }
      else
      {
        cityFont1='北京'
      }
      window.city=cityFont1
    $('.nowcityone').html(window.city)
    $('.willPlay').on('tap', this.cityBindClick2)
    $('.wellPlay').on('tap', this.cityBindClick3.bind(this))
    this.nowPlay()







    
  }
}
export default new Position()