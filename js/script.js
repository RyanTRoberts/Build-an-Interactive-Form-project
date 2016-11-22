window.addEventListener('load', setFocus)       //on page load, run function

function setFocus() {
  $("#name").focus()       //set page focus to name input
  paymentUpdate()       //show only credit card payment info
}


//set variables to reference the job Role section of the form
var other = '';
var jobSelect = document.getElementById('title');

jobSelect.addEventListener('change', function(){        //When select option is changed

  other = jobSelect.options[jobSelect.selectedIndex].value;       //Get the value of current option

  if(other == 'other'){       //if current option == other

    jobSelect.insertAdjacentHTML("afterend", '<input type="text" id="other-title" name="other-title" placeholder="Your Title">');       //add Text input
  } else {

    document.getElementById('other-title').remove();        //Remove the Text input if current option != other
  }
})


//variables to reference the T-shirt info section of the form
var Designs = document.getElementById('design')
var design = ''
var colors = document.getElementById('color').children

Designs.addEventListener('change', function(){        //When user selects design style

  design = Designs.options[Designs.selectedIndex].value;        //get the value of current option

  $(colors).show()        //show any hidden options

  if (design == 'js puns'){       //if user selects 'js puns' theme
    $(colors[0]).prop('selected', true)
    for(var i = 3; i < colors.length; i++){       //select and hide all the 'js puns' colors
      $(colors[i]).hide()
    }
  } else if (design == 'heart js'){         //if the user selects 'heart js' theme
    $(colors[3]).prop('selected', true)
    for(var i = 0; i < colors.length / 2; i++){       //select and hide all the 'heart js' colors
      $(colors[i]).hide()
    }
  }
})


//Easy access to all activity checkboxes
var list = $('#activities :input');
var first = $(":input[name|='all']");
var second = $("input[name|='js-frameworks']");
var third = $("input[name|='js-libs']");
var fourth = $("input[name|='express']");
var fifth = $("input[name|='node']");
var sixth = $("input[name|='build-tools']");
var seventh = $("input[name|='npm']");
var total = 0; //set the Total price to start at 0

list.on('click', function(){        //when user clicks an input
  noTimeConflict()        //hide conflicting activities

  if(this == list[0] && this.checked){        //when main conference is clicked
    priceUpdate(200)        //add $200 to the total
  } else if (this.checked){       //otherwise add $100
    priceUpdate(100)
  } else if (this == list[0]){        //and if choice is unchecked, remove the cost
    priceUpdate(-200)
  } else {
    priceUpdate(-100)
  }
})

function noTimeConflict(){

  //If the user clicks a class,
  //disable all events with confliction times
  if( second.prop("checked") == true ){
    fourth.prop("disabled", true)
  } else {
    fourth.prop("disabled", false)
  }
  if( fourth.prop("checked") == true){
    second.prop("disabled", true)
  } else {
    second.prop("disabled", false)
  }
  if( third.prop("checked") == true ){
    fifth.prop("disabled", true)
  } else {
    fifth.prop("disabled", false)
  }
  if( fifth.prop("checked") == true ){
    third.prop("disabled", true)
  } else {
    third.prop("disabled", false)
  }
}

function priceUpdate(cost) {
  total += cost;
  $('#total').remove();
  $("#activities").append("<span id='total'>Total: $" + total + "</span>");
}

function paymentUpdate() {
  $("#payment").val("credit card")        //set default payment method
  $("#payPal").hide()       //hide paypal info
  $("#bitCoin").hide()        //hide bitcoin info

}

$("#payment").on('change', function(){        //function to update payment info
  if(this.value == "credit card"){        //when credit card is selected, hide others
    $("#credit-card").fadeIn()
    $("#payPal").fadeOut()
    $("#bitCoin").fadeOut()
  } else if(this.value == "paypal"){        //when paypal is selected, hide others
    $("#payPal").fadeIn()
    $("#credit-card").fadeOut()
    $("#bitCoin").fadeOut()
  } else if (this.value == "bitcoin"){        //when bitcoin is selected, hide others
    $("#bitCoin").fadeIn()
    $("#credit-card").fadeOut()
    $("#payPal").fadeOut()
  }
})


$(":button").on("click", function(){
  //provide some form validation
  //Name field cannot be blank
  if($("#name").value == null) {
    alert("Please enter a valid name")
  }

  //the email field but contain a validly formatted email adress
  if($("#email").value == null){
    alert("you must enter an email adress")
  }
  //at least on activity should be selected in the "Register for Activities" section
  //if the payment option is credit card, check that
    //all fields are filled out
    //credit card field should accept a number between 13 and 16 digits
    //zipcode field should accept a 5 digit number
    //the CVV field should accept a 3 digit number
})
