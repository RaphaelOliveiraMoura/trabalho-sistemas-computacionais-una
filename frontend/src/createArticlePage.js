import React from 'react';

import CreatePost from './components/createArticleForm';
import Footer from './components/footer';
import Header from './components/header';

export default function CreateArticle({ history }) {
  return (
    <>
      <Header />
      <CreatePost history={history} />
      <Footer />
    </>
  );
}
