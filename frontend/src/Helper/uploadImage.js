const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`
const uploadImage = async(image) => {
  const formData = new FormData()
  formData.append("file",image)
  formData.append("upload_preset","e-commerce_product")
  const Response = await fetch(url,{
    method : "post",
    body : formData
  })
  return Response.json()
}
export default uploadImage