import { myAxios, privateAxios } from "./helper";

export const doCreatePost = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

export const loadAllPosts = (pageNumber, pageSize) => {
  return myAxios
    .get(
      `/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=desc`
    )
    .then((response) => response.data);
};

export const loadSinglePost = (postId) => {
  return myAxios.get(`/posts/` + postId).then((response) => response.data);
};

export const createComment = (comment, postId) => {
  return privateAxios
    .post(`/post/${postId}/comments`, comment)
    .then((response) => response.data);
};
