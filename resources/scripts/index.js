var radio_fr = document.getElementById("flag-fr");
var radio_en = document.getElementById("flag-en");

radio_en.onchange = function() {
    console.log('radio_en.onchange')
  if (radio_en.checked === true) {
    //var elts = document.getElementsByClassName("french")
    
    document.querySelectorAll('.french').forEach(function(elt) {
        elt.classList.add('hide');
        elt.classList.remove('show');
    });
    
    document.querySelectorAll('.english').forEach(function(elt) {
        elt.classList.remove('hide');
        elt.classList.add('show');
    });
  }
}

radio_fr.onchange = function() {
    console.log('radio_fr.onchange')
  if (radio_fr.checked === true) {
    
    document.querySelectorAll('.french').forEach(function(elt) {
        elt.classList.remove('hide');
        elt.classList.add('show');
    });
    
    document.querySelectorAll('.english').forEach(function(elt) {
        elt.classList.add('hide');
        elt.classList.remove('show');
    });
  }
}