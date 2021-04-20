import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
	useEffect(() => {
		getUser(match.params.login);
		getUserRepos(match.params.login);
		//eslint-disable-next-line
	}, []);

	const {
		name,
		avatar_url,
		location,
		bio,
		login,
		html_url,
		followers,
		following,
		public_repos,
		public_gists,
		hireable,
		company,
		blog,
	} = user;

	if (loading) return <Spinner />;

	return (
		<>
			<Link to='/' className='btn btn-light'>
				Back to Search
			</Link>
			Hireable: {''}
			{hireable ? (
				<i className='fas fa-check text-success' />
			) : (
				<i className='fas fa-times-circle text-danger' />
			)}
			<div className='card grid-2'>
				<div className='all-center'>
					<img
						src={avatar_url}
						className='round-img'
						alt=''
						style={{ width: '150px' }}
					/>
					<h1>{name}</h1>
					<p>{location}</p>
				</div>
				<div>
					{bio && (
						<>
							<h3>{bio}</h3>
						</>
					)}
					<a href={html_url} className='btn btn-dark my-1'>
						Visit Github Profile
					</a>
					<li>
						{login && (
							<>
								<strong>Username: {login}</strong>
							</>
						)}
					</li>
					<li>
						{company && (
							<>
								<strong>Company: {company}</strong>
							</>
						)}
					</li>
					<li>
						{blog && (
							<>
								<strong>Website: {blog}</strong>
							</>
						)}
					</li>
				</div>
			</div>
			<div className='card text-center'>
				<div className='badge badge-primary'>Followers: {followers}</div>
				<div className='badge badge-success'>Following: {following}</div>
				<div className='badge badge-light'>Public Repos: {public_repos}</div>
				<div className='badge badge-dark'>Public Gists: {public_gists}</div>
			</div>
			<Repos repos={repos} />
		</>
	);
};

User.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.object.isRequired,
	getUser: PropTypes.func.isRequired,
	getUserRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
};

export default User;
