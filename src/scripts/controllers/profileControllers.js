import profileHeaderView from '../views/mingHeader.art'
import profileMainView from '../views/mineAll.art'

class Profile{
    constructor() {
    }

    render(){
        let profileMainHtml = profileMainView({
        })
        let $main = $('main')
        $main.html(profileMainHtml)
        let $header=$('header')
        let profileHeaderHtml=profileHeaderView({})
        $header.html(profileHeaderHtml)
        $('header').css('display','block')
         $('footer').css('display','block')
    }
}

export default new Profile()
