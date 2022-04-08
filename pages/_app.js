import "../styles/style.scss";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import Navbar from "../src/components/navigation/Navbar";

const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <div className="p-2 md:py-8 md:px-16">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
