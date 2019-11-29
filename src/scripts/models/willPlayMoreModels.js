
module.exports = {
    get({willPlayIds}) {
     return $.ajax({
       url: `api/ajax/moreComingList?token=KKr_qfERYmGJ6mNH5uvXKswGQO8AAAAAPAkAAMZ9zKbknkigAGWf84gcuTDedo6F7ALtSMu-hr1zc1Oi-n6yembxLJmz6h8uhpWXbA&movieIds=${willPlayIds}`,
     })
   }
 }