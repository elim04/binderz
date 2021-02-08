$(function() {

  $('.create-resource-info').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

      $.ajax({
        method: "POST",
        url: "/api/resources",
        data: data
      })
      .done(() => loadResources())
      .fail(() => console.log('Error'))
      .always(() => console.log('Successful request'));

  });

});
