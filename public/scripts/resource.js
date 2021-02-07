$(function() {

  $("#create-resource").on("click", function() {
    console.log($(this))
    $('.modal-bg2').addClass('bg-active');
  })

  $(".modal-resource-close").on("click", function() {
    $(this).closest(".modal-resource").parent().removeClass('bg-active');
  })

})
