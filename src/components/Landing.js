import Link from "next/link";

const Landing = () => {
  return (
    <section className="bg-black-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Watch anytime, anywhere.
            <strong className="font-extrabold text-red-600 sm:block">Your pace, your time.</strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">Keep the younger ones entertained and watch your favourite global content, all in the same app </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto" href="/hal/about">
              Learn More
            </Link>
            <Link className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto" href="/hal/started">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
