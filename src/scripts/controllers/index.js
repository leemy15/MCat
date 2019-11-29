import layoutView from '../views/layout.art'

class Index {

  bindClick() {
    location.hash = $(this).attr('data-to')
  }

  render() {

    const html = layoutView({
    })
    document.querySelector('#root').innerHTML = html
    
    $('footer li').on('click', this.bindClick)
  }
}

export default new Index()