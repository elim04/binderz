$(function () {
  $('#image-url').on('input', function(){
    $('.modal-img').empty()
    $('.modal-img').append(`<img class="create-resource-img" src=${$(this).val()}/>`)
  })

  $('.create-resource-info').on('submit', function (event) {
    event.preventDefault();
    $('.modal-bg2').removeClass('bg-active');
    const data = $(this).serialize();
    createResource(data);
    $("#resource-modal-topic").val("none");
    resetImg();
  });
});
