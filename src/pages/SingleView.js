import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ReactMarkdown from 'react-markdown';

const STRAPI_HOST = process.env.REACT_APP_STRAPI_HOST;
const api = '/api/articles?filters[slug][$eq]=';
const query = '&populate=cover,categories,reviews';

const SingleView = () => {
	const { slug } = useParams();
	const { loading, error, data } = useFetch(
		`${STRAPI_HOST}${api}${slug}${query}`
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error </p>;

	return (
		<main className='uk-flex-auto uk-section'>
			<article className='uk-container uk-container-xsmall uk-background-default uk-box-shadow-small'>
				<header>
					<ul className='uk-list uk-flex'>
						{data[0].attributes.categories.data.map((cat) => (
							<li
								key={cat.id}
								className='uk-padding-small uk-margin-remove-vertical'
							>
								<a href={`/category/${cat.attributes.slug}`}>
									{cat.attributes.name}
								</a>
							</li>
						))}
					</ul>
					<figure>
						<img
							src={data[0].attributes.cover.data[0].attributes.url}
							alt={data[0].attributes.cover.data[0].attributes.alternativeText}
						/>
						<figcaption className='uk-text-small'>
							{data[0].attributes.cover.data[0].attributes.caption}
						</figcaption>
					</figure>
					<h1 className='uk-article-title'>{data[0].attributes.title}</h1>
				</header>
				<div>
					<ReactMarkdown>{data[0].attributes.body}</ReactMarkdown>
				</div>
				<footer>
					<p className='uk-article-meta'>
						Created on{' '}
						<time dateTime={data[0].attributes.createdAt}>
							{new Date(data[0].attributes.createdAt).toLocaleDateString(
								'en-us',
								{
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								}
							)}
						</time>
					</p>
					<p className='uk-article-meta'>
						Published on{' '}
						<time dateTime={data[0].attributes.publishedAt}>
							{new Date(data[0].attributes.publishedAt).toLocaleDateString(
								'en-us',
								{
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								}
							)}
						</time>
					</p>
					<p className='uk-article-meta'>
						Updated on{' '}
						<time dateTime={data[0].attributes.updatedAt}>
							{new Date(data[0].attributes.updatedAt).toLocaleDateString(
								'en-us',
								{
									weekday: 'short',
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								}
							)}
						</time>
					</p>
				</footer>
			</article>
			<section className='uk-container uk-container-xsmall uk-margin-top'>
				<h3>Reviews</h3>
				{data[0].attributes.reviews.data.map((review) => (
					<article
						key={review.id}
						className='uk-comment uk-comment-secondary uk-margin'
					>
						<header className='uk-comment-header'>
							<div className='uk-grid-medium uk-flex-middle' data-uk-grid>
								<div className='uk-width-auto'>
									<span
										className='uk-margin-small-right uk-icon'
										data-uk-icon='icon: user; ratio: 2'
									></span>
								</div>
								<div className='uk-width-expand'>
									<h4 className='uk-comment-title uk-margin-remove'>
										<span className='uk-link-reset'>
											{review.attributes.author}
										</span>
									</h4>
									<ul className='uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top'>
										<li>
											<small>
												Published on{' '}
												<time dateTime={review.attributes.publishedAt}>
													{new Date(
														review.attributes.publishedAt
													).toLocaleDateString('en-us', {
														weekday: 'short',
														year: 'numeric',
														month: 'short',
														day: 'numeric',
													})}
												</time>
											</small>
										</li>
									</ul>
								</div>
							</div>
						</header>
						<div class='uk-comment-body'>
							<p>{review.attributes.content}</p>
							<p>Rating: {review.attributes.rating}</p>
						</div>
					</article>
				))}
			</section>
		</main>
	);
};

export default SingleView;
