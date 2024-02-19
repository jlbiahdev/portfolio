/* ---------------------------------------------- toggle icon navbar -------------------------------------- */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

const menuIcononclick = () => {
    // alert('meun clicked');
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/* ---------------------------------------------- scroll -------------------------------------- */

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

console.log(navLinks);
for (var i = 0; i < navLinks.length ; i++) {
    navLinks[i].addEventListener("click", 
        function (event) {
            // event.preventDefault();
            menuIcon.classList.remove('fa-xmark');
            navbar.classList.remove('active');
        },
        false);
}
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // navLinks.forEach.apply(links => {
            //     links.classList.remove('active');
            //     document.querySelector('header nav a [href*=' + id + ']').classList.add('active');
            // });
        }
    });
}

/* ---------------------------------------------- sticky navbar -------------------------------------- */

let header = document.querySelector('header');
header.classList.toggle('sticky', window.scrollY > 100);

/* ---------------------------------------------- remove toggle icon & navbar -------------------------------------- */
menuIcon.classList.remove('fa-xmark');
navbar.classList.remove('active');

/* ---------------------------------------------- ScrollReveal -------------------------------------- */

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
ScrollReveal().reveal('.services-container, .portfolio-box, .experiences-column', { origin: 'bottom'});
ScrollReveal().reveal('#mailform', { origin: 'left'});

/* ---------------------------------------------- TypedJs -------------------------------------- */
var typed = new Typed('#profiles', {
    strings: ['Chef de projet', 'TechLead', 'Développeur FullStack'],
    typeSpeed: 50,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
  });