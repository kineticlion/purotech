//SMoothscroll
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
document.getElementById("mainForm").addEventListener("submit", e => {
 e.preventDefault();
 console.log("Form submitted");
});