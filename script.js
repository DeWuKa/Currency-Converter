var currencyList = [];

$(document).ready(function() {
  getCurrencies();
  createOptions();
});

function getCurrencies() {
  $.getJSON(
    "http://api.nbp.pl/api/exchangerates/tables/a/?format=json",
    function(response) {
      $.each(response[0].rates, function(i, item) {
        currencyList.push(item);
      });
    }
  );
}

function createOptions() {
    $.each(currencyList, function (i, item) {
        $('currencyList').append($('<option>', { 
            value: item.currencyList[i].currency,
            text : item.currencyList[i].code
        }));
    });
}
