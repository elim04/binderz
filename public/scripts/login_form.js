$(function () {

  getMyDetails()
    .done((user) => changeNavOnLogin(user))
    .fail(err => err)

  const changeNavOnLogin = function (userData) {
    console.log(userData)
    userData = userData.user
    $('.login').hide();
    $('.user')
      .show()
      .children("button").append(`${userData.name.charAt(0)}`)
  }

  window.changeNavOnLogin = changeNavOnLogin

  const showLoginError = function (message) {
    $('.login_error').append(`<p>${message}</p>`);
    $('.login_error').slideDown("slow", function () { });
  }

  const clearLoginError = function () {
    $('.login_error').empty();
    $('.login_error').css('display', 'none');
  }

  const clearLoginInput = function () {
    $('.modal-login-content').find('input').each(function () {
      $(this).val('');
    })
  }

  $('main').on('submit', '.modal-login-form', function (event) {
    event.preventDefault();
    clearLoginError();

    const data = $(this).serialize();

    logIn(data)
      .done((user) => {
        $('.modal-bg3').removeClass('bg-active');
        clearLoginInput();
        changeNavOnLogin(user)
      })
      .fail(err => showLoginError(err.responseText))
  })

  //clears login error when any input is selected
  $('.modal-bg3').on('focus', 'input', function () {
    clearLoginError();
  })


  //clears all login input/error when X is clicked
  $('.modal-login-close').on('click', function () {
    console.log($(this))
    clearLoginInput();
    clearLoginError();
  })
})
