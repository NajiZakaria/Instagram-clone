import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Post from './Post/Post';
import ImageUpload from './ImageUpload/ImageUpload';
import {db, auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './App.css';
import { Input, Button  } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';



function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes=useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [openSignIn,setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser]=useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(null)
      }
    })
    return ()=>{
      //perform cleanup actions
      unsubscribe()
    }
  }, [user,username])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot=>(
      setPosts(snapshot.docs.map(doc => ({
        id:doc.id,
        post:doc.data()
      })))
    ))
  }, [])

  const signup =(event)=>{
      event.preventDefault()
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName:username
        })
      })
      .catch((error)=>alert(error.message))
      setOpen(false)
  }

  const signin =(event)=>{
    event.preventDefault()
    auth
    .signInWithEmailAndPassword(email,password)
    .catch( (error)=> alert(error.message) )
    setOpenSignIn(false)
}
  return (
    <div className="app">   
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
              <Input
                placeholder="Username"
                type="text"
                value={username}
                onChange={e=>setUsername(e.target.value)}
              />
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signup}>Sign Up</Button>
          </form>
        </div>
      </Modal> 
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signin}>Sign In</Button>
          </form>
        </div>
      </Modal>  
      <Header 
        user={user}
        setOpen={setOpen} 
        setOpenSignIn={setOpenSignIn}
      />
      
      {
        user?.displayName ?(
          <ImageUpload username={user.displayName}/>
        ):(
          <h3>Soryy you are not logged in!!!</h3>
        )
      }
      
      <div className="app__posts">
        <div className="app__postsLeft">
          {posts.map(({id,post})=>(
            <Post
              user={user}
              key={id}
              postId={id}
              imageSrc={post.imageSrc}
              username={post.username}
              caption={post.caption}
            />
          ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
