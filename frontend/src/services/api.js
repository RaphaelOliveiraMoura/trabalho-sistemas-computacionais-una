const BASE_API_URL = 'http://54.234.248.140:3333';

export function getAuthorizationHeaders() {
  const token = localStorage.getItem('tkn');
  const headers = {
    'Content-type': 'Application/json',
    authorization: `Bearer ${token}`,
  };
  return headers;
}

export async function signIn({ email, password }) {
  const url = `${BASE_API_URL}/signin`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);

  localStorage.setItem('tkn', `${json.token}`);
  localStorage.setItem('email', `${json.email}`);

  return json;
}

export async function signUp({ email, name, password, confirmPassword }) {
  const url = `${BASE_API_URL}/signup`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-type': 'Application/json' },
    body: JSON.stringify({ email, name, password, confirmPassword }),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);

  return json;
}

export async function getAllPosts({ totalItems }) {
  const url = `${BASE_API_URL}/posts`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthorizationHeaders(),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);

  const totalPages = json.length;
  const posts = json.reverse().slice(0, totalItems);

  return { totalPages, posts };
}

export async function getPostDetails({ postId }) {
  const url = `${BASE_API_URL}/posts/${postId}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthorizationHeaders(),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);

  return json;
}

export async function createPost({ title, description, image, body }) {
  const url = `${BASE_API_URL}/posts`;

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    body: JSON.stringify({ title, description, image, body }),
  });

  const json = await response.json();

  if (response.status !== 201) throw new Error(json.error);

  return json;
}

export async function sendComment({ postId, comment }) {
  const url = `${BASE_API_URL}/posts/${postId}/comment`;

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    body: JSON.stringify({ text: comment }),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);

  return json;
}

export async function ratePost({ postId, rating }) {
  const url = `${BASE_API_URL}/posts/${postId}/rate`;

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    mode: 'cors',
    body: JSON.stringify({ rating }),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);

  return json;
}

export async function deletePost({ postId }) {
  const url = `${BASE_API_URL}/posts/${postId}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: getAuthorizationHeaders(),
  });

  const json = await response.json();

  if (response.status !== 200) throw new Error(json.error);
}
