import React, { useEffect } from "react";
import { createAxios } from '../../util/util' 
import Post from './PostDisplay.js'
import PostModal from './PostModal.js'
import '../../css/Posts.css'

export default function Posts (props) {
  let { fetchPosts, fetchCommentCount, fetchCommentsPerPost, match } = props;

  useEffect(() => {
    const fetchData = async () => {
      await fetchPosts();
      await fetchCommentCount();
      
      if (match.params.id) {
        await fetchCommentsPerPost(match.params.id);
      }
    };

    fetchData();
  }, []);

  //handle UI
  const handleVote = (e) => {
    if (e.target.name === "vote-comment") {
      let postId = e.target.parentElement.id;
      let comment_id = e.target.id;
      let type = e.target.alt;
      createAxios().patch(`/api/comments/${comment_id}`, { type: type })
        .then(() => {
          props.fetchCommentsPerPost(postId)
        })
    } else {
      let post_id = e.target.id;
      let type = e.target.alt;
      createAxios().patch(`/api/posts/${post_id}`, { type: type })
        .then(() => {
          props.fetchPosts()
        })
    }
  }

  const handleSave = (e) => {
    let { loggedUser, fetchUserSavedPosts } = props;
    if (loggedUser) {
      if (e.target.className === "save-container") {
        createAxios().post(`/api/users/${loggedUser.userData.id}/save`, {postId : e.target.id})
        .then(() => {
          fetchUserSavedPosts(loggedUser.userData.id)
        })
      } else {
        createAxios().delete(`/api/users/${loggedUser.userData.id}/save`, { data: {postId : e.target.id} }) //delete requests use config.data to add req.body
        .then(() => {
          fetchUserSavedPosts(loggedUser.userData.id)
        })
      }
    }
  }

  const handleExpand = async (e) => {
    let dontToggle = ["upvote","downvote","close","username","groupname","saved-container","save-container"]
    if (!dontToggle.includes(e.target.className) && e.target.innerText !== "CLOSE") {
      let postId = e.currentTarget.id;
      props.fetchCommentsPerPost(postId).then(() => {
        props.history.push('/post/' + postId);
      })
    }
    if (e.target.className === "close" || e.target.innerText === "CLOSE") {
      props.history.goBack();
    }
  }

  //handleData
  const countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id)
      return post ? post.comments_count : "0";
    }
  }

  const isSaved = (postId) => {
    if (props.loggedUser) {
      return props.saved_posts.find(savedPost => savedPost.post_id === postId) ? true : false;
    }
  }


  let { posts, comments, count, saved_posts, loggedUser } = props;
  let mapPosts;
  let currentPost;
  if (posts.length && count && ((loggedUser && saved_posts) || (!loggedUser && !saved_posts.length)) ) {
    //collapsed posts rendering
      mapPosts = posts.map((post) => {
      return <Post
                key={post.id}
                id={post.id}
                commentCount={countPerPost(post.id, count)}
                votes={post.votes}
                timestamp={post.created_at}
                header={post.header}
                body={post.body}
                username={post.username}
                groupname={post.groupname}
                groupId={post.subshreddit_id}
                groupImgUrl={post.img_url}
                handleVote={handleVote}
                handleExpand={handleExpand}
                handleSave={handleSave}
                isSaved={loggedUser ? isSaved(post.id) : false}
              />
    })
    currentPost = match.params.id ? posts.find(post => post.id === + match.params.id) : null;
  }

  return (
    //single post (modal) rendering
    <div className="posts">
      <h4>{(match.path === "/") ? match.path+"home" : match.path}</h4>
      {match.params.id && currentPost && comments && count
        ? <PostModal
            id={currentPost.id}
            votes={currentPost.votes}
            timestamp={currentPost.created_at}
            header={currentPost.header}
            body={currentPost.body}
            username={currentPost.username}
            groupname={currentPost.groupname}
            groupImgUrl={currentPost.img_url}
            groupId={currentPost.subshreddit_id}
            handleVote={handleVote}
            handleExpand={handleExpand}
            handleSave={handleSave}
            isSaved={isSaved(currentPost.id)}
            comments={comments}
            commentCount={countPerPost(currentPost.id, count)}
          />
        : null}
        {/*collapsed posts rendering*/}
      {mapPosts ? mapPosts : null}
    </div>
  );
}
