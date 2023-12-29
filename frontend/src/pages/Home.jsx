import React from 'react';

const Home = () => {
  return (
    <>
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md leading-[70px]">Empowering Lives Through Quality Healthcare.</h1>
                <p className='text_para'>We are committed to providing compassionate and comprehensive healthcare services. Our dedicated team ensures your well-being through personalized care and advanced medical solutions.</p>
                <button className='btn'>Request an Appointment</button>
              </div>
      
            <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
              <div>
                <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">30+</h2>
                <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]">
                  <p className='text_para'>Years Of Experience</p>
                </span>
              </div>
              
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Home;
