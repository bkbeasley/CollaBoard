import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';

import Form, { Field, FormFooter } from '@atlaskit/form';

import Comment, {
    CommentAction,
    CommentAuthor,
    CommentEdited,
    CommentLayout,
    CommentTime
  } from '@atlaskit/comment';

import Avatar from '@atlaskit/avatar';

const Text = styled.h3`
    font-size: 14px;
    font-weight: 700;
`

export default class Comments extends Component {

    postComment = (data) => {
        
        if (typeof(data.comment) === 'undefined') {
            return;
        }

        const id = this.props.issue.issueId.replace("issue-","");
        
        let obj = {
            author: 'kyle',
            content: data.comment,
            issue_id: id,
        }
        
        let commentsArray = [];

        if (this.props.issue.comments === null) {
            commentsArray.push(obj);
            this.props.issue.comments = commentsArray;
        }
        else {
            this.props.issue.comments.push(obj);
        }

        //console.log("comments:", this.props.issue.comments);

        axios({
            method: 'post',
            url: 'http://localhost:8080/api/comments',
            data: {
                author: obj.author,
                content: obj.content,
                issueId: obj.issue_id,
            }
        }).then(() => {
            //console.log("DONE!!!");
        })
        
    }

    render() {
        return(
            <div>
                {/* <Text>Comments</Text> */}
                <Form onSubmit={data => this.postComment(data)}>
                    {({ formProps }) => (
                        <form {...formProps} name="text-fields">
                        <Field
                            name="comment"
                            placeHolder="Add a comment..."
                        >
                            {({ fieldProps }) => <TextArea {...fieldProps} />}
                        </Field>

                        <FormFooter>
                            <Button type="submit" appearance="primary">
                            Submit Comment
                            </Button>
                        </FormFooter>
                        </form>
                    )}
                </Form>
                {
                    this.props.comments !== null && this.props.comments.map((comment, key) => 
                        <Comment
                         avatar={<Avatar src={"https://api.adorable.io/avatars/40/abott@adorable.png"} size="medium" />}
                         author={<CommentAuthor>{comment.author}</CommentAuthor>}
                         content={
                         <h5>
                            {comment.content}
                         </h5>
                         }
                         />
                    )}
                        
            </div>


        );
    }
}