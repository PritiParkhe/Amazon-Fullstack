export const imagetobase64 = async(image)=> {
  const reader = new FileReader()
  reader.readAsDataURL(image)

  const data = await new Promise((resolve,reject)=>{
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(reject)
  })
  return data
}
