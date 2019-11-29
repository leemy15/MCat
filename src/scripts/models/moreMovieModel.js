module.exports = {
    get({key}) {
     return $.ajax({
       url: `api/ajax/moreComingList?token=&movieIds=${key}`
     })
   }
 }