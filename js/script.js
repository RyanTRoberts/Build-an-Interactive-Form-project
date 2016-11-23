//JOB ROLE SECTION
var other = ''
var jobSelect = $('#title')
//T-SHIRT INFO SECTION
var Designs = $('#design')
var design = ''
var colors = $('#color').children()
//REGISTER FOR ACTIVITIES SECTION
var total = 0;        //set the Total price default to 0
var checked = 0;        //set activities chosen default to 0
var paymentOption = "credit card";         //set user payment method
var list = $('#activities :input');       //Easy access to all activity checkboxes

//STORE CERTAIN ELEMENTS FOR QUICK ACCESS
var nameInput = $("#name")//store name input
var nameLabel = $("fieldset > label[for='name']")//store name label
var emailInput = $("#email")//store email input
var emailLabel = $("fieldset > label[for='mail']")//store email label
var ccNumLabel = $("div > label[for='cc-num']")//store card number label
var zipLabel = $("div > label[for='zip']")//store zip label
var cvvLabel = $("div > label[for='cvv']")//store cvv label

//JOB ROLE SECTION
jobSelect.on('change', function(){        //When select option is changed
  other = jobSelect.val()      //Get the value of current option
    if(other == 'other'){       //if current option == other
      jobSelect.after('<input type="text" id="other-title" name="other-title" placeholder="Your Title">')       //add Text input
    } else {
      $('#other-title').remove()        //Remove the Text input if current option != other
    }
})

//T-SHIRT INFO SECTION
Designs.on('change', function(){        //When user selects design style
  design = Designs.val()         //get the value of current option

  $("#color").show()        //hide color label
  $("div > label[for='color']").show()

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
  hideColors()
})

//hide  the "color" label and select menu until a design is selected from the design menu
function hideColors(){
  if($('#design').val() == 'Select Theme'){       //if design value == default
    $("#color").hide()        //hide color label
    $("div > label[for='color']").hide()        //hide color select menu
  }
}

//REGISTER FOR ACTIVITIES SECTION
list.on('click', function(){        //when user clicks an input
  noTimeConflict()        //hide conflicting activities
  if(this == list[0] && this.checked){        //when main conference is clicked
    priceUpdate(200)        //add $200 to the total
    checked += 1        //store # of activities
  } else if (this.checked){       //otherwise add $100
    priceUpdate(100)        //add $100 to the total
    checked += 1        //store # of activities
  } else if (this == list[0]){        //and if choice is unchecked, remove the cost, remove from var checked
    priceUpdate(-200)         //remove $100 to the total
    checked -= 1        //update # of activities
  } else {
    priceUpdate(-100)       //remove $100 to the total
    checked -= 1        //update # of activities
  }
})

function noTimeConflict(){
  //If the user clicks a class,
  //disable all events with confliction times
  if( $(list[1]).prop("checked") == true ){         //if 1 is checked,
    $(list[3]).prop("disabled", true)       //disable 3
  } else {          //else
    $(list[3]).prop("disabled", false)         //enable 3
  }
  if( $(list[2]).prop("checked") == true){        //if 2 is checked,
    $(list[4]).prop("disabled", true)       //disable 4
  } else {        //else
    $(list[4]).prop("disabled", false)        //enable 4
  }
  if( $(list[3]).prop("checked") == true ){       //if 3 is checked,
    $(list[1]).prop("disabled", true)       //disable 1
  } else {        //else
    $(list[1]).prop("disabled", false)        //enable 1
  }
  if( $(list[4]).prop("checked") == true ){       //if 4 is checked,
    $(list[2]).prop("disabled", true)       //disable 2
  } else {        //else
    $(list[2]).prop("disabled", false)        //enable 2
  }
}

function priceUpdate(cost) {        //calculate total cost
  total += cost       //update the current total with selected value
  $('#total').remove()        //remove the current total from the page
  $("#activities").append("<span id='total'>Total: $" + total + "</span>")        //add updated total to the page
}

function paymentUpdate() {          //update payment info on pageload
  $("#payment").val("credit card")        //set default payment method
  $("#payPal").hide()       //hide paypal info
  $("#bitCoin").hide()        //hide bitcoin info
}

$("#payment").on('change', function(){        //function to update payment info

  if(this.value == "credit card"){        //when credit card is selected, hide others

    $("#credit-card").fadeIn()
    $("#payPal").fadeOut()
    $("#bitCoin").fadeOut()
    paymentOption = "credit card"       //set payment option

  } else if(this.value == "paypal"){        //when paypal is selected, hide others

    $("#payPal").fadeIn()
    $("#credit-card").fadeOut()
    $("#bitCoin").fadeOut()
    paymentOption = "paypal"       //set payment option

  } else if (this.value == "bitcoin"){        //when bitcoin is selected, hide others

    $("#bitCoin").fadeIn()
    $("#credit-card").fadeOut()
    $("#payPal").fadeOut()
    paymentOption = "bitcoin"       //set payment option

  }
})

//FORM VALIDATION
function validate(){
  //NAME INPUT VALIDATOR

  if (nameInput.val().length == null){       //if name input is empty
    nameLabel.css("color", "red")       //set error color
    nameLabel.text("Name: Please provide your name")        //set error message
    event.preventDefault()
  } else {
    nameLabel.css("color", "#000")       //undo error color
    nameLabel.text("Name: ")        //undo error message
  }

  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(!emailInput.val())){
    emailLabel.css("color", "red")
    emailLabel.text("Email: Please enter a valid email adress")
    console.log(false)
    event.preventDefault()
  } else {
    emailLabel.css("color", "#000")
    emailLabel.text("Email: ")
    console.log(true)
  }


  //at least on activity should be selected in the "Register for Activities" section
  if(checked == 0){
    $("fieldset.activities > legend").text("Register for Activities: Please select an activity")
    event.preventDefault()
  }

  //PAYMENT INPUT VALIDATOR
  if(paymentOption == "credit card" && $("#cc-num").val().length == null){
    ccNumLabel.css("color", "red")
    ccNumLabel.text("Card Number: Please enter a card number")
    event.preventDefault()
  } else if(paymentOption == "credit card" && $("#cc-num").val().length < 16){
    ccNumLabel.css("color", "red")
    ccNumLabel.text("Card Number: Your card number must be 16 digits long")
    event.preventDefault()
  } else {
    ccNumLabel.css("color", "#000")
    ccNumLabel.text("Card Number: ")
  }

  //zipcode field should accept a 5 digit number
  if(paymentOption == "credit card" && $("#zip").val().length !== 5){
    zipLabel.css("color", "red")
    zipLabel.text("Zip Code: Please enter your 5 digit zip code")
    event.preventDefault()
  } else {
    zipLabel.css("color", "#000")
    zipLabel.text("Zip Code: ")
  }

  //the CVV field should accept a 3 digit number
  if(paymentOption == "credit card" && $("#cvv").val().length !== 3){
    cvvLabel.css("color", "red")
    cvvLabel.text("CVV: Please enter your 3 digit number")
    event.preventDefault()
  } else {
    cvvLabel.css("color", "#000")
    cvvLabel.text("CVV: ")
  }
}



//PAGE LOAD AND SUBMIT
$(":button").on("click", validate)        //validate form on submit
window.addEventListener('load', setFocus)       //on page load, run function
function setFocus() {
  $("#name").focus()       //set page focus to name input
  paymentUpdate()       //show only credit card payment info
  hideColors()
}
