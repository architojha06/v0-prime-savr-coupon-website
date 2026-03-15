export default function Page() {
  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px", fontFamily: "sans-serif", color: "#1a1a1a", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "8px" }}>Contact Us</h1>
      <p style={{ color: "#666", marginBottom: "32px" }}>We'd love to hear from you. Reach out for any queries, feedback, or partnership requests.</p>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "32px" }}>General Enquiries</h2>
      <p>For general questions about PrimeSavr, how our platform works, or anything else:</p>
      <p><strong>Email:</strong> support@primesavr.com</p>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "32px" }}>Submit a Deal or Coupon</h2>
      <p>Have a coupon or deal you'd like to share with our community? Submit it through our <a href="/submit" style={{ color: "#f97316" }}>Submit a Deal</a> page or email us directly at <strong>support@primesavr.com</strong>.</p>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "32px" }}>Brand or Affiliate Partnerships</h2>
      <p>Interested in featuring your brand on PrimeSavr or exploring affiliate partnership opportunities? We'd love to connect.</p>
      <p><strong>Email:</strong> partnerships@primesavr.com</p>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "32px" }}>Report an Issue</h2>
      <p>Found an expired coupon, a broken link, or a technical issue on our platform? Please let us know and we'll fix it promptly.</p>
      <p><strong>Email:</strong> support@primesavr.com</p>

      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "32px" }}>Response Time</h2>
      <p>We aim to respond to all queries within 24–48 hours on business days.</p>

      <div style={{ marginTop: "40px", padding: "20px", background: "#f9f9f9", borderRadius: "8px", borderLeft: "4px solid #f97316" }}>
        <p style={{ margin: 0 }}><strong>PrimeSavr</strong><br />
        Bangalore, Karnataka, India<br />
        Email: support@primesavr.com</p>
      </div>
    </main>
  );
}
