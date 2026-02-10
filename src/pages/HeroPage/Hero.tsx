const Hero = () => {
  return (
    <div className='bg-hero1 bg-cover bg-center h-screen flex '>
      <div className='w-1/2 flex items-center justify-center'>Text</div>

      {/* Right character image */}
      <div className='w-1/2 bg-ch1 bg-no-repeat bg-right bg-contain'></div>
    </div>
  );
};

export default Hero;
