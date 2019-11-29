import movieParView from '../views/movieDetailMessage.art'
import movieParData from '../models/movieDetailMessageModels'
const BScroll = require('better-scroll')

class DetailMessage {
    constructor() {

    }
    async render() {
        let hash = location.hash.substr(1)
        // console.log(hash);
        let reg = new RegExp('^(\\w+)(\\/\\w+)', 'g')
        let path = reg.exec(hash)[2]
        let movieId = path.substr(1)
        console.log(movieId);

        let movieParResult = await movieParData.get({
            key: movieId
        })
        console.log(movieParResult);

        let movieDetailMessageViewHtml = movieParView({ movieParResult })
        let $main = $('main')
          $main.html(movieDetailMessageViewHtml)

         let bScroll = new BScroll.default($main.get(0), {

         })

        $('header').css('display','none')
        $('footer').css('display','none')

        var swiper = new Swiper('.swiper-container2', {
            slidesPerView: 2.3,
            spaceBetween: 10,

            // pagination: {
            //     el: '.swiper-pagination',
            //     clickable: true,
            // },
        });
        console.log(movieParResult.detailMovie.sc);
        
        if(movieParResult.detailMovie.sc>0){
            $('.real-time-word-of-mouth').css('display','block')
            $('.real-time-word-of-mouth1').css('display','none')
        }else if(movieParResult.detailMovie.sc==0){
            $('.real-time-word-of-mouth').css('display','block')
            $('.real-time-word-of-mouth1').css('display','none')
        }

        $('.shrink').on('tap', function () {
            $('.shrink').removeClass('show')
            $('.unfold').addClass('show')
            $('.brief-introduction .content').css('height',65,'text-overflow','ellipsis')


        })
        $('.unfold').on('tap', function () {
            $('.unfold').removeClass('show')
            $('.shrink').addClass('show')
            $('.brief-introduction .content').css('height','auto','text-overflow','ellipsis')

        })

        $('.fanhui').on('tap',function(){
            window.history.go(-1)
        })
    }
}
export default new DetailMessage()
