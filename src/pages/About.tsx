import styled from "styled-components";

const About = () => {
  return (
    <Container>
      <h1>About Me</h1>
      <p>
        I’m a UX Engineer with a background in frontend development and design systems. 
        I love bridging the gap between design and development to create intuitive and accessible user experiences.
      </p>
      <p>
        My expertise includes React, TypeScript, Design Systems, and Performance Optimization.
      </p>
    </Container>
  );
};

export default About;
 
const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 3rem;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
  }
`;
