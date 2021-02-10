$(function () {
  $('.create-resource-info').on('submit', function (event) {
    event.preventDefault();
    $('.modal-bg2').removeClass('bg-active');
    const data = $(this).serialize();
    createResource(data);
    $("#resource-modal-topic").val("none")
  });
});
