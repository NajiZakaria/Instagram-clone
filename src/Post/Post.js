import React, { useEffect, useState } from 'react'
import Avatar from "@material-ui/core/Avatar";
import './Post.css'
import { db } from '../firebase';
import firebase from 'firebase';
function Post({user,postId,imageSrc,username,caption}) {
    const [comments,setComments] =useState([])
    const [comment,setComment] =useState('')
    useEffect(() => {
        let unsubsribe;
        if(postId){
            unsubsribe =db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp','asc')
            .onSnapshot(s=>{
                setComments(s.docs.map((doc)=>doc.data()))
            })
        }
        return ()=>{
            unsubsribe()
        }
    }, [postId])

    const postComment =(event)=>{
        event.preventDefault()
        db.collection('posts')
        .doc(postId).collection("comments")
        .add({
            text:comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('')
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    src=""
                />
                <h3>{username}</h3>
            </div>
            <img
                className="post__image"
                src={imageSrc}
                alt=""/>
            <h4 className="post__text">
                <strong>{username}</strong> {caption}
            </h4>
            <div className="post__comments">
                {comments.map((comment)=>(
                    <p>
                        <b>{comment.username} </b>  {comment.text}
                    </p>

                ))}
            </div>

            {user &&(
                <form className="post__commentBox">
                    <input
                        type="text"
                        className="post__input"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e)=>setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post
