module.exports = {
    get({keyWord="大地",cityId = 1}) {
     return $.ajax({
       url: `api/ajax/search?kw=${keyWord}&cityId=${cityId}&stype=2`,
     })
   }
  }