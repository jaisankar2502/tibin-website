type HeaderProps = {
  menuOpen: boolean;
  setMenuOpen: (value: boolean | ((value: boolean) => boolean)) => void;
};

const Header = ({ menuOpen, setMenuOpen }: HeaderProps) => (
  <header className="navbar">
    <div className="container nav-inner">
      <a href="#home" className="logo">TIBIN</a>
      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        <a href="#home">Home</a>
        <a href="#programs">Programs</a>
        <a href="#about">About</a>
        <a href="#transformations">Transformations</a>
        <a href="#pricing">Pricing</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="nav-actions">
        <a href="#contact" className="button button-primary">Book a Session</a>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
