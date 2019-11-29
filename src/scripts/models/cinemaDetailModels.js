module.exports = {
    get({cinemaDetailId=1}) {
     return $.ajax({
       url: `api/ajax/cinemaDetail?cinemaId=${cinemaDetailId}`,
     })
   }
 }