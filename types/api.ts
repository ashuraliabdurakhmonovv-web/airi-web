export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface NewsQueryParams extends PaginationParams {
  category?: string;
  search?: string;
  language?: "uz" | "ru" | "en";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MultiLang {
  uz: string;
  ru: string;
  en: string;
}

export type LocalizedText = MultiLang | string;

export interface NewsMedia {
  url?: string;
  src?: string;
  image?: string;
  img?: string;
  path?: string;
  title?: LocalizedText;
  description?: LocalizedText;
  caption?: LocalizedText;
  alt?: LocalizedText;
}

export interface News {
  _id: string;
  legacyId?: string;
  slug: string;
  title: LocalizedText;
  date?: string;
  publishedAt?: string | null;
  time?: string;
  lead?: LocalizedText;
  excerpt?: LocalizedText;
  description?: LocalizedText;
  category: string;
  author?: string;
  content?: LocalizedText;
  contentHtml?: LocalizedText;
  imageUrl?: string;
  image?: string;
  img?: string;
  gallery?: Array<string | NewsMedia>;
  images?: Array<string | NewsMedia>;
  media?: Array<string | NewsMedia>;
  language?: string;
  sourceUrl?: string;
  isImported?: boolean;
  isFeatured?: boolean;
  viewCount?: number | null;
  createdAt: string;
  updatedAt: string;
}


export interface Stat {
  _id: string;
  label: string; 
  value: string;
  suffix: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}


export interface Research {
  _id: string;
  title: MultiLang;
  description: MultiLang;
  fullDescription: MultiLang;
  keyFocus: MultiLang[];
  applications: MultiLang[];
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface Project {
  _id: string;
  title: MultiLang;
  description: MultiLang;
  fullDescription: MultiLang;
  keyFocus: MultiLang[];
  applications: MultiLang[];
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface Partner {
  _id: string;
  name: string;
  type: string;
  description: string;
  established: string;
  projects: string[];
  impact: string;
  website: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}


export interface AboutInstitute {
  _id: string;
  description: MultiLang;
  website: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface XalqaroAloqa {
  _id: string;
  image: string;
  pdf: string;
  createdAt: string;
  updatedAt: string;
}


export interface InstituteTuzilma {
  _id: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface InstituteTeamMember {
  _id: string;
  name: string;
  who: string;
  phone: string;
  linkedin: string;
  mail: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface InstituteEvent {
  _id: string;
  whatEvent: string;
  where: string;
  day: string;
  month: string;
  createdAt: string;
  updatedAt: string;
}


export interface IqtidorliYoshlar {
  _id: string;
  fullName: string;
  day: string;
  paragraphs: MultiLang[];
  coverImage: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}


export interface RahbariyatQabul {
  _id: string;
  fullName: string;
  day: string;
  who: string;
  bio: MultiLang[];
  telNum: string;
  mail: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface ConferenceSpeaker {
  name: string;
  title: string;
  organization: string;
}

export interface Conference {
  _id: string;
  title: MultiLang;
  description: MultiLang;
  date: string;
  endDate: string;
  time: string;
  location: string;
  link: string;
  registrationLink: string;
  category: string;
  isUpcoming: boolean;
  status: string;
  organizer: MultiLang;
  speakers: ConferenceSpeaker[];
  tags: string[];
  maxParticipants: number;
  content: MultiLang;
  image: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConferenceFilterParams extends PaginationParams {
  category?: string;
  status?: string;
  isUpcoming?: string;
}


export interface Doktorantura {
  _id: string;
  label: MultiLang;
  pdf: string;
  createdAt: string;
  updatedAt: string;
}


export interface IlmiyKengash {
  _id: string;
  name: MultiLang;
  who: MultiLang;
  job: MultiLang;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface Teacher {
  _id: string;
  fullName: MultiLang;
  who: MultiLang;
  date: string;
  decription: MultiLang; 
  images: string[];
  createdAt: string;
  updatedAt: string;
}


export interface Graduate {
  _id: string;
  fullName: MultiLang;
  bio: MultiLang;
  date: string;
  description: MultiLang;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICPublication {
  _id: string;
  title: MultiLang;
  abstract: MultiLang;
  authors: string[];
  category: string;
  year: string;
  journal: string;
  link: string;
  citations: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICPublicationFilterParams extends PaginationParams {
  category?: string;
  year?: string;
  search?: string;
}

export interface ICNews {
  _id: string;
  title: MultiLang;
  excerpt: MultiLang;
  content: MultiLang;
  date: string;
  category: string;
  image: string;
  isImage: boolean;
  ImageUrl: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICNewsFilterParams extends PaginationParams {
  category?: string;
  author?: string;
  search?: string;
}

export interface ICCollaborator {
  _id: string;
  title: string;
  type: string;
  description: MultiLang;
  image: string;
  isImage: boolean;
  ImageUrl: string;
  established: string;
  projects: string[];
  impact: string;
  website: string;
  label: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICCollaboratorFilterParams extends PaginationParams {
  type?: string;
  search?: string;
}
