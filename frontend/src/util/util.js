import axios from 'axios';
const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL : "";
const createAxios = () => axios.create({ baseURL: BASE_URL })
//Posts
export const getPosts = () => createAxios().get("/api/posts")
export const getCommentsPerPost = (id) => createAxios().get(`/api/posts/${id}/comments`)
export const getCommentCount = () => createAxios().get("/api/comments/counts")
export const postComment = (comment, id) => createAxios().post(`/api/posts/${id}/comments`, comment)
export const createPost = (post) => createAxios().post(`/api/posts/add`, post)

//User
export const getUser = (username) => createAxios().get(`/api/users/${username}`)
export const getUserPosts = (id) => createAxios().get(`/api/users/${id}/posts/`)
export const getSavedPosts = (id) => createAxios().get(`/api/users/${id}/posts/saved`)
export const getUserComments = (id) => createAxios().get(`/api/users/${id}/comments`)
export const getAllSubshredditsPerUser = (id) => createAxios().get(`/api/subshreddits/user/${id}`)

//Subshreddits
export const getSubshredditPosts = (id) => createAxios().get(`/api/subshreddits/${id}/posts/`)
export const getASubshreddit = (id) => createAxios().get(`/api/subshreddits/${id}`)

//Follows
export const getFollows = (userId) => createAxios().get(`/api/follows/${userId}`)
export const addFollow = (followObj) => createAxios().post(`/api/follows/`, followObj)
export const deleteFollow = (followId) => createAxios().delete(`/api/follows/${followId}`)

//Subscriptions
export const addSubscription = (subObj) => createAxios().post(`/api/subscriptions`, subObj)
export const deleteSubscription = (subId) => createAxios().delete(`/api/subscriptions/${subId}`)

//Auth
export const createUser = (bodyObj) => createAxios().post("/api/users/auth/new", bodyObj)
export const login = (bodyObj) => createAxios().post("/api/users/auth/login", bodyObj)
export const logout = (bodyObj) => createAxios().post("/api/users/auth/logout", bodyObj)
export const isLoggedIn = () => createAxios().get("/api/users/auth/isLoggedIn")
