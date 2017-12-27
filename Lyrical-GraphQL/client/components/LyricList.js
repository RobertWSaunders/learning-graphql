import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LyricList extends Component {

	onLike(lyricId, lyricLikes) {
		this.props.mutate({
			variables: {
				id: lyricId
			},
			optimisticResponse: {
				__typename: 'Mutation',
				likeLyric: {
					id: lyricId,
					__typename: 'LyricType',
					likes: lyricLikes + 1
				}
			}
		});
	}

	renderLyrics() {
		const { lyrics } = this.props;

		return lyrics.map(lyric => {
				return (
				<li key={lyric.id} className="collection-item">
					{lyric.content}
					<div className="vote-box">
						<i className="material-icons" onClick={() => this.onLike(lyric.id, lyric.likes)}>
							thumb_up
						</i>
						{lyric.likes}
					</div>
				</li>
			)
		})
	}

	render() {
		return (
			<ul className="collection">
				{this.renderLyrics()}
			</ul>
		)
	}
}

const mutation = gql`
	mutation LikeLyric($id: ID) {
		likeLyric(id: $id) {
			id
			likes
		}
	}
`;


export default graphql(mutation)(LyricList);
