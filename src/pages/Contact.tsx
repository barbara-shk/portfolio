import styled from "styled-components";

const Contact = () => {
  return (
    <Container>
      <h1>Contact Me</h1>
      <p>I'd love to hear from you! Feel free to reach out.</p>
      <ContactInfo>
        <p>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/your-profile" target="_blank">linkedin.com/in/your-profile</a></p>
        <p>GitHub: <a href="https://github.com/your-username" target="_blank">github.com/your-username</a></p>
      </ContactInfo>
    </Container>
  );
};

export default Contact;
 
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 3rem;
  text-align: center;

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const ContactInfo = styled.div`
  p {
    font-size: 1rem;
    margin-top: 10px;
  }

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
`;
