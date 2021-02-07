$(document).ready(function() {

  $('.modal-login-btn').on('click', () => {
    $('.modal-bg3').addClass('bg-active');
  });

  $('.modal-login-close').on('click', () => {
    $('.modal-bg3').removeClass('bg-active');
  });

  $('.reg-btn').on('click', () => {
    $('.modal-bg3').removeClass('bg-active');
    $('.modal-bg4').addClass('bg-active');
  });

  $('.modal-register-close').on('click', () => {
    $('.modal-bg4').removeClass('bg-active');
  });

});
