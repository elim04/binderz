$(function () {

  const showLoginError = function(message) {
    $('.login_error').append(`<p>${message}</p>`);
    $('.login_error').slideDown("slow", function() {});
  }

  const clearLoginError = function() {
    $('.login_error').empty();
    $('.login_error').css('display', 'none');
  }

  const clearLoginInput = function () {
    $('.modal-login-content').find('input').each(function() {
      $(this).val('');
    })
  }

  $('main').on('submit', '.modal-login-form', function(event) {
    event.preventDefault();
    clearLoginError();
    let data = $(this).serialize();
    //removes all empty fields in data
    data = data.replace(/&?[^=&]+=(&|$)/g,'');
    if (!data) {
      showLoginError('Please fill out the fields');
    } else {
      logIn(data)
      .done(() => {
        $('.modal-bg3').removeClass('bg-active');
        clearLoginInput();
      })
      .fail(err => showLoginError(err.responseText))
      }
    });

  //clears login error when any input is selected
  $('.modal-bg3').on('focus','input', function() {
    clearLoginError();
  })


  //clears all login input/error when X is clicked
  $('.modal-login-close').on('click', function() {
    console.log($(this))
    clearLoginInput();
    clearLoginError();
  })
})
