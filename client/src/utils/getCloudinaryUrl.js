export const getCloudinaryUrl = (url, width, height) => {
  // console.log("url : ", url)
  const baseUrl = "http://res.cloudinary.com/dc8ipw43g/image/upload/";
  const transformation = `w_${width},h_${height},c_fill/`;
  return url.replace(baseUrl, `${baseUrl}${transformation}`);
};
