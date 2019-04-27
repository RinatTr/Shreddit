import axios from 'axios';
//Posts
export const getPosts = () => axios.get("/api/posts")
export const getCommentsPerPost = (id) => axios.get(`/api/posts/${id}/comments`)
export const getCommentCount = () => axios.get("/api/comments/counts")
export const postComment = (comment, id) => axios.post(`/api/posts/${id}/comments`, comment)
export const createPost = (post) => axios.post(`/api/posts/add`, post)

//User
export const getUser = (username) => axios.get(`/api/users/${username}`)
export const getUserPosts = (id) => axios.get(`/api/users/${id}/posts/`)
export const getSavedPosts = (id) => axios.get(`/api/users/${id}/posts/saved`)
export const getUserComments = (id) => axios.get(`/api/users/${id}/comments`)
export const getAllSubshredditsPerUser = (id) => axios.get(`/api/subshreddits/user/${id}`)

//Subshreddits
export const getSubshredditPosts = (id) => axios.get(`/api/subshreddits/${id}/posts/`)
export const getASubshreddit = (id) => axios.get(`/api/subshreddits/${id}`)

//Follows
export const getFollows = (userId) => axios.get(`/api/follows/${userId}`)
export const addFollow = (followObj) => axios.post(`/api/follows/`, followObj)
export const deleteFollow = (followId) => axios.delete(`/api/follows/${followId}`)


//Auth
export const createUser = (bodyObj) => axios.post("/api/users/auth/new", bodyObj)
export const login = (bodyObj) => axios.post("/api/users/auth/login", bodyObj)
export const logout = (bodyObj) => axios.post("/api/users/auth/logout", bodyObj)
export const isLoggedIn = () => axios.get("/api/users/auth/isLoggedIn")
