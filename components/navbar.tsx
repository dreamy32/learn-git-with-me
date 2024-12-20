import { ModeToggle } from "@/components/theme-toggle";
import {
  GithubIcon,
  TwitterIcon,
  HexagonIcon,
  MoveUpRightIcon,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Search from "./search";
import Anchor from "./anchor";
import { SheetLeftbar } from "./leftbar";
import { page_routes } from "@/lib/routes-config";
import { SheetClose } from "@/components/ui/sheet";
import { LogoI } from "./Logo";
import { Icons } from "./icons";
import { useTranslations } from "next-intl";



export function Navbar(params: { locale: string }) {
  return (
    <nav className="w-full border-b h-16 sticky top-0 z-50 bg-background">
      <div className="max-w-[1300px] sm:px-0 px-3 mx-auto h-full flex items-center justify-between md:gap-2">
        <div className="flex items-center gap-5">
          <SheetLeftbar locale={params.locale}/>
          <div className="flex items-center gap-6">
            <div className="sm:flex hidden">
              <Logo />
            </div>
            <div className="lg:flex hidden items-center gap-4 text-sm font-medium text-muted-foreground">
              <NavMenu locale={params.locale}/>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Search />
            <div className="flex ml-2.5 sm:ml-0">
              <Link
                href="https://github.com/spaciousejar/learn-git-with-me.git"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
              >
                <Icons.gitHub className="size-5" />
              </Link>
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <LogoI />
      <h2 className="text-md font-bold">GIT ME</h2>
    </Link>
  );
}

type NavMenuProps = { isSheet?: boolean, locale: string };

export function NavMenu({ isSheet = false, locale }: NavMenuProps) {
  const t = useTranslations('NavLinks');
  const NAVLINKS = [
    {
      title: t("learn"),
      href: `${locale}/docs${page_routes[0].href}`,
    },
    {
      title: t("blog"),
      href: "/blog",
    },
    {
      title: t("guides"),
      href: "#",
    },
    {
      title: t("community"),
      href: "https://github.com/spaciousejar/learn-git-with-me/discussions",
      external: true,
    },
  ];
  return (
    <>
      {NAVLINKS.map((item) => {
        const Comp = (
          <Anchor
            key={item.title + item.href}
            activeClassName="!text-primary md:font-semibold font-medium"
            absolute
            className="flex items-center gap-1 dark:text-stone-300/85 text-stone-800"
            href={item.href}
          >
            {item.title}{" "}
            {item.external && (
              <MoveUpRightIcon
                className="w-3 h-3 align-super"
                strokeWidth={3}
              />
            )}
          </Anchor>
        );
        return isSheet ? (
          <SheetClose key={item.title + item.href} asChild>
            {Comp}
          </SheetClose>
        ) : (
          Comp
        );
      })}
    </>
  );
}
