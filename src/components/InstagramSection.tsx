import type { CSSProperties } from 'react';

const InstagramSection = () => (
  <section className="insta-section container reveal">
    <div className="profile-row">
      <div className="avatar-wrap">
        <div className="story-ring">
          <img className="avatar" src="/src/assets/coach.jpg" alt="Tibin Fitness" />
        </div>
      </div>
      <div className="profile-meta">
        <div className="profile-header">
          <h3 className="handle">the_athletic_twin</h3>
        </div>
        <div className="profile-stats">
          <div><strong>280</strong><span>posts</span></div>
          <div><strong>11.3k</strong><span>followers</span></div>
          <div><strong>1,805</strong><span>following</span></div>
        </div>
        <div className="profile-bio">
          <div className="display-name">TIBIN AMBROSE</div>
          <div className="bio-lines">
            <div>Hybrid Coach | HIIT Specialist</div>
            <div>HYROX Athlete TH IN</div>
            <div>Transformation Coach — Helping you get fitter, faster</div>
          </div>
          <div className="profile-links">
            <a href="https://www.youtube.com/@the_athletic_twin" target="_blank" rel="noopener noreferrer">
              www.youtube.com/@the_athletic_twin
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="highlight-row" data-lenis-prevent>
      {['#12week', 'The books', 'HYROX BLR', 'Hyrox prep', 'HYROX THAI', 'Gtech Marathon', 'Fedara'].map((label, index) => (
        <div
          key={label}
          className="story-item"
          style={{ '--story-index': index } as CSSProperties}
        >
          <div className="story-ring small">
            <img
              className="story-thumb"
              src={`https://picsum.photos/seed/${encodeURIComponent(label)}/120/120`}
              alt={label}
              loading="lazy"
            />
          </div>
          <div className="story-label">{label}</div>
        </div>
      ))}
    </div>
  </section>
);

export default InstagramSection;
