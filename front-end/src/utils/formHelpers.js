export function objectToFormData(obj) {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
      // console.log(key, value);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      // Optional: handle nested objects (e.g., for structured keys like address[city])
      Object.entries(value).forEach(([subKey, subVal]) => {
        if (subVal instanceof File || subVal instanceof Blob) {
          // console.log(`${key}[${subKey}]`, subVal);

          formData.append(`${key}[${subKey}]`, subVal);
        } // else if (subVal !== null && subVal !== undefined && subVal !== "") {
        //   formData.append(`${key}[${subKey}]`, subVal);
        // }
      });
    } else if (value !== null && value !== undefined && value !== "") {
      formData.append(key, value);
      // console.log(key, value);
    }
  });

  return formData;
}
