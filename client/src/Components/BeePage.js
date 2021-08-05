import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

const BeePage = ({ timeDifference }) => {
    const beeId = useParams().bee_id;
    const hiveId = useParams().hive_id;
    const initialBee = {
        first_name: "",
        last_name: "",
        id: 0,
    };

    const initialMessage = {
        comment: "",
        img_url: "",
    };

    const [bee, setBee] = useState(initialBee);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(initialMessage);
    const [messageErrors, setMessageErrors] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/bees/${beeId}`)
            .then(response => response.json())
            .then(json => setBee(json))
    }, [beeId]);

    useEffect(() => {
        fetch(`http://localhost:3000/messages/${bee.id}`)
            .then(response => response.json())
            .then(json => setMessages(json))
}, [bee]);

    const sortedMessages = messages.sort((a, b) => a["updated_at"] - b["updated_at"]);

    const currentTime = Date.now();

    const messagesArray = sortedMessages.map(message => {

        return (
            <li className="message" key={message.id}>
                <p>{message.comment}</p>
                {message.img_url ? <img src={message.img_url} alt="" className="post" /> : null}
                <p>{timeDifference(currentTime, message.updated_at * 1000)}</p>
                <br />
            </li>
        );
    });

    const handleMessage = e => {
        const newMessageCopy = {...newMessage, [e.target.name]: e.target.value};
        setNewMessage(newMessageCopy); 
    };

    const handleSubmitMessage = e => {
        e.preventDefault();

        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                message: { 
                    comment: newMessage.comment,
                    img_url: newMessage.img_url,
                    receiver_id: bee.id,
                    hive_id: hiveId
                }
            })
        })
            .then(response => response.json())
            .then(json => {
                if (!json.errors) {
                    const messagesCopy = [...messages];
                    messagesCopy.push(json);
                    setMessages(messagesCopy);
                    setNewMessage(initialMessage);
                } else {
                    setMessageErrors(json.errors);
                }
            })
    };

    return (
        <div>
            <header>{bee.first_name} {bee.last_name}</header>
            <br />
            <h3>Your Words of Honey to {bee.first_name}:</h3>
            <ul>
                {messagesArray}
            </ul>
            <br />
            <hr />
            <br />
            <h3>Send a new message:</h3>
            <form onSubmit={handleSubmitMessage}>
                <br />
                <label htmlFor="comment">Comment:</label>
                <input onChange={handleMessage} value={newMessage.comment} type="text" name="comment" placeholder="Type your comment here..." />
                <br />
                <label htmlFor="img_url">Image URL:</label>
                <input onChange={handleMessage} value={newMessage.img_url} type="text" name="img_url" placeholder="Enter your image url here..." />
                <br />
                <br />
                <button type="submit">Send message</button>
                <br />
            </form>
            {messageErrors.map(messageError => <p className="error-message" key={messageError}>{messageError}</p>)}
        </div>
    )
}

export default BeePage;
