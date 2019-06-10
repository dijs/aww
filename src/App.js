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

function BigPost({ active, title, thumbnail, preview, onClose }) {
  // Preload image
  const [preloaded, setPreloaded] = React.useState(false);
  if (!active) {
    return <main />;
  }
  if (!preloaded) {
    const img = new Image();
    console.log(title, 'is preloading');
    img.onload = () => {
      console.log(title, 'was preloaded');
      setPreloaded(true);
    };
    img.src = htmlDecode(preview.url);
  }
  const src = preloaded ? htmlDecode(preview.url) : thumbnail;
  return (
    <main className="active" style={{ backgroundImage: `url(${src})` }}>
      <h1>{title}</h1>
      <div className="close" onClick={onClose}>
        <div className="inner">×</div>
      </div>
    </main>
  );
}

function PostItem({ title, thumbnail, onSelect }) {
  return (
    <article
      key={title}
      onClick={onSelect}
      style={{ backgroundImage: `url(${thumbnail})` }}
    >
      <Title title={title} />
    </article>
  );
}

function App() {
  const { posts } = usePosts();
  const [selected, setSelected] = React.useState(null);
  if (!posts.length) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <React.Fragment>
      <div className="container">
        {posts.map((item, index) => (
          <PostItem {...item} onSelect={() => setSelected(index)} />
        ))}
      </div>
      <BigPost
        active={selected !== null}
        {...posts[selected]}
        onClose={() => setSelected(null)}
      />
    </React.Fragment>
  );
}

export default App;
