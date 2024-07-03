import PageNotFound from "./components/PageNotFound";

// This page is a workaround to handle 404 errors with internationalization enabled
// See https://github.com/vercel/next.js/discussions/50034

export default function NotFound() {
  return <PageNotFound />;
}
