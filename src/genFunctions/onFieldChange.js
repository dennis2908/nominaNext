const onFieldChange = (fieldName) => {
  //console.log(fieldName);
  return function (event) {
    FormData[fieldName] = event.target.value;
    console.log(FormData);
    setFormData(FormData);
  };
};

export { onFieldChange };
