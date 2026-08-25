/** @format */

import type { Dictionary } from "@/i18n";

export type NavChild = {
  id: string;
  labelKey: keyof Dictionary["nav"];
  href?: string;
  children?: NavChild[];
};

export type NavItem = {
  id: string;
  labelKey: keyof Dictionary["nav"];
  href?: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    id: "institut",
    labelKey: "institut",
    children: [
      {
        id: "about",
        labelKey: "aboutInstitute",
        href: "/umumiy-malumot/institute-abouttheinstitute",
      },
      {
        id: "history",
        labelKey: "history",
        href: "/umumiy-malumot/history",
      },
      {
        id: "international",
        labelKey: "internationalRelations",
        href: "/umumiy-malumot/research-internationalrelationships",
      },
      {
        id: "structure",
        labelKey: "instituteStructure",
        href: "/umumiy-malumot/institute-structureofinstitute",
      },
      {
        id: "documents",
        labelKey: "internalDocuments",
        href: "/umumiy-malumot/institute-internaldocuments",
      },
      {
        id: "team",
        labelKey: "instituteTeam",
        href: "/umumiy-malumot/institute-instituteteam",
      },
      {
        id: "calendar",
        labelKey: "eventCalendar",
        href: "/umumiy-malumot/institute-eventcalendar",
      },
    ],
  },

  {
    id: "news",
    labelKey: "news",
    href: "/umumiy-malumot/news",
  },

  {
    id: "general",
    labelKey: "generalInfo",
    children: [
      {
        id: "youth",
        labelKey: "talentedYouth",
        href: "/umumiy-malumot/institute-talentedyouth",
      },
      {
        id: "teachers",
        labelKey: "teachers",
        href: "/umumiy-malumot/institute-teachers",
      },
      {
        id: "graduates",
        labelKey: "graduates",
        href: "/umumiy-malumot/institute-graduates",
      },
      {
        id: "faq",
        labelKey: "faq",
        href: "/umumiy-malumot/faq",
      },
      {
        id: "symbols",
        labelKey: "stateSymbols",
        href: "/umumiy-malumot/generalinformation-statesymbols",
      },
    ],
  },

  {
    id: "opendata",
    labelKey: "openData",
    children: [
      {
        id: "requisites",
        labelKey: "instituteRequisites",
        href: "/umumiy-malumot/opendata-requisitesoftheinstitute",
      },
      {
        id: "reception",
        labelKey: "managementReceptionDays",
        href: "/umumiy-malumot/opendata-managementreceptiondays",
      },
      {
        id: "vacancies",
        labelKey: "vacancies",
        href: "/umumiy-malumot/opendata-vacancies",
      },
    ],
  },
];

export const navItemsIlmiy: NavItem[] = [
  {
    id: "scientific-council",
    labelKey: "scientificCouncil",
    children: [
      {
        id: "institute-scientific-council",
        labelKey: "instituteScientificCouncil",
        children: [
          {
            id: "institute-council-about",
            labelKey: "councilAbout",
            href: "/ilmiy-tadqiqot/research-scientificboard/about",
          },
          {
            id: "institute-council-composition",
            labelKey: "councilComposition",
            href: "/ilmiy-tadqiqot/research-scientificboard/composition",
          },
        ],
      },
      {
        id: "degree-awarding-council",
        labelKey: "degreeAwardingCouncil",
        children: [
          {
            id: "degree-council-about",
            labelKey: "councilAbout",
            href: "/ilmiy-tadqiqot/degree-awarding-council/about",
          },
          {
            id: "degree-council-composition",
            labelKey: "councilComposition",
            href: "/ilmiy-tadqiqot/degree-awarding-council/composition",
          },
          {
            id: "scientific-seminar",
            labelKey: "scientificSeminar",
            href: "/ilmiy-tadqiqot/seminar-board",
          },
          {
            id: "interlaboratory-seminar",
            labelKey: "interlaboratorySeminar",
            href: "/ilmiy-tadqiqot/interlaboratory-seminars",
          },
        ],
      },
    ],
  },
  {
    id: "research",
    labelKey: "research",
    children: [
      {
        id: "laboratories",
        labelKey: "laboratories",
        href: "/ilmiy-tadqiqot/research-laboratories",
      },
      // Kontent tayyor bo'lguncha vaqtincha yashirildi
      // {
      //   id: "research-projects",
      //   labelKey: "researchProjects",
      //   href: "/ilmiy-tadqiqot/research-projects",
      // },
      // {
      //   id: "scientific-articles",
      //   labelKey: "scientificArticles",
      //   href: "/ilmiy-tadqiqot/scientific-articles",
      // },
      // {
      //   id: "scientific-journals",
      //   labelKey: "scientificJournals",
      //   href: "/ilmiy-tadqiqot/scientific-journals",
      // },
      {
        id: "conferences",
        labelKey: "conferences",
        href: "/ilmiy-tadqiqot/research-conferences",
      },
    ],
  },
  {
    id: "doctorate",
    labelKey: "doctorate",
    href: "/ilmiy-tadqiqot/research-doctorate",
  },
  {
    id: "news-announcements",
    labelKey: "newsAndAnnouncements",
    children: [
      {
        id: "announcements",
        labelKey: "announcements",
        href: "/ilmiy-tadqiqot/announcements",
      },
      {
        id: "seminars",
        labelKey: "seminars",
        href: "/ilmiy-tadqiqot/seminars",
      },
      {
        id: "dissertation-defense-announcements",
        labelKey: "dissertationDefenseAnnouncements",
        href: "/ilmiy-tadqiqot/dissertation-defense-announcements",
      },
    ],
  },
];
