

angular.module('CryptoTrack.Main',[]);

let CryptoTrack = angular.module('CryptoTrack', [
    'ngAnimate',
    'ngRoute',
    'ngMessages',
    'CryptoTrack.Main',
])

CryptoTrack.config(function($routeProvider){
   
      $routeProvider
        .when('/', {    

           templateUrl:  'client/src/CryptoTrack/Main/tmpl/cryptoTrack.html',
           controller:   'MainController',
           controllerAs: 'main'
        })
})

angular.module('CryptoTrack.Main')
 .controller('MainController', function($window, AMOUNT_YOU_OWN){
      
     let mainCtrl = this;
     mainCtrl.path = $window.location.pathname;
     mainCtrl.amountYouOwn = AMOUNT_YOU_OWN;
     
 })
 .value('CRYPTO_DATA',{ listing:'', info:''})
 .value('AMOUNT_YOU_OWN', {value:''})

angular.module('CryptoTrack.Main')
 .factory('GetListingModel', function($http, ConfigureRequestService){


     return function getListing(){

          return $http(ConfigureRequestService.cryptoOptions('listing'))
                  .then(function success(cryptoData){
                       if(!cryptoData.data.status['error_code'])
                           return cryptoData.data
                   })
                   .catch(function failure(err){
                       console.log('getListing failed: ', err)
                   })
                 

     }

  })

angular.module('CryptoTrack.Main')
 .factory('GetCryptoListingService', function(GetListingModel){

      return function getCryptoListing(){

           

      }

 })

angular.module('CryptoTrack.Main')
.service('ConfigureRequestService', function(){

      this.cryptoOptions = function(endpoint){
         return {
            method: "GET",
            url:"/"+ endpoint
         }
      }

 })

angular.module('CryptoTrack.Main')
 .factory('AddTextInputListener', function(){
    
     function enableSubmitButton(btn){
         btn.prop('disabled', false)
     }       

     function disableSubmitButton(btn){
         btn.prop('disabled', true)
     }
     return function addTextInputListener(crypto){
          let cryptoSubmitEl = document.querySelector('#id'+ crypto.id + " .submit");  // Select submit element
          let textInputEl    = document.querySelector('#id'+ crypto.id + " .text")     // Select text input 
           
          let cryptoSubmit = angular.element(cryptoSubmitEl);
          let textInput    = angular.element(textInputEl); 
          
          if(textInput.val().length === 0) disableSubmitButton(cryptoSubmit)          // first disable button 
          
          textInput.keyup(function(){
               enableSubmitButton(cryptoSubmit);
               if(textInput.val().length === 0)
                   disableSubmitButton(cryptoSubmit) // disable button when no data
          }) 
     }
 })

angular.module('CryptoTrack.Main')
 .factory('AddSubmitListener', function($window){
    
     let document = $window.document;
    
     function testForLetters(coins){

        for(let i = 0; i < coins.length; i++){ console.log('index:', i)
           charCode = coins.charCodeAt(i)
           if(charCode < 48 || charCode > 57){        // has letters or other non number chars
                if(charCode === 46) return false      // dot '.' is ok
                else return true;                     
           } 
        }

        return false
     } 

     function setLocalStorage(crypto, textInput){ 
        let coins = textInput.val();
        // 1 put input to local storage with crypto id
        // 2 update value of your coin field 
        let localStorage = $window.localStorage;
        let userData = { 
             coinAmount: testForLetters(coins) ? '0' : coins,                 // how much user has got coins
             price: crypto.quote.USD.price                                   // coin price
        }

        localStorage.setItem(crypto.id, JSON.stringify(userData))             // Set data for given crypto id 
 
        // update the voyc element on page to reflect any change in amount of coin
        let valueOfYourCoinEl = document.querySelector('#coin'+ crypto.id);
        let valueOfYourCoin   = angular.element(valueOfYourCoinEl);
        valueOfYourCoin.text('$ '+ userData.coinAmount * userData.price);  
     }     

     return function addSubmitListerner(crypto){
           
          let cryptoSubmitEl = document.querySelector('#id'+ crypto.id + " .submit");  // Select submit el for
                                                                                      // given crypto row
          let textInputEl = document.querySelector('#id'+ crypto.id + " .text")        // Select text input for
                                                                                      // given crypto row 
          let cryptoSubmit = angular.element(cryptoSubmitEl);                             
          let textInput = angular.element(textInputEl);
          
          cryptoSubmit.click(setLocalStorage.bind(null, crypto, textInput)); // set localStorage when user clicks
     }

 })
