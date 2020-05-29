import React,{useEffect,useState,useContext} from "react";
import { useQuery } from "@apollo/react-hooks";
import {Grid,Transition} from "semantic-ui-react"
import PostCard from "../component/PostCard"

import {AuthContext} from '../context/auth'
import PostForm from '../component/PostForm';
import gql from 'graphql-tag'
const Home = () =>{
  const {user} = useContext(AuthContext);

    const [posts,setPosts] = useState([]);
    const{
        loading,
        data
    } = useQuery(FETCH_POSTS_QUERY)
    useEffect(() =>{
        if(data){
            setPosts(data.getPosts);
            console.log(data);
            
        }
    },[data])
    return(
        <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>

          {user && (<Grid.Column>
            <PostForm/>
          </Grid.Column>)}
          {loading ? (
            <h1>Loading posts..</h1>
          ) : (
           <Transition.Group>
             {
                posts &&
                posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))
             }
           </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    )
}

export const FETCH_POSTS_QUERY = gql`
{
  getPosts {
    id
    body
    createdAt
    username
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;
export default Home