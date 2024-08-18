// document.getElementById('mailform').classList.add('hide');

var radio_fr = document.getElementById('flag-fr');
var radio_en = document.getElementById('flag-en');

radio_en.onchange = function() {
    console.log('radio_en.onchange')
  if (radio_en.checked === true) {
    //var elts = document.getElementsByClassName('french')
    
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
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let msg = document.getElementById('msg-body').value.replace(/\r?\n/g, '<br />');

  if (name === '' || name === undefined || name === null) {
    alert(`Name can't be empty`);
    return;
  }

  if (email === '' || email === undefined || email === null) {
    alert(`The email can't be empty`);
    return;
  }

  if (msg === '' || msg === undefined || msg === null) {
    alert(`The message body can't be empty`);
    return;
  }

  Email
  .send({
  SecureToken : 'f4985288-468e-4499-bd1b-338b7dfa3eb2',
  To : 'raheem.dev.cyrano@gmail.com',
      From : 'contact.cyranoc@gmail.com',
      Subject : '[Portfolio] New contact from your web page',
      Body : '<strong>Name :</strong> ' + name
              + '<br /> <strong>Sender Email :</strong> ' + email
              + '<br /> <strong>Phone :</strong> ' + phone
              + '<br /> <strong>Message:</strong> <br />' + msg
      })
  .then(message => alert(message))
  .catch(err => alert(err));
  
  let item = document.getElementById('mailform');
  console.log('sendEmail');
  item.classList.add('hide'); 
  item.classList.remove('show');
  }
