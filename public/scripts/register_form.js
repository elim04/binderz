$(function () {

  $("main").on('submit', '.modal-register-form', function(event){
    event.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    console.log(signUp(data));
  })
})
