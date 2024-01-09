import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox. <br />
            <br />
            Storing everything for you and your business needs. All in one plce
          </h1>

          <p className="pb-20">
            Consectetur mollit tempor dolore ea mollit minim laboris. Officia
            pariatur eu sit excepteur. Reprehenderit consectetur nostrud mollit
            velit sit ea esse voluptate duis tempor cillum culpa quis. Est
            tempor commodo consequat est esse. Culpa elit ullamco ad ut. Non
            aliquip reprehenderit sunt do fugiat aute ullamco veniam anim
            consequat. Proident proident anim laboris nulla dolore sint culpa
            elit minim adipisicing culpa quis proident adipisicing.
          </p>

          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
          >
            Try it for free
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src='https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4'
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

        <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
        <p className="text-center font-light p-2">
          Pariatur cupidatat laborum irure ullamco ea irure proident aute labore
          eu nisi aliqua. Culpa consequat aute ut sunt. Et duis ipsum
          consectetur anim esse adipisicing pariatur voluptate. Minim elit
          nostrud nisi esse magna reprehenderit commodo sunt. Sint irure laborum
          est irure enim labore eiusmod sit laboris. Elit Lorem reprehenderit ut
          velit officia irure cupidatat nisi officia.
        </p>
    </main>
  );
}
