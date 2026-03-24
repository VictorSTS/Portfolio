import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import { projects } from "./data/projects";
import { useLanguage } from "./i18n/Context";

const outlineBtn = 'border border-default-300/70';
const assetBase = import.meta.env.BASE_URL;
const cvUrl = `${assetBase}assets/docs/CV.pdf`;
const portraitUrl = `${assetBase}assets/images/vsantos.jpg`;

const skillFilters = [
  { key: "all", label: { fr: "Tout", en: "All" } },
  { key: "realiser", label: { fr: "Réaliser", en: "Develop" } },
  { key: "collaborer", label: { fr: "Collaborer", en: "Collaborate" } },
  { key: "gerer", label: { fr: "Gérer", en: "Manage" } },
  { key: "optimiser", label: { fr: "Optimiser", en: "Optimize" } },
  { key: "administrer", label: { fr: "Administrer", en: "Administer" } },
];

const competencesData = [
  {
    key: "realiser",
    title: { fr: "Développer des applications informatiques", en: "Develop software applications" },
    levels: [
      { level: 1, desc: { fr: "Développer des applications informatiques simples", en: "Develop simple software applications" } },
      { level: 2, desc: { fr: "Partir des exigences et aller jusqu'à une application complète", en: "Develop a complete application from requirements" } },
      { level: 3, desc: { fr: "Adapter des applications sur un ensemble de supports (embarqué, web, mobile, IoT...)", en: "Adapt applications to various platforms (embedded, web, mobile, IoT...)" } }
    ],
  },
  {
    key: "optimiser",
    title: { fr: "Optimiser des applications informatiques", en: "Optimize software applications" },
    levels: [
      { level: 1, desc: { fr: "Appréhender et construire des algorithmes", en: "Understand and build algorithms" } },
      { level: 2, desc: { fr: "Sélectionner les algorithmes adéquats pour répondre à un problème donné", en: "Select appropriate algorithms for a given problem" } },
      { level: 3, desc: { fr: "Analyser et optimiser des applications", en: "Analyze and optimize applications" } }
    ],
  },
  {
    key: "administrer",
    title: { fr: "Administrer des systèmes informatiques communicants", en: "Administer connected IT systems" },
    levels: [
      { level: 1, desc: { fr: "Installer et configurer un poste de travail", en: "Install and configure a workstation" } },
      { level: 2, desc: { fr: "Déployer des services dans une architecture réseau", en: "Deploy services within a network architecture" } },
      { level: 3, desc: { fr: "Concevoir et développer une architecture réseau sécurisée", en: "Design and implement a secure network architecture" } }
    ],
  },
  {
    key: "gerer",
    title: { fr: "Gérer des données de l'information", en: "Manage information data" },
    levels: [
      { level: 1, desc: { fr: "Concevoir et mettre en place une base de données à partir d'un cahier des charges client", en: "Design and deploy a database from a client specification" } },
      { level: 2, desc: { fr: "Optimiser une base de données, interagir avec une application et mettre en œuvre la sécurité", en: "Optimize a database, interact with an application and implement security" } },
      { level: 3, desc: { fr: "Administrer des bases de données de manière sécurisée", en: "Administer databases securely" } }
    ],
  },
  {
    key: "conduire",
    title: { fr: "Conduire un projet", en: "Project Management" },
    levels: [
      { level: 1, desc: { fr: "Identifier les besoins métiers des clients et des utilisateurs", en: "Identify business needs of clients and users" } },
      { level: 2, desc: { fr: "Appliquer une démarche de suivi de projet en fonction des besoins", en: "Apply a project tracking methodology based on needs" } },
      { level: 3, desc: { fr: "Mettre en œuvre des démarches de gestion de projet agiles", en: "Implement agile project management methodologies" } }
    ],
  },
  {
    key: "collaborer",
    title: { fr: "Travailler dans une équipe informatique", en: "Work in an IT team" },
    levels: [
      { level: 1, desc: { fr: "Acquérir les bases d'une attitude professionnelle", en: "Acquire the basics of a professional attitude" } },
      { level: 2, desc: { fr: "S'intégrer dans un environnement de travail d'équipe", en: "Integrate into a team working environment" } },
      { level: 3, desc: { fr: "Manager une équipe informatique de manière agile", en: "Manage an IT team in an agile manner" } }
    ],
  }
];

const educationItems = [
  {
    period: { fr: "09/2026 - 09/2029", en: "09/2026 - 09/2029" },
    school: { fr: "ISEP", en: "ISEP" },
    location: { fr: "Paris", en: "Paris" },
    degree: { fr: "Cycle Ingénieur ISEP", en: "ISEP Engineering Degree" },
    detail: { 
      fr: "Admis en cycle ingénieur en apprentissage (1ère année). Recherche d'une alternance en développement informatique (3 ans) à partir de septembre 2026.",
      en: "Admitted to the engineering apprenticeship cycle (1st year). Looking for a 3-year work-study program in software development starting September 2026."
    },
    status: { fr: "À venir", en: "Upcoming" },
  },
  {
    period: { fr: "09/2023 - 09/2026", en: "09/2023 - 09/2026" },
    school: { fr: "IUT de Marne-la-Vallée - Université Gustave Eiffel", en: "IUT de Marne-la-Vallée - Gustave Eiffel University" },
    location: { fr: "Champs-sur-Marne", en: "Champs-sur-Marne" },
    degree: { fr: "BUT Informatique", en: "Bachelor of Technology in Computer Science" },
    detail: { fr: "Parcours réalisation d'applications : conception, développement, validation.", en: "Software Engineering specialization: design, development, validation." },
    status: { fr: "En cours", en: "Current" },
  },
  {
    period: { fr: "09/2020 - 07/2023", en: "09/2020 - 07/2023" },
    school: { fr: "Lycée Pierre de Coubertin", en: "Pierre de Coubertin High School" },
    location: { fr: "Meaux", en: "Meaux" },
    degree: { fr: "Baccalauréat Technologique", en: "Technological High School Diploma" },
    detail: { fr: "Série STI2D, option Systèmes d'Information et Numérique. Mention Bien. Option CIT en seconde.", en: "STI2D series, Information Systems and Digital option. Honors. CIT option in first year." },
  },
];

const workItems = [
  {
    period: { fr: "04/2025 - 08/2025", en: "04/2025 - 08/2025" },
    company: { fr: "Alioze (Agence de communication)", en: "Alioze (Communication Agency)" },
    location: { fr: "Paris", en: "Paris" },
    role: { fr: "Développeur Python", en: "Python Developer" },
    bullets: [
      { fr: "Développement d'un outil Python automatisant la migration et la modernisation de contenus WordPress.", en: "Development of a Python tool automating the migration and modernization of WordPress content." },
      { fr: "Intégration des APIs Google et OpenAI pour la génération et le versioning de contenus SEO.", en: "Integration of Google and OpenAI APIs for the generation and versioning of SEO content." },
      { fr: "Conception d'une interface web Flask avec authentification sécurisée et suivi en temps réel pour l'équipe non technique.", en: "Design of a Flask web interface with secure authentication and real-time tracking for the non-technical team." },
    ],
  },
  {
    period: { fr: "09/2022 - 09/2024", en: "09/2022 - 09/2024" },
    company: { fr: "Freelance", en: "Freelance" },
    location: { fr: "Fiverr (@epsidev)", en: "Fiverr (@epsidev)" },
    role: { fr: "Développeur Python", en: "Python Developer" },
    bullets: [
      { fr: "Conception de chatbots IA utilisant GPT-4 et GPT-3.5.", en: "Design of AI chatbots using GPT-4 and GPT-3.5." },
      { fr: "Réalisation de projets web scraping avec BeautifulSoup et Selenium.", en: "Realization of web scraping projects with BeautifulSoup and Selenium." },
      { fr: "Réalisation de bots Discord avec discord.py en programmation orientée objet.", en: "Creation of Discord bots with discord.py using object-oriented programming." },
    ],
  },
  {
    period: { fr: "01/2020", en: "01/2020" },
    company: { fr: "Tipandtool (Agence web)", en: "Tipandtool (Web Agency)" },
    location: { fr: "Chambry", en: "Chambry" },
    role: { fr: "Stagiaire", en: "Intern" },
    bullets: [
      { fr: "Stage d'observation dans une agence de création de sites internet.", en: "Observation internship in a web design agency." },
      { fr: "Observation des différentes étapes de création d'un site internet.", en: "Observation of the different stages of website creation." },
    ],
  },
];

function Header() {
  const { lang, setLang, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-default-200/40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-[min(1120px,92vw)] items-center justify-between py-4">
        <Link className="rounded-medium border border-default-300 px-3 py-1.5 font-mono text-sm" to="/">
          {t('navTitle') || "victor.santos/dev"}
        </Link>
        <div className="flex gap-4 items-center">
          <nav className="flex items-center gap-2" aria-label="Navigation principale">
            <Button as={NavLink} to="/" end variant="light" size="sm" className={outlineBtn}>
              {lang === 'fr' ? 'Accueil' : 'Home'}
            </Button>
            <Button as={NavLink} to="/projects" variant="light" size="sm" className={outlineBtn}>
              {lang === 'fr' ? 'Projets' : 'Projects'}
            </Button>
            <Button as={NavLink} to="/competences" variant="light" size="sm" className={outlineBtn}>
              {lang === 'fr' ? 'Compétences' : 'Skills'}
            </Button>
            <Button as="a" href={cvUrl} target="_blank" rel="noreferrer" variant="flat" color="secondary" size="sm" className={outlineBtn}>
              {t('navCV') || "CV"}
            </Button>
          </nav>
          <Button
            size="sm"
            variant="flat"
            onPress={() => setLang(lang === "fr" ? "en" : "fr")}
          >
            {lang === "fr" ? "EN" : "FR"}
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { lang, t } = useLanguage();
  return (
    <section className="mx-auto mt-5 w-[min(1120px,92vw)]">
      <Card className="border border-default-200/60 bg-content1">
        <CardBody className="p-6 md:p-8">
          <div className="grid items-start gap-5 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Chip color="primary" variant="flat" radius="sm" className="font-mono text-xs">
                  {lang === 'fr' ? 'STAGE DEV INFO' : 'SWE INTERNSHIP'}
                </Chip>
                <Chip color="success" variant="dot" radius="sm" className="font-mono text-xs">
                  {lang === 'fr' ? 'DISPONIBLE SEPT 2026' : 'AVAILABLE SEPT 2026'}
                </Chip>
              </div>
              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                Victor Santos, {lang === 'fr' ? 'développeur informatique.' : 'software developer.'}
              </h1>
              <p className="max-w-2xl text-default-500">
                {lang === 'fr' 
                  ? "Actuellement en 3ème année de BUT Informatique à l'IUT de Marne-la-Vallée, je recherche activement une alternance en développement. Basé en Île-de-France (Lognes) avec mobilité vers IDF ou Reims." 
                  : "Currently in my 3rd year of a Bachelor's in Computer Science at IUT Marne-la-Vallée, actively seeking a work-study program in development. Based in the Paris region (Lognes) with mobility to IDF or Reims."}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button as={Link} to="/projects" color="primary" radius="sm" className={outlineBtn}>
                  {lang === 'fr' ? 'Explorer les projets' : 'Explore projects'}
                </Button>
                <Button as="a" href={cvUrl} target="_blank" rel="noreferrer" variant="bordered" radius="sm" className={outlineBtn}>
                  {lang === 'fr' ? 'Ouvrir le CV' : 'Open CV'}
                </Button>
              </div>
            </div>

            <img
              className="mx-auto h-full max-h-[160px] w-full max-w-[160px] rounded-medium border border-default-200 object-cover"
              src={portraitUrl}
              alt="Victor Santos"
            />
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

function AlternanceSection() {
  const { lang } = useLanguage();
  return (
    <section className="mx-auto mt-4 w-[min(1120px,92vw)]">
      <Card className="border border-primary/40 bg-content1">
        <CardBody className="gap-3 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Chip color="secondary" variant="flat" radius="sm" className="font-mono text-xs">
              {lang === 'fr' ? 'RECHERCHE ALTERNANCE 2026' : 'LOOKING FOR 2026 APPRENTICESHIP'}
            </Chip>
            <Chip color="primary" variant="dot" radius="sm" className="font-mono text-xs">
              DEV FULL-STACK / PYTHON / JAVA / PHP
            </Chip>
          </div>
          <p className="text-default-500">
            {lang === 'fr' 
              ? "Je recherche une alternance pour mon école d'ingénieur informatique à partir de septembre 2026. Basé en Île-de-France (Lognes), mobile sur l'IDF et Reims."
              : "I am looking for an apprenticeship for my computer engineering school starting September 2026. Based in the Paris region (Lognes), mobile across IDF and Reims."}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto mt-5 w-[min(1120px,92vw)] space-y-4">
      <Card className="border border-default-200/60 bg-content1">
        <CardBody className="p-6">
          <div className="grid items-start gap-5 md:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <div className="flex gap-2 pt-1">
                <Skeleton className="h-10 w-36 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>

            <Skeleton className="mx-auto h-[160px] w-[160px] rounded-medium" />
          </div>
        </CardBody>
      </Card>

      <Card className="border border-default-200/60 bg-content1">
        <CardBody className="space-y-3 p-5">
          <Skeleton className="h-5 w-56 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
        </CardBody>
      </Card>
    </div>
  );
}

function QuickInfo() {
  const { t } = useLanguage();
  return (
    <section className="mx-auto mt-4 w-[min(1120px,92vw)]">
      <Card className="border border-default-200/60 bg-content1">
        <CardHeader>
          <h2 className="text-xl font-semibold">{t('skillsTitle') || "Compétences"}</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-wrap gap-2">
            {[
              "Java",
              "Python",
              "React",
              "HTML/CSS/JS",
              "Linux",
              "Git SCM",
              "SQL (MySQL, PostgreSQL)",
              "C",
            ].map((tech) => (
              <Chip key={tech} variant="flat" radius="sm" color="primary">
                {tech}
              </Chip>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

function EducationSection() {
  const { lang, t } = useLanguage();
  return (
    <section className="mx-auto mt-6 w-[min(1120px,92vw)]">
      <Card className="border border-default-200/60 bg-content1 shadow-sm">
        <CardHeader className="px-6 pt-6 pb-2">
          <h2 className="text-2xl font-bold">{t('educationTitle') || "Formation"}</h2>
        </CardHeader>
        <CardBody className="gap-0 px-6 pb-6 pt-2">
          {educationItems.map((item, index) => (
            <div key={item.period[lang]}>
              <div className="relative flex flex-col gap-4 py-6 md:flex-row group">
                <div className="shrink-0 md:w-1/4 pt-1">
                  <Chip size="sm" variant="flat" color="primary" radius="sm" className="mb-3 font-mono border border-primary/20">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.period[lang]}
                    </div>
                  </Chip>
                  <div className="text-sm font-medium text-default-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location[lang]}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 md:w-3/4">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground">{item.degree[lang]}</h3>
                      <p className="text-base font-semibold text-secondary/90 mt-1">{item.school[lang]}</p>
                    </div>
                    {item.status && (
                      <Chip
                        size="sm"
                        variant="dot"
                        color={item.status.fr === "À venir" ? "warning" : "success"}
                        radius="full"
                        className="font-medium whitespace-nowrap self-start md:self-auto border-none"
                      >
                        {item.status[lang]}
                      </Chip>
                    )}
                  </div>
                  
                  <p className="text-default-600 text-sm md:text-base leading-relaxed mt-2">
                    {item.detail[lang]}
                  </p>
                </div>
              </div>
              {index < educationItems.length - 1 && <Divider className="opacity-50" />}
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

function WorkExperienceSection() {
  const { lang, t } = useLanguage();
  return (
    <section className="mx-auto mt-6 w-[min(1120px,92vw)]">
      <Card className="border border-default-200/60 bg-content1 shadow-sm">
        <CardHeader className="px-6 pt-6 pb-2">
          <h2 className="text-2xl font-bold">{t('experienceTitle') || "Expériences professionnelles"}</h2>
        </CardHeader>
        <CardBody className="gap-0 px-6 pb-6 pt-2">
          {workItems.map((item, index) => (
            <div key={`${item.period[lang]}-${item.company[lang]}`}>
              <div className="relative flex flex-col gap-4 py-6 md:flex-row group">
                <div className="shrink-0 md:w-1/4 pt-1">
                  <Chip size="sm" variant="flat" color="secondary" radius="sm" className="mb-3 font-mono border border-secondary/20">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.period[lang]}
                    </div>
                  </Chip>
                  <div className="text-sm font-medium text-default-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location[lang]}
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 md:w-3/4">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">{item.role[lang]}</h3>
                    <p className="text-base font-semibold text-primary/90 mt-1">{item.company[lang]}</p>
                  </div>
                  
                  <ul className="mt-2 space-y-2.5">
                    {item.bullets.map((bullet, i) => (
                      <li key={i} className="text-default-600 text-sm md:text-base flex items-start">
                        <span className="mr-3 mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary/70"></span>
                        <span className="leading-relaxed">{bullet[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {index < workItems.length - 1 && <Divider className="opacity-50" />}
            </div>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

function ProjectCard({ project }) {
  const { lang, t } = useLanguage();
  return (
    <Card
      isPressable
      isHoverable
      className="group h-full overflow-hidden border border-default-200/60 bg-content1 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
    >
      <CardBody className="flex h-full flex-col gap-3 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h3 className="text-lg font-semibold">{project.title[lang]}</h3>
            <p className="text-sm text-default-500">{project.tagline[lang]}</p>
          </div>
          <img
            src={project.cover}
            alt={project.title[lang]}
            className="h-20 w-20 rounded-medium border border-default-200 object-cover transition-transform duration-300 group-hover:scale-[1.04] md:h-24 md:w-24"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {project.skills.slice(0, 3).map((skill) => (
            <Chip key={`${project.slug}-${skill.key}`} size="sm" variant="flat" color="secondary" radius="sm">
              {typeof skill.label === "object" ? skill.label[lang] || skill.label.fr : skill.label}
            </Chip>
          ))}
        </div>

        <Button as={Link} to={`/projects/${project.slug}`} variant="light" color="primary" radius="sm" className={`mt-auto w-full ${outlineBtn}`}>
          {t('viewProject') || "Voir la fiche"}
        </Button>
      </CardBody>
    </Card>
  );
}

function ProjectsView({ compact = false }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { lang, t } = useLanguage();

  const visibleProjects = useMemo(() => {
    return projects.filter((project) =>
      activeFilter === "all"
        ? true
        : project.skills.some((skill) => skill.key === activeFilter)
    );
  }, [activeFilter]);

  return (
    <section className="mx-auto mt-4 w-[min(1120px,92vw)]">
      <Card className="border border-default-200/60 bg-content1">
        <CardHeader className="flex flex-col items-start gap-3">
          {!compact && <h1 className="text-2xl font-bold">{t('projectsTitle') || "Projets & compétences mobilisées"}</h1>}
        </CardHeader>
        <CardBody className="gap-4">
          <div className="flex flex-wrap gap-2">
            {skillFilters.map((filter) => (
              <Button
                key={filter.key}
                size="sm"
                radius="sm"
                color={filter.key === activeFilter ? "primary" : "default"}
                variant={filter.key === activeFilter ? "solid" : "flat"}
                onPress={() => setActiveFilter(filter.key)}
                className={`transition-transform duration-200 hover:-translate-y-0.5 ${outlineBtn}`}
              >
                {typeof filter.label === 'object' ? (filter.label[lang] || filter.label.fr) : filter.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-4 md:auto-rows-fr md:grid-cols-2">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
}

function HomePage() {
  const { lang } = useLanguage();
  return (
    <>
      <Hero />
      <AlternanceSection />
      <QuickInfo />
      <EducationSection />
      <WorkExperienceSection />
      <div className="mx-auto mt-4 flex w-[min(1120px,92vw)] items-center justify-between">
        <h2 className="text-xl font-semibold">{lang === 'fr' ? 'Sélection de projets' : 'Project Selection'}</h2>
        <Button as={Link} to="/projects" variant="light" color="primary" size="sm" radius="sm" className={outlineBtn}>
          {lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
        </Button>
      </div>
      <ProjectsView compact />
    </>
  );
}

function ProjectsPage() {
  return <ProjectsView />;
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <section className="mx-auto mt-4 w-[min(1120px,92vw)]">
        <Card className="border border-default-200/60 bg-content1">
          <CardBody className="gap-3 p-8">
            <h1 className="text-2xl font-bold">{lang === 'fr' ? 'Projet introuvable' : 'Project not found'}</h1>
            <Button as={Link} to="/projects" color="primary" variant="flat" radius="sm" className={`w-fit ${outlineBtn}`}>{lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}</Button>
          </CardBody>
        </Card>
      </section>
    );
  }

  return (
    <section className="mx-auto mt-4 grid w-[min(1120px,92vw)] gap-4 md:grid-cols-[1.75fr_1fr]">
      <Card className="border border-default-200/60 bg-content1">
        <CardBody className="gap-4 p-5">
          <img className="max-h-[200px] w-full rounded-medium border border-default-200 object-cover" src={project.cover} alt={project.title[lang]} />
          <h1 className="text-3xl font-bold">{project.title[lang]}</h1>
          <p className="text-default-500">{project.context[lang]}</p>
          <Divider />
          <div className="grid gap-3 md:grid-cols-2">
            {project.skills.map((skill) => (
              <Card key={`${project.slug}-${skill.key}`} className="border border-default-200/60 bg-content2" shadow="none">
                <CardBody className="gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <Chip size="sm" color="secondary" variant="flat" radius="sm">
                      {typeof skill.label === "object" ? skill.label[lang] || skill.label.fr : skill.label}
                    </Chip>
                  </div>
                  <p className="text-sm text-default-500">{skill.detail[lang]}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card className="h-fit border border-default-200/60 bg-content1">
        <CardHeader>
          <h2 className="text-xl font-semibold">{lang === 'fr' ? 'Fiche rapide' : 'Quick overview'}</h2>
        </CardHeader>
        <CardBody className="gap-3 text-sm">
          <p>
            <span className="text-default-500">Stack:</span> {project.stack}
          </p>
          <p>
            <span className="text-default-500">Type:</span> {project.type[lang]}
          </p>
          <p>
            <span className="text-default-500">{lang === 'fr' ? 'Travail:' : 'Team:'}</span> {project.team[lang]}
          </p>
          <Button as="a" href={project.repo} target="_blank" rel="noreferrer" color="primary" radius="sm" className={outlineBtn}>
            {lang === 'fr' ? 'Voir le dépôt' : 'View repository'}
          </Button>
          <Button as={Link} to="/projects" variant="flat" radius="sm" className={outlineBtn}>
            {lang === 'fr' ? 'Retour aux projets' : 'Back to projects'}
          </Button>
        </CardBody>
      </Card>
    </section>
  );
}

function CompetencesPage() { const { t, lang } = useLanguage();
  return (
    <section className="mx-auto mt-6 flex w-[min(1120px,92vw)] flex-col gap-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold md:text-4xl">
            {lang === 'fr' ? 'Compétences (B.U.T. Informatique)' : 'Skills (B.U.T. Computer Science)'}
          </h1>
          <p className="max-w-3xl text-default-500 md:text-lg">
            {lang === 'fr' 
              ? "Détail des niveaux de développement de mes compétences acquises au cours du B.U.T. Informatique (Parcours Réalisation d'applications) et les projets concrets associés à chacune d'elles."
              : "Details of the development levels of the skills acquired during my Computer Science B.U.T. (Software Engineering track) and the practical projects associated with each of them."}
          </p>
      </div>

      <div className="flex flex-col gap-8">
        {competencesData.map((comp) => {
          const compProjects = projects.filter((p) => p.skills.some((s) => s.key === comp.key));

          return (
            <Card key={comp.key} className="border border-default-200/60 bg-content1 shadow-sm">
              <CardHeader className="flex flex-col items-start gap-1 px-6 pt-6 pb-2">
                <div className="flex items-center gap-3 w-full">
                  <h2 className="text-2xl font-bold capitalize text-primary">{comp.key}</h2>
                  <Divider className="flex-1 hidden sm:block opacity-50" />
                </div>
                <p className="text-default-600 font-medium text-lg">{comp.title[lang] || comp.title}</p>
              </CardHeader>
              
              <CardBody className="px-6 pb-6 pt-4 gap-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {comp.levels.map((lvl) => (
                    <div key={lvl.level} className="flex flex-col gap-3 rounded-medium border border-default-200/60 bg-content2 p-5 transition-colors hover:border-primary/30">
                      <Chip size="sm" variant="shadow" color="secondary" radius="sm" className="self-start font-mono font-semibold">
                        Niveau {lvl.level}
                      </Chip>
                      <p className="text-sm text-foreground/90 leading-relaxed font-medium">
                        {lvl.desc[lang] || lvl.desc}
                      </p>
                    </div>
                  ))}
                </div>
                
                {compProjects.length > 0 ? (
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {lang === 'fr' ? "Projets mobilisant cette compétence" : "Projects involving this skill"}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      {compProjects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 rounded-medium border border-dashed border-default-300 p-4 text-center">
                    <p className="text-sm text-default-400">{lang === 'fr' ? "Aucun projet n'est actuellement mis en avant pour cette compétence." : "No project is currently showcased for this skill."}</p>
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  const { lang, setLang } = useLanguage();
  return (
    <footer className="mt-8 border-t border-default-200/40">
      <div className="mx-auto flex w-[min(1120px,92vw)] flex-col gap-1 py-5 text-sm text-default-500 md:flex-row md:items-center md:justify-between">
        <p>{lang === 'fr' ? 'Version FR active. (En cours de traduction vers EN)' : 'EN Version active. (Work in progress)'}</p>
        <p>contact: victor.santos77@pm.me · @victorsts</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/competences" element={<CompetencesPage />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}
