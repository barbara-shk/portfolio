import styled from "styled-components";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, image, link }) => {
  return (
    <Card>
      <Image src={image} alt={title} />
      <Content>
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </Content>
    </Card>
  );
};

export default ProjectCard;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }

  a {
    display: inline-block;
    margin-top: 10px;
    font-size: 0.9rem;
    color: #007bff;
    font-weight: bold;
    text-decoration: none;
  }
`;
