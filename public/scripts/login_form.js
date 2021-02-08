$(function () {


$("main").on('submit', '.modal-login-form', function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  console.log(data);
  logIn(data)
});

})
