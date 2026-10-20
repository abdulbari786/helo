/**
 * Case studies, from directrix_projects_context.md.
 *
 * Publishing rules applied (see REPORT.md):
 * - No figure listed under `claims_pending_verification` is published (P02, P03, P06, P07, P08, P09).
 * - P01 client stays confidential; P07 shows no organisation until attribution is confirmed.
 * - Items marked TO CONFIRM in the source are left out of the public page.
 * - Only links listed in the source are used (SpeakMart GitHub is not linked: returned 404).
 */
import type { Project } from './types'
import { flags } from './site'

const all: Project[] = [
  {
    id: 'P01',
    slug: 'enterprise-launch-workflow-platform',
    title: 'Enterprise Launch — Workflow & Platform Engineering',
    shortTitle: 'Enterprise Launch',
    subtitle: 'Workflow & Platform Engineering',
    categoryGroup: 'Enterprise Application Engineering',
    tags: ['Enterprise Software Engineering', 'Full-Stack Development'],
    showOrganization: false,
    organizationLabel: 'Confidential enterprise client',
    featured: false,
    cardSummary: 'Workflow logic, prerequisite validation, integrations and testing across a large enterprise application.',
    overview: [
      'Enterprise platforms require reliable workflows, integrated backend services, and consistent application behavior. This project involved developing and improving features across a complex enterprise application, focusing on workflow logic, prerequisite validation, integrations, testing, and system reliability.',
    ],
    whatWeBuilt: [
      'Attribute-based logic to support configurable application behavior.',
      'Prerequisite validation to ensure required conditions are satisfied before workflows proceed.',
      'Signal-driven notification workflows.',
      'Backend and frontend feature integrations.',
      'Integration tests and expanded test coverage for application components.',
      'Bug fixes, code improvements, and reliability enhancements.',
    ],
    howWeBuiltIt: [
      'We developed features across the application stack, connecting frontend workflows with backend services and the relevant business logic. Validation rules were implemented to enforce workflow prerequisites, while signal-driven mechanisms supported notifications and event-related behavior.',
      'Integration tests were used to verify that related components worked together correctly. We also investigated production and development issues, improved existing code, and contributed to containerized development and CI/CD workflows.',
    ],
    techStack: ['JavaScript', 'TypeScript', 'React', 'Backend services', 'REST APIs', 'Docker', 'CI/CD tooling', 'Testing tools'],
    outcome:
      'Improved workflow correctness, expanded testing coverage, strengthened application reliability, and supported the continued development of a large-scale enterprise platform.',
  },
  {
    id: 'P02',
    slug: 'cineassist',
    title: 'CineAssist — AI-Powered Customer Support',
    shortTitle: 'CineAssist',
    subtitle: 'AI-Powered Customer Support',
    categoryGroup: 'Generative AI & AI Agents',
    tags: ['Generative AI', 'Customer Service Automation'],
    organization: 'CineGear Pro, London, UK',
    showOrganization: true,
    featured: true,
    cardSummary: 'A GPT-based assistant that answers routine customer questions through natural conversation.',
    overview: [
      'CineAssist is an AI-powered customer support solution designed to help customers obtain answers to common questions through natural-language conversations.',
      'The project focused on integrating a large language model into customer service workflows to reduce repetitive manual query handling and improve the efficiency of customer support operations.',
    ],
    whatWeBuilt: [
      'A conversational AI assistant for customer enquiries.',
      'GPT-based response generation.',
      'AI integration with customer-facing support workflows.',
      'Automated handling of routine questions.',
      'A foundation for expanding customer service automation.',
    ],
    howWeBuiltIt: [
      'We integrated GPT-3.5 into a conversational support workflow, enabling incoming questions to be processed through a language model and responses to be returned through the application.',
      'The implementation combined AI integration with application-level processing to support customer interactions. The solution was developed to complement existing customer support operations rather than replace the entire customer service function.',
    ],
    techStack: ['Python', 'GPT-3.5', 'API integration', 'Web application technologies'],
    outcome:
      'Reduced repetitive manual query handling by automating answers to routine customer questions, and provided a foundation for expanding customer service automation.',
  },
  {
    id: 'P03',
    slug: 'smartfind',
    title: 'SmartFind — Intelligent Product Search & Recommendations',
    shortTitle: 'SmartFind',
    subtitle: 'Intelligent Product Search & Recommendations',
    categoryGroup: 'Generative AI & AI Agents',
    tags: ['Artificial Intelligence', 'E-Commerce', 'Semantic Search'],
    organization: 'CineGear Pro, London, UK',
    showOrganization: true,
    featured: false,
    cardSummary: 'Semantic product search and recommendations that match meaning, not just keywords.',
    overview: [
      'Traditional product search often depends heavily on exact keyword matches. SmartFind explores how semantic search can make product discovery more relevant by identifying products based on the meaning and context of a search query.',
      'The solution combines vector-based retrieval with product recommendation capabilities to help customers discover relevant items more efficiently.',
    ],
    whatWeBuilt: [
      'A semantic product search engine.',
      'Vector-based similarity search.',
      'FAISS-powered retrieval of relevant product information.',
      'Product recommendation functionality.',
      'Backend integration for returning relevant search results.',
      'A foundation for more intelligent catalog discovery.',
    ],
    howWeBuiltIt: [
      "We used AI-oriented search representations and FAISS to retrieve similar items efficiently. The search workflow was designed to identify relevant product candidates and integrate them into the application's product discovery experience.",
      'The search functionality was connected to application services so that retrieved results could be presented within the customer-facing workflow.',
    ],
    techStack: ['Python', 'FAISS', 'Semantic search', 'Vector retrieval', 'Backend APIs', 'Web application integration'],
    outcome: 'Delivered meaning-based product discovery with recommendations, connected to the customer-facing product experience.',
  },
  {
    id: 'P04',
    slug: 'documind',
    title: 'DocuMind — Enterprise Document Intelligence',
    shortTitle: 'DocuMind',
    subtitle: 'Enterprise Document Intelligence',
    categoryGroup: 'Generative AI & AI Agents',
    tags: ['Generative AI', 'RAG', 'Document Processing'],
    showOrganization: false,
    organizationLabel: 'Enterprise AI project',
    featured: true,
    cardSummary: 'Make large document collections searchable and answerable in natural language using RAG.',
    overview: [
      'Organizations often manage large volumes of documents containing important operational, legal, and business information. Finding relevant information manually can be time-consuming and difficult to scale.',
      'DocuMind is an AI-powered document intelligence solution designed to make document collections searchable and easier to interact with using natural language.',
    ],
    whatWeBuilt: [
      'Document ingestion and processing workflows.',
      'Text extraction and document chunking.',
      'Embedding generation for semantic retrieval.',
      'Vector-based document search.',
      'Retrieval-augmented generation (RAG) for question answering.',
      'Conversational knowledge retrieval.',
      'Authenticated APIs and request controls.',
      'Dashboard capabilities for analytics and monitoring.',
    ],
    howWeBuiltIt: [
      'We designed a Python-based backend using FastAPI to support document processing and retrieval workflows. Documents were prepared for indexing, transformed into vector representations, and stored in a searchable vector index.',
      'FAISS supported similarity search, while LangChain components connected document loading, text splitting, retrieval, and language-model response generation.',
      'PostgreSQL supported structured application data, while React provided the interface for interacting with application functionality. Containerization technologies supported deployment and environment consistency.',
    ],
    techStack: ['Python', 'FastAPI', 'LangChain', 'SentenceTransformers', 'FAISS', 'PostgreSQL', 'React', 'Docker', 'Kubernetes', 'MLflow'],
    outcome:
      'The project demonstrates an approach to enterprise knowledge retrieval that can reduce manual document searching and make internal information more accessible.',
    potentialApplications: [
      'Internal document search.',
      'Legal and compliance knowledge retrieval.',
      'Policy and procedure assistants.',
      'Enterprise knowledge management.',
      'Research document discovery.',
    ],
    diagram: 'documind',
  },
  {
    id: 'P05',
    slug: 'knowledge-navigator',
    title: 'Knowledge Navigator — Private, Offline AI Search',
    shortTitle: 'Knowledge Navigator',
    subtitle: 'Private, Offline AI Search',
    categoryGroup: 'Generative AI & AI Agents',
    tags: ['Private AI', 'Retrieval-Augmented Generation', 'Enterprise Search'],
    organization: 'University of East London, UK — Research Collaboration',
    showOrganization: true,
    featured: true,
    cardSummary: 'AI-assisted document search that runs in a controlled local environment, without sending documents to the cloud.',
    overview: [
      'Knowledge Navigator explores how AI-assisted search can make large document collections easier to navigate while keeping processing within a controlled local environment.',
      'The system uses local document indexing, embedding-based retrieval, and an AI-assisted query workflow to support information discovery without requiring every document to be sent to an external cloud service.',
    ],
    whatWeBuilt: [
      'A local document ingestion and indexing workflow.',
      'Embedding generation using SentenceTransformers.',
      'Semantic search powered by FAISS.',
      'API services for search and retrieval.',
      'Interactive interfaces for querying documents.',
      'Visualization and monitoring components.',
      'Containerized deployment support for controlled environments.',
    ],
    howWeBuiltIt: [
      'We used Python and machine learning libraries to prepare documents and generate embeddings. FAISS was used to index the resulting vectors and retrieve semantically similar content.',
      'FastAPI provided local API endpoints, while Streamlit and React supported interactive experiences for querying and exploring information. Docker was used to package the application and its dependencies for more consistent deployment.',
      'The architecture was designed around local processing and controlled data access.',
    ],
    techStack: ['Python', 'PyTorch', 'SentenceTransformers', 'FAISS', 'FastAPI', 'Streamlit', 'React', 'Docker', 'CUDA', 'SQLite'],
    outcome:
      'Demonstrates how organizations can explore private knowledge assistants, local semantic search, and AI-supported document discovery in controlled computing environments.',
    potentialApplications: [
      'Internal enterprise knowledge search.',
      'Technical documentation assistants.',
      'Research repositories.',
      'Data-sensitive information retrieval.',
      'Offline-capable knowledge tools.',
    ],
    diagram: 'knowledge-navigator',
  },
  {
    id: 'P06',
    slug: 'fingercheck-2',
    title: 'FingerCheck 2.0 — Biometric Recognition & Attendance',
    shortTitle: 'FingerCheck 2.0',
    subtitle: 'Biometric Recognition & Attendance',
    categoryGroup: 'Machine Learning & Data Intelligence',
    tags: ['Computer Vision', 'Biometrics', 'Research & Development'],
    organization: 'University of East London, UK',
    showOrganization: true,
    featured: false,
    cardSummary: 'Fingerprint recognition using Siamese neural networks, integrated into an attendance application.',
    overview: [
      'FingerCheck 2.0 is a biometric attendance system that explores fingerprint recognition using machine learning.',
      'The work involved integrating biometric recognition models with application services and providing interfaces for inspecting fingerprint features and model behavior.',
    ],
    whatWeBuilt: [
      'A fingerprint recognition component using Siamese neural networks.',
      'REST API integration for machine learning models.',
      'Backend services for application integration.',
      'A React-based application interface.',
      'Interactive fingerprint feature visualization.',
      'Containerized training workflows using GPU-enabled infrastructure.',
    ],
    howWeBuiltIt: [
      'We used a Siamese-network approach to learn representations suitable for comparing fingerprint inputs. Python/Django APIs provided a connection between the model and the web application.',
      'A React-based interface supported the application workflow, while Streamlit was used for interactive visualization and exploration of model features.',
      'Containerized training workflows and cloud GPU resources supported machine learning experimentation and integration.',
    ],
    techStack: ['Python', 'Siamese neural networks', 'Django', 'REST APIs', 'React', 'Streamlit', 'Docker', 'GPU-enabled training'],
    outcome:
      'Demonstrates fingerprint recognition with machine learning integrated into a working attendance application, with tools for inspecting model behavior.',
    potentialApplications: [
      'Attendance management.',
      'Biometric matching research.',
      'Identity verification prototypes.',
      'Secure access-control research.',
    ],
  },
  {
    id: 'P07',
    slug: 'workforceiq',
    title: 'WorkforceIQ — AI-Powered HR Analytics',
    shortTitle: 'WorkforceIQ',
    subtitle: 'AI-Powered HR Analytics',
    categoryGroup: 'Machine Learning & Data Intelligence',
    tags: ['Machine Learning', 'Predictive Analytics', 'Business Intelligence'],
    // Attribution unconfirmed: no organisation shown until the owner confirms.
    showOrganization: false,
    featured: false,
    cardSummary: 'Employee attrition prediction, workforce segmentation and interactive analytics dashboards.',
    overview: [
      'WorkforceIQ is an analytics platform designed to help organizations explore workforce trends using data processing, predictive modeling, and interactive dashboards.',
      'The project focuses on employee attrition prediction, workforce segmentation, and presenting analytical insights through accessible visual interfaces.',
    ],
    whatWeBuilt: [
      'Employee attrition prediction models.',
      'Workforce clustering and segmentation.',
      'Data preparation and feature engineering workflows.',
      'Model evaluation and hyperparameter tuning.',
      'Model interpretation using SHAP.',
      'Interactive workforce analytics dashboards.',
      'KPI visualization and database integration.',
      'Support for processing large datasets.',
    ],
    howWeBuiltIt: [
      'We used Python-based data processing workflows to prepare workforce data for machine learning. Scikit-learn and XGBoost supported model development, while model evaluation and tuning helped assess predictive performance.',
      'SHAP was used to make model behavior more interpretable. Streamlit and Plotly powered dashboard interfaces, and PostgreSQL supported structured data access.',
      'Dask was included to support data processing at larger scales.',
    ],
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'SHAP', 'Streamlit', 'Plotly', 'PostgreSQL', 'Dask'],
    outcome: 'Delivered an interpretable attrition-prediction and workforce-analytics platform with interactive dashboards.',
    potentialApplications: [
      'Workforce trend analysis.',
      'Employee retention planning.',
      'HR reporting and analytics.',
      'Workforce segmentation.',
      'Data-driven organizational planning.',
    ],
  },
  {
    id: 'P08',
    slug: 'modelops-console',
    title: 'ModelOps Console — AI Monitoring & Lifecycle Management',
    shortTitle: 'ModelOps Console',
    subtitle: 'AI Monitoring & Lifecycle Management',
    categoryGroup: 'Machine Learning & Data Intelligence',
    tags: ['MLOps', 'AI Infrastructure', 'Data Visualization'],
    organization: 'CineGear Pro, London, UK',
    showOrganization: true,
    featured: false,
    cardSummary: 'Dashboards and lifecycle workflows for monitoring and managing machine learning models.',
    overview: [
      'Machine learning solutions need more than a trained model. Teams also need ways to monitor performance, track operational indicators, manage model versions, and support repeatable deployment and retraining workflows.',
      'ModelOps Console combines operational dashboards with machine learning lifecycle practices to help teams monitor their AI systems and manage model-related workflows.',
    ],
    whatWeBuilt: [
      'An interactive AI operations dashboard.',
      'Visualizations for model performance and business KPIs.',
      'Containerized machine learning pipelines.',
      'Model lifecycle management workflows.',
      'Model tracking using MLflow.',
      'Automated retraining triggers for selected predictive maintenance workflows.',
      'Deployment infrastructure using container orchestration.',
    ],
    howWeBuiltIt: [
      'We used Streamlit to build interactive monitoring views that presented model metrics and business indicators in one interface.',
      'MLflow supported model lifecycle practices, while Docker provided consistent environments for machine learning pipelines. Kubernetes was used in the reported infrastructure for orchestrating GPU-accelerated workloads.',
      'Retraining triggers were established to support the maintenance of predictive models when relevant conditions were met.',
    ],
    techStack: ['Python', 'Streamlit', 'MLflow', 'Docker', 'Kubernetes', 'GPU-enabled infrastructure', 'ML monitoring tools'],
    outcome:
      'Delivered a monitoring and lifecycle-management layer for machine learning systems, including model tracking, containerized pipelines and automated retraining triggers.',
  },
  {
    id: 'P09',
    slug: 'cinegear-digital',
    title: 'CineGear Digital — E-Commerce Website Modernization',
    shortTitle: 'CineGear Digital',
    subtitle: 'E-Commerce Website Modernization',
    categoryGroup: 'Web & Mobile Development',
    tags: ['Web Development', 'E-Commerce', 'Digital Transformation'],
    organization: 'CineGear Pro, London, UK',
    showOrganization: true,
    featured: false,
    cardSummary: "Responsive redesign and optimization of a media-equipment retailer's website, with AI-assisted support.",
    overview: [
      'This project focused on improving the online experience of a media equipment retail business through website optimization, responsive interface development, and supporting digital workflows.',
      'The objective was to improve usability across devices while supporting customer enquiries and business operations through web-based systems.',
    ],
    whatWeBuilt: [
      'Responsive website interfaces.',
      'Frontend usability and layout improvements.',
      'Website maintenance and optimization.',
      'AI-assisted customer support functionality.',
      'Supporting web application integrations.',
      'Improvements connected with digital inventory and operational workflows.',
    ],
    howWeBuiltIt: [
      "We improved the website's frontend structure and presentation using standard web technologies, focusing on responsive behavior and a more usable interface across screen sizes.",
      'The website work was complemented by customer support automation and collaboration with operational workflows. Iterative development and maintenance helped address usability and functionality issues.',
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Backend integrations', 'AI customer support tooling'],
    outcome: 'Delivered a more usable, responsive website across screen sizes, complemented by AI-assisted customer support.',
  },
  {
    id: 'P10',
    slug: 'adaptive-agent-system',
    title: 'Adaptive Agent System — Reinforcement Learning Research',
    shortTitle: 'Adaptive Agent System',
    subtitle: 'Reinforcement Learning Research',
    categoryGroup: 'Machine Learning & Data Intelligence',
    tags: ['Artificial Intelligence', 'Reinforcement Learning', 'Research'],
    organization: 'University of East London, UK',
    showOrganization: true,
    featured: false,
    cardSummary: 'An academic capstone exploring reinforcement learning for strategic decision-making.',
    overview: [
      'The Adaptive Agent System was an academic capstone project exploring reinforcement learning for strategic decision-making.',
      'The project examined how an intelligent agent can learn to select actions based on feedback from an environment and improve its behavior toward a defined objective.',
    ],
    whatWeBuilt: ['A reinforcement learning agent for strategic decision-making.'],
    howWeBuiltIt: [
      'The project was framed around reinforcement learning, where an agent interacts with an environment and uses feedback to guide its action-selection strategy.',
    ],
    // Specific frameworks TO CONFIRM: section hidden.
    outcome: 'Demonstrates experience with intelligent-agent concepts, adaptive behavior, and machine learning research.',
  },
  {
    id: 'P11',
    slug: 'nusqa',
    title: 'Nusqa — Unani & Ayurveda Mobile Platform',
    shortTitle: 'Nusqa',
    subtitle: 'Unani & Ayurveda Mobile Platform',
    categoryGroup: 'Web & Mobile Development',
    tags: ['Mobile App Development', 'Health & Wellness', 'Traditional Medicine Education'],
    showOrganization: false,
    organizationLabel: 'Own product · Live on Google Play',
    featured: true,
    cardSummary:
      'An Android app sharing research-referenced knowledge of Unani, Ayurvedic and Homeopathic remedies and connecting users with traditional practitioners.',
    overview: [
      'Nusqa brings knowledge of traditional remedies from Unani, Ayurveda and Homeopathy to people through a mobile app. Content is presented clearly and responsibly, and is supported by references to published and peer-reviewed research for educational use.',
      'The app also connects users with authorized traditional practitioners for consultations and informational purposes, and is accessible to users anywhere in the world.',
    ],
    whatWeBuilt: [
      'An Android application published and maintained on Google Play.',
      'Educational content on classical Unani, Ayurvedic and Homeopathic remedies, backed by research references.',
      'A practitioner-connection experience that links users with authorized traditional experts.',
      'Clear in-app disclaimers positioning the content as informational rather than medical advice.',
      'A refreshed user interface and bug-fix release.',
      'Published privacy policy and Google Play data-safety declarations.',
    ],
    howWeBuiltIt: [
      'We designed, developed and released the application end to end, from content structure and user experience through to Google Play publication. The product was built around responsible presentation of traditional knowledge, with evidence references and transparent disclaimers.',
      'After launch the app was kept up to date through iterative releases, including bug fixes and a redesigned interface.',
    ],
    techStack: ['Android', 'Google Play distribution'],
    outcome:
      'Live on Google Play with an "Everyone" content rating and a data-safety declaration stating that no user data is collected or shared with third parties.',
    links: [{ label: 'View on Google Play', href: 'https://play.google.com/store/apps/details?id=com.magnus.nusqa' }],
    disclaimer:
      'Nusqa provides traditional-medicine information for educational purposes only. It is not medical advice and does not replace diagnosis or treatment by a qualified healthcare professional.',
  },
  {
    id: 'P12',
    slug: 'speakmart',
    title: 'SpeakMart — Voice-Enabled Quick Commerce for Elderly Users',
    shortTitle: 'SpeakMart',
    subtitle: 'Voice-Enabled Quick Commerce for Elderly Users',
    categoryGroup: 'Web & Mobile Development',
    tags: ['Quick Commerce', 'Speech Recognition', 'Accessibility'],
    showOrganization: false,
    organizationLabel: 'Own product',
    featured: true,
    cardSummary: 'A quick-commerce app that lets elderly users search and order by speaking.',
    overview: [
      'Quick-commerce apps are designed around fast taps and small screens, which can be a barrier for elderly users. SpeakMart is a quick-commerce application that uses speech recognition so older users can find and order what they need by speaking.',
      'The project focuses on accessibility and ease of use, making everyday grocery and essentials ordering more approachable for people who are less comfortable with conventional app interfaces.',
    ],
    whatWeBuilt: [
      'A quick-commerce application with a voice-first interaction model.',
      'Speech recognition to let elderly users search and order by speaking.',
      'An accessibility-focused experience designed around the needs of older users.',
    ],
    howWeBuiltIt: [
      'We combined a commerce workflow with speech-recognition input, so spoken requests are converted into actions inside the app. The design priority was simplicity for elderly users, reducing the typing and navigation normally needed to place an order.',
    ],
    // Technology stack TO CONFIRM from the repository: section hidden.
    outcome:
      'Demonstrates how voice interfaces can make quick commerce more inclusive for elderly users and people less comfortable with traditional app navigation.',
  },
  {
    id: 'P13',
    slug: 'imdad-ul-fuqaraa-website',
    title: 'Imdad-ul-Fuqaraa Trust — Non-Profit Impact & Donor Website',
    shortTitle: 'Imdad-ul-Fuqaraa Trust',
    subtitle: 'Non-Profit Impact & Donor Website',
    categoryGroup: 'Web & Mobile Development',
    tags: ['Web Development', 'Non-Profit', 'Donor Engagement'],
    organization: 'Imdad-ul-Fuqaraa Trust, Hyderabad, India',
    showOrganization: true,
    featured: false,
    cardSummary: "A website that shows a Hyderabad charitable trust's impact and helps it reach donors.",
    overview: [
      'Charitable organizations need to show supporters what their work achieves. This project delivered a website for Imdad-ul-Fuqaraa Trust, a Hyderabad-based trust whose work includes a home for girls, a school, women\'s skills training, food relief and healthcare.',
      "The site was built to present the trust's impact clearly and to help it reach and attract donors.",
    ],
    whatWeBuilt: [
      'A public website presenting the trust\'s mission under the theme "Genuine service for mankind".',
      "Sections covering the trust's programs: a home for girls, a school, women's skills, food relief and healthcare.",
      'Impact-focused content designed to build donor confidence and support fundraising.',
      'A deployed, publicly accessible site hosted on Vercel.',
    ],
    howWeBuiltIt: [
      "We designed the site around the trust's story and programs, organizing information so that visitors can quickly understand what the trust does and how they can help. The site is deployed on Vercel for fast, reliable global access.",
    ],
    techStack: ['Web application', 'Vercel'],
    outcome: 'Gave a community charity a professional online presence that communicates its programs and supports donor outreach.',
    links: [{ label: 'Visit the live site', href: 'https://imdadfinal.vercel.app' }],
  },
]

