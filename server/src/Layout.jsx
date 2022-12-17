import './welcome.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function Layout(props) {
    const navigate = useNavigate();

    const app_state = props.value;
    const path_name = app_state.username;
    const posts = app_state.posts;
    // const isLogin = app_state.isLogin;
    // const setIsLogin = app_state.setIsLogin;
    const fetch = (app_state.fetch_all_post !== undefined)? app_state.fetch_all_post : app_state.fetch_post_for_user;
  
    const [isLogin, setIsLogin] = useState(false);
    const [login_name, setLoginName] = useState("");

    useEffect(() => {
      console.log("page loaded!!!")

      axios.get('/user/isLoggedIn')
      .then((res) => {
        setIsLogin(true);
        setLoginName(res.data);
        console.log(login_name)
      }).catch((err) => {
        console.log("no one logged in yet!")
      })
    }, [])


    function showAllPost(){
      const postlist = [];
      console.log(posts);
      posts.forEach((data) => {
        postlist.push(createPostTag(data._id, data.content, data.username, data.created, data.updated))
      })
      return postlist;
    }
  
    function createPostTag(id, content, username, create, update){
  
      return (
      <div>
        <div> id: {id}</div>
        <div>content: {content}</div>
        <div className='name_display' onClick={() => onClick_visit_user(username)}>
            @{username}
        </div>
        <div>create: {create}</div>
        <div>update: {update}</div>
      </div>);
    }
  
    const [modal, setModal] = useState(false);
    const [modal_register_success, setModal_register_success] = useState(false);
    const [modal_login, setModal_login] = useState(false);
    const [modal_post, setModal_post] = useState(false);
  
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    function onClick_Post(){
      setModal_post(!modal_post);
    }

    function onClick_reg_success(){
      setModal_register_success(!modal_register_success);
      setName('');
      setPassword("");
    }
  
    function onClick_home(){
      navigate("/");
    }
  
    function onClick_register() {
      setModal(!modal);
      setPassword("");
    }

    function onClick_login(){
        setModal_login(!modal_login);
        setPassword("");
    }

    function update_post_content(event){
      setContent(event.target.value);
    }
  
    function updateName(event){
      setName(event.target.value);
    }
  
    function updatePassword(event){
      setPassword(event.target.value);
    }

    function onClick_visit_user(input_name){
        navigate("/" + input_name);
        fetch(input_name)
    }

    function login(){
        axios.post("/user/authenticate", {
            username: name,
            password: password,
        }).then((res) => {
            console.log("You logged in! " + name)
            console.log(res);
            setIsLogin(true);
            setLoginName(res.data.username);
            setModal_login(!modal_login);
        }
        ).catch((err) => {
            console.log(err)
        })
    }

    function logout(){
        axios.post("/user/logOut")
            .then(() => {
                location.reload();
            })
    }
  
    function createUser(){
      axios.post("/user/register",{
        username: name,
        password: password,
      })
      .then(() => {
        setModal(!modal);
        setPassword("");
        setModal_register_success(!modal_register_success);
        setError("");
        // res.send("successful register!");
      })
      .catch((err) => {
        const mesg = err.response.data.error;
        console.log(mesg);
        display_error_register(mesg);
      })
    }

    function make_new_post(){
      axios.post("/post", {
        content: content,
        username: login_name,
      })
      .then(() => {
        setModal_post(!modal_post);
        setContent("");
        fetch()
      })
      .catch((err) => {
        console.log(err);
      })
    }

    function display_error_register(err){
        setError(err);
    }

    console.log(name + password)
  
    // if I post something on the backend using postman, could that also trigger a
    // rerender in the front page
  
    function nav_bar_change(){
        if(isLogin){
            return (
                <>
                    <button className="button post" onClick={onClick_Post}>
                        +
                    </button>
                    
                    <div className='name_display' onClick={() => onClick_visit_user(login_name)} >
                        @{login_name}
                    </div>      
                    <button className="button" onClick={logout}>
                        Log Out
                    </button>
         
                </>
            )

        }else{
            return (
                <>
                    <button className="button" onClick={onClick_login}>
                        Log In
                    </button>
                    <button className="button" onClick={onClick_register} >
                        Sign Up
                    </button>
                </>
            )
        }
    }
  
    return (
      <>
        {modal_post && (
          <div className="modal">
            <div onClick={onClick_Post} className="overlay"></div>
            <div className="modal-content">
              <h2>Post A New Update!</h2>
              <div className='error_mesg'>
                {error}
              </div>
              <label>Content: </label>
              <div>
                <textarea className='post' type="text" onInput={update_post_content}></textarea>
              </div>
              <button className="close-modal" onClick={onClick_Post}>
                CLOSE
              </button>
              <button className="mid-modal" onClick={make_new_post}>
                Post
              </button>
            </div>
          </div>
        )}


        {modal && (
          <div className="modal">
            <div onClick={onClick_register} className="overlay"></div>
            <div className="modal-content">
              <h2>Register</h2>
              <div className='error_mesg'>
                {error}
              </div>
              <div>
                <label>Username: </label>
                <input type="text" onInput={updateName}></input>
              </div>
              <div>
                <label>Password:  </label>
                <input type="password" onInput={updatePassword}></input>
              </div>
              <button className="close-modal" onClick={onClick_register}>
                CLOSE
              </button>
              <button className="mid-modal" onClick={createUser}>
                Submit
              </button>
            </div>
          </div>
        )}

        {modal_login && (
          <div className="modal">
            <div onClick={onClick_login} className="overlay"></div>
            <div className="modal-content">
              <h2>Log In</h2>
              <div className='error_mesg'>
                {error}
              </div>
              <div>
                <label>Username: </label>
                <input type="text" onInput={updateName}></input>
              </div>
              <div>
                <label>Password:  </label>
                <input type="password" onInput={updatePassword}></input>
              </div>
              <button className="close-modal" onClick={onClick_login}>
                CLOSE
              </button>
              <button className="mid-modal" onClick={login}>
                Submit
              </button>
            </div>
          </div>
        )}
        
        {modal_register_success && (
          <div className="modal">
            <div onClick={onClick_reg_success} className="overlay"></div>
            <div className="modal-content">
              <h2>Successfully Register for {name} !</h2>
              <button className="close-modal" onClick={onClick_reg_success}>
                CLOSE
              </button>
            </div>
          </div>
        )}
  
        <div className='layout'>
          <div className='navbar'>
            <div className='longer'>
              <button className="button" onClick={onClick_home}>
                Home
              </button>
            </div>
            {nav_bar_change()}
            {/* <button className="button" onClick={onClick_login}>
              Log In
            </button>
            <button className="button" onClick={onClick_register} >
              Sign Up
            </button> */}
          </div>
  
          <div className='info_layout'>
            <p> Project 3</p>
            {showAllPost()}
          </div>
        </ div>
      
      </>
  
    );
  }