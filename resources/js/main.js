import * as PortfolioData from '../data/data.js';
import * as FormProperties from '../data/labels.js';
import './extensions.string.js';
import './extensions.array.js';
import { transformLabel } from './labels.helpers.js';
import { normalizeSkills } from './skills-normalize.js';

const COOKIES = {
    SelectedLanguage: "SELECTED_LANG",
    Theme: "THEME"
};

const LANGUAGES = {
    French: "FR",
    English: "EN"
}

const THEMES = { Light: "light", Dark: "dark" };

$(document).ready(() => {

    initTheme();
    reset();

/* ------------------------------------------- events --------------------------------------------- */
    $( "#menu-icon" ).on( "click", function() { menuIcononclick(); });

    $('#flag-FR').click(function() { 
        setCookie(COOKIES.SelectedLanguage, LANGUAGES.French, 1); 
        reset();
    });
    $('#flag-EN').click(function() { 
        setCookie(COOKIES.SelectedLanguage, LANGUAGES.English, 1); 
        reset();
    });

    $('#theme-toggle').on('click', () => {
        const current = getCookie(COOKIES.Theme) || THEMES.Dark;
        const next = current === THEMES.Light ? THEMES.Dark : THEMES.Light;
        applyTheme(next);
        $('#theme-toggle').attr('aria-pressed', next === THEMES.Light);
    });

});

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme === THEMES.Light ? 'light' : '');
  setCookie(COOKIES.Theme, theme, 365);
};

const initTheme = () => {
  let saved = getCookie(COOKIES.Theme);
  if (!saved) {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    saved = prefersLight ? THEMES.Light : THEMES.Dark;
  }
  applyTheme(saved);
  const pressed = saved === THEMES.Light;
  $('#theme-toggle').attr('aria-pressed', pressed);
};

/* ---------------------------------------------- toggle icon navbar -------------------------------------- */
 
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

