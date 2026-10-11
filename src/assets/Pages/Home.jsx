
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function Home() {
  const [stats, setStats] = useState({
    donors: 0,
    donations: 0,
    amount: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);


useEffect(() => {
  async function fetchStats() {
    try {
      const { data, error } = await supabase.rpc(
        "get_public_statistics"
      );

      if (error) {
        throw error;
      }

      setStats({
        donors: Number(data?.donors_count ?? 0),
        donations: Number(data?.donations_count ?? 0),
        amount: Number(data?.total_raised ?? 0),
      });
    } catch (error) {
      console.error("Unable to load public statistics:", error);
    } finally {
      setLoadingStats(false);
    }
  }

  fetchStats();
}, []);


  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">
            EVERY ACT OF KINDNESS MATTERS
          </span>

          <h1>
            Small Acts.
            <br />
            <span>Big Impact.</span>
          </h1>

          <p>
            Every contribution begins with the willingness to help.
            Join the MR Donor community and take a step towards
            a more caring and supportive society.
          </p>

          <div className="hero-actions">
            <Link to="/donate" className="button">
              Donate Now <span aria-hidden="true">→</span>
            </Link>

            <Link to="/register" className="button button-outline">
              Become a Donor
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-mark">✓</span>
            Simple registration. Recorded contributions. Admin review.
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
            alt="Volunteers coming together to support their community"
          />

          <div className="image-caption">
            <strong>Kindness creates possibilities.</strong>
            <span>Every contribution starts with you.</span>
          </div>

          <div className="hero-floating-card">
            <span className="floating-icon">♡</span>
            <div>
              <strong>Give with purpose</strong>
              <span>Make your contribution count.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live statistics */}
      <section className="stats-section" aria-label="Donation platform statistics">
        <div className="stat-item">
          <span className="stat-label">REGISTERED DONORS</span>
          <strong>
            {loadingStats ? "—" : stats.donors.toLocaleString("en-IN")}
          </strong>
          <span className="stat-description">
            People registered on our platform
          </span>
        </div>

        <div className="stat-item">
          <span className="stat-label">DONATION RECORDS</span>
          <strong>
            {loadingStats ? "—" : stats.donations.toLocaleString("en-IN")}
          </strong>
          <span className="stat-description">
            Contributions recorded in the system
          </span>
        </div>

        <div className="stat-item">
          <span className="stat-label">TOTAL RECORDED</span>
          <strong>
            {loadingStats ? "—" : formatAmount(stats.amount)}
          </strong>
          <span className="stat-description">
            Total value of recorded donations
          </span>
        </div>
      </section>

      {/* Mission */}
      <section className="section mission-section">
        <div className="section-heading">
          <span className="eyebrow">OUR PURPOSE</span>
          <h2>Where compassion meets action</h2>
          <p>
            Meaningful change begins when people come together
            to support the needs of their communities.
          </p>
        </div>

        <div className="impact-grid">
          <article className="impact-card">
            <div className="impact-icon">01</div>
            <h3>Education</h3>
            <p>
              Support access to learning materials, educational
              resources and opportunities for students.
            </p>
            <span className="impact-link">Invest in possibilities</span>
          </article>

          <article className="impact-card">
            <div className="impact-icon">02</div>
            <h3>Food Support</h3>
            <p>
              Help support community efforts that address food
              needs and provide essential supplies.
            </p>
            <span className="impact-link">Support basic needs</span>
          </article>

          <article className="impact-card">
            <div className="impact-icon">03</div>
            <h3>Healthcare</h3>
            <p>
              Contribute towards initiatives focused on essential
              healthcare and medical assistance.
            </p>
            <span className="impact-link">Care for communities</span>
          </article>
        </div>

        <p className="disclaimer">
          These are example areas where donations can make a difference,
          not a claim that MR Donor currently operates active programs in
          each area.
        </p>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="section-heading">
          <span className="eyebrow">THE PROCESS</span>
          <h2>Three simple steps to get started</h2>
          <p>
            A clear process helps keep donor registration and
            donation records organised.
          </p>
        </div>

        <div className="steps-grid">
          <article className="step-card">
            <span className="step-number">01</span>
            <h3>Register</h3>
            <p>
              Enter your details to create a donor record and receive
              your unique donor code.
            </p>
          </article>

          <article className="step-card">
            <span className="step-number">02</span>
            <h3>Submit a Donation</h3>
            <p>
              Provide your donor details, enter the amount and
              confirm your donation submission.
            </p>
          </article>

          <article className="step-card">
            <span className="step-number">03</span>
            <h3>Review & Verify</h3>
            <p>
              The administrator reviews submitted donation records
              through the management portal.
            </p>
          </article>
        </div>
      </section>

      {/* Transparency */}
      <section className="trust-section">
        <div className="trust-content">
          <span className="eyebrow">BUILT AROUND ACCOUNTABILITY</span>
          <h2>Every record deserves attention.</h2>
          <p>
            MR Donor brings donor registration and donation records
            together in one organised platform. Administrators can
            manage records and review submissions, helping keep the
            process clear and structured.
          </p>

          <ul className="trust-list">
            <li>
              <span>✓</span> Unique donor identification
            </li>
            <li>
              <span>✓</span> Organised donation records
            </li>
            <li>
              <span>✓</span> Administrator-managed records
            </li>
          </ul>
        </div>

        <div className="trust-panel">
          <div className="trust-panel-icon">✦</div>
          <h3>Giving starts with trust.</h3>
          <p>
            Clear records and responsible management are important
            parts of a well-organised donation process.
          </p>
          <Link to="/register" className="trust-link">
            Join the community →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <span className="eyebrow">YOUR NEXT STEP STARTS HERE</span>
        <h2>Be part of something meaningful.</h2>
        <p>
          Register as a donor or submit your donation details
          to begin your contribution journey.
        </p>

        <div className="cta-actions">
          <Link to="/register" className="button">
            Register as a Donor
          </Link>

          <Link to="/donate" className="button button-light-outline">
            Donate Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-main">
          <div>
            <h3>MR Donor</h3>
            <p>
              A platform for organising donor registration and
              donation records.
            </p>
          </div>

          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/donate">Donate</Link>
            <Link to="/admin-login">Admin Portal</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} MR Donor. All rights reserved.
          </span>
          <span>Making contributions easier to manage.</span>
        </div>
      </footer>
    </div>
  );
}
