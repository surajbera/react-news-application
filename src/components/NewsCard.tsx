import { NewsArticle } from "../context/NewsTypes";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <li className='news-card'>
      <div className='top-wrap'>
        <figure className='left-wrap'>
          <img src={article.image} alt={article.title} />
        </figure>
        <div className='right-wrap'>
          <span className='date'>{article.date}</span>
          <h3 className='title'>{article.title}</h3>
        </div>
      </div>
      <p className='desc'>{article.body}</p>
      <p className='author'>{article.author}</p>
      <p className='category'>{article.source}</p>
    </li>
  );
}
