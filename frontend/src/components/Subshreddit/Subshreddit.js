import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Posts/PostDisplay';
import SubInfo from './SubDisplay';
import { addSubscription, deleteSubscription, getASubshreddit } from '../../util/util';
import '../../css/Subshreddit.css';

export default function Subshreddit (props) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [data, setData] = useState('');
  const prevSubIdRef = useRef(props.match.params.subId);

  const validateSubscription = () => {
    if (props.loggedUser) {
      let loggedUserId = props.loggedUser.userData.id;
      let { subId } = props.match.params;
      props.fetchUserSubshreddits(loggedUserId)
                  .then(() => {
                    if (props.subshreddits.find(sub => +sub.subshreddit_id === +subId)) {
                      setIsSubscribed(true);
                    } else {
                      setIsSubscribed(false);
                    }
                  })
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
      validateSubscription()
    }
  }

  const handleUnsubscribe = async () => {
    let { subshreddits } = props;
    let { subId } = props.match.params
    let subscriptionId = subshreddits.find(sub => +sub.subshreddit_id === +subId).subscription_id
    await deleteSubscription(subscriptionId).catch((err)=> console.log(err))
    validateSubscription()
  }

  //handle data
  const countPerPost = (id, count) => {
    if (count) {
      let post = count.find(post => post.post_id === +id)
      return post ? post.comments_count : "0";
    }
  }

  const isSaved = (postId) => {
    return props.saved_posts.find(savedPost => savedPost.post_id === postId) ? true : false;
  }

  useEffect(() => {
    const fetchData = async () => {
      const { fetchSubshredditPosts, fetchCommentCount, match } = props;
      await fetchSubshredditPosts(match.params.subId);
      await fetchCommentCount();
      const res = await getASubshreddit(match.params.subId);
      setData(res.data.subshreddit);
      validateSubscription();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataOnUpdate = async () => {
      const { fetchSubshredditPosts, fetchCommentCount, match } = props;
      await fetchSubshredditPosts(match.params.subId);
      await fetchCommentCount();
      const res = await getASubshreddit(match.params.subId);
      setData(res.data.subshreddit);

      // Access the previous subId using prevSubIdRef.current
      const previousSubId = prevSubIdRef.current;
      console.log('Previous subId:', previousSubId);
      validateSubscription();
    };

    fetchDataOnUpdate();

    // Update prevSubIdRef.current whenever props.match.params.subId changes
    prevSubIdRef.current = props.match.params.subId;

    // This effect will run whenever props.match.params.subId changes
  }, [props.match.params.subId]);

  let { posts, count, loggedUser, saved_posts } = props;

  let mapPosts;
  if (Array.isArray(posts) && count && ((loggedUser && saved_posts) || (!loggedUser && saved_posts === undefined))) {
      mapPosts = posts.map((post) => {
      return <Link key={post.id} to={`/post/${post.id}`}>
              <Post
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
                isSaved={loggedUser ? isSaved(post.id) : false}
              /></Link>
    })
  }
  return (
    <React.Fragment>
      <div className="sub-page">
      <h4>/s/{data.groupname}</h4>
        <div className="sub-content">
          {mapPosts ? <div className="sub-posts-container">{mapPosts}</div> : ""}
          {data ? <SubInfo
                    subname={data.groupname}
                    avatar={data.img_url}
                    handleSubscribe={handleSubscribe}
                    handleUnsubscribe={handleUnsubscribe}
                    isSubscribed={isSubscribed}
                  /> : null }
        </div>
      </div>
    </React.Fragment>
  )
}