const reset = () => {
    let lang = getCookie(COOKIES.SelectedLanguage);

    lang ??= LANGUAGES.French;
    $('#mn-hom').html(FormProperties.labels.menu.home.find(e => e.lang === lang).value);
    $('#mn-abo').html(FormProperties.labels.menu.about.find(e => e.lang === lang).value);
    $('#mn-edu').html(FormProperties.labels.menu.education.find(e => e.lang === lang).value);
    $('#mn-ski').html(FormProperties.labels.menu.skills.find(e => e.lang === lang).value);
    $('#mn-ser').html(FormProperties.labels.menu.services.find(e => e.lang === lang).value);
    $('#mn-tes').html(FormProperties.labels.menu.testimonials.find(e => e.lang === lang).value);
    $('#mn-exp').html(FormProperties.labels.menu.experiences.find(e => e.lang === lang).value);
    $('#mn-con').html(FormProperties.labels.menu.contact.find(e => e.lang === lang).value);

    $('#dwn_cv').html(FormProperties.labels.home.download_profile.find(e => e.lang === lang).value);
    $('#cnt_me').html(FormProperties.labels.home.contact_me.find(e => e.lang === lang).value);

    $('#contact .heading').html(shape(FormProperties.labels.contact.header.find(e => e.lang === lang).value, lang));
    $('.form-contact .btn').val(shape(FormProperties.labels.contact.btn.find(e => e.lang === lang).value, lang));

    $('footer .footer-text span').html(shape(FormProperties.labels.footer.all_rights.find(e => e.lang === lang).value, lang));
    $('footer #links h2').html(shape(FormProperties.labels.footer.links.find(e => e.lang === lang).value, lang));
    $('footer #cv h2').html(shape(FormProperties.labels.footer.cv_cpr.find(e => e.lang === lang).value, lang));
    $('footer #cvplus h2').html(shape(FormProperties.labels.footer.cv_plus.find(e => e.lang === lang).value, lang));
    $('footer #cv-dev h2').html(shape(FormProperties.labels.footer.cv_dev.find(e => e.lang === lang).value, lang));
    $('footer #cvplus-dev h2').html(shape(FormProperties.labels.footer.cv_dev_plus.find(e => e.lang === lang).value, lang));
    $('footer #references h2').html(shape(FormProperties.labels.footer.references.find(e => e.lang === lang).value, lang));

    $("footer #cv a.doc").attr("href", FormProperties.labels.footer.cv_cpr_doc.find(e => e.lang === lang).value);
    $("footer #cv a.pdf").attr("href", FormProperties.labels.footer.cv_cpr_pdf.find(e => e.lang === lang).value);
    $("footer #cvplus a.doc").attr("href", FormProperties.labels.footer.cv_cpr_plus_doc.find(e => e.lang === lang).value);
    $("footer #cvplus a.pdf").attr("href", FormProperties.labels.footer.cv_cpr_plus_pdf.find(e => e.lang === lang).value);
    
    $("footer #cv-dev a.doc").attr("href", FormProperties.labels.footer.cv_dev_doc.find(e => e.lang === lang).value);
    $("footer #cv-dev a.pdf").attr("href", FormProperties.labels.footer.cv_dev_pdf.find(e => e.lang === lang).value);
    $("footer #cvplus-dev a.doc").attr("href", FormProperties.labels.footer.cv_dev_plus_doc.find(e => e.lang === lang).value);
    $("footer #cvplus-dev a.pdf").attr("href", FormProperties.labels.footer.cv_dev_plus_pdf.find(e => e.lang === lang).value);
    
    var indentityIntro = PortfolioData.identity.intro.find(e => e.lang === lang);
    $('#home .home-content p').html(shape(indentityIntro.profile, lang));
    $('#about .about-content p').html(shape(indentityIntro.about, lang));
    $('#about .about-content ul').html(doList(indentityIntro.qualities, lang));
    $('#about .heading').html(shape(FormProperties.labels.about.header.find(e => e.lang === lang).value, lang));

    $('#skills .heading').html(shape(FormProperties.labels.skills.header.find(e => e.lang === lang).value, lang));
    $('#skills #skills-root').html(shape_skills(PortfolioData.skills));

    $('#school-box').html(shape_schools(PortfolioData.education.schools, lang));
    $('#language-box').html(shape_languages(PortfolioData.education.languages.filter(e => e.lang === lang)));
    $('#education .heading').html(shape(FormProperties.labels.education.header.find(e => e.lang === lang).value, lang));
    $('#education-label').html(shape(FormProperties.labels.education.education_label.find(e => e.lang === lang).value, lang));
    $('#language-label').html(shape(FormProperties.labels.education.language_label.find(e => e.lang === lang).value, lang));

    $('.services-container').html(shape_services(PortfolioData.services.filter(e => e.lang === lang)));
    $('#services .heading').html(shape(FormProperties.labels.services.header.find(e => e.lang === lang).value, lang));
    $('#services .services-box .btn').html(shape(FormProperties.labels.services.btn.find(e => e.lang === lang).value, lang));

    $('#portfolio-web .portfolio-container').html(shape_portfolios(PortfolioData.web_portfolios, lang));
    $('#portfolio-web .heading').html(shape(FormProperties.labels.web_portfolios.header.find(e => e.lang === lang).value, lang));

    $('#portfolio-api .portfolio-container').html(shape_portfolios(PortfolioData.api_portfolios, lang));
    $('#portfolio-api .heading').html(shape(FormProperties.labels.api_portfolios.header.find(e => e.lang === lang).value, lang));

    $('#portfolio-pro .portfolio-container').html(shape_pro_portfolios(PortfolioData.pro_portfolios, lang));
    $('#portfolio-pro .heading').html(shape(FormProperties.labels.pro_portfolios.header.find(e => e.lang === lang).value, lang));

    $('#testimony .heading').html(shape(FormProperties.labels.testimonials.header.find(e => e.lang === lang).value, lang));
    $('.testimony-container').html(shape_testimonials(PortfolioData.testimonials.find(e => e.lang === lang).words));

    $('#experiences .heading').html(shape(FormProperties.labels.experiences.header.find(e => e.lang === lang).value, lang));
    $('#experiences .experiences-row').html(shape_experiences(PortfolioData.experiences, FormProperties.labels.experiences.box.find(e => e.lang === lang), lang));
}

const shape = (str, currentLang) => {
    let clone = transformLabel(str, { locale: currentLang === 'EN' ? 'en-US' : 'fr-FR' });
    return clone;
}

const doList = (items) => {
    var result = '';

    items.forEach(item => result += `<li>${item}</li>`);

    return result;
}

const menuIcononclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/* ========================= SKILLS (dynamic) =========================
   - Reproduit exactement ta structure HTML : skills-row > 2 x skills-columns
   - Conserve les mêmes IDs (js, htmlcss, wf, azure, azurecloud, etc.)
   - Les barres & effets CSS restent basés sur les IDs.
==================================================================== */

const skillBoxTpl = (id, topics, workmanship) => `
  <div id="${id}" class="skills-box">
    <div class="skills-content">
      <div class="progress">
        <h3>${topics} <span>${workmanship}%</span></h3>
        <div class="bar"><span></span></div>
      </div>
    </div>
  </div>
`;

const skillsColumnTpl = (title, boxesHtml) => `
  <div class="skills-columns">
    <h3 class="title">${title}</h3>
    ${boxesHtml}
  </div>
`;

const skillsRowTpl = (leftColHtml, rightColHtml = '<div class="skills-columns">&nbsp;</div>') => `
  <div class="skills-row">
    ${leftColHtml}
    ${rightColHtml}
  </div>
`;

const shape_skills = (groups /* PortfolioData.skills */) => {
  const items = [...groups]; // pas de mutation
  let html = '';

  for (let i = 0; i < items.length; i += 2) {
    const left = items[i];
    const right = items[i + 1];

    const leftBoxes = left.content.map(s => skillBoxTpl(s.id, s.topics, s.workmanship)).join('');
    const leftCol = skillsColumnTpl(left.name, leftBoxes);

    let rightCol = '<div class="skills-columns">&nbsp;</div>';
    if (right) {
      const rightBoxes = right.content.map(s => skillBoxTpl(s.id, s.topics, s.workmanship)).join('');
      rightCol = skillsColumnTpl(right.name, rightBoxes);
    }

    html += skillsRowTpl(leftCol, rightCol);
  }

  return html;
};

/* ---------------------------------------------- schools -------------------------------------- */
const shape_schools = (items, lang) => {
    var result = '';

    items.forEach(e => {
        let diploma = e.diploma.find(k => k.lang === lang);
        result += school_box.replace('{year}', e.graduation_year)
        .replace('{diploma}', diploma.name)
        .replace('{school}', e.name)
        .replace('{place}', `${e.place.city}, ${e.place.country}`);
    });

    return result;
}

const shape_languages = (items) => {
    var result = '';

    items.forEach(e => {
        result += language_box.replace('{flag}', `resources/img/${e.icon}`)
        .replace('{tongue}', e.wormanship);
    });

    return result;
}

const shape_services = (items) => {
    var result = '';

    items.forEach(e => {
        result += service_box.replace('{icon}', e.icon)
        .replace('{name}', e.name)
        .replace('{description}', e.description);
    });

    return result;
}

const shape_portfolios = (items, lang) => {
    var result = '';

    items.forEach(e => {
        let description = e.description.find(k => k.lang === lang);
        result += portfolio_box.replace('{image}', `resources/img/${e.image}`)
        .replace('{url}', e.url)
        .replace('{name}', e.name)
        .replace('{description}', description.value);
    });

    return result;
}

const shape_pro_portfolios = (items, lang) => {
    var result = '';

    items.forEach(e => {
        let description = e.keywords.find(k => k.lang === lang);
        result += pro_portfolio_box.replace('{image}', `resources/img/${e.image}`)
        .replace('{name}', e.name)
        .replace('{years}', e.years.join(', '))
        .replace('{keywords}', description.value);
    });
    return result;
}

const shape_testimonials = (items) => {
    var result = '';

    items.forEach(e => {
        result += testimony_box.replace('{testimony_quote}', e.quote)
        .replace('{author_name}', e.author_name)
        .replace('{author_role}', e.author_role)
        .replace('{work_period}', e.work_period)
        .replace('{company_name}', e.company_name)
        .replace('{company_acronym}', e.company_acronym);
    });

    return result;
}

