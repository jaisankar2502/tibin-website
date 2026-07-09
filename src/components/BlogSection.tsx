type BlogSectionProps = {
  posts: Array<{ category: string; title: string }>;
};

const BlogSection = ({ posts }: BlogSectionProps) => (
  <section className="section blog-section">
    <div className="container section-header reveal">
      <span className="eyebrow">Insights</span>
      <h2>Fitness tips for a modern lifestyle.</h2>
    </div>
    <div className="container blog-grid">
      {posts.map((post) => (
        <article key={post.title} className="blog-card reveal">
          <p className="eyebrow">{post.category}</p>
          <h3>{post.title}</h3>
          <a href="#contact" className="link-button">Read more</a>
        </article>
      ))}
    </div>
  </section>
);

export default BlogSection;
