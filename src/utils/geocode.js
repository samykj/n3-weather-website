const request = require("request");

const geocode = (address,callback) => {
  url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2FteXkiLCJhIjoiY2s1dDU4MTBnMHNpbTNrbXU1NWpycGh6ZiJ9.0F5YZBSBEoOVoeBEO_Nf9w&limit=1`;
  request({url,json:true},(error,response)=>{
    // os lvl error
    if(error){
      callback("Unable to connect to location services",undefined);
    }
    // response error
    else if(response.body.features.length===0){
      callback("Unable to find location",undefined);
    }
    // response successfully processed
    else{
      callback(undefined,{
        longitude:response.body.features[0].center[0],
        latitude:response.body.features[0].center[1],
        location:response.body.features[0].place_name
      });
    }
  });
}

module.exports = geocode
