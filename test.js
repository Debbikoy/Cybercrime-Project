import fetch from 'node-fetch';

async function  checkUrlIsShortened (url_hostname){
    let is_short = true
    let path = "https://unshorten.me/json/" + url_hostname 
    fetch(path)
        .then(res => res.json())
        .then(json =>{
            console.log(json)
            if (json["resolved_url"].includes(json["requested_url"])){
                console.log("it includes what we need")
                is_short = false
                return is_short
            }    
            console.log("not included ")
            return is_short
        })
        .catch(err => console.log("err  ", err))

}

function countOccurences(string, split_by) {
    return string.split(split_by).length - 1;
}

function categorize_sub_domain(hostname){
    let no_of_dots = countOccurences(hostname, ".") - 1
    // if >= 1 .... legitimate
    // >2 suspicious 
    // >3 phishing 
    let sub_multi_categorixation
    if (no_of_dots == 1){
        sub_multi_categorixation = "legitimate"
    }
    if (no_of_dots == 2){
        sub_multi_categorixation = "suspicious"
    }
    if (no_of_dots >= 3){
        sub_multi_categorixation = "phishing"
    }
    return sub_multi_categorixation
}


async function getUrlFeatures(){
    // remeber to use promise.resove all or something ute . 
    let url = document.URL
    let ipv4Url = RegExp([
        '^https?:\/\/([a-z0-9\\.\\-_%]+:([a-z0-9\\.\\-_%])+?@)?',
        '((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4',
        '][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])?',
        '(:[0-9]+)?(\/[^\\s]*)?$'
    ].join(''), 'i');
    let url_contain_ip = ipv4Url.test(url)  // bool 
    let lenght_of_url = url.length  
    let is_url_long = lenght_of_url > 52 // bool     
    let url_slash_count = countOccurences(url,"//"); // url slashes 
    let url_contains_at_symbol = url.includes("@") // bool 
    let urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);
    let hostname = urlParts[1]; // www.example.com
    let url_contains_dash_symbol = hostname.includes("-") // bool   
    let is_url_shortened = await checkUrlIsShortened(hostname) 
    // get no of occurance of the . in a url - 1 
    let sub_multi_categorixation = categorize_sub_domain(hostname) // returns one of three categories
    let is_https = url.startsWith("https://")
    // is https in domain 
    let is_https_in_domain = hostname.includes("https")
    // get the port from location.port 
    // it migth not exist .  ...
    let url_features = {
        url, 
        url_contain_ip,
        is_url_long,
        url_slash_count,
        url_contains_at_symbol, 
        url_contains_dash_symbol, 
        is_url_shortened,
        sub_multi_categorixation,
        is_https,
        is_https_in_domain,
    }
    return url_features
}

function getDomainDetails(){
    let data = "empty" // fix this  

    const url = 'https://pointsdb-bulk-whois-v1.p.rapidapi.com/whois?domains=dailypost.ng&format=json';
    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'bc44a62594msh4922fd55bd06761p107cd6jsnf42911bb137f',
        'X-RapidAPI-Host': 'pointsdb-bulk-whois-v1.p.rapidapi.com'
      }
    };
    
    fetch(url, options)
        .then(res => res.json())
        .then(json => {

            // console.log(json)
            getDate(json)

        })
        .catch(err => console.error('error:' + err));

    return data
}

getDomainDetails()


function getFavIconFeature(site_link){
    let returnedValue = "bad";
    let link = document.querySelector("link[rel='icon']")
    if (!link){
        returnedValue = "doesnt exist"
        return returnedValue
    }
    /// check if it comes from the site 
    if (link.href == site_link){
        returnedValue = "good"
        return returnedValue
    }return returnedValue

}

function getDate(obj){
    let first = Object.keys(obj)[0]
    let mainObj = obj[first]
    // get the created data ..... 
    console.log(mainObj[5]["5"])

    // next steps 
    // check if the stuff is in this function  
    // if not move on 
    // extract date and lets see what is next .... 
    // how to find port ap articular server is on 

}


function isMediaFromSameDomain(media_link, hostname_without_www){
    // get edia                              
    // check if it icludes the thing                     
    // if it does retur true or false                     
    return media_link.includes(hostname_without_www)
                     
}                              

function checkLinkValidity(){
    let contains_void = false; 
    let all_links = document.links
    for (let x in all_links){       
        if (all_links[x].href.startsWith("#") || all_links[x].href == "JavaScript::void(0)" ){
            contains_void = true
        }
    }
    return contains_void
}
// check srver form handler .... if it is empty 
function checkForm(hostname){
    let forms = document.querySelectorAll("form")
    let is_form_blank = false
    let is_form_url_normal = true
    for (let x in forms ){
        let form = forms[x]
        if (form.action == "" || form.action == "about:blank"){
            is_form_blank = true
        }
        if (!form.action.includes(hostname)){
            is_form_url_normal = false
        }   
    }
}

function getAbnormalWebsitectivities(){
   let contains_void = checkLinkValidity()


}