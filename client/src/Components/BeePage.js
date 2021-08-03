import React, { useState, useEffect } from 'react'
// import { useParams } from "react-router-dom"

const BeePage = ({ timeDifference }) => {
    // const beeId = useParams().bee_id;
    const initialBee = {
        username: "",
        user_id: 0,
    };

    const initialMessage = {
        content: "",
        img_url: "",
    };

    const [bee, setBee] = useState(initialBee);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(initialMessage);

    useEffect(() => {
        setBee({
            username: "Anthony",
            user_id: 1,
        });

        setMessages([{
            content: "You are amazing",
            img_url: "",
            created: 1627936332000,
            id: 1
        }, 
        {
            content: "You are nice",
            img_url: "https://sayingimages.com/wp-content/uploads/dont-worry-you-got-this-motivational-memes.jpg",
            created: 1627921176000,
            id: 2
        }, 
        {
            content: "You are pleasant",
            img_url: "",
            created: 1627939207000,
            id: 3
        }])
    }, []);

    const sortedMessages = messages.sort((a, b) => a.created - b.created);

    const currentTime = Date.now();

    const messagesArray = sortedMessages.map(message => {

        return (
            <li className="message" key={message.id}>
                <p>{message.content}</p>
                {message.img_url ? <img src={message.img_url} alt="" className="post" /> : null}
                <p>{timeDifference(currentTime, message.created)}</p>
                <br />
            </li>
        );
    });

    const handleMessage = e => {
        const newMessageCopy = {...newMessage, [e.target.name]: e.target.value};
        setNewMessage(newMessageCopy); 
    };

    return (
        <div>
            <header>{bee.username}</header>
            <br />
            <h3>Your Words of Honey to {bee.username}:</h3>
            <ul>
                {messagesArray}
            </ul>
            <br />
            <hr />
            <br />
            <h3>Send a new message:</h3>
            <form onSubmit={(e) => {
                e.preventDefault();
                const created = Date.now();
                console.log(created);
            }
            }>
                <br />
                <label htmlFor="content">Comment:</label>
                <input onChange={handleMessage} value={newMessage.content} type="text" name="content" placeholder="Type your comment here..." />
                <br />
                <label htmlFor="img_url">Image URL:</label>
                <input onChange={handleMessage} value={newMessage.img_url} type="text" name="img_url" placeholder="Enter your image url here..." />
                <br />
                <button type="submit">Send message</button>
                <br />
            </form>
        </div>
    )
}

export default BeePage;
