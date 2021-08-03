import React, { useState, useEffect } from 'react'

const FeedPage = ({ timeDifference }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const newPosts = [{
            id: 1,
            content: "Good morning",
            img_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfz0nP0PBQDMYQ3MQH2DjUig1iYbkk2MzLn8xjlxoiC2rFsYCqeQo5762VUDIioUPA9SU&usqp=CAU",
            created: 1627947882000,
            hive_name: "Hive 1"
        }, 
        {
            id: 2,
            content: "Good night",
            img_url: "",
            created: 1627957822000,
            hive_name: "Hive 2"
        }, 
        {
            id: 3,
            content: "Good afternoon",
            img_url: "",
            created: 1627937886000,
            hive_name: "Hive 3"
        }]

        setPosts(newPosts);
    }, []);

    const sortedPosts = posts.sort((a, b) => a.created - b.created);

    const currentTime = Date.now();

    const postsArray = sortedPosts.map(post => {

        return (
            <li className="post" key={post.id}>
                <h4>{post.hive_name}</h4>
                <p>{post.content}</p>
                {post.img_url ? <img src={post.img_url} alt="" className="post" /> : null}
                <p>{timeDifference(currentTime, post.created)}</p>
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
