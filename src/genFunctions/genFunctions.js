const validURL = (data) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(data);
};

const arrayRemove = (obj, value) => {
  let newToDo = { newToDo: (delete obj[value], obj) };
  return newToDo;
};

const capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const onFieldChange = (fieldName) => {
  //console.log(fieldName);
  return function (event) {
    FormData[fieldName] = event.target.value;
    console.log(FormData);
    setFormData(FormData);
  };
};

export { validURL, arrayRemove, capitalizeFirstLetter };
