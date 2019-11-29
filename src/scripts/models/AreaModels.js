module.exports = {
    get({cityId}) {
     return $.ajax({
       url: `api/ajax/filterCinemas?ci=${cityId}`,
     })
   }
 }