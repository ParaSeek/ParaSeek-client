import Link from "next/link";
export default function Home() {
  return (
    <div style={{minHeight:"calc(100vh - 64px)"}} className="flex flex-col items-center justify-center py-8 bg-secondary">
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <a className="text-primary" href="#">ParaSeek.</a>
        </h1>

        <p className="mt-3 text-2xl">
          Find your dream job with us. Explore thousands of job listings from top companies.
        </p>

        <div className="mt-6">
          <Link href='/login'><button className="px-8 py-3 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
            Get Started
          </button></Link>
        </div>

        <div className="mt-6 w-full max-w-3xl">
          <form className="flex flex-col sm:flex-row items-center justify-center w-full space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Job Title, Keywords, or Company"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-8 py-2 text-lg font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
            >
              Search
            </button>
          </form>
        </div>

      </main>
    </div>
  );
}
