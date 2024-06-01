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

  }

}
export default AllApiUrls;
