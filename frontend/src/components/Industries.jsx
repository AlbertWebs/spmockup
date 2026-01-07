import React from 'react';
import { ArrowRight } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';

const IndustryCard = ({ title, description, imageUrl, videoUrl, link }) => {
  const isVideo = !!videoUrl;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 relative h-72 rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Front of the card */}
      <div
        className="absolute inset-0 bg-cover bg-center flex items-end p-6 rounded-xl transition-transform duration-500 group-hover:-rotate-y-180"
        style={!isVideo ? { backgroundImage: `url('${imageUrl}')` } : {}}
      >
        {isVideo && (
          <video
            className="absolute inset-0 w-full h-full object-cover -z-10"
            src={videoUrl}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        <div className="relative z-10 text-white bg-gradient-to-t from-black/70 via-black/50 to-transparent w-full pt-8 pb-2 px-4 -mx-6 -mb-6 rounded-b-xl flex justify-between items-center">
          <div className="flex-grow text-center">
            <h3 className="text-3xl font-bold leading-tight">{title}</h3>
          </div>
          {link && (
            <a
              href={link}
              className="bg-yellow-500 hover:bg-yellow-600 text-[#172455] font-bold py-2 px-4 rounded-full transition-colors duration-200 text-base"
            >
              View More
            </a>
          )}
        </div>
      </div>

      {/* Back of the card */}
      <div className="absolute inset-0 bg-[#172455] text-white p-6 rounded-xl flex flex-col justify-between transition-transform duration-500 rotate-y-180 group-hover:rotate-y-0 opacity-0 group-hover:opacity-100">
        {/* Description text removed */}
        <div className="flex items-center justify-between mt-4">
          <p className="font-bold text-yellow-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Industries = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  const industryData = [
    {
      title: "Concerts",
      description: "StagePass Audio visual has a long history in this industry, affording us a level of knowledge that can help you every step along the way. We maintain a vast inventory of equipment including the latest technology and our personnel have years of experience to know how to handle even the most complex setup. We understand that success is all about the preparation. We move in fast (and always accurately), set ",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1012:32:30imageCONCERTS-A.png",
      link: "https://stagepass.co.ke/industry/1",
    },
    {
      title: "Corporate Events",
      description: "Where matters of business are concerned, tact and a respect for privacy are paramount. We know that you expect both discretion and confidentiality. With StagePass Audio visual, those considerations come guaranteed. We also pledge that all personnel are well-organized and handle all hardware and equipment in a neat and clean manner. We fully appreciate the need to present a professional overall aesthetic, so you can be assured that everything ",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1011:48:51imageACF-DINNER-04.png",
      link: "https://stagepass.co.ke/industry/2",
    },
    {
      title: "Fashion",
      description: "The fashion industry is a fast-paced and ever-evolving universe. To ensure success at every fashion show, with every step a model takes on the catwalk, you need a partner you can rely on. StagePass Audio visual is that partner. Our vast experience with fashion events has given us the knowledge and the skill to work quickly and with precision. There’s only one chance to get it right, and at ",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1008:26:33imageimage_2019-06-18_08-46-22.png",
      link: "https://stagepass.co.ke/industry/3",
    },
    {
      title: "Theater & Dance",
      description: "StagePass Audio visual has a long history providing technical support for theater and dance events. Success of these performances is all about preparation and full knowledge of the venue space and audience expectations. At StagePass Audio visual, we guarantee that all the services we provide for theater and dance events will exceed your expectations. Working with live performances, we pride ourselves on our ability to be flexible and adapt to ",
      videoUrl: "https://stagepass.co.ke/uploads/video/dance.mp4",
      link: "https://stagepass.co.ke/industry/4",
    },
    {
      title: "Gala Dinners",
      description: "At Stagepass Audio Visual, we specialize in large gatherings and properly prepared for any size of the audience. We employ creative solutions to manage big audiences, quickly and efficiently adapt to the changing needs of your event and guarantee the safety and satisfaction of all in attendance.",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1314:26:41imageSPESA.png",
      link: "https://stagepass.co.ke/industry/5", // Assuming a new link for Gala Dinners
    },
    {
      title: "Trade shows",
      description: "We are proud of our extensive history of providing production support for trade shows. This allows us to understand and navigate the complex – and usually unique – logistics of convention centers around the country to provide the very best for our clients every single time.",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1011:53:25imageACFXPO2.png",
      link: "https://stagepass.co.ke/industry/6", // Assuming a new link for Trade shows
    },
    {
      title: "Sporting Events",
      description: "StagePass Audio visual has provided services for halftime shows, rallies and promotional events, often in very alternative venues. Events like these usually call for a fast turnaround. Impeccable preparation and planning allow us to be in place and on time at each and every sporting event.",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1011:54:39imageKASARANI.png",
      link: "https://stagepass.co.ke/industry/7", // Assuming a new link for Sporting Events
    },
    {
      title: "Nonprofit Events",
      description: "Nonprofit organizations typically have to work within limited budgets. We understand that it can be overwhelming, but our experts are here to work with you to find a solution that meets your expectations (and your budget). Our project managers are dedicated to providing a neat, clean and organized look for every aspect of your event",
      imageUrl: "https://stagepass.co.ke/uploads/industries/2019-07-1011:51:41imageWHO-SAFARI-PARK.png",
      link: "https://stagepass.co.ke/industry/8", // Assuming a new link for Nonprofit Events
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="industries">
      <div ref={ref} className={`container mx-auto px-6 lg:px-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl lg:text-5xl font-black text-[#172455] dark:text-white mb-4">
            Our <span className="text-yellow-500">Industries</span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            StagePass Audio Visual serves a diverse range of industries with tailored solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {industryData.map((industry, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <IndustryCard
              key={index}
              title={industry.title}
              description={industry.description}
              imageUrl={industry.imageUrl}
              videoUrl={industry.videoUrl}
              link={industry.link}
            />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
