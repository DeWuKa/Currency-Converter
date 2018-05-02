
$(document).ready(function() {
     getCurrencies();
});

function getCurrencies(){
$.getJSON("http://api.nbp.pl/api/exchangerates/tables/a/?format=json", function(response) {
        $.each(response.rates[0], function(i, item) {
          $(".currency-list").append("<option value='" + item.code + "'>" + item.currency + "</option>")
            console.log(item.rates[0]);
        });
    });
}