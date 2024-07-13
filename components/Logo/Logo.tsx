interface LogoProps {
  background: "light" | "dark";
}

export const Logo = ({ background }: LogoProps) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      {/* <img src='/logo.svg' alt='logo' className='w-24 h-24' /> */}
      <h1
        className={`text-2xl font-bold ${
          background === "dark" ? "text-white" : "text-black"
        }`}
      >
        BreakTheWall
      </h1>
    </div>
  );
};
