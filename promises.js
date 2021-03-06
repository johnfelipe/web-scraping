var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs-extra');

var baseURI =" https://www.weddingwire.com/lighting-decor"

getVendorContactAsync()
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.log(err);
});


function getVendorEndPointsAsync(){
    return new Promise(function(resolve, reject){
        request(baseURI, function(resolve, reject){

            if (!error){
 
                var $ = cheerio.load(body);
 
                var storage =[];
                links =$('div.directory-item-content a.item-title')
                links.each(function(i, elem){
                    var vendor =$(this).attr('href');
                    storage.push(vendor);
             });
             resolve(links);
            }else{
                reject('SHITTTTTTT ');
            }
      });
  });
}

function getVendorContactAsync(){
    return getVendorEndPointsAsync().then(function (endpoints){
        var promises = endpoints.map(function (endpoint){
            
            return new Promise(function (resolve, reject){

            
                request(url,function(error, response, body){
                    if(!error) {
                        var $ = cheerio.load(body);
                        var companyName =$('.storefrontHeader__title');
                        var companyNameText = companyName.text();
                        var companyNameText1 = companyNameText.replace(/\s+/g, ' ').trim(); 
                       
                        var location= $('.storefrontHeaderOnepage__address');
                        var locationText= location.text();
                        var locationText1 = locationText.replace(/\s+/g, ' ').trim(); 
                       
                        var telephone= $('.storefrontAdresses__content span.app-phone-replace');
                        var telephoneText=telephone.text();
                        var telephoneText1=telephoneText.replace(/\s+/g, ' ').trim();;
                    
        
                        var ven={
                        url:endpoint,
                        companyName:companyNameText1,
                        location:locationText1,
                        telephone:telephoneText1
                        };
                        resolve(ven);
    
    
                        // console.log(ven);
                        } else {
    
                            console.log("We've encountered an error: " + error);
                        }
                   });
                });
            });
        return Promise.all(promises);
        })
        .then(function(data){
            return data;
        })
        .catch(function(err){
            return Promise.reject(err);
        });
    }
    



    
