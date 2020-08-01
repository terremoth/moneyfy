const Moneyfy = {};

Moneyfy.make = function (num = 0, mil = '.', dec = ',') {
    function truncate(number, digits) {
        var n = number - Math.pow(10, -digits)/2;
        n += n / Math.pow(2, 53); 
        return n.toFixed(digits);
    };

    return truncate(parseFloat(num), 2).replace('.', dec).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + mil);
};

Moneyfy.toFloat = function(str, toFixed) {

    function replaceAt(baseStr, index, str) {
      return baseStr.substr(0, index) + str + baseStr.substr(index + str.length);
    };
  
    var lastCharPos = false, floatNumber = 0;

    var searchDot   = str.lastIndexOf('.');
    var searchComma = str.lastIndexOf(',');

    if (searchDot > searchComma) {
      lastCharPos = searchDot;
    } else if (searchDot < searchComma) {
      lastCharPos = searchComma;
    }

    str = replaceAt(str, lastCharPos, 'F');
    str = str.replace(/[\W]/g, '');
    lastCharPos = str.indexOf('F');
    str = replaceAt(str, lastCharPos, '.');
    str = str.replace(/[a-zA-Z]/g, '');
    floatNumber = parseFloat(str);
    toFixed = toFixed || floatNumber.toString().length;
    return parseFloat(floatNumber.toFixed(toFixed));
};
