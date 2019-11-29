module.exports = {
    get({cinemaNo=0,cityId=1,nowday,pickTownNowId=-1,pickTownLiId=-1,pickBrandNowId=-1,lineId1=-1,stationId1=-1,ting=-1,special=-1}) {
     return $.ajax({
       url: `api/ajax/cinemaList?day=${nowday}&offset=${cinemaNo}&limit=20&districtId=${pickTownLiId}&lineId=${lineId1}&hallType=${ting}&brandId=${pickBrandNowId}&serviceId=${special}&areaId=${pickTownNowId}&stationId=${stationId1}&item=&updateShowDay=true&reqId=1570584614232&cityId=${cityId}`,
     })
   }
 }
