import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
const Landingpage: React.FC = () => {
  const navigate = useNavigate();
  const [cardIndex, setCardIndex] = React.useState(0);
  const totalCards = 5;

  // 1. Create a ref
  const seeItRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard'); 
    }
  }, [navigate]);

  return (
  <div>
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" style= {{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
  <div className="px-4 sm:px-8 md:px-16 lg:px-40 flex flex-1 justify-center py-5">
    <div className="layout-content-container flex flex-col w-full max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                 style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDkq1yJ97mjMj1C2g6T4De0OPqZnd37cukswW-aS9bVbTGTz-bZW7ulmZq0Vx38GMQO9067N5pVFK238V0Kfhgt7v9aN1rjUhZmRmVVPOxbXOBF4T9OVNzm3Rn4XfPn9Jz0yDoxZsf_7NOU2PgHokldCFh4AFaJXDYKlVBpWuumEY7p7iS0QC1viODJUOuPJrsxQLlJ_pD30qaI4Cw3HHvZK-CLfuB0wt8YhKHyn8MWLltYAsOEJepus4EOb8o28X1NC2W79CgAoPc")`,
                }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1
                      className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                    >
                      Find Your Perfect Hostel Room
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Discover a seamless way to explore and secure your ideal hostel accommodation with our intuitive web app.
                    </h2>
                  </div>
                    {/* 3. Update button to scroll to section */}
                    <button
                      onClick={() => seeItRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#0c7ff2] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                    >
                  <span className="truncate">Get Started</span></button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-[#111418] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                >
                  How It Works
                </h1>
                <p className="text-[#111418] text-base font-normal leading-normal max-w-[720px]">
                  Our hostel allotment app simplifies the process of finding and securing your ideal accommodation. Follow these steps to get started:
                </p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-0">
               
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe0e6] bg-white p-4 flex-col">
                  <div className="text-[#111418]" data-icon="Calendar" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111418] text-base font-bold leading-tight">Login</h2>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">Simply Login using your college Credentials</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe0e6] bg-white p-4 flex-col">
                  <div className="text-[#111418]" data-icon="Person" data-size="24px" data-weight="regular">
                    {/* Person Icon SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M128,128a56,56,0,1,0-56-56A56,56,0,0,0,128,128Zm0,16c-39.7,0-72,32.3-72,72a8,8,0,0,0,8,8H192a8,8,0,0,0,8-8C200,176.3,167.7,144,128,144Z"/>
    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111418] text-base font-bold leading-tight">Select Partner</h2>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">Ask a friend for their unique ID or share yours and add them as your Partner.</p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe0e6] bg-white p-4 flex-col">
                  <div className="text-[#111418]" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111418] text-base font-bold leading-tight">Search</h2>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      Browse available hostel rooms based on your preferences.
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 gap-3 rounded-lg border border-[#dbe0e6] bg-white p-4 flex-col">
                 <div className="text-[#111418]" data-icon="Check" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-[#111418] text-base font-bold leading-tight">Confirm</h2>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">
                      Once Selected just Confirm your room by clicking on Book.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h2
                ref={seeItRef}
                className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5"
              >
                See It in Action
              </h2>
            
            {/* Horizontal slider bar to scroll the cards, showing only one card at a time */}
            <div className="flex flex-col items-center mt-4">
              <div className="relative w-full max-w-xs overflow-hidden" style={{ minHeight: 320 }}>
                <div
                  className="cards-scroll-container flex transition-transform duration-300"
                  style={{
                    width: '100%',
                    transform: `translateX(-${cardIndex * 100}%)`,
                  }}
                  id="single-card-slider"
                >
                  {[image1, image2, image3, image4, image5].map((img, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col gap-4 rounded-lg min-w-full max-w-full"
                    >
                      <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col">
                        <img
                          src={img}
                          alt={`Step ${idx + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div>
                        <p className="text-[#111418] text-base font-medium leading-normal">
                          { [
                            'Step 1: Login with your Rknec Credentials',
                            'Step 2: Enter Your Parther Id',
                            'Step 3: Select Your Prefered Floor',
                            'Step 4: Select Your Prefered Room',
                            'Step 5: Click On Book Room',
                          ][idx]}
                        </p>
                        <p className="text-[#60758a] text-sm font-normal leading-normal">
                          { [
                            'Simple and Easy Login Through Your Official College Credentials',
                            'Ask your prefered partner for their ID which is visible once logged-in',
                            'Verify the name of your Partner and Select Your Preffered Floor',
                            'Use navigation Arrows to navigate through the Panel and Select Your Room.',
                            'Verify your Selection and Simply Click on Book Room Option to Confirm your room',
                          ][idx]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Next/Previous Buttons */}
              <div className="flex justify-center mt-4 w-full max-w-xs gap-4">
                <button
                  className="bg-[#0c7ff2] text-white px-4 py-2 rounded disabled:opacity-50"
                  onClick={() => setCardIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={cardIndex === 0}
                >
                  Previous
                </button>
                {cardIndex < totalCards - 1 ? (
                  <button
                    className="bg-[#0c7ff2] text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={() => setCardIndex((prev) => Math.min(prev + 1, totalCards - 1))}
                    disabled={cardIndex === totalCards - 1}
                  >
                    Next
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="bg-[#0c7ff2] text-white px-4 py-2 rounded flex items-center justify-center"
                    style={{ textDecoration: 'none' }}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a className="text-[#60758a] text-base font-normal leading-normal min-w-40" href="#">About</a>
                <a className="text-[#60758a] text-base font-normal leading-normal min-w-40" href="#">Contact</a>
                <a className="text-[#60758a] text-base font-normal leading-normal min-w-40" href="#">Terms of Service</a>
                <a className="text-[#60758a] text-base font-normal leading-normal min-w-40" href="#">Privacy Policy</a>
              </div>
              <p className="text-[#60758a] text-base font-normal leading-normal">© 2025 Hostel Portal. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  </div>
  );
}
export default Landingpage;