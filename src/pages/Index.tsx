
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowDown, Briefcase, Code, Lightbulb, Mail, User } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  // Placeholder for dynamic roles, will be enhanced later
  const roles = ["Developer", "Designer", "Creator"];
  const [currentRole, setCurrentRole] = React.useState(roles[0]);
  const [charIndex, setCharIndex] = React.useState(0);
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const typeSpeed = 150;
    const deleteSpeed = 100;
    const delayBetweenRoles = 1500;

    const handleTyping = () => {
      const fullRole = roles[roleIndex];
      if (isDeleting) {
        setCurrentRole(fullRole.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setCurrentRole(fullRole.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (!isDeleting && charIndex === fullRole.length) {
        setTimeout(() => setIsDeleting(true), delayBetweenRoles);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, roleIndex, roles]);


  const skills = [
    { name: "React", icon: <Code className="h-8 w-8 text-primary" />, level: "90%" },
    { name: "TypeScript", icon: <Code className="h-8 w-8 text-primary" />, level: "85%" },
    { name: "Node.js", icon: <Code className="h-8 w-8 text-primary" />, level: "80%" },
    { name: "Tailwind CSS", icon: <Code className="h-8 w-8 text-primary" />, level: "95%" },
    { name: "Figma", icon: <Lightbulb className="h-8 w-8 text-primary" />, level: "75%" },
    { name: "Supabase", icon: <Briefcase className="h-8 w-8 text-primary" />, level: "70%" },
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A full-stack e-commerce website with product listings, cart, and checkout.",
      imageUrl: "https://picsum.photos/seed/project1/600/400",
      tags: ["React", "Node.js", "Stripe"],
      liveLink: "#",
      repoLink: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool for teams with real-time updates.",
      imageUrl: "https://picsum.photos/seed/project2/600/400",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      liveLink: "#",
      repoLink: "#",
    },
    {
      title: "Personal Portfolio",
      description: "This very portfolio website, built with Lovable AI!",
      imageUrl: "https://picsum.photos/seed/project3/600/400",
      tags: ["React", "TypeScript", "Lovable"],
      liveLink: "#home",
      repoLink: "#",
    },
  ];


  return (
    <div className="flex flex-col min-h-screen text-foreground bg-[linear-gradient(to_br,hsl(var(--cyber-gradient-from)),hsl(var(--cyber-gradient-to)))] bg-[size:200%_200%] animate-animated-gradient">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="container mx-auto px-4 md:px-6 py-20 md:py-32 flex flex-col items-center justify-center text-center min-h-[calc(100vh-4rem)]">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Hello, I'm <span className="text-primary">Hari Krishnan</span>
          </h1>
          <p className="text-xl md:text-3xl mb-8 text-foreground/80 animate-fade-in animation-delay-300">
            I'm a <span className="text-primary font-semibold">{currentRole}</span>
            <span className="inline-block w-1 h-7 md:h-9 ml-1 bg-primary animate-pulse"></span>
          </p>
          <div className="animate-fade-in animation-delay-600">
            <Button size="lg" asChild className="group">
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-screen bg-background/30 dark:bg-background/50 backdrop-blur-md rounded-lg my-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <User className="h-10 w-10 text-primary" /> About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-md mx-auto md:mx-0">
              <img 
                src="https://images.pexels.com/photos/5340502/pexels-photo-5340502.jpeg?cs=srgb&dl=pexels-amine-m%27siouri-5340502.jpg&fm=jpg" 
                alt="Hari Krishnan" 
                className="rounded-lg shadow-xl w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="text-lg text-foreground/80 space-y-4 text-center md:text-left">
              <p>
                Hi, I'm Your Name, a passionate and creative Full-Stack Developer based in Chennai. 
                With a strong foundation in modern web technologies, I specialize in building intuitive and performant user experiences.
              </p>
              <p>
                My journey into tech started with a fascination for how software can solve real-world problems. I enjoy turning complex ideas into elegant, functional applications. I'm a lifelong learner, always eager to explore new tools and techniques to enhance my skillset.
              </p>
              <p>
                When I'm not coding, you can find me [Reading , Coding , Writing Stories , Learning , Playing].
              </p>
              </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-screen">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <Lightbulb className="h-10 w-10 text-primary" /> My Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center p-6 bg-card/80 dark:bg-card/70 backdrop-blur-sm rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                {skill.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{skill.name}</h3>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: skill.level }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{skill.level} Proficient</p>
              </div>
            ))}
          </div>
           <p className="text-center mt-12 text-lg text-foreground/70">
            ...and always learning more!
          </p>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-screen bg-background/30 dark:bg-background/50 backdrop-blur-md rounded-lg my-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 flex items-center justify-center gap-3">
            <Briefcase className="h-10 w-10 text-primary" /> Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col bg-card/80 dark:bg-card/70 backdrop-blur-sm">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover"/>
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription className="h-16 overflow-y-auto">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">View Live</a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">View Code</a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 md:px-6 py-16 md:py-24 min-h-screen">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Mail className="h-10 w-10 text-primary" /> Contact Me
          </h2>
          <p className="text-center text-lg text-foreground/70 mb-10 max-w-2xl mx-auto">
            Have a project in mind, a question, or just want to say hi? Feel free to reach out! 
            I'm always open to discussing new opportunities and collaborations.
          </p>
          <ContactForm />
        </section>
      </main>
      <footer className="border-t border-border/40 py-8 text-center text-sm text-foreground/60 bg-background/50 backdrop-blur-sm">
        <p>&copy; {new Date().getFullYear()} Hari Krishnan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
