$(() => {

  $('.create-resource-info').on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

      $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/resources",
        data: data
      })
      .done(() => {
        console.log("data", data);
      })

  });



});
