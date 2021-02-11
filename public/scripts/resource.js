$(function() {

  $("#create-resource").on("click", async function() {
    let isLoggedIn = await logInCheck()

    if (isLoggedIn) {
      modalDisplay(2, 'add');
    } else {
      resourceToLogin('create a resource')
    }
  })

  $(".modal-create-resource-close").on("click", function() {
    modalDisplay(2, 'remove');
    clearInput('resource');
    clearTextArea('resource');
    resetImg();
  })
})



