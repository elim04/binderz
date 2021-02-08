const createResourceElement = function(resource) {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const htmlResource = `
  <div class="block">
          <div class="img-container">
            <img src="http://placehold.it/350x120" />
            <a href="www.google.com"
              ><i class="fas fa-external-link-alt"></i>
            </a>
          </div>
          <div class="content">
            <h3>title</h3>
          </div>
        </div>
  `

}


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
        console.log("data", data)
      }

  })



});
