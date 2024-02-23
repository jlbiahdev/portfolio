function sendEmail() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let subject = document.getElementById('subject').value;
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
            Subject : '[Portfolio] : ' + subject,
            Body : '<strong>Name :</strong> ' + name
                    + '<br /> <strong>Sender Email :</strong> ' + email
                    + '<br /> <strong>Phone :</strong> ' + phone
                    + '<br /> <strong>Message:</strong> <br />' + msg
        })
        .then(message => alert(message))
        .catch(err => alert(err));
}
  