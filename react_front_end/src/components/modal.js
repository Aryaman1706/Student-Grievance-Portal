
  $(document).ready(function(){
    // Init Carousel
    $('.carousel').carousel();

    // Init Carousel Slider
    $('.carousel.carousel-slider').carousel({fullWidth:true});

    // Fire off toast
    //Materialize.toast('Hello World', 3000);

    // Init Slider
    $('.slider').slider();

    // Init Modal
    $('.modal').modal();

    // Init Sidenav
    $('.button-collapse').sideNav();
  });
