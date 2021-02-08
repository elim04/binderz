function getAllResources() {
  console.log()
}


function addResource() {
  console.log('Add resource');
  return $.ajax({
    method: "POST",
    url: "http://localhost:8080/api/resources",
    data: formContent,
  });
}
