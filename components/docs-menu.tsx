"use client";

import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";
import { usePathname } from "next/navigation";

type DocsMenuProps = { isSheet?: boolean, locale: string }

export default function DocsMenu({ isSheet = false, locale }: DocsMenuProps) {
  const pathname = usePathname();
  const startMatcher = `/${locale}/docs`;
  if (!pathname.startsWith(startMatcher))
    return null;

  // throw new Error(`Received non-docs page\nPathname received: ${pathname} | PathName expected: ${startMatcher}/...`);

  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {ROUTES.map((item, index) => {
        const modifiedItems = {
          ...item,
          href: `/${locale}/docs${item.href}`,
          level: 0,
          isSheet,
        };
        return <SubLink key={item.title + index} {...modifiedItems} />;
      })}
    </div>
  );
}
