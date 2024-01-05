import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Posts/PostDisplay';
import UserInfo from './UserDisplay';
import UserNav from './UserNav';
import { addFollow, deleteFollow } from '../../util/util';
import '../../css/User.css';

export default function User (props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedUserPage, setIsLoggedUserPage] = useState(false);

  const validateSubscription = () => {
    if (props.loggedUser) {
      let loggedUserId = props.loggedUser.userData.id;
      let userPageId = props.user.id;
      props.fetchFollows(loggedUserId)
        .then(() => {
          //if identical id's then set subscribed true
          if (props.follows.find(follow => follow.followed_id === userPageId)) {
            setIsSubscribed(true);
          } else {
            setIsSubscribed(false);
          }
        });
    }
  };

  const countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id);
      return post ? post.comments_count : "0";
    }
  };

  const isSaved = (postId) => {
    return props.saved_posts.find(savedPost => savedPost.post_id === postId) ? true : false;
  };

  const handleFollow = async () => {
    if (!props.loggedUser) {
      props.history.push('/auth/login/');
    } else {
      let followObj = {
        follower_id: props.loggedUser.userData.id,
        followed_id: props.user.id
      };

      await addFollow(followObj).catch((err) => console.log(err));
      props.fetchFollows(followObj.follower_id);
      validateSubscription();
    }
  };

  const handleUnfollow = async () => {
    //user is definitely logged in
    let userPageId = props.user.id;
    let followObj = props.follows.find(follow => follow.followed_id === userPageId);
    await deleteFollow(followObj.id).catch((err) => console.log(err));
    await props.fetchFollows(followObj.follower_id);
    validateSubscription();
  };

  useEffect(() => {
    const fetchData = async () => {    
      let { fetchUser, fetchUserPosts, fetchCommentCount, match } = props;
      await fetchUser(match.params.username);
      if (props.user) {
        console.log("3 USER fetchUserPosts")
        await fetchUserPosts(props.user.id);
      }
      await fetchCommentCount();
      if (props.loggedUser) {
        if (props.loggedUser.username === props.user.username) {
          setIsLoggedUserPage(true);
        }
      }
      validateSubscription();
    };
      fetchData();
  }, [props.match.params.username]);

  let { posts, count, match, user, loggedUser, saved_posts, location } = props;
  let mapPosts;
  //saved feature for loggedUser page only
  let isSavedPath = location.pathname.slice(-5) === "saved";

  if (Array.isArray(posts) && count && ((loggedUser && saved_posts) || (!loggedUser && saved_posts === undefined))) {
      mapPosts = (saved_posts && isSavedPath ? saved_posts : posts).map((post) => {
      return <Link key={isSavedPath ? post.post_id : post.id} to={`/post/${isSavedPath ? post.post_id : post.id}`}>
              <Post
                key={isSavedPath ? post.post_id : post.id}
                id={isSavedPath ? post.post_id : post.id}
                commentCount={countPerPost(isSavedPath ? post.post_id : post.id, count)}
                votes={post.votes}
                timestamp={post.created_at}
                header={post.header}
                body={post.body}
                username={isSavedPath ? post.posted_by : match.params.username}
                groupname={post.groupname}
                groupId={post.subshreddit_id}
                groupImgUrl={post.img_url}
                isSaved={loggedUser ? isSaved(isSavedPath ? post.post_id : post.id) : false}
              /></Link>
    })
  }
    return (
      <React.Fragment>
        {isLoggedUserPage && loggedUser ? <UserNav loggedUser={loggedUser}/> : null}
        <div className={isLoggedUserPage ? "logged-user-page":"user-page"}>
          {mapPosts
            ? (mapPosts.length
                ? <div className="user-posts-container">{mapPosts}</div>
                : <div className="user-posts-container">
                    <div className="post-collapsed" style={{cursor:'default'}}>&nbsp;<strong>No posts to display yet...</strong>
                    </div>
                  </div>)
            : null}
          {user ? <UserInfo
                    username={user.username}
                    avatar={user.avatar_url}
                    handleFollow={handleFollow}
                    handleUnfollow={handleUnfollow}
                    isSubscribed={isSubscribed}
                    isLoggedUserPage={isLoggedUserPage}
                    cakeDay={user.created_at}
                  /> : null}
        </div>
      </React.Fragment>
    )
}

//display posts in same way as posts.js :
//  import PostDisplay, and map user_posts. when mapping <Link> each post to its id.
// correct the post Modal display (posts.js) to be using nested routing.
// have the posts/:id route in the main app.
