import React from 'react';

function usePosts() {
  const [posts, setPosts] = React.useState([]);
  if (!posts.length) {
    fetch('https://api.reddit.com/r/aww/new.json')
      .then(res => res.json())
      .then(data => {
        setPosts(
          data.data.children.map(child => ({
            title: child.data.title,
            thumbnail: child.data.thumbnail,
            embed: child.data.embed
          }))
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
  return { posts };
}

function Post({ title, thumbnail }) {
  return (
    <article key={title}>
      <h2>{title}</h2>
      <img src={thumbnail} alt={title} />
    </article>
  );
}

function App() {
  const { posts } = usePosts();
  return <div className="container">{posts.map(Post)}</div>;
}

export default App;
