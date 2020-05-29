import React, { useContext,useState,useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery,useMutation} from '@apollo/react-hooks';
import moment from 'moment';
import { Button, Card, Grid, Image, Icon, Label,Form } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import LikeButton from '../component/LikeButton'
import DeleteButton from '../component/DeleteButton'
const SinglePost = (props) =>{
    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);
    const [comment,setComment] = useState('')
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
          setComment('');
          commentInputRef.current.blur();
        },
        variables: {
          postId,
          body: comment
        }
      }); 
  console.log(postId);
  const { loading, error, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  })
if (loading) return <p>Loading...</p>
  if (error) return <p>Error.</p>
let postMarkup
  if (!data.getPost) {
    postMarkup = <p>Loading Post...</p>
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount
    } = data.getPost
    function deletePostCallback() {
        props.history.push('/');
      }
    postMarkup = (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src=" data:image/jpeg;base64,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"
                size="small"
                float="right"
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{username}</Card.Header>
                  <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{body}</Card.Description>
                </Card.Content>
                <hr />
                <Card.Content extra>
                  <LikeButton user={user} post={{ id, likeCount, likes }} />
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="blue">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="blue" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                  {user && user.username === username && (
                    <DeleteButton postId={id} callback={deletePostCallback} />
                  )}
                </Card.Content>
              </Card>
              {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    return postMarkup;

}
const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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
const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;
export default SinglePost