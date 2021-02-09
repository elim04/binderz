$(function () {

  const showRegisterError = function(message) {
    $(".register_error").append(`<p>${message}</p>`);
    $(".register_error").slideDown("slow", function() {});
  }

  const clearRegisterError = function() {
    $(".register_error").empty();
    $(".register_error").css('display', 'none');
  }

  const clearRegisterInput = function () {
    $('.modal-register-content').find('input').each(function() {
      $(this).val('');
    })
  }

  $('main').on('submit', '.modal-register-form', function(event){
    event.preventDefault();
    clearRegisterError();
    const data = $(this).serialize();
    signUp(data)
    .done(res => {
      logIn(res)
        .then(data => changeNavOnLogin(data))

      $('.modal-bg4').removeClass('bg-active');
      clearRegisterInput();
    })
    .fail(err => showRegisterError(err.responseText))
  });

  $('.modal-bg4').on('focus','input', function() {
    clearRegisterError();
  })

  $('.modal-register-close').on('click', function() {
    clearRegisterInput();
    clearRegisterError();
  })

});
