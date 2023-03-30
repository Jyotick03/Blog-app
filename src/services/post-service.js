import { myAxios, privateAxios } from "./helper";

export const doCreatePost = (postData) => {
  return privateAxios
    .post(
      `/user/${postData.userId}/category/${postData.categoryId}/posts`,
      postData
    )
    .then((response) => response.data);
};

export const uploadImagePost = (image, postId) => {
  let formData = new FormData();
  formData.append("image", image);
  return privateAxios
    .post(`/post/image/upload/${postId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
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

export const loadPostCategoryWise = (categoryId) => {
  return myAxios.get(`/category/${categoryId}/posts`, categoryId).then((response) => response.data)
}
