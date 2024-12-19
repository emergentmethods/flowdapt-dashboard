// types/global.d.ts

interface Window {
  [key: string]: any; // Add index signature
}

declare namespace NodeJS {
  interface ProcessEnv {
    // Declare environment variables here
    API_BASE_URL: string;
  }
}

declare namespace Flowdapt {
  declare interface IPageParams {
    params?: { [key: string]: string | undefined };
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}
