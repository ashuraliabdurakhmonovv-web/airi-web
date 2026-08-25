/** @format */

export interface Partner {
  name: string;
  type: string;
  description: string;
  logo: string;
  established: string;
  projects: string[];
  impact: string;
  website?: string;
}

export const partners: Partner[] = [
  {
    name: "Ministry of Digital Technologies",
    type: "Government",
    description:
      "Strategic partnership with the Ministry of Digital Technologies to drive national digital transformation and AI policy development.",
    logo: "🏛️",
    established: "2020",
    projects: [
      "National AI Strategy Development",
      "Digital Government Services Integration",
      "Smart City Infrastructure",
      "Cybersecurity Enhancement Programs",
    ],
    impact:
      "Implemented AI solutions in 15+ government agencies, improving service delivery efficiency by 40%",
    website: "https://digital.gov.uz",
  },
  {
    name: "Tashkent International University",
    type: "Education",
    description:
      "Collaborative research and education programs fostering the next generation of AI specialists in Uzbekistan.",
    logo: "🎓",
    established: "2019",
    projects: [
      "Joint AI Master's Degree Program",
      "Research Lab Collaboration",
      "Student Exchange Programs",
      "Industry Internship Placements",
    ],
    impact:
      "Trained 500+ students in AI and data science, with 90% employment rate within 6 months of graduation",
    website: "https://tiu.uz",
  },
  {
    name: "Tashkent University of Information Technologies",
    type: "Education",
    description:
      "Leading technical university partnership focusing on advanced computing, AI research, and innovation in information technologies.",
    logo: "💻",
    established: "2018",
    projects: [
      "AI Research Center Establishment",
      "Advanced Computing Infrastructure",
      "Hackathons and Innovation Challenges",
      "Faculty Development Programs",
    ],
    impact:
      "Published 50+ joint research papers and developed 20+ AI applications for real-world problems",
    website: "https://tuit.uz",
  },
  {
    name: "Massachusetts Institute of Technology",
    type: "International",
    description:
      "Prestigious partnership with MIT for cutting-edge AI research, knowledge exchange, and collaborative innovation projects.",
    logo: "🌎",
    established: "2024",
    projects: [
      "Joint Research on Turkic Language NLP",
      "AI for Agriculture Optimization",
      "Telemedicine Solutions Development",
      "Student and Faculty Exchange Programs",
    ],
    impact:
      "Launched 3 major collaborative research initiatives with $2M in combined funding",
    website: "https://mit.edu",
  },
  {
    name: "Google AI Research",
    type: "Private Sector",
    description:
      "Technology partnership providing access to advanced AI tools, cloud infrastructure, and expertise for research acceleration.",
    logo: "🔬",
    established: "2021",
    projects: [
      "TensorFlow Implementation Support",
      "Cloud Computing Resources",
      "Machine Learning Best Practices",
      "Open Source Contributions",
    ],
    impact:
      "Accelerated research output by 60% through access to cutting-edge AI infrastructure and tools",
  },
  {
    name: "Central Asian AI Consortium",
    type: "Research",
    description:
      "Regional collaboration network connecting AI research institutions across Central Asia for knowledge sharing and joint projects.",
    logo: "🤝",
    established: "2022",
    projects: [
      "Regional AI Conference Series",
      "Cross-Border Research Initiatives",
      "Shared Dataset Development",
      "Policy Recommendations for Regional AI Development",
    ],
    impact:
      "Established collaboration with 12 institutions across 5 Central Asian countries",
  },
];
