import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import API_KEY, { value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    try {
      const videoDetailsUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetailsUrl);
      const data = await response.json();
      console.log('Video Data Response:', data); // Log the entire response
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        console.error("No video data found");
      }
    } catch (error) {
      console.error("Error fetching video data: ", error);
    }
  };

  const fetchOtherData = async () => {
    if (!apiData) return;
    try {
      const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelDataUrl);
      const channelData = await channelResponse.json();
      console.log('Channel Data Response:', channelData); // Log the entire response
      setChannelData(channelData.items[0]);

      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}`;
      const commentResponse = await fetch(commentUrl);
      const commentData = await commentResponse.json();
      console.log('Comment Data Response:', commentData); // Log the entire response
      setCommentData(commentData.items);
    } catch (error) {
      console.error("Error fetching other data: ", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title="YouTube Video"
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : "Video Title"}</h3>
      <div className="play-video-info">
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "99k"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
        <div>
          <span><img src={like} alt="like" />{apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt="dislike" /></span>
          <span><img src={share} alt="share" />Share</span>
          <span><img src={save} alt="save" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="channel" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "Title here"}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? value_converter(apiData.statistics.commentCount) : "55"}</p>
        <hr />
        <h4>{apiData ? apiData.snippet.description.slice(0, 250) : "Description here"} Comments</h4>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="comment author" />
            <div>
              <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="like" />
                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
