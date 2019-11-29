module.exports = {
    get() {
     return $.ajax({
       url: 'api/dianying/cities.json',
     })
   }
 }