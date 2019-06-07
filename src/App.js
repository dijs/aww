import React from 'react';

function usePosts() {
  const [posts, setPosts] = React.useState([]);
  if (!posts.length) {
    fetch('https://api.reddit.com/r/aww/new.json')
      .then(res => res.json())
      .then(data => {
        setPosts(
          data.data.children.map(child => {
            const images =
              child.data.preview && child.data.preview.images[0].resolutions;
            return {
              title: child.data.title,
              thumbnail: child.data.thumbnail,
              video: child.data.media && child.data.media.reddit_video,
              preview: images && images[images.length - 1]
            };
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
  return { posts };
}

function Title({ title }) {
  if (title.length < 36) return <h2>{title}</h2>;
  return <h2>{title.substring(0, 45)}...</h2>;
}

function htmlDecode(input) {
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}

function BigPost({ title, video, preview, onClose }) {
  if (video) {
    return (
      <video autoplay loop poster={htmlDecode(preview.url)}>
        <source src={video.fallback_url} />
      </video>
    );
  }
  return (
    <main
      style={{ backgroundImage: preview && `url(${htmlDecode(preview.url)})` }}
    >
      <h1>{title}</h1>
      <button onClick={onClose}>×</button>
    </main>
  );
}

function PostItem({ title, thumbnail, onSelect }) {
  return (
    <article key={title} onClick={onSelect}>
      <Title title={title} />
      <img src={thumbnail} alt={title} />
    </article>
  );
}

function App() {
  const { posts } = usePosts();
  const [selected, setSelected] = React.useState(null);
  if (!posts.length) {
    return <div className="loading">Loading...</div>;
  }
  if (selected === null) {
    return (
      <div className="container">
        {posts.map((item, index) => (
          <PostItem {...item} onSelect={() => setSelected(index)} />
        ))}
      </div>
    );
  } else {
    return <BigPost {...posts[selected]} onClose={() => setSelected(null)} />;
  }
}

export default App;
