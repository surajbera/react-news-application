import { NewsArticle } from "../context/NewsTypes";
import { formatDate } from "../utils/formatDate";
import { getImageUrl } from "../utils/getImageUrl";
import { removeHtmlTags } from "../utils/removeHtmlTags";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <li className='news-card'>
      <article>
        <div className='top-wrap'>
          <figure className='img-wrap'>
            <img src={getImageUrl(article.image)} alt={article.title} />
          </figure>
          <div className='content-wrap'>
            <div className='date-wrap'>
              <span className='date'>{formatDate(article.date)}</span>
            </div>
            <h3 className='title article-title two-line'>
              <a href={article.url} target='_blank'>
                {article.title}
              </a>
            </h3>
          </div>
          <p className='category'>{article.source}</p>
        </div>
        <p className='desc article-desc three-line'>{removeHtmlTags(article.body)}</p>
        <p className='author'>{article.author}</p>
      </article>
    </li>
  );
}
