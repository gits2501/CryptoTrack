// node server
require('dotenv').config();                // safely add coinmarketcap API key to process.env

const express = require('express');
const requestp = require('request-promise');
const app = express();


let crypto_cache = '';                       // used for caching coinmarketcap response data 
let cache_interval = 0;                      // interval for getting data for cache

const getCryptoData = function (){           // gets data from coinmarketcap 

   setTimeout(function(){

       process.nextTick(function cacheData(){

            requestp(listingOptions)
            .then(function(crypto_data){
                   console.log("crypto data: \n", crypto_data)
                   crypto_cache = crypto_data;                  // put data we got to cache                    
            }).catch(function(err){
                  console.log('API call error:', err.message);
            }); 
       })

   }, cache_interval)                     // first we go for data ASAP (cache_interval = 0)
   
  cache_interval = 3600                   // one hour - not to waste free plan api points (will be set to 1min)
}

//getCryptoData();

const listingOptions = {                //  set api request options for '/listings/latest' endpoint

  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',

  qs: {
    start: 1,
    limit: 50,
    convert: 'USD',
    sort: 'price'
  },

  headers: {
    'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
  },

  json: true,
  gzip: true
};


   
const allInfoOptions = {                //  set api request options for '/info' endpoint

      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',

      qs: {
        id: ''                                                     // id we will parse from client request
      },

      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
      },

      json: true,
      gzip: true

  // https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest
}

app.get('/listing', function getListing(req, res) {
     if(typeof crypto_cache === "object")
         res.send(crypto_cache); 
     else
         res.send('Crypto cache data empty');
   
})

app.get('/all', function getAllInfo(req, res){
    let crypto_id = 1 // testing crypto id 1 , will be 'req.query.id';
    
    allInfoOptions.qs.id = crypto_id;   // set id we got from client request

    requestp(allInfoOptions)
    .then(function(crypto_data){
        res.send(crypto_data);
    })
    .catch(function(err){
        console.log('/all enpoint had an error: ', err)
        res.send(err);
    })
});  

app.listen(process.env.SERVER_PORT); console.log('Server UP')
