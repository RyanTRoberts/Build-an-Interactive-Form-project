window.addEventListener('load', setFocus)

function setFocus() {
  document.getElementById('name').focus()
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


//Set price variables for each activity
var list = document.getElementById('activities')
var first = $("input[name|='all']");
var second = $("input[name|='js-frameworks']");
var third = $("input[name|='js-libs']");
var fourth = $("input[name|='express']");
var fifth = $("input[name|='node']");
var sixth = $("input[name|='build-tools']");
var seventh = $("input[name|='npm']");


list.addEventListener('click', function(){
  noTimeConflict

})

function noTimeConflict(){
  var total = '';

  //If the user clicks a class,
  //disable all events with confliction times
  if( $(workshop).prop("checked") == true ){

    $(conflict).prop("disabled", true)
    priceUpdate(total, 100)
  } else {
    $(conflict).prop("disabled", false)
  }
  if( fourth.prop("checked") == true){
    second.prop("disabled", true)
    priceUpdate(total, 100)
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

function priceUpdate(total, cost) {
  total = total + cost
  $("#activities").append("<span>Total: $" + total + "</span>");
}
