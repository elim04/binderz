$(function() {

  $("#create-resource").on("click", function() {
    console.log($(this))
    $('.modal-bg2').addClass('bg-active');
  })

  $(".modal-resource-close").on("click", function() {
    $(this).closest(".modal-resource").parent().removeClass('bg-active');
  })


  $('.block').on('click', function() {
    $('.modal-bg1').addClass('bg-active');
  })

  $('#heart-btn').on('click', function() {
    $('#heart-btn').replaceWith(`<i  id="heart-btn" class="fas fa-heart fa-2x"></i>`);
  })

  $('#heart-btn').on('click', function() {
    $('#heart-btn').replaceWith(`<i  id="heart-btn" class="fas fa-heart fa-2x"></i>`);
  })


})
