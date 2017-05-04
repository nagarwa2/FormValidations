$.fn.initFieldValidations = function(){
  var formId = "";
	if(arguments.length === 1){
    	formId = arguments[0];
  }
  $(formId + " input[type=text]").change(function(){
    doFieldValidations(this,true);
  });
  $(formId + " input[type=text]").each(function(){
    doFieldValidations(this,true);
  });
  $(formId + " select[data-validate=true]").each(function(){
    doFieldValidations(this,true);
  });
  $(formId + " select[data-validate=true]").change(function(){
    doFieldValidations(this,true);
  });
}

function doFieldValidations(object,isUserChanged){    
    var allClasses = $(object).attr("class");
    var errorMessage = "";
    if(allClasses.indexOf("aLength") >= 0){
        var removedClassName = allClasses.substring(allClasses.indexOf("aLength"),allClasses.length); 
        removedClassName = removedClassName.substring(removedClassName.indexOf("aLength"),removedClassName.indexOf(' '));
        var allowedLength = removedClassName.substring(removedClassName.indexOf("aLength") + 7,allClasses.indexOf(' '));
        if($(object).val().length > allowedLength){
            errorMessage = errorMessage + "Max length(" + allowedLength + ") exeeded.<br/>";
        }
    }
    if(allClasses.indexOf("aMin") >= 0){
        var removedClassName = allClasses.substring(allClasses.indexOf("aMin"),allClasses.length); 
        removedClassName = removedClassName.substring(removedClassName.indexOf("aMin"),removedClassName.indexOf(' '));
        var allowedLength = removedClassName.substring(removedClassName.indexOf("aMin") + 4,allClasses.indexOf(' '));
        if($(object).val().length < allowedLength && allClasses.indexOf("aNumber") >= 0){
            errorMessage = errorMessage + "Minimum (" + allowedLength + ") digits required.<br/>";
        }
        else if($(object).val().length < allowedLength){
            errorMessage = errorMessage + "Minimum (" + allowedLength + ") characters required.<br/>";
        }
    }
    if(allClasses.indexOf("aInteger") >= 0){
        if(Number($(object).val()) > 2147483647){
            errorMessage = errorMessage + "Invalid integer value.<br/>";
        }
    }

    /* Old regex - ^\\d{5}(-\\d{4})?$ */
    if(allClasses.indexOf("aZip") >= 0){
        var zipRegex = /^\d{5}(?:[-\s]\d{4})?$/; 
        if(zipRegex.test($(object).val()) == false){
            errorMessage = errorMessage + "Zip Code is not valid.<br/>";
        }
    }
    /* Old regex  - /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/ */
    if(allClasses.indexOf("aPhone") >= 0){
        var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; 
        if(phoneRegex.test($(object).val()) == false && $(object).val() != ""){
            errorMessage = errorMessage + "Phone Number is not valid.<br/>";
        }
    }
    if(allClasses.indexOf("aEmail") >= 0){
        var emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|bank|museum|int|edu)\b/;
        if($(object).val() != "" && emailRegex.test($(object).val().toLowerCase()) == false){
            errorMessage = errorMessage + "Email is not valid.<br/>";
        }
    }
    if(allClasses.indexOf("aNumber") >= 0){
        var numberRegex = /^[0-9]*$/gi;
        if(numberRegex.test($(object).val()) == false){
            errorMessage = errorMessage + "Please enter only Numbers.<br/>";
        }
    }
    if(allClasses.indexOf("aSSN") >= 0){
        var ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/gi;
        if(ssnRegex.test($(object).val()) == false){
            errorMessage = errorMessage + "Please enter valid SSN number.<br/>";
        }
    }
    if(allClasses.indexOf("aTIN") >= 0){
        var tinRegex = /^\d{2}-?\d{7}$/gi;
        if(tinRegex.test($(object).val()) == false){
            errorMessage = errorMessage + "Please enter valid TIN number.<br/>";
        }
    }
    if(allClasses.indexOf("aBlank") >= 0){
        if($(object).val() == ""){
            errorMessage = errorMessage + "Please enter a value.<br/>";
        }
    }
    if(allClasses.indexOf("aNotZero") >= 0){
        if(Number($(object).val().replace(/\$|\%|\,|\./ig,'')) == 0){
            errorMessage = errorMessage + "Please enter a value greater than 0.<br/>";
        }
    }
    if(allClasses.indexOf("aCharacter") >= 0){
        var characterRegex = /^[a-z A-Z]+$/gi;
        if(characterRegex.test($(object).val()) == false){
            errorMessage = errorMessage + "Please enter only Characters.<br/>";
        }
    }
    if(allClasses.indexOf("aCity") >= 0){
        var characterRegex = /^[a-z A-Z .]+$/gi;
        if(characterRegex.test($(object).val()) == false){
            errorMessage = errorMessage + "Please enter only Characters.<br/>";
        }
    }
    if(allClasses.indexOf("aNotRequired") >= 0 && $(object).val() == ""){
        errorMessage = "";
    }
    var changedBySystem = false;
    if($(object).parent().hasClass("touched-warning")){
        changedBySystem = true;
    }
    $(object).parentsUntil("div.aForm").parent().find(".aFormButton").attr("disabled",false);
    $(object).parent().find(".reference-text").remove();
    $(object).parent().removeClass("error-field");
    $(object).parent().removeClass("touched-warning");
    if(errorMessage != ""){
        $(object).parent().addClass("error-field");
        $(object).parent().append("<div class='reference-text' style='width:150px;'>"  + errorMessage + "</div>");
    }
    else if(isUserChanged == true || changedBySystem == true){
        $(object).parent().addClass("touched-warning");
    }

    if($(object).parentsUntil("div.aForm").parent().find(".reference-text").length > 0) {
      $(object).parentsUntil("div.aForm").parent().find(".aFormButton").attr("disabled",true);
    }
}
