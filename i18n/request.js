import {getRequestConfig} from "next-intl/server";
import {cookies} from "next/headers";

export const dynamic = 'force-dynamic';


export default getRequestConfig(async () => {
    
    const cookieLocale = (await cookies()).get("NEXT_LOCALE")?.value || "fr";
    const locale = cookieLocale;
    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,

    }
});

/*export default getRequestConfig(async () => {
    // Provide a static locale, fetch a user setting,
    // read from `cookies()`, `headers()`, etc.
    const locale = 'fr';
   
    return {
      locale,
      messages: (await import(`../messages/${locale}.json`)).default
    };
  });*/
