var currencyList = [];

$(document).ready(function() {
     getCurrencies();
     creatOptions();
});

function getCurrencies(){
$.getJSON("http://api.nbp.pl/api/exchangerates/tables/a/?format=json", function(response) {
        $.each(response[0].rates, function(i, item) {
        currencyList.push(item);
        });
    });
}
function creatOptions(){
    var option = "";
    for (var i = 0; i<currencyList.length; i++){
   option += "<option value='" + currencyList[i].code + "'>" + currencyList[i].currency + "</option>";
    }
    $("currency-list").append(option);
}