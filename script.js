var currencyList = ["PLN"];
var chosenCurrency1;

$(document).ready(function() {
  getCurrencies();

  $("#currencyList1").change(function(){
    getMidFrom();
  });

  $("#currencyList2").keyup(function(e){  
    setTimeout(validateId, 1000);     
});

  $("#amount").keyup(function(e){  
    setTimeout(validateAmount, 1000);
  });
});

function validateAmount(){
  var pattern = /^(\d{1,6})+((\.|\,)\d{1,2})?$/;
  var amo = $("#amount").val();
    if (amo.match(pattern)){
      $("#wrongValue").css("display", "none");
    calculateResult(); 
    }else{
      $("#wrongValue").css("display", "block");
    }
}

function validateId(){
  var chosenId = $("#currencyList2").val().toUpperCase();
  if(chosenId == chosenCurrency1){
    $("#alreadyChosen").css("display", "block");
  }else if ($.inArray(chosenId, currencyList) !==-1){
    $("#wrongId").css("display", "none");
    getMidTo();
  }else{
    $("#wrongId").css("display", "block");
  }
}
function getCurrencies() {
  $.getJSON(
    "http://api.nbp.pl/api/exchangerates/tables/a/?format=json",
    function(response) {
      $.each(response[0].rates, function(i, item) {
        currencyList.push(item.code);
         });    
        }
    ).done(function(){
    createOptions();
});
}

function createOptions() {
  var option = "";
  for (var i = 0; i < currencyList.length; i++) {
    option += "<option value='" + currencyList[i] + "'>" + currencyList[i] + "</option>";
  }
    $("#currencyList1").append(option)
  }

  var currencyFromList;
  var currencyToList;

function getMidFrom(){
  chosenCurrency1 = $("#currencyList1 option:selected").val();
  if (chosenCurrency1 =="PLN"){
    currencyFromList = 1;
  }else{
  $.getJSON("http://api.nbp.pl/api/exchangerates/rates/a/" + chosenCurrency1 + "/?format=json", function(currencyData) {   
      currencyFromList = currencyData.rates[0].mid;
  });
}  
}

 function getMidTo(){
  var chosenCurrency2 = $("#currencyList2").val().toUpperCase();   
  if (chosenCurrency2 =="PLN"){
    currencyToList = 1;
  }else{ 
    $.getJSON("http://api.nbp.pl/api/exchangerates/rates/a/" + chosenCurrency2 + "/?format=json", function(currencyData) {   
   currencyToList = currencyData.rates[0].mid;
});
  }
}

function calculateResult() {
  var key = $("#amount").val();
  var res = Math.round((key*currencyFromList/currencyToList)*100)/100;
  $("#result").val(res);
  }