import axios from 'axios';
export const getPosts = () => axios.get("/api/posts")
