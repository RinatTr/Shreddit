import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Posts/PostDisplay';
import UserInfo from './UserDisplay';
import UserNav from './UserNav';
import { addFollow, deleteFollow, extractCommentCountPerPost, isPostSaved } from '../../util/util';
import '../../css/User.css';

export default function User (props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedUserPage, setIsLoggedUserPage] = useState(false);

  const refreshUserFollows = () => {
    if (props.loggedUser) {
      let loggedUserId = props.loggedUser.userData.id;
      props.fetchFollows(loggedUserId)
    }
  }

  const validateSubscription = () => { 
    let userPageId = props.user.id;
    if (props.follows.find(follow => follow.followed_id === userPageId)) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }

  const handleFollow = async () => {
    if (!props.loggedUser) {
      props.history.push('/auth/login/');
    } else {
      let followObj = {
        follower_id: props.loggedUser.userData.id,
        followed_id: props.user.id
      };

      await addFollow(followObj).catch((err) => console.log(err));
      refreshUserFollows()
    }
  };

  const handleUnfollow = async () => {
    //user is definitely logged in
    let userPageId = props.user.id;
    let followObj = props.follows.find(follow => follow.followed_id === userPageId);
    await deleteFollow(followObj.id).catch((err) => console.log(err));
    refreshUserFollows()
  };
  
  const fetchData = async () => {
    let { fetchUser, fetchUserPosts, fetchCommentCount, match } = props;
    await fetchUser(match.params.username)
    if (props.user) {
      await fetchUserPosts(props.user.id);
    }
    await fetchCommentCount()
    if (props.loggedUser) {
      const isLoggedCheck = props.loggedUser.username === props.user.username;
      setIsLoggedUserPage(isLoggedCheck);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => { 
    fetchData();
    validateSubscription();
    //conditions for data refresh are new username path, and 
    //once we got the data back for said user.
  }, [props.match.params.username, props.user ? props.user.id : null])

  useEffect(()=> {
    //once we got new data on follows from either refreshUserFollows
    //or fetchData, we validate subscription and update the display
    validateSubscription();
  }, [props.follows])

  let { posts, count, match, user, loggedUser, saved_posts, location } = props;
  let mapPosts;
  //saved posts is only available if it's the loggedUser page
  let isSavedPath = location.pathname.slice(-5) === "saved";

  const hasValidPostsAndCommentCounts = posts && count;  
  const hasValidLoggedUserData = loggedUser && saved_posts;
  const hasValidNoLoggedUserData = !loggedUser && !saved_posts.length;

  const shouldMapPosts = hasValidPostsAndCommentCounts && (hasValidLoggedUserData || hasValidNoLoggedUserData)

  if (shouldMapPosts) {
      mapPosts = ((saved_posts && isSavedPath) ? saved_posts : posts).map((post) => {
      return <Link key={isSavedPath ? post.post_id : post.id} to={`/post/${isSavedPath ? post.post_id : post.id}`}>
              <Post
                key={isSavedPath ? post.post_id : post.id}
                id={isSavedPath ? post.post_id : post.id}
                commentCount={extractCommentCountPerPost((isSavedPath ? post.post_id : post.id), count)}
                votes={post.votes}
                timestamp={post.created_at}
                header={post.header}
                body={post.body}
                username={isSavedPath ? post.posted_by : match.params.username}
                groupname={post.groupname}
                groupId={post.subshreddit_id}
                groupImgUrl={post.img_url}
                isSaved={loggedUser ? isPostSaved((isSavedPath ? post.post_id : post.id), saved_posts) : false}
              /></Link>
    })
  }

  const renderPosts = (mapPosts) => {
    if (mapPosts && mapPosts.length) {
      return <div className="user-posts-container">{mapPosts}</div>;
    } else {
      return (
        <div className="user-posts-container">
          <div className="post-collapsed" style={{ cursor: 'default' }}>
            &nbsp;<strong>No posts to display yet...</strong>
          </div>
        </div>
      );
    }
  }
    return (
      <React.Fragment>
        {isLoggedUserPage && loggedUser ? <UserNav loggedUser={loggedUser}/> : null}
        <div className={isLoggedUserPage ? "logged-user-page":"user-page"}>
          {renderPosts(mapPosts)}
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