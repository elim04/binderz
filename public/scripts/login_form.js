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

  $('main').on('submit', '.modal-login-form', function (event) {
    event.preventDefault();
    clearError('login');

    const data = $(this).serialize();

    logIn(data)
      .done((user) => {
        $('.modal-bg3').removeClass('bg-active');
        clearInput('login');
        changeNavOnLogin(user)
      })
      .fail(err => showError(err.responseText, 'login'))
  })

  //clears login error when any input is selected
  $('.modal-bg3').on('focus', 'input', function () {
    clearError('login');
  })


  //clears all login input/error when X is clicked
  $('.modal-login-close').on('click', function () {
    clearInput('login');
    clearError('login');
  })

})
