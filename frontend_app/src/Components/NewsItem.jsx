import NewsDefault from '../../src/Components/assets/NewsDefault.png'
import './NewsItem.css'

const NewsItem = ({title,description,src,url}) => {
  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2 news-item" style={{maxWidth:"345px"}}>
  <img src={src ? src : NewsDefault} style={{height:"200px",width:"325px"}} className="card-img-top" alt={title || "Default Alt Text"}/>
  <div className="card-body">
    <h5 className="card-title"> {title ? title.slice(0, 50) : "Default Title"}</h5>
    <p className="card-text">{description?description.slice(0,90):"This is the news about the concerned topic and it provides all relevent details including information from trusted sources."}</p>
    <a href={url} className="btn btn-primary">Read More</a>
  </div>
</div>
  )
}

export default NewsItem