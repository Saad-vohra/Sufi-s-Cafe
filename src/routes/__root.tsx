import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LangProvider } from "../lib/i18n";
import { BRAND } from "../lib/brand";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-ink">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-ink">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-ink"
          >
            Try again
          </button>
          <a href="/" className="btn-line">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Luna Cafe" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Luna Cafe — specialty coffee, matcha bar & all-day brunch" },
      { property: "og:title", content: "Luna Cafe — specialty coffee, matcha bar & all-day brunch" },
      { name: "twitter:title", content: "Luna Cafe — specialty coffee, matcha bar & all-day brunch" },
      { name: "description", content: "Luna Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00." },
      { property: "og:description", content: "Luna Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00." },
      { name: "twitter:description", content: "Luna Cafe: slow filter coffee, a ceremonial matcha bar and brunch served all day, in two warm rooms. Open daily 08:00–21:00." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34d2ef6d-06c9-4a31-a95e-4e9851e550e4/id-preview-07e17fe4--b8aa6683-45f6-42d3-a036-8444c4bfccdb.lovable.app-1785439736412.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/34d2ef6d-06c9-4a31-a95e-4e9851e550e4/id-preview-07e17fe4--b8aa6683-45f6-42d3-a036-8444c4bfccdb.lovable.app-1785439736412.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap",
      },
      {
        rel: "icon",
        type: "image/webp",
        href: "/images/logo.webp",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Luna Cafe",
              url: "https://luna-coffee.lovable.app",
              telephone: BRAND.phone,
            },
            {
              "@type": "WebSite",
              name: "Luna Cafe",
              url: "https://luna-coffee.lovable.app",
              inLanguage: ["en", "hi"],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#f7f5f0" }}>
      <head>
        <meta name="theme-color" content="#006241" />
        <HeadContent />
      </head>
      <body style={{ backgroundColor: "#f7f5f0", color: "#1e3932" }}>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        {/* Required: nested routes render here. */}
        <Outlet />
      </LangProvider>
    </QueryClientProvider>
  );
}
