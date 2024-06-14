const backendDomain ='http://localhost:8000'
const AllApiUrls = {
  signUp:{
    url: `${backendDomain}/api/signup`,
    method: "post"
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post"
  },
  user: {
    url : `${backendDomain}/api/user`,
    method : "get",

  },
  logout:{
    url : `${backendDomain}/api/logout`,
    method : "get"
  },
  allUser : {
    url : `${backendDomain}/api/all-users`,
    method : "get"
  },
  updateUser : {
    url : `${backendDomain}/api/update-user`,
    method : "post"
  },
  uploadProduct : {
    url : `${backendDomain}/api/upload-product`,
    method : "post"
  },
  allProduct : {
    url : `${backendDomain}/api/all-product`,
    method : "get"
  },
  updateProduct : {
    url : `${backendDomain}/api/update-product`,
    method : "post"
  },
  getCategoryProduct : {
    url : `${backendDomain}/api/get-productsCategorywise`,
    method : "get"
  }


}
export default AllApiUrls;
