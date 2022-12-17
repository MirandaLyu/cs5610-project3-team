import './welcome.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Layout from './Layout';

export default function User() {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    // const [isLogin, setIsLogin] = useState(false);
    const username = params.username;

    useEffect(()=>{


        fetch_post_for_user(username);

        // axios.get('http://localhost:8000/user/isLoggedIn')
        //     .then((res) => {
        //       setIsLogin(true);
        //       console.log("some one logged in!!!!")
        //     }).catch((err) => {
        //       console.log("no one logged in yet!")
        //     })
    },[])

    function fetch_post_for_user(username){
        axios.get("/post/" + username)
        .then((res)=>{
            console.log('get successful! ');
            console.log(res)
            setPosts(res.data);
        })
        .catch(function(error){ 
            console.log('rejected!!!')
            setIsError(true);
        })
        .finally(function() {
            console.log('loading')
            setIsLoading(false);
        })
    }

    if (isLoading) {
        return (<div>Loading....</div>)
    }

    if(isError) {
        return (<div>Could not find User with username: {username}</div>)
    }

    return (
      <Layout value={{posts, fetch_post_for_user, username}}/>
    )
}