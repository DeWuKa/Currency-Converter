var currencyList = [];

$(document).ready(function() {
  getCurrencies();

  $("#currencyList1").change(function(){
        getMidFrom();
  });

  $("#currencyList2").keyup(function(e){  
      getMidTo();     
});

  $("#amount").keyup(function(e){  
      calculateResult();     
  });
});

function getCurrencies() {
  $.getJSON(
    "http://api.nbp.pl/api/exchangerates/tables/a/?format=json",
    function(response) {
      $.each(response[0].rates, function(i, item) {
        currencyList.push(item);
         });    
        }
    ).done(function(){
    createOptions();
});
}

function createOptions() {
  var option = "";
  for (var i = 0; i < currencyList.length; i++) {
    option += "<option value='" + currencyList[i].code + "'>" + currencyList[i].code + "</option>";
  }
    $("#currencyList1").append(option)
  }

  var currencyFromList;
  var currencyToList;

function getMidFrom(){
  var chosenCurrency1 = $("#currencyList1 option:selected").val();
  $.getJSON("http://api.nbp.pl/api/exchangerates/rates/a/" + chosenCurrency1 + "/?format=json", function(currencyData) {   
      currencyFromList = currencyData.rates[0].mid;
  });  
}

var Timer;
function calculateResult() {
    $("#amount").keyup(function () {
        clearTimeout(Timer);
        Timer = setTimeout(SendRequest, 1000);
    });
  }
function SendRequest() {
    var key = $("#amount").val();
    var res = Math.round((key*currencyFromList/currencyToList)*100)/100;
    $("#result").val(res);
}

var Timer2;
function getMidTo() {
    $("#currencyList2").keyup(function () {
        clearTimeout(Timer2);
        Timer2 = setTimeout(SendRequest2, 1000);
    });
}

function SendRequest2() {
    var chosenCurrency2 = $("#currencyList2").val();    
    $.getJSON("http://api.nbp.pl/api/exchangerates/rates/a/" + chosenCurrency2 + "/?format=json", function(currencyData) {   
   currencyToList = currencyData.rates[0].mid;
});
}