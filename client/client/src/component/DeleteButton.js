import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

const DeleteButton = ({postId,callback,commentId}) =>{

    const [confirmOpen,setConfirmOpen] = useState(false);
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
   

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {
          setConfirmOpen(false);   
         if(!commentId){
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY 
              });
              proxy.writeQuery({ query: FETCH_POSTS_QUERY , data:{getPosts:data.getPosts.filter((p) => p.id !== postId)} })
         }
          if (callback) callback();
        },
        variables: {
          postId,
          commentId
        }
      });
      return(
        <>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={deletePostOrMutation}
        />
      </>
      )

}
const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
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
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
 export default DeleteButton