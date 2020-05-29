import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../until/hook'


function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  });


  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy,result){
        const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
        })

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          variables: values,
         data: { getPosts: [result.data.createPost, ...data.getPosts] }
       })
           
       
       }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
    <Form onSubmit={onSubmit}>
      <h2>Create a post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Please enter my post."
          name="body"
          onChange={onChange}
          value={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
    {error && (
      <div className="ui error message" style={{marginBottom:20}}>
      <ul className="list">
        <li>
          {error.graphQLErrors[0].message}
        </li>

      </ul>
      </div>
    )}
  
  </>
)
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
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

export default PostForm;