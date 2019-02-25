import axios from 'axios';
export const getPosts = () => axios.get("/api/posts")
export const getCommentsPerPost = (id) => axios.get(`/api/posts/${id}/comments`)
