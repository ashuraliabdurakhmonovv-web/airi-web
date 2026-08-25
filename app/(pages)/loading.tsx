/** @format */

"use client";

import Image from "next/image";
import logo from "@/public/logoWhite.svg";
import { useLocale } from "@/i18n";

export default function InstituteLoader() {
  const { t } = useLocale();

  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white px-4 text-center'>
      <div className='w-24 h-24 mb-6 relative'>
        <Image
          src={logo}
          alt='Institute Logo'
          fill
          className='object-contain animate-pulse'
        />
      </div>

      {/* SEO: yuklanish ekrani <h1> BO'LMASLIGI kerak — u statik HTML'ga tushib,
          har bir sahifaning birinchi sarlavhasi institut nomiga aylanib qolardi. */}
      <p className='text-xl sm:text-2xl font-bold text-gray-900 mb-6 leading-snug'>
        {t.loading.title}
      </p>

      <div className='flex space-x-2'>
        <span className='w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-75'></span>
        <span className='w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150'></span>
        <span className='w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300'></span>
      </div>

      <style jsx>{`
        .animate-bounce {
          display: inline-block;
          animation: bounce 0.6s infinite ease-in-out;
        }
        .delay-75 {
          animation-delay: 0.075s;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
            opacity: 0.3;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
