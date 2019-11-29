import indexController from '../controllers/'
import movieListController from '../controllers/movieControllers'
import cinemaListController from '../controllers/cinemaControllers'
import profileController from '../controllers/profileControllers'
import cityListController from '../controllers/cityListControllers'
import movieDeatilController from '../controllers/movieDetailControllers'
import cinemaDetailController from '../controllers/cinemaDetailControllers'
import movieDetailMessageController from '../controllers/movieDetailMessageControllers'
import willPlayController from '../controllers/willPlayControllers'
import searchController from '../controllers/searchControllers'

class Router {
    constructor() {
        this.render()
    }
    render() {
        window.addEventListener('load', this.initialPage.bind(this))
        window.addEventListener('hashchange', this.changePage.bind(this))
    }

    joinActiveClass(hash) {
    $(`footer li[data-to=${hash}]`).addClass('active').siblings().removeClass('active')
     }
    
    joinPages(hash) {
        let pageControllers = {
            movieListController,
            cinemaListController,
            profileController,
            cityListController,
            movieDeatilController,
            cinemaDetailController,
            movieDetailMessageController,
            willPlayController,
            searchController
        }
        pageControllers[hash + 'Controller'].render()
    }


    initialPage() {
        let hash = location.hash.substr(1) || 'movieList'
        indexController.render()
        location.hash = hash
        let reg = new RegExp(/^(\w+)/,'g')
        let path= reg.exec(hash)
        this.joinPages(path[1])
        this.joinActiveClass(path[1])
    }
    changePage() {
        let hash = location.hash.substr(1)
        let reg = new RegExp(/^(\w+)/,'g')
        let path= reg.exec(hash)
        this.joinPages(path[1])
        this.joinActiveClass(path[1])
    }
}

new Router()

