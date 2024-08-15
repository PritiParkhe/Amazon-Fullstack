const backendDomain =process.env.REACT_APP_BACKEND_URL;

const AllApiUrls = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  user: {
    url: `${backendDomain}/api/user`,
    method: "get",
  },
  logout: {
    url: `${backendDomain}/api/logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/all-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  getCategoryProduct: {
    url: `${backendDomain}/api/get-productsCategory`,
    method: "get",
  },
  getCategoryWiseProduct: {
    url: `${backendDomain}/api/get-categorywiseProducts`,
    method: "post",
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
  updateCartProduct: {
    url: `${backendDomain}/api/update-cart-product`,
    method: "post",
  },
  deleteCartProducts: {
    url: `${backendDomain}/api/delete-cart-product`,
    method: "delete",
  },
  searchProduct: {
    url: `${backendDomain}/api/search`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/api/filter-product`,
    method: "post",
  },
  payment: {
    url: `${backendDomain}/api/payment`,
    method: "post",
  },
  getOrder: {
    url: `${backendDomain}/api/order-list`,
    method: "get",
  },
};

export default AllApiUrls;