angular.module('CryptoTrack.Main')
 .factory('AddCoinAmount', function($window){

      let document = $window.document; 
      return function addCoinAmount(crypto, userData){
          if(!userData) return;                           // no data to add

          let textInputEl = document.querySelector('#id'+ crypto.id + " .text")        // Select text input for
          let textInput = angular.element(textInputEl);

          textInput.val(userData.coinAmount);                                         // update amount you own
                                                                                      // column
      }
 })

angular.module('CryptoTrack.Main')
.factory('AddCryptoListingDataService', function($window, AddCoinAmount ,AddSubmitListener, AddTextInputListener){ // populates page with crypto listing data 


   let cryptoRowCss = ' field-name '
   
   return function addCryptoListingData(cryptoElem, cryptoListing){
       // first remove elements from cryptoEleme

       if(!cryptoListing) return;                 // stop when there is no data

       let start = '<ul>';
       let end   = '</ul>';
       let list;
       let changeColor ='';                       // css class name for last24h change number
       let rowColor ='';                          // css class name for crypto row background color

       let length = cryptoListing.length
       let crypto;

       for(let i = 0; i < length; i++){
            
            if((i+1) % 2 === 0){
               rowColor = 'bkg-white';  // on even rows set color white ~
           }
           else rowColor = '';
            
            crypto = cryptoListing[i];
            list = '';  
            list += '<li class="'+ cryptoRowCss + ' ' + rowColor+ '"><a href="/details" target="_blank">'+ crypto.name + '</a></li>'      // name     
            list += '<li class="'+ cryptoRowCss + ' ' + rowColor+ '">'+ crypto.symbol + '</li>'    // short name 
            list += '<li class="'+ cryptoRowCss + ' ' + rowColor+ '">'+ crypto.quote.USD.price + '</li>' // value   
            
            let last24 = crypto.quote.USD['percent_change_24h'] ;                      
            if(last24 < 0)                                                    
               changeColor = 'color-red';   // negative change - color is red
            else 
               changeColor = 'color-green'; // positive - color is green
           
          
            list += '<li class="'+ cryptoRowCss + changeColor + ' '+ rowColor+'">'+ last24 + '</li>'; // change
                                                                                                     // in last24h
            
            let userData = $window.localStorage.getItem(crypto.id);       // check userData for this crypto id
            let valueOfCoins = '0.00'
            if(userData){                                       
               userData = JSON.parse(userData);
               valueOfCoins = userData.coinAmount * userData.price;            // calculate value
               if(isNaN(valueOfCoins)) valueOfCoins = '0.00'
            }
           
             
                                                                                         // amount you own
            list += '<li class="'+ cryptoRowCss + rowColor+ '" id="id'+ crypto.id+'"><input type="text" class="text" name="name" required  min-length="1" maxlength="20" size="10"><input type="button" class="submit" value="Submit"/></li>'       
       

          
            list +=  '<li class="'+ cryptoRowCss+ rowColor+'" id="coin'+ crypto.id + '">$ '+ valueOfCoins +'</li>'; // value of
                                                                                                     // your coin

            let cryptoRow = start + list + end;
            cryptoElem.append(cryptoRow);          // add crypto row to page
 
            AddCoinAmount(crypto, userData);   // update coin amount from local storage (userData) to page 

            AddSubmitListener(crypto);            // will add data to local storage on button click
            AddTextInputListener(crypto)          // will disable/enable submit button on keyup events

       }


   }

})

angular.module('CryptoTrack.Main')
 .directive('cryptodata', function(CRYPTO_DATA, GetListingModel, AddCryptoListingDataService){

     let linker = function(scope, elem, attrs){
         // 1 display loader       
         // 2 get data from server
         // 3 remove loader
         // 4 display data from server into table
         
         let cryptoElem = elem; 
         
         scope.cryptoListing;

         scope.$watch('cryptoListing', function(newVal, oldVal ){
            AddCryptoListingDataService(cryptoElem, newVal);       // appends server data to page 
                
         })


         function getListing(){ 
            GetListingModel()                                      // get crypto listing data from server
            .then(function(cryptoListing){
                scope.cryptoListing = cryptoListing.data;
                console.log('Directive Listing', scope.cryptoListing); 
                
            }, function(err){
                console.log('Error getting crypto listing data from server: ', err)
            })
         
         }
         getListing();                      // call asap
     
         setInterval(getListing, 1000 * 60) // get crypto listing in 1 minute rate
     }
    
     let controller = function(){
   
         this.cryptoListing;
     };

     return {
        restrict: 'A',
        link: linker,
        controller: controller
     }

 });


