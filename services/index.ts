export { default as api } from "@/config/axios/axios";

export const queryKeys = {

  health: ["health"] as const,

  news: {
    list: (params?: object) => ["news", "list", params] as const,
    detail: (id: string) => ["news", "detail", id] as const,
  },

  stats: {
    list: (params?: object) => ["stats", "list", params] as const,
    detail: (id: string) => ["stats", "detail", id] as const,
  },

  research: {
    list: (params?: object) => ["research", "list", params] as const,
    detail: (id: string) => ["research", "detail", id] as const,
  },

  projects: {
    list: (params?: object) => ["projects", "list", params] as const,
    detail: (id: string) => ["projects", "detail", id] as const,
  },

  partners: {
    list: (params?: object) => ["partners", "list", params] as const,
    detail: (id: string) => ["partners", "detail", id] as const,
  },

  aboutInstitute: {
    list: () => ["aboutInstitute", "list"] as const,
  },

  xalqaroAloqa: {
    list: () => ["xalqaroAloqa", "list"] as const,
    detail: (id: string) => ["xalqaroAloqa", "detail", id] as const,
  },

  instituteTuzilma: {
    list: () => ["instituteTuzilma", "list"] as const,
    detail: (id: string) => ["instituteTuzilma", "detail", id] as const,
  },

  instituteTeam: {
    list: (params?: object) => ["instituteTeam", "list", params] as const,
    detail: (id: string) => ["instituteTeam", "detail", id] as const,
  },

  instituteEvents: {
    list: (params?: object) => ["instituteEvents", "list", params] as const,
    detail: (id: string) => ["instituteEvents", "detail", id] as const,
  },

  iqtidorliYoshlar: {
    list: (params?: object) => ["iqtidorliYoshlar", "list", params] as const,
    detail: (id: string) => ["iqtidorliYoshlar", "detail", id] as const,
  },

  rahbariyatQabul: {
    list: (params?: object) => ["rahbariyatQabul", "list", params] as const,
    detail: (id: string) => ["rahbariyatQabul", "detail", id] as const,
  },

  conferences: {
    list: (params?: object) => ["conferences", "list", params] as const,
    detail: (id: string) => ["conferences", "detail", id] as const,
    slug: (slug: string) => ["conferences", "slug", slug] as const,
  },

  doktorantura: {
    list: (params?: object) => ["doktorantura", "list", params] as const,
    detail: (id: string) => ["doktorantura", "detail", id] as const,
  },

  ilmiyKengash: {
    list: (params?: object) => ["ilmiyKengash", "list", params] as const,
    detail: (id: string) => ["ilmiyKengash", "detail", id] as const,
  },

  teachers: {
    list: (params?: object) => ["teachers", "list", params] as const,
    detail: (id: string) => ["teachers", "detail", id] as const,
  },

  graduates: {
    list: (params?: object) => ["graduates", "list", params] as const,
    detail: (id: string) => ["graduates", "detail", id] as const,
  },

  icPublications: {
    list: (params?: object) => ["icPublications", "list", params] as const,
    detail: (id: string) => ["icPublications", "detail", id] as const,
  },

  icNews: {
    list: (params?: object) => ["icNews", "list", params] as const,
    detail: (id: string) => ["icNews", "detail", id] as const,
  },

  icCollaborators: {
    list: (params?: object) => ["icCollaborators", "list", params] as const,
    detail: (id: string) => ["icCollaborators", "detail", id] as const,
  },
};
