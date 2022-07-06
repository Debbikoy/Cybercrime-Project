(function () {
  console.log("script has staered runinig");

  function countOccurences(string, split_by) {
    return string.split(split_by).length - 1;
  }

  function categorize_sub_domain(hostname) {
    let no_of_dots = countOccurences(hostname, ".") - 1;
    // if >= 1 .... legitimate
    // >2 suspicious
    // >3 phishing
    let sub_multi_categorixation;
    if (no_of_dots == 1) {
      sub_multi_categorixation = "legitimate";
    }
    if (no_of_dots == 2) {
      sub_multi_categorixation = "suspicious";
    }
    if (no_of_dots >= 3) {
      sub_multi_categorixation = "phishing";
    }
    return sub_multi_categorixation;
  }

  function getUrlFeatures() {
    // remeber to use promise.resove all or something ute .
    let url = document.URL;
    let ipv4Url = RegExp(
      [
        "^https?://([a-z0-9\\.\\-_%]+:([a-z0-9\\.\\-_%])+?@)?",
        "((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\\.){3}(25[0-5]|2[0-4",
        "][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])?",
        "(:[0-9]+)?(/[^\\s]*)?$",
      ].join(""),
      "i"
    );
    let url_contain_ip = ipv4Url.test(url); // bool
    let lenght_of_url = url.length;
    let is_url_long = lenght_of_url > 52; // bool
    let url_slash_count = countOccurences(url, "//"); // url slashes
    let url_contains_at_symbol = url.includes("@"); // bool
    let urlParts = /^(?:\w+\:\/\/)?([^\/]+)([^\?]*)\??(.*)$/.exec(url);
    let hostname = urlParts[1]; // www.example.com
    let url_contains_dash_symbol = hostname.includes("-"); // bool
    let sub_multi_categorixation = categorize_sub_domain(hostname); // returns one of three categories
    let is_https = url.startsWith("https://");
    // is https in domain
    let is_https_in_domain = hostname.includes("https");
    let url_features = {
      url,
      url_contain_ip,
      is_url_long,
      url_slash_count,
      url_contains_at_symbol,
      url_contains_dash_symbol,
      sub_multi_categorixation,
      is_https,
      is_https_in_domain,
    };
    return url_features;
  }
  let url_f = getUrlFeatures();
  console.log(url_f);
})();
