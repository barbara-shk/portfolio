import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "E-commerce UX Redesign",
    description: "Improved checkout UX for better conversion rates.",
    image: "/images/project1.jpg",
    link: "https://your-project-link.com",
  },
  {
    title: "Design System for SaaS",
    description: "Built a scalable design system using React & Figma.",
    image: "/images/project2.jpg",
    link: "https://your-project-link.com",
  },
];

const Projects = () => {
  return (
    <div>
      <h2>My Projects</h2>
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </div>
  );
};

export default Projects;
