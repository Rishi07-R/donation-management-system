import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero-section">

        <div className="hero-text">
          <span className="hero-tag">❤️ Make a Difference</span>

          <h1>
            Donate Today,
            <br />
            <span>Change a Life</span>
          </h1>

          <p>
            Our Donation Management System makes it easy to
            register donors, manage donations and track the
            impact of every contribution.
          </p>

          <div className="home-buttons">
            <Link to="/donate" className="button">
              Donate Now
            </Link>

            <Link to="/register" className="button secondary-button">
              Become a Donor
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=900&q=80"
            alt="People helping through donation"
          />
        </div>

      </section>


      {/* Donation Categories */}
      <section className="impact-section">

        <h2>Where Your Donation Helps</h2>

        <p className="section-description">
          Every contribution can make a meaningful difference.
        </p>

        <div className="impact-grid">

          {/* Education */}
          <div className="impact-card">

            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80"
              alt="Education donation"
            />

            <div className="impact-content">
              <h3>📚 Education</h3>

              <p>
                Support students with education,
                books and learning resources.
              </p>
            </div>

          </div>


          {/* Food */}
          <div className="impact-card">

            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
              alt="Food donation"
            />

            <div className="impact-content">
              <h3>🍲 Food Support</h3>

              <p>
                Help provide nutritious food to
                people and families in need.
              </p>
            </div>

          </div>


          {/* Medical */}
          <div className="impact-card">

            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
              alt="Medical support"
            />

            <div className="impact-content">
              <h3>🏥 Medical Support</h3>

              <p>
                Help people access essential
                healthcare and medical support.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Call To Action */}
      <section className="cta-section">

        <h2>Every Contribution Matters ❤️</h2>

        <p>
          Join our community of donors and help
          create a better future.
        </p>

        <Link to="/register" className="button">
          Register as Donor
        </Link>

      </section>

    </div>
  );
}

export default Home;