$(function() {
  $('.modal-login-btn').on('click', () => {
    modalDisplay(3, 'add');
  });

  $('.modal-login-close').on('click', () => {
    modalDisplay(3, 'remove');
  });

  $('.reg-btn').on('click', () => {
    loginToRegister();
  });

  $('.modal-register-close').on('click', () => {
    modalDisplay(4, 'remove');
  });
});
