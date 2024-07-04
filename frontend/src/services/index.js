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
    url : `${backendDomain}/api/get-productsCategory`,
    method : "get"
  },
  getCategoryWiseProduct : {
    url : `${backendDomain}/api/get-categorywiseProducts`,
    method : "post"
  },
  getProductDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/api/addtocart`,
    method: "post",
  },
  countCartProduct: {
    url: `${backendDomain}/api/countCartProduct`,
    method: "get",
  },
  viewCartProducts: {
    url: `${backendDomain}/api/view-cart-product`,
    method: "get",
  },
}
export default AllApiUrls;
