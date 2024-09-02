import { useEffect } from "react";
import { useState } from "react"
import NewsItem from "./NewsItem";


const NewsBoard = ({category}) => {
    const [articles,setArticles] = useState([]);
    useEffect(()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

        fetch(url).then(response=>response.json()).then(data=>setArticles(data.articles));
        //above we use fetch method on our url that will fetch the response by sending get request.
        //then by :then(response=>response.json()), we convert the response or parse the response in json format.
        //then by : then(data=>setArticles(data.articles)) , we set the data present in the response to our (articles) "state" using its calling function(setArticles) and as initial value of state(articles) is an empty array[] , so all the data will be stored in that array.
    },[category])
  return (
    <div className='newsboard'>
        <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
        {articles.map((news,index)=>{
            return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
        })}

    </div>
  )
}

export default NewsBoard