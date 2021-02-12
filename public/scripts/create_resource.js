$(function() {
  $('#image-url').on('input', function() {
    $('.modal-img').empty();
    $('.modal-img').append(`<img class="create-resource-img" src=${$(this).val()}/>`);
  });

  $('.create-resource-info').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      url: '/api/resources/urlTest',
      method: 'POST',
      data: $('#resource-url').serialize()
    })
      .done((res) => {
        if (res.statusCode === 200) {
          $('.modal-bg2').removeClass('bg-active');
          const data = $(this).serialize();
          createResource(data);
          $('#create-resource').removeClass('change-order');
          $("#resource-modal-topic").val("none");
          $('.title-counter').text('20');
          resetImg();
        }
      })
      .fail((res) => {
        alert('Please make sure to use a valid url!');
      });
  });
});
