/** @format */
"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Mail, Search } from "lucide-react";
import { useLocale } from "@/i18n";

const NotFound = () => {
  const { t } = useLocale();

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-6'>
      <div className='max-w-2xl w-full text-center'>
        <p className='font-semibold uppercase tracking-wide text-[#604eff]'>
          {t.notFound.error}
        </p>

        <h1 className='mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl'>
          {t.notFound.title}
        </h1>

        <p className='mt-4 text-lg text-gray-600'>
          {t.notFound.description}
        </p>

        <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
          <Link
            href='/'
            className='airi-button inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#604eff] focus:ring-offset-2'>
            <Home className='mr-2 h-5 w-5' />
            {t.notFound.returnHome}
          </Link>

          <button
            onClick={() => window.history.back()}
            className='inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#604eff] focus:ring-offset-2'>
            <ArrowLeft className='mr-2 h-5 w-5' />
            {t.notFound.goBack}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
