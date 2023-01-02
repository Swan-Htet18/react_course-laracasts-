import React from "react";
import { useQuery } from "react-query";
import { formatDistance } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Comments({ issueNumber }) {
  const {
    isLoading,
    isSuccess,
    data: comments,
  } = useQuery(["comments", issueNumber], fetchComments);

  function fetchComments() {
    return fetch(
      `https://api.github.com/repos/facebook/create-react-app/issues/${issueNumber}/comments`
    ).then((response) => response.json());
  }
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          {comments.map((comment) => (
            <div key={comment.id} className="comment-container">
              <a href={comment.user.html_url}>
                <img
                  src={comment.user.avatar_url}
                  alt="avatar"
                  className="avatar"
                />
              </a>
              <div className="comment">
                <div className="comment-heading">
                  <a href={comment.user.html_url}>{comment.user.login}</a>{" "}
                  commented{" "}
                  {formatDistance(new Date(comment.created_at), new Date(), {
                    addSuffix: true,
                  })}{" "}
                </div>
                <div className="comment-body markdown-body">
                  <ReactMarkdown
                    children={comment.body}
                    remarkPlugins={[remarkGfm]}
                  />
                  ,
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Comments;
