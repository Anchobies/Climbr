import React, { useState, useEffect } from 'react'

const FeedPage = ({ timeDifference }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`/messages`)
            .then(response => response.json())
            .then(json => setPosts(json))
    }, []);

    const sortedPosts = posts.length > 0 ? posts.sort((a, b) => a.updated_at - b.updated_at) : [];

    const currentTime = Date.now();

    const postsArray = sortedPosts.map(post => {

        return (
            <li className="post" key={post.id}>
                <h4>{post.hive_name}</h4>
                <p>{post.comment}</p>
                {post.img_url ? <img src={post.img_url} alt="" className="post" /> : null}
                <p>{timeDifference(currentTime, post.updated_at * 1000)}</p>
                <br />
            </li>
        );
    });

    return (
        <div>
            <header>Feed</header>
            <ul>
                {postsArray}
            </ul>
        </div>
    )
}

export default FeedPage;
