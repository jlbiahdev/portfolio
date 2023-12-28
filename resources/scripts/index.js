document.getElementById('mailform').classList.add('hide');

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

function openMailForm() {
  document.getElementById('mailform').classList.add('show'); 
}

function sendEmail() {
  // 
  Email.send({
      SecureToken : "962c8d01-d47d-4dd7-b0d1-9c987cd3bf01",
      To : "raheem.dev.cyrano@gmail.com",
      From : "contact.cyranoc@gmail.com",
      Subject : 'Contact from your portfolio',
      Body : "Name : " + document.getElementById("name").value
              + "<br /> Sender Email : " + document.getElementById("email").value
              + "<br /> Phone : " + document.getElementById("phone").value
              + "<br /> Message : <br />>" + document.getElementById("msg-body").value
  }).then(message => alert(message).catch(err => alert(err))
  );
  
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('msg-body').value = '';

  let item = document.getElementById('mailform');
  console.log('sendEmail');
  item.classList.add('hide'); 
  item.classList.remove('show');

  return true;
}