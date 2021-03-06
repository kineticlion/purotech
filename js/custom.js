//Smoothscroll
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        },1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

// GSAP
gsap.registerPlugin(ScrollTrigger);
gsap.fromTo("#purotech-img", { opacity: 0 }, { opacity: 1, duration: 2, ease: Power3.easeIn });
gsap.from("#story-img", { opacity: 0, y: 50, duration: 1, scrollTrigger: "#story-img" });
gsap.from("#vision-img", { opacity: 0, y: 50, duration: 1, scrollTrigger: "#vision-img" });
gsap.from("#tech-img", { opacity: 0, y: 50, duration: 1, scrollTrigger: "#tech-img" });

gsap.from(".email", { opacity: 0, duration: 1, scrollTrigger: ".email",ease: Power3.easeIn });
gsap.from(".telephone", { opacity: 0, duration: 1.5, scrollTrigger: ".telephone",ease: Power3.easeIn });
gsap.from(".address", { opacity: 0, duration: 2, scrollTrigger: ".address",ease: Power3.easeIn });

gsap.from("#fill", { opacity: 0, duration: 1, scrollTrigger: "#fill", ease: Power3.easeIn });

//SCROLL INDICATOR
easyScrollDots({
 fixedNav: true,
 fixedNavId: "main-nav",
 fixedNavUpward: true,
});


//STICKY NAV
$(() => {
 let previousScroll = $(document).scrollTop();
 $(window).scroll(() => {
  const navHeight = $("#main-nav").outerHeight();
  const newScroll = $(document).scrollTop();
  if (previousScroll < newScroll && previousScroll > navHeight) {
   $("#main-nav").fadeOut();
  } else {
   $("#main-nav").fadeIn();
  }
  previousScroll = $(document).scrollTop();
 });
});

//NAV MENU COLLAPSE
const toggleButton = document.getElementById("navbar-toggler");
const navLinks = document.querySelectorAll(".nav-item");
navLinks.forEach(link =>
 link.addEventListener("click", () => {
  if (window.innerWidth < 992) {
      toggleButton.click();
  }
 })
);

//FORM
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const comments = document.querySelector('#comments');
const formSubmitMessage = document.querySelector('#formSubmitMessage');
const form = document.querySelector("#mainForm");
const checkBoxes = document.querySelectorAll(".custom-control-input-black");

const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum|in|io)\b/;
const phonePattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const validate = (...inputs) => {
  let isValidated = true;

  inputs.forEach(input => {
    switch (input.id) {
      case 'firstName':
      case 'lastName':
        !input.value ? input.classList.add('error') : input.classList.remove('error');
        break;
      case 'email':
        input.value.match(emailPattern) === null || !input.value ? input.classList.add('error') : input.classList.remove('error');
        break;
      case 'phone':
        input.value.match(phonePattern) === null || !input.value ? input.classList.add('error') : input.classList.remove('error');
        break;
      case 'comments':
        !input.value ? input.classList.add('error') : input.classList.remove('error');
        break;
      default:
        return false;
    }
    if (input.classList.contains('error')) isValidated = false;
  })
  return isValidated;
}

const addListeners = (...inputs) => {
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      validate(input);
    })
  })
}

addListeners(firstName, lastName, email, phone, comments);

$('#mainForm').submit(function (e) {
  $(formSubmitMessage).fadeTo(1000, 1);
  e.preventDefault();
  const isValidated = validate(firstName, lastName, email, phone, comments);
  if (isValidated && grecaptcha.getResponse()) {
    const demosRequired = [
      { 'name': 'Puro Mobile', 'required': $('#puro-mobile').is(":checked") },
      { 'name': 'Puro Payment', 'required': $('#puro-payment').is(":checked") },
      { 'name': 'Puro Credit', 'required': $('#puro-credit').is(":checked") },
    ].filter(demo => demo.required).map(demo => demo.name).join(", ");
    
    const data = {
        'name': $('#firstName').val()+" "+$('#lastName').val(),
        'email': $('#email').val(),
        'contact': $('#phone').val(),
        'message': $('#comments').val(),
        'demo': demosRequired? demosRequired : "No",
        'subscription': $('#subscribe-newsletter').is(":checked") ? "Yes" : "No",
    };
    
    // POST data to the php file
    $.ajax({ 
        url: '../mail.php', 
        data: data,
        type: 'POST',
        success: function (data) {
          //  For Notification
          document.getElementById("mainForm").reset();
          
          if (data.error) {
            formSubmitMessage.innerHTML = "Unable to send request. Try again later..";
          }
          else {
            formSubmitMessage.innerHTML = "Thank You. Your Request has been submitted.";
          }
          grecaptcha.reset();
          $(formSubmitMessage).fadeTo(1000, 0);    
        }
    });
  } else {
    if (!isValidated) {
      formSubmitMessage.innerHTML = "Please complete the form before submitting.";  
      return;
    } 
    if (!grecaptcha.getResponse()) {
      formSubmitMessage.innerHTML = "Please comple captcha to submit request.";
    }
  }
  
});  