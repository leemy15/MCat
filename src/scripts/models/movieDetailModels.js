module.exports = {
    get({movieId}) {
     return $.ajax({
       url: `api/ajax/detailmovie?movieId=${movieId}`,
     })
   }
 }