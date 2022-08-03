import Link from "next/link"

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 max-w-7xl mx-auto">
      <div className="flex items-center gap-x-5">
        <Link href="/">
          <a>
            <img
              className="w-44 object-contain cursor-pointer"
              src="/images/medium-logo.png"
              alt="Medium logo"
            />
          </a>
        </Link>
        <div className="hidden md:inline-flex items-center gap-x-5">
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
          <Link href="/follow">
            <a className="text-white bg-green-600 px-4 py-1 rounded-full">
              Follow
            </a>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-x-5 text-green-600">
        <Link href="/sign-in">
          <a>Sign In</a>
        </Link>
        <Link href="/get-started">
          <a className="border px-4 py-1 rounded-full border-green-600">
            Get Started
          </a>
        </Link>
      </div>
    </header>
  )
}