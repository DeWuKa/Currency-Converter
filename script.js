var currencyList = [];

$(document).ready(function() {
  getCurrencies();
      
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
    createOptions()
});
}

function createOptions() {
  var option = "";
  for (var i = 0; i < currencyList.length; i++) {
    option += "<option value='" + currencyList[i].code + "'>" + currencyList[i].code + "</option>";
  }
    $("#currencyList2").append(option)
    $(".currencyList").append(option);
    validation();
}

function validation() {
  $("#currencyId").on("input", function(){ 
   
    });
}
