import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Posts/PostDisplay';
import SubInfo from './SubDisplay';
import { addSubscription, deleteSubscription, getASubshreddit, extractCommentCountPerPost, isPostSaved } from '../../util/util';
import '../../css/Subshreddit.css';

export default function Subshreddit (props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [info, setInfo] = useState([]);

  const refreshUserSubshreddits = () => {
    if (props.loggedUser) {
      let loggedUserId = props.loggedUser.userData.id;
      props.fetchUserSubshreddits(loggedUserId)
    }
  }

  const validateSubscription = () => { 
    let { subId } = props.match.params;
      if (props.subshreddits.find(sub => +sub.subshreddit_id === +subId)) {
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
  }

   //handle user input
   const handleSubscribe = async () => {
    if (!props.loggedUser) {
      props.history.push('/auth/login/')
    } else {
      let { match, loggedUser } = props;
      let subObj = {  subscriber_id: loggedUser.userData.id,
                      subshreddit_id: match.params.subId }
      await addSubscription(subObj).catch((err)=> console.log(err))
      refreshUserSubshreddits();
    }
  }

  const handleUnsubscribe = async () => {
    let { subshreddits } = props;
    let { subId } = props.match.params
    let subscriptionId = subshreddits.find(sub => +sub.subshreddit_id === +subId).subscription_id
    await deleteSubscription(subscriptionId).catch((err)=> console.log(err))
    refreshUserSubshreddits();
  }
  
  const fetchData = async () => {
    const { fetchSubshredditPosts, fetchCommentCount, match } = props;
    await fetchSubshredditPosts(match.params.subId);
    await fetchCommentCount();
    const res = await getASubshreddit(match.params.subId);
    setInfo(res.data.subshreddit);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
    validateSubscription();
    // This effect will run whenever props.match.params.subId changes, and
    // loggedUser prop arrival to the component triggers a new dataFetch
  }, [props.match.params.subId, props.loggedUser]);

  useEffect(() => {
    validateSubscription();
    //when new user's subscriptions arrive, update subscription display.
  }, [props.subshreddits])

  let { posts, count, loggedUser, saved_posts } = props;

  const hasValidPostsAndCommentCounts = posts && count;  
  const hasValidLoggedUserData = loggedUser && saved_posts;
  const hasValidNoLoggedUserData = !loggedUser && !saved_posts.length;

  const shouldMapPosts = hasValidPostsAndCommentCounts && (hasValidLoggedUserData || hasValidNoLoggedUserData)
  let mapPosts;
  if (shouldMapPosts) {
      mapPosts = posts.map((post) => {
      return <Link key={post.id} to={`/post/${post.id}`}>
              <Post
                key={post.id}
                id={post.id}
                commentCount={extractCommentCountPerPost(post.id, count)}
                votes={post.votes}
                timestamp={post.created_at}
                header={post.header}
                body={post.body}
                username={post.username}
                groupname={post.groupname}
                groupId={post.subshreddit_id}
                groupImgUrl={post.img_url}
                isSaved={loggedUser ? isPostSaved(post.id, saved_posts) : false}
              /></Link>
    })
  }
  return (
    <React.Fragment>
      <div className="sub-page">
      <h4>/s/{info.groupname}</h4>
        <div className="sub-content">
          {mapPosts ? <div className="sub-posts-container">{mapPosts}</div> : ""}
          {info ? <SubInfo
                    subname={info.groupname}
                    avatar={info.img_url}
                    handleSubscribe={handleSubscribe}
                    handleUnsubscribe={handleUnsubscribe}
                    isSubscribed={isSubscribed}
                  /> : null }
        </div>
      </div>
    </React.Fragment>
  )
}
