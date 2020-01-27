const request = require("request");

const forecast = (lat,long,callback)=>{
  url = `https://api.darksky.net/forecast/040725c0136e974384f3de648b614291/${long},${lat}`;
  request({url,json:true},(error,response)=>{

    // os lvl error
    if(error){
      callback("Failed to connect to network",undefined);
    }
    // response not available error
    else if(response.body.error){
      callback("Unable to find the location",undefined); 
    }
    // response works
    else{
      callback(undefined, response.body.daily.summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.'+'Today\'s High Temperature is '+response.body.daily.data[0].temperatureHigh);
    }
  });
}

module.exports = forecast