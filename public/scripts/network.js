const signUp = function (data) {
  return $.ajax({
    method:"POST",
    url: "/api/users/register",
    data
  });
}

const logIn = function(data) {
  return $.ajax({
    method:"POST",
    url: "/api/users/login",
    data
  });
}


function getAllResources() {
  console.log()
}


// function addResource(data) {
//   console.log('Add resource');
//   return $.ajax({
//     method: "POST",
//     url: "http://localhost:8080/api/resources",
//     data: formContent,
//   });
// }

