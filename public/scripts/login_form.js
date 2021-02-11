$(function () {
  getMyDetails()
    .done((user) => changeNavOnLogin(user))
    .fail(err => err)

  const changeNavOnLogin = function (userData) {
    userData = userData.user
    $('.login').hide();
    $('.user')
      .show()
      .children("button").append(`${userData.name.charAt(0).toUpperCase()}`);
    $('#user-initial').append((`${userData.name.charAt(0).toUpperCase()}`));
    $('#user-name').append(`${userData.name}`);
    $('#user-email').append(`${userData.email}`);
    renderPersonalArea(userData)
    $('#my-page').data(userData)
  }

  window.changeNavOnLogin = changeNavOnLogin

  $('main').on('submit', '.modal-login-form', function (event) {
    event.preventDefault();
    clearError('login');

    const data = $(this).serialize();

    logIn(data)
      .done((user) => {
        $('.modal-bg3').removeClass('bg-active');
        $('#create-resource').removeClass('change-order')
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

  $('#forgot-password').on('click', () => {
    alert('Your password is probably just password :D')
  })
})
