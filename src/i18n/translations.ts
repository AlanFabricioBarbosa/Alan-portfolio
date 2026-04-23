export type Locale = "pt" | "en";

type ExperienceItem = { role: string; company: string; type: string; period: string; description: string; tags: string[] };
type DegreeItem = { institution: string; course: string; degree: string; period: string };
type MentorshipItem = { title: string; platform: string; mentor: string; period: string; description: string; topics: string[]; visibleTopics: number };
type CertItem = { name: string; institution: string; date: string; skills: string[] };

export type Translations = {
  nav: { about: string; skills: string; experience: string; education: string; contact: string; lightTheme: string; darkTheme: string; lightThemeEmoji: string; darkThemeEmoji: string; openMenu: string; closeMenu: string; toggleTheme: string };
  hero: { availableBadge: string; greeting: string; description: string; viewExperience: string; getInTouch: string; downloadCV: string; profileAlt: string };
  about: { heading: string; subheading: string; p1_prefix: string; p1_frontend: string; p1_platform: string; p1_fluig: string; p1_base: string; p1_and: string; p1_vflows: string; p1_suffix: string; p2_prefix: string; p2_backend: string; p2_via: string; p2_impact: string; p2_suffix: string };
  skills: { heading: string; subheading: string; categories: { frontend: string; styling: string; backend: string; versioning: string } };
  experience: { heading: string; subheading: string; recommendationLetter: string; hideMedia: string; viewMedia: string; enlarge: string; clickToView: string; items: ExperienceItem[] };
  education: { heading: string; subheading: string; academicTitle: string; mentorshipTitle: string; certificationsTitle: string; issuedAt: string; mentor: string; viewLess: string; viewMore: string; degrees: DegreeItem[]; mentorships: MentorshipItem[]; certifications: CertItem[] };
  contact: { heading: string; subheading: string; description: string; sendEmail: string };
  modal: { title: string; subtitle: string; nameLabel: string; namePlaceholder: string; emailLabel: string; emailPlaceholder: string; subjectLabel: string; subjectPlaceholder: string; messageLabel: string; messagePlaceholder: string; sendButton: string; sending: string; successMessage: string; errorMessage: string; close: string; errors: { nameRequired: string; nameMin: string; emailRequired: string; emailInvalid: string; subjectRequired: string; subjectMin: string; messageRequired: string; messageMin: string } };
  footer: { rights: string };
  notFound: { code: string; title: string; description: string; backHome: string };
  a11y: { skipToContent: string; opensNewTab: string };
};

