// node server
require('dotenv').config();                // safely add coinmarket cap API key to process.env

const express = require('express');
const rp = require('request-promise');
const app = express();


let crypto_cache = '';                       // used for caching coinmarketcap response data 
let cache_interval = 0;                      // interval for getting data for cache

const getCryptoData = function (){           // gets data from coinmarketcap 

   setTimeout(function(){

       process.nextTick(function cacheData(){

            rp(coinmarketcapOptions).then(function(crypto_data){
                   console.log("crypto data: \n", crypto_data)
                   crypto_cache = crypto_data;                  // put data we got to cache                    
             }).catch(function(err){

                  console.log('API call error:', err.message);
            }); 
       })

   }, cache_interval)                     // first we go for data ASAP (cache_interval = 0)
   
  cache_interval = 3600                   // one hour - not to waste free plan api points (will be set to 1min)
}

getCryptoData();

const coinmarketcapOptions = {   //  set api request options 
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


app.get('/listing', function getListing(req, res) {
     if(crypto_cache)
         res.send(crypto_cache); 
     else
         res.send('Crypto cache data empty');
   
})
  

app.listen(process.env.SERVER_PORT); console.log('Server UP')
