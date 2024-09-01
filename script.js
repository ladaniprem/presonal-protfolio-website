$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Front-end Developer", "Website Makers", "Talented Coder"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
        strings: ["Front-end Developers", "Website Makers", "Talented Coder"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});

// Cube and image overlay script
const cube = document.querySelector(".cube");
const cubeContainer = document.querySelector(".cube-container");
const imageOverlay = document.querySelector(".image-overlay");
let mouseX = 0;
let mouseY = 0;
let cubeX = 0;
let cubeY = 0;
let autoRotate = true;
let perspective = 1000;

// Function to rotate the cube automatically
function rotateCube() {
  if (autoRotate) {
    cubeX += 0.5;
    cubeY += 0.5;
    cube.style.transform = `rotateX(${cubeX}deg) rotateY(${cubeY}deg)`;
  }
  requestAnimationFrame(rotateCube);
}

document.addEventListener("mousemove", (e) => {
  autoRotate = false; // Stop auto rotation on mouse move
  mouseX = e.clientX;
  mouseY = e.clientY;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;

  cubeX = deltaY * 0.1;
  cubeY = deltaX * -0.1;

  cube.style.transform = `rotateX(${cubeX}deg) rotateY(${cubeY}deg)`;

  clearTimeout(resetRotation); // Clear the previous timer
  resetRotation = setTimeout(() => (autoRotate = true), 3000); // Reset auto rotation after 3 seconds
});

document.addEventListener("wheel", (e) => {
  perspective += e.deltaY * 0.5;
  perspective = Math.max(500, Math.min(2000, perspective)); // Limit the perspective to a range
  cubeContainer.style.perspective = `${perspective}px`;
});

// Add hover effect for cube faces
document.querySelectorAll(".face").forEach((face) => {
  face.addEventListener("mouseenter", (e) => {
    imageOverlay.style.backgroundImage = getComputedStyle(face).backgroundImage;
    imageOverlay.style.opacity = 0.2; // Make the overlay visible
  });

  face.addEventListener("mouseleave", () => {
    imageOverlay.style.opacity = 0; // Hide the overlay
  });
});

let resetRotation = setTimeout(() => (autoRotate = true), 3000); // Start auto rotation after 3 seconds

rotateCube(); // Initial call to start the rotation