const shape_experiences = (items, labels, lang) => {
    var result = '';
    console.log(items);
    items.forEach(e => {
        let place = e.place.find(k => k.lang === lang);
        let role = e.role.find(k => k.lang === lang);
        let achievements = e.achievements.find(k => k.lang === lang);
        let professions = e.profession.find(k => k.lang === lang);

        result += experience_box.replace('{company_image}', e.company_image)
            .replace('{company_name}', e.company_name)
            .replace('{company_city}', place.city)
            .replace('{company_country}', place.country)
            .replace('{from_year}', e.period.from_year)
            .replace('{from_month}', e.period.from_month)
            .replace('{to_year}', e.period.to_year)
            .replace('{to_month}', e.period.to_month)
            .replace('{role}', role.value)
            .replace('{achievements}', achievements.value)
            .replace('{highlights}', e.highlights)
            .replace('{profession}', professions.value)
            .replace('{tools}', e.tools.join(', '))
            .replace('{lb_more}', labels.more)
            .replace('{lb_tools}', labels.tools)
            .replace('{lb_profession}', labels.professions);
    });
    return result;
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

for (var i = 0; i < navLinks.length ; i++) {
    navLinks[i].addEventListener("click", 
        function () {
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
            // place pour état actif du menu si besoin
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
const get_keywords = () => {
    let lang = getCookie(COOKIES.SelectedLanguage);

    lang ??= LANGUAGES.French;
    return PortfolioData.identity.intro.find(e => e.lang === lang).keywords;
}

const reset_typed = () => {
    var typed = new Typed('#profiles', {
        strings: get_keywords(),
        typeSpeed: 50,
        backSpeed: 70,
        backDelay: 1000,
        loop: true
      });
}

var typed = new Typed('#profiles', {
    strings: PortfolioData.identity.keywords.shuffle(),
    typeSpeed: 50,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});

const school_box = `
                        <div class="education-content">
                            <div class="content">
                                <div class="year"><i class="fa-solid fa-calendar-days"></i><span>{year}</span></div>
                                <h3><span class="diploma">{diploma}</span> - <span class="school">{school}</span> | <span class="place">{place}</span></h3>
                            </div>
                        </div>
`;

const language_box = `
                        <div class="education-content">
                            <div class="content">
                                <div class="language">
                                    <img class="flag" src="{flag}" />
                                    <span>{tongue}</span>
                                </div>
                            </div>
                        </div>
`;

const service_box = `
                <div class="services-box">
                    <i class="{icon}"></i>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <a href="#portfolio-web" class="btn"></a>
                </div>
`;

const portfolio_box = `
                <div class="portfolio-box">
                    <img src="{image}" alt="" srcset="">
                    <div class="portfolio-layer">
                        <h4>{name}</h4>
                        <p>{description}</p>
                        <a href="{url}" target="_blank" rel="noopener" rel="noreferrer">
                            <i class="fa-solid fa-up-right-from-square"></i>
                        </a>
                    </div>
                </div>
`;

const pro_portfolio_box = `
                <div class="portfolio-box">
                    <img src="{image}" alt="" srcset="">
                    <div class="portfolio-layer">
                        <h4>{name}</h4>
                        <p>{keywords}</p>
                        <p>{years}</p>
                    </div>
                </div>
`;

const testimony_box = `
<div class="testimony-box">
    <div class="testimony-quote">
        <blockquote>{testimony_quote}</blockquote>
    </div>
    <div class="testimony-author">
        <span class="author-name"><cite>{author_name},</cite></span>
        <span class="author-role">{author_role},</span>
        <span class="date">{work_period} - </span><abbr title="{company_name}">{company_acronym}</abbr>
    </div>
</div>
`;

const experience_box = `
<div class="experiences-column">
    <div class="card-container">
        <div class="card">
            <div class="card-front">
                <img src="resources/img/{company_image}" alt="" srcset="">
                <div class="company-name"><i class="fa-solid fa-building"></i>{company_name}</div>
                <div class="company-location"><i class="fa-solid fa-location-pin"></i>{company_city}, {company_country}</div>
                <div class="duration"><i class="fa-solid fa-calendar-days"></i><span>{from_year}/{from_month} - {to_year}/{to_month}</span></div>
                <div class="role"><i class="fa-solid fa-user"></i><span>{role}</span></div>
            </div>
            <div class="card-back">
                <div class="top">
                    <div>{achievements}</div>
                    {highlights}
                </div>
                <div class="bottom">
                    <div class="tools">
                        <span class="key">{lb_tools}</span>
                        <span class="value">{tools}</span>
                    </div>
                    <div class="profession">
                        <span class="key">{lb_profession}</span>
                        <span class="value">{profession}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