/** Featured first, then by ID order (per the projects file). */
export const projects: Project[] = [...all.filter((p) => p.featured), ...all.filter((p) => !p.featured)]

export const categoryGroups = [
  'Generative AI & AI Agents',
  'Enterprise Application Engineering',
  'Machine Learning & Data Intelligence',
  'Web & Mobile Development',
] as const

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)

/** Public organisation line for a project, respecting SHOW_ORG_NAMES and per-project rules. */
export const orgLine = (p: Project): string | undefined => {
  if (p.showOrganization && p.organization && flags.SHOW_ORG_NAMES) return p.organization
  return p.organizationLabel
}

/** Engineering capabilities (Section 4 of the projects file). */
export const capabilities = [
  {
    title: 'Generative AI & AI Agents',
    items: [
      'Conversational AI assistants',
      'RAG-based knowledge systems',
      'Intelligent document processing',
      'LLM integration and workflow automation',
      'Semantic search and recommendation systems',
    ],
  },
  {
    title: 'Enterprise Application Engineering',
    items: [
      'Full-stack application development',
      'Backend services and REST APIs',
      'Workflow automation and system integrations',
      'Testing, debugging, and performance optimization',
      'CI/CD and containerized deployment',
    ],
  },
  {
    title: 'Machine Learning & Data Intelligence',
    items: [
      'Predictive analytics',
      'Computer vision and biometric recognition',
      'Workforce and business intelligence dashboards',
      'Model evaluation and interpretability',
      'MLOps and model lifecycle management',
    ],
  },
  {
    title: 'Web & Mobile Development',
    items: [
      'Corporate website development',
      'E-commerce functionality',
      'Responsive user interfaces',
      'Customer support automation',
      'Existing website optimization and maintenance',
      'Android apps published on Google Play',
      'Voice-enabled and accessibility-first experiences',
      'Websites for non-profits and community organizations',
    ],
  },
]

/** Technologies used across the projects (for the marquee). Only technologies named in the projects file. */
export const technologies = [
  'Python', 'FastAPI', 'React', 'TypeScript', 'JavaScript', 'Docker', 'Kubernetes', 'PostgreSQL', 'LangChain',
  'FAISS', 'SentenceTransformers', 'MLflow', 'PyTorch', 'CUDA', 'Django', 'Streamlit', 'Scikit-learn', 'XGBoost',
  'SHAP', 'Plotly', 'Pandas', 'Dask', 'SQLite', 'Android', 'Vercel',
]
