import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="min-h-[calc(100vh-0px)] grid place-items-center">
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <img src="404_NotFound.png" alt="not found" className="max-w-full mb-6 w-130" />

        <p className="text-2xl font-semibold mb-4">❌ Oops! This page doesn’t exist. ❌</p>
        <Link
          to="/"
          className="className='inline-block px-9 py-4 mt-6 mb-8 font-medium text-xl text-white transition shadow-md bg-primary rounded-2xl  dark:bg-primary-light dark:hover:bg-primary-dark"
        >
          Return HomePage
        </Link>
      </div>
    </main>
  );
}
