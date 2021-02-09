$(function () {

  $('main').on('submit', '.modal-register-form', function(event){
    event.preventDefault();
    clearError('register');
    const data = $(this).serialize();
    signUp(data)
    .done(res => {
      logIn(res)
      $('.modal-bg4').removeClass('bg-active');
      clearInput('register');
    })
    .fail(err => showError(err.responseText, 'register'))
  });

  $('.modal-bg4').on('focus','input', function() {
    clearError('register');
  })

  $('.modal-register-close').on('click', function() {
    clearInput('register');
    clearError('register');
  })

});
