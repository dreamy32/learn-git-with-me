import { Leftbar } from "@/components/leftbar";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function DocsLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode,
  params: { locale: string };
}>) {

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();



  return (
    <div className="flex items-start gap-10">
      <Leftbar key="leftbar" locale={locale}/>
      <div className="flex-[4]">{children}</div>{" "}
    </div>
  );
}
