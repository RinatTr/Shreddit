import axios from 'axios';
export const getPosts = () => axios.get("/api/posts")
export const getCommentsPerPost = (id) => axios.get(`/api/posts/${id}/comments`)
export const getCommentCount = () => axios.get("/api/comments/counts")

//Auth
export const createUser = (bodyObj) => axios.post("/api/users/new", bodyObj)
export const login = (bodyObj) => axios.post("/api/users/login", bodyObj)
export const logout = (bodyObj) => axios.post("/api/users/logout", bodyObj)
export const isLoggedIn = () => axios.get("/api/users/isLoggedIn")
