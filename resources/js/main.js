// import * as PortfolioData from '../data/data.js';
import * as FormProperties from '../data/labels.js';
import './extensions.string.js';

const COOKIES = {
    SelectedLanguage: "SELECTED_LANG",
};

const LANGUAGES = {
    French: "FR",
    English: "EN"
}

const KEYWORDS = {
    Span: "_span_",
    NewLine: "_br_",
    Capital: "_cap_",
    Upper: "_upr_",
    Lower: "_lwr_",
};

$(document).ready(() => {

    reset();
    $('#flag-FR').click(function() { 
        setCookie(COOKIES.SelectedLanguage, LANGUAGES.French, 1); 
        reset();
    });
    $('#flag-EN').click(function() { 
        setCookie(COOKIES.SelectedLanguage, LANGUAGES.English, 1); 
        reset();
    });
});
/* ---------------------------------------------- toggle icon navbar -------------------------------------- */
 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

const reset = () => {
    let lang = getCookie(COOKIES.SelectedLanguage);

    lang ??= LANGUAGES.French;
    $('#mn-hom').html(FormProperties.labels.menu.home.find(e => e.lang == lang).value);
    $('#mn-abo').html(FormProperties.labels.menu.about.find(e => e.lang == lang).value);
    $('#mn-edu').html(FormProperties.labels.menu.education.find(e => e.lang == lang).value);
    $('#mn-ski').html(FormProperties.labels.menu.skills.find(e => e.lang == lang).value);
    $('#mn-ser').html(FormProperties.labels.menu.services.find(e => e.lang == lang).value);
    $('#mn-tes').html(FormProperties.labels.menu.testimonials.find(e => e.lang == lang).value);
    $('#mn-exp').html(FormProperties.labels.menu.experiences.find(e => e.lang == lang).value);
    $('#mn-con').html(FormProperties.labels.menu.contact.find(e => e.lang == lang).value);

    $('#dwn_cv').html(FormProperties.labels.home.download_profile.find(e => e.lang == lang).value);
    $('#cnt_me').html(FormProperties.labels.home.contact_me.find(e => e.lang == lang).value);

    $('#about .heading').html(shape(FormProperties.labels.about.header.find(e => e.lang == lang).value));
    $('#skills .heading').html(shape(FormProperties.labels.skills.header.find(e => e.lang == lang).value));

    $('#education .heading').html(shape(FormProperties.labels.education.header.find(e => e.lang == lang).value));
    $('#services .heading').html(shape(FormProperties.labels.services.header.find(e => e.lang == lang).value));
    $('#services .services-box .btn').html(shape(FormProperties.labels.services.btn.find(e => e.lang == lang).value));
    $('#portfolio-web .heading').html(shape(FormProperties.labels.portfolio_web.header.find(e => e.lang == lang).value));
    $('#portfolio-api .heading').html(shape(FormProperties.labels.portfolio_api.header.find(e => e.lang == lang).value));
    $('#portfolio-projects .heading').html(shape(FormProperties.labels.portfolio_pro.header.find(e => e.lang == lang).value));
    $('#testimony .heading').html(shape(FormProperties.labels.testimonials.header.find(e => e.lang == lang).value));
    $('#experiences .heading').html(shape(FormProperties.labels.experiences.header.find(e => e.lang == lang).value));
    $('#contact .heading').html(shape(FormProperties.labels.contact.header.find(e => e.lang == lang).value));
    $('.form-contact .btn').val(shape(FormProperties.labels.contact.btn.find(e => e.lang == lang).value));

    $('#links h2').html(shape(FormProperties.labels.footer.links.find(e => e.lang == lang).value));
    $('#cv h2').html(shape(FormProperties.labels.footer.cv.find(e => e.lang == lang).value));
    $('#cvplus h2').html(shape(FormProperties.labels.footer.cv_plus.find(e => e.lang == lang).value));
    $('#references h2').html(shape(FormProperties.labels.footer.references.find(e => e.lang == lang).value));
    $('.footer-text span').html(shape(FormProperties.labels.footer.all_rights.find(e => e.lang == lang).value));

    $("#cv a.doc").attr("href", FormProperties.labels.footer.cv_doc.find(e => e.lang == lang).value)
    $("#cv a.pdf").attr("href", FormProperties.labels.footer.cv_pdf.find(e => e.lang == lang).value)
    $("#cvplus a.doc").attr("href", FormProperties.labels.footer.cv_plus_doc.find(e => e.lang == lang).value)
    $("#cvplus a.pdf").attr("href", FormProperties.labels.footer.cv_plus_pdf.find(e => e.lang == lang).value)
}

const shape = (str) => {

    let words = str.split(' ');
    let clone = str;

    words.forEach(w => {
        // if (w.includes(KEYWORDS.Capital)) {
        //     let clone_w = w;
        //     console.log(clone_w)
        //     clone_w = clone_w.replace(KEYWORDS.Capital, '').capitalize();
        //     clone = clone.replace(w, clone_w);
        //     console.log(clone_w)
        //     console.log(clone)
        // }
        // console.log(clone_w)
        if (w.includes(KEYWORDS.Span)) {
            let clone_w = w;
            clone = clone.replace(clone_w, `<span>${clone_w.replace(KEYWORDS.Span, '')}</span>`);
            // console.log(clone)
        }
        // if (w.includes(KEYWORDS.Span)) {
        //     clone = clone.replace(w, `<span>${w.replace(KEYWORDS.Span, '')}</span>`);
        //     // console.log(clone)
        // }
        // if (w.includes(KEYWORDS.Span)) {
        //     clone = clone.replace(w, `<span>${w.replace(KEYWORDS.Span, '')}</span>`);
        //     // console.log(clone)
        // }
    });

    return clone;
}

const menuIcononclick = () => {
    // alert('meun clicked');
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

// Cookies Start ----------------------------------------------------------------------------------
export const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return null;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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