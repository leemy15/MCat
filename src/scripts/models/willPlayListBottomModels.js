module.exports = {
    get() {
     return $.ajax({
       url: 'api/ajax/comingList?ci=1&token=KKr_qfERYmGJ6mNH5uvXKswGQO8AAAAAPAkAAMZ9zKbknkigAGWf84gcuTDedo6F7ALtSMu-hr1zc1Oi-n6yembxLJmz6h8uhpWXbA&limit=10',
     })
   }
 }