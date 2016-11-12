import $ from 'jquery';

export const addComment = (eventId, userId, userName, commentBody) => {
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: '/api/comments',
      data: {eventId, userId, userName, commentBody},
    }).done((commentArr) => {
      dispatch({type: 'ADD_COMMENT', comments: commentArr});
    });
  };
};