export const translations: Record<Locale, Translations> = {
  pt: {
    nav: {
      about: "Sobre",
      skills: "Habilidades",
      experience: "Experiência",
      education: "Formação",
      contact: "Contato",
      lightTheme: "Claro",
      darkTheme: "Escuro",
      lightThemeEmoji: "☀️ Tema Claro",
      darkThemeEmoji: "🌙 Tema Escuro",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      toggleTheme: "Alternar tema",
    },
    hero: {
      availableBadge: "Disponível para projetos",
      greeting: "Olá, eu sou",
      description: "Transformando ideias em experiências digitais com código limpo, design moderno e atenção aos detalhes.",
      viewExperience: "Ver Experiência",
      getInTouch: "Entrar em Contato",
      downloadCV: "Baixar CV",
      profileAlt: "Foto de Alan Fabrício",
    },
    about: {
      heading: "Sobre mim",
      subheading: "Conheça um pouco mais sobre minha trajetória",
      p1_prefix: "Desenvolvedor com experiência prática em",
      p1_frontend: "front-end",
      p1_platform: "na plataforma",
      p1_fluig: "Fluig",
      p1_base: "e sólida base em",
      p1_and: "e fundamentos de desenvolvimento web. Atuei como estagiário front-end na",
      p1_vflows: "VFlows",
      p1_suffix: ", onde construí formulários dinâmicos, automatizações e integrações BPM.",
      p2_prefix: "Paralelamente, me desenvolvo como",
      p2_backend: "Back-End",
      p2_via: "pela",
      p2_impact: "Plataforma Impact",
      p2_suffix: ", recebendo mentoria técnica com foco em estruturas de dados, Docker, bancos de dados, orientação a objetos e arquitetura de software.",
    },
    skills: {
      heading: "Habilidades",
      subheading: "Tecnologias e ferramentas que utilizo no dia a dia",
      categories: { frontend: "Front-End", styling: "Estilização", backend: "Back-End", versioning: "Versionamento" },
    },
    experience: {
      heading: "Experiência",
      subheading: "Minha trajetória profissional",
      recommendationLetter: "Carta de Recomendação",
      hideMedia: "Ocultar mídia",
      viewMedia: "Ver mídia",
      enlarge: "Ampliar",
      clickToView: "Clique para visualizar",
      items: [
        { role: "Estagiário em Desenvolvimento Fluig", company: "VFlows", type: "Estágio", period: "Set 2025 — Fev 2026", description: "Estagiário em Desenvolvimento Fluig, com foco em soluções front-end e integrações de processos BPM. Responsável pelo desenvolvimento de formulários dinâmicos, datasets personalizados e automações de fluxo, utilizando JavaScript e jQuery para aprimorar interfaces e otimizar a experiência do usuário na plataforma Fluig.", tags: ["Fluig", "JavaScript", "jQuery", "BPM", "Front-End"] },
        { role: "Voluntário — Apoio Técnico", company: "Plataforma Impact", type: "Voluntariado", period: "Fev 2025 — Presente", description: "Apoio técnico a alunos nas trilhas de back-end e fundamentos de programação.", tags: ["Back-End", "Mentoria", "Programação"] },
      ],
    },
    education: {
      heading: "Formação",
      subheading: "Minha trajetória acadêmica e certificações",
      academicTitle: "Formação Acadêmica",
      mentorshipTitle: "Mentorias e Formação Complementar",
      certificationsTitle: "Licenças e Certificados",
      issuedAt: "Emitida em",
      mentor: "Mentor",
      viewLess: "Ver menos",
      viewMore: "ver mais",
      degrees: [{ institution: "Descomplica", course: "Análise e Desenvolvimento de Sistemas", degree: "Curso Superior de Tecnologia (CST)", period: "Ago 2024 — Set 2027" }],
      mentorships: [
        { title: "T2 — Dev. Full Stack Jr.", platform: "+praTi & Codifica", mentor: "", period: "Em andamento", description: "Formação Full Stack com foco em desenvolvimento back-end com Java e Spring Boot, front-end com ReactJS e práticas de DevOps.", topics: ["Java", "Spring Boot", "ReactJS", "DevOps"], visibleTopics: 4 },
        { title: "Mentoria Técnica em Back-End", platform: "Plataforma Impact", mentor: 'Rafael "Fino" Gottardi', period: "Em andamento", description: "Formação Back-End do programa ONE (Alura) com 7 formações e 332 horas concluídas, complementada por mentoria técnica individual.", topics: ["Sistemas Operacionais", "Terminal Avançado", "Tipos de Programas (VM, compilados, scripts, interpretados)", "Estruturas de Dados", "Fundamentos de Código", "Bancos de Dados (SQL e NoSQL)", "Orientação a Objetos", "Docker"], visibleTopics: 3 },
        { title: "Aulas de Inglês — Nível Intermediário", platform: "Plataforma Impact", mentor: "Renan Moura", period: "Em andamento", description: "Aulas de inglês focadas no desenvolvimento da comunicação para o mercado de tecnologia.", topics: [], visibleTopics: 0 },
      ],
      certifications: [
        { name: "Programa AWS re/Start e Inteligência Artificial", institution: "Escola da Nuvem", date: "Out 2025", skills: ["Cloud AWS"] },
        { name: "Formação de Desenvolvedor(a) FullStack", institution: "Vai na Web", date: "Mai 2025", skills: ["HTML5", "SASS", "JavaScript", "React", "Python", "Flask"] },
        { name: "Programa Oracle Next Education F2 T7 Back-end", institution: "Alura", date: "Jan 2025", skills: ["Lógica de Programação", "Java"] },
        { name: "Formação de Desenvolvedor(a) em Tecnologia (Front-End)", institution: "Vai na Web", date: "Dez 2023", skills: ["React.js", "JavaScript"] },
      ],
    },
    contact: {
      heading: "Contato",
      subheading: "Vamos conversar sobre seu próximo projeto?",
      description: "Estou sempre aberto a novas oportunidades e projetos interessantes. Sinta-se à vontade para entrar em contato!",
      sendEmail: "Enviar Email",
    },
    modal: {
      title: "Enviar Mensagem",
      subtitle: "Preencha os campos abaixo e sua mensagem chegará direto no meu email.",
      nameLabel: "Seu nome",
      namePlaceholder: "Como deseja ser chamado",
      emailLabel: "Seu email",
      emailPlaceholder: "seuemail@exemplo.com",
      subjectLabel: "Assunto",
      subjectPlaceholder: "Sobre o que deseja conversar?",
      messageLabel: "Mensagem",
      messagePlaceholder: "Escreva sua mensagem...",
      sendButton: "Enviar Mensagem",
      sending: "Enviando...",
      successMessage: "Mensagem enviada com sucesso!",
      errorMessage: "Erro ao enviar. Tente novamente.",
      close: "Fechar",
      errors: { nameRequired: "Nome é obrigatório", nameMin: "Nome deve ter ao menos 2 caracteres", emailRequired: "Email é obrigatório", emailInvalid: "Informe um email válido", subjectRequired: "Assunto é obrigatório", subjectMin: "Assunto deve ter ao menos 3 caracteres", messageRequired: "Mensagem é obrigatória", messageMin: "Mensagem deve ter ao menos 10 caracteres" },
    },
    footer: { rights: "Todos os direitos reservados." },
    notFound: { code: "404", title: "Página não encontrada", description: "A página que você está procurando não existe ou foi movida.", backHome: "Voltar ao início" },
    a11y: { skipToContent: "Pular para o conteúdo", opensNewTab: "(abre em nova aba)" },
  },

  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
      lightTheme: "Light",
      darkTheme: "Dark",
      lightThemeEmoji: "☀️ Light Theme",
      darkThemeEmoji: "🌙 Dark Theme",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      toggleTheme: "Toggle theme",
    },
    hero: {
      availableBadge: "Available for projects",
      greeting: "Hi, I'm",
      description: "Turning ideas into digital experiences with clean code, modern design and attention to detail.",
      viewExperience: "View Experience",
      getInTouch: "Get in Touch",
      downloadCV: "Download CV",
      profileAlt: "Photo of Alan Fabrício",
    },
    about: {
      heading: "About me",
      subheading: "Learn a little more about my journey",
      p1_prefix: "Developer with hands-on experience in",
      p1_frontend: "front-end",
      p1_platform: "on the",
      p1_fluig: "Fluig",
      p1_base: "platform and solid foundations in",
      p1_and: "and web development fundamentals. I worked as a front-end intern at",
      p1_vflows: "VFlows",
      p1_suffix: ", where I built dynamic forms, automations and BPM integrations.",
      p2_prefix: "In parallel, I'm developing as a",
      p2_backend: "Back-End",
      p2_via: "developer through",
      p2_impact: "Plataforma Impact",
      p2_suffix: ", receiving technical mentorship focused on data structures, Docker, databases, OOP and software architecture.",
    },
    skills: {
      heading: "Skills",
      subheading: "Technologies and tools I use daily",
      categories: { frontend: "Front-End", styling: "Styling", backend: "Back-End", versioning: "Version Control" },
    },
    experience: {
      heading: "Experience",
      subheading: "My professional journey",
      recommendationLetter: "Recommendation Letter",
      hideMedia: "Hide media",
      viewMedia: "View media",
      enlarge: "Enlarge",
      clickToView: "Click to view",
      items: [
        { role: "Fluig Development Intern", company: "VFlows", type: "Internship", period: "Sep 2025 — Feb 2026", description: "Fluig Development Intern, focused on front-end solutions and BPM process integrations. Responsible for developing dynamic forms, custom datasets and workflow automations, using JavaScript and jQuery to improve interfaces and optimize user experience on the Fluig platform.", tags: ["Fluig", "JavaScript", "jQuery", "BPM", "Front-End"] },
        { role: "Volunteer — Technical Support", company: "Plataforma Impact", type: "Volunteering", period: "Feb 2025 — Present", description: "Technical support for students on back-end and programming fundamentals tracks.", tags: ["Back-End", "Mentoring", "Programming"] },
      ],
    },
    education: {
      heading: "Education",
      subheading: "My academic journey and certifications",
      academicTitle: "Academic Background",
      mentorshipTitle: "Mentorships & Complementary Education",
      certificationsTitle: "Licenses & Certificates",
      issuedAt: "Issued in",
      mentor: "Mentor",
      viewLess: "View less",
      viewMore: "view more",
      degrees: [{ institution: "Descomplica", course: "Systems Analysis and Development", degree: "Technology Degree (CST)", period: "Aug 2024 — Sep 2027" }],
      mentorships: [
        { title: "T2 — Dev. Full Stack Jr.", platform: "+praTi & Codifica", mentor: "", period: "Ongoing", description: "Full Stack training focused on back-end development with Java and Spring Boot, front-end with ReactJS and DevOps practices.", topics: ["Java", "Spring Boot", "ReactJS", "DevOps"], visibleTopics: 4 },
        { title: "Back-End Technical Mentorship", platform: "Plataforma Impact", mentor: 'Rafael "Fino" Gottardi', period: "Ongoing", description: "Back-End track from the ONE program (Alura) with 7 courses and 332 hours completed, complemented by individual technical mentorship.", topics: ["Operating Systems", "Advanced Terminal", "Program Types (VM, compiled, scripts, interpreted)", "Data Structures", "Code Fundamentals", "Databases (SQL & NoSQL)", "Object-Oriented Programming", "Docker"], visibleTopics: 3 },
        { title: "English Classes — Intermediate Level", platform: "Plataforma Impact", mentor: "Renan Moura", period: "Ongoing", description: "English classes focused on developing communication skills for the tech market.", topics: [], visibleTopics: 0 },
      ],
      certifications: [
        { name: "AWS re/Start & Artificial Intelligence Program", institution: "Escola da Nuvem", date: "Oct 2025", skills: ["Cloud AWS"] },
        { name: "FullStack Developer Training", institution: "Vai na Web", date: "May 2025", skills: ["HTML5", "SASS", "JavaScript", "React", "Python", "Flask"] },
        { name: "Oracle Next Education F2 T7 Back-end Program", institution: "Alura", date: "Jan 2025", skills: ["Programming Logic", "Java"] },
        { name: "Technology Developer Training (Front-End)", institution: "Vai na Web", date: "Dec 2023", skills: ["React.js", "JavaScript"] },
      ],
    },
    contact: {
      heading: "Contact",
      subheading: "Let's talk about your next project?",
      description: "I'm always open to new opportunities and interesting projects. Feel free to reach out!",
      sendEmail: "Send Email",
    },
    modal: {
      title: "Send Message",
      subtitle: "Fill in the fields below and your message will arrive directly in my email.",
      nameLabel: "Your name",
      namePlaceholder: "How would you like to be called",
      emailLabel: "Your email",
      emailPlaceholder: "youremail@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "What would you like to talk about?",
      messageLabel: "Message",
      messagePlaceholder: "Write your message...",
      sendButton: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully!",
      errorMessage: "Error sending. Please try again.",
      close: "Close",
      errors: { nameRequired: "Name is required", nameMin: "Name must be at least 2 characters", emailRequired: "Email is required", emailInvalid: "Please enter a valid email", subjectRequired: "Subject is required", subjectMin: "Subject must be at least 3 characters", messageRequired: "Message is required", messageMin: "Message must be at least 10 characters" },
    },
    footer: { rights: "All rights reserved." },
    notFound: { code: "404", title: "Page not found", description: "The page you are looking for doesn't exist or has been moved.", backHome: "Back to home" },
    a11y: { skipToContent: "Skip to content", opensNewTab: "(opens in new tab)" },
  },
};
