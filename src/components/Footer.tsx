import Link from "next/link";

export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 px-20">
        <div className="container mx-auto flex justify-between">
          <div>
            <h3 className="text-lg font-bold">ParaSeek.</h3>
            <p className="mt-2">© 2024 ParaSeek. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>
        </div>
      </footer>
    );
  }
  