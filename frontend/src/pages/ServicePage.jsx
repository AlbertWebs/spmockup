import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNavbar from '../components/BottomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import useHomepageData from '../hooks/useHomepageData';

const ServicePage = () => {
  const { service, subservice } = useParams();
  const { homepageData } = useHomepageData();
  
  // Service content mapping based on URL structure
  const getServiceContent = () => {
    const path = subservice ? `${service}/${subservice}` : service;
    
    // Service content data - you can move this to an API later
    const serviceContent = {
      'rigging-truss-services': {
        title: 'Rigging & Truss Services',
        description: 'When you hire a firm to suspend thousands of pounds above the heads of a plethora of people – at a rock concert or industry conference, for example – then you need to be certain you\'re doing business with the best. Whatever size or type of event you are organizing, Stagepass Audio Visual Limited is here to help with all your rigging equipment needs. Safety is our number one concern, and we do not make mistakes.',
        content: '<p>It\'s what\'s on the inside that counts, right? We understand that all great events start with an even greater foundation. After careful planning in accordance to legal and technical specifications, our rigging specialists provide on-site service to ensure the proper and safe installation of all necessary hardware to prepare your venue for its transformation. Regardless of event size or scope, we\'re ready to tackle your project head-on.</p>'
      },
      'staging-services': {
        title: 'Staging Services',
        description: 'When it comes to staging, safety is key. Got a wild idea that you want a car on stage? Yeah, we can take care of that. Our stages can (and have) withstood automobiles at multiple events, and all of our equipment is properly rated for safety and our staff is expert trained. We take the responsibility of our clients\' and performers\' safety very seriously.'
      },
      'graphics': {
        title: 'Graphics',
        description: 'No event is complete without eye-catching visual content. Whether your visual story is told through signs, posters, printed back panels, or totems, we\'ll make sure it\'s told right. From concept to completion, our graphics team will work with you to create stunning visual elements that enhance your event.'
      },
      'equipment-rentals-sales': {
        title: 'Equipment Rentals & Sales',
        description: 'Our well sized warehouse in Nairobi is home to a massive inventory of some of the best technology available. We take great pride in making this equipment available for rental or purchase, ensuring you have access to top-quality AV equipment for your events.'
      },
      'design-services': {
        title: 'Design Services',
        description: 'When organizing an intimate celebration or an arena concert, the objective is always flawless design. Lighting placement, staging, audio – the overall design of your event must be top-of-mind from the very beginning. Our design team works with you to create cohesive, stunning event designs.'
      },
      'audio': {
        title: 'Audio',
        description: 'The right sound in any venue requires pre-show planning, signal distribution, diverse inputs and complex control. When your message, whether entertaining or inspiring, is felt and understood from the first row to the last, you know you\'ve got the right audio production team.'
      },
      'visual': {
        title: 'Visual',
        description: 'Size matters and we get that. Whatever your event calls for, we\'re ready to scale it up and keep it sharp! No event is complete without stunning imagery. Displayed on LED walls, projection screens, or interactive displays, we bring your visual content to life.'
      },
      'lighting': {
        title: 'Lighting',
        description: 'Event lighting is a critical part of any show or performance, and StagePass Audio Visual\'s team is extremely skilled at lighting even the most intricate productions. Special event coordinators, marketing managers, and producers rely on the experts at StagePass Audio Visual, the behind-the-scenes boys and girls who bring it all together. We\'ll illuminate your event, beautifully.',
        content: '<p>Stagepass lighting designers and technicians pull together to deliver that extraordinary experience, finding that edge, drawing forth emotion with color, texture and movement. With our large inventory of intelligent lighting, they set the mood, paint the room and deliver the "eye candy" that draws the audience in and keeps them engaged. We understand lighting to mean much more than illumination. Choose from our wide array of solutions to communicate emotions, vigor and impact.</p>'
      },
      'lighting/trade-show-lighting': {
        title: 'Trade Show Lighting',
        description: 'Stagepass Audio Visual Limited\'s vast experience has made us intimately familiar with convention center logistics. The day of a trade show can be a hectic time and it\'s probable that the last thing on your mind is the quality of the lighting in your booth, or the power distribution needed to make it all happen.',
        content: '<p>We can manage everything from individual booth lighting, right up to full exhibition production for event organizers. That includes the power distribution, labor, trucking, design and equipment, so you\'re left with more time to focus on showing off your business.</p>'
      },
      'lighting/corporate-event-lighting': {
        title: 'Corporate Event Lighting',
        description: 'When choosing Stagepass Audio Visual Limited to light your corporate event, rest assured that we understand its importance and the setup it requires.',
        content: '<p>We understand how crucial the overall look is to any occasion or show, and reflect that in both equipment and personnel. The infrastructure required to create a fabulous looking event is not always fabulous looking itself. Technology is sometimes messy, but our crews know that you don\'t want to see the pieces needed to make it work – just the polished end product. We are experts at making the behind the scenes disappear. Our technicians also understand that discretion and privacy are hugely important, so confidentiality is always assured.</p>'
      },
      'lighting/festivals': {
        title: 'Festivals',
        description: 'We also specialize in the unique demands of outdoor shows. Our company knows how to best prepare for the elements, while our innate flexibility and adaptability allow us to design creative solutions for the most difficult terrain. So you can put your fears to rest – we can and will adapt to your immediate needs and challenges in real time.'
      },
      'audio/sporting-events': {
        title: 'Sporting Events',
        description: 'Sporting events and rallies are quite clearly loud by nature, so it\'s our duty to provide top-of-the-line audio equipment to rise above the roars of cheering fans.',
        content: '<p>These events are also often presented in very alternative venues, a challenge which requires equally creative solutions that some audio production companies simply can\'t handle. But at Stagepass Audio Visual Limited, we know we can. Halftime shows and promotional events mandate fast turnarounds, and our teams are masters at the impeccable planning and preparation needed to pull them off without a hitch.</p>'
      },
      'audio/audio-equipment-rentals': {
        title: 'Audio Equipment Rentals',
        description: 'We maintain a large inventory of audio equipment in our warehouse. When you\'re searching for a simple solution of renting audio equipment, we\'re here to help.'
      },
      'audio/fashion-audio': {
        title: 'Fashion Audio',
        description: 'Great fashion shows require great audio. Our audio solutions for fashion events ensure that every word, every note, and every sound is delivered with precision and clarity.'
      },
      'audio/nonprofit-events': {
        title: 'Nonprofit Events',
        description: 'For the nonprofit industry, Stagepass Audio Visual Limited is skilled in delivering value-conscious engineering solutions for those working within limited budgets, but this doesn\'t mean you\'ll have to do without the best.'
      },
      'audio/corporate-event-audio': {
        title: 'Corporate Event Audio',
        description: 'Corporate events require professional audio solutions that deliver clear, crisp sound for presentations, speeches, and entertainment. Our team ensures your message is heard clearly by every attendee.'
      },
      'audio/full-service-audio-packages': {
        title: 'Full-Service Audio Packages',
        description: 'At Stagepass Audio Visual Limited, we offer comprehensive audio packages that include everything from planning and design to setup, operation, and teardown. Our full-service approach ensures a seamless audio experience for your event.'
      },
      'visual/fashion': {
        title: 'Fashion Visual',
        description: 'Great designs mandate great showcase presentations, and visual displays affect everything the audience perceives. The seasoned specialists at Stagepass Audio Visual Limited have been answering to high expectations for more than three decades and will bring that experience to your fashion event.'
      },
      'visual/corporate-event-video': {
        title: 'Corporate Event Video',
        description: 'Corporate events require professional video solutions for presentations, live streaming, and content display. Our video services ensure your corporate message is delivered with clarity and impact.'
      },
      'visual/trade-shows': {
        title: 'Trade Shows',
        description: 'Trade shows require dynamic visual displays to capture attention and communicate your message effectively. Our visual solutions for trade shows include LED displays, projection mapping, and interactive displays.'
      },
      'visual/full-service-video-packages': {
        title: 'Full-Service Video Packages',
        description: 'Our comprehensive video packages include everything from content creation and display design to setup, operation, and teardown. We handle all aspects of video production for your event.'
      },
      'design-services/lighting-design': {
        title: 'Lighting Design',
        description: 'If you\'re working with Stagepass Audio Visual Limited to secure the perfect lighting for your event, we\'re happy to provide for any design services you need. Our project managers work with designers every day, both our trusted creative professionals and those appointed by our clients.',
        content: '<p>Together, we create production drawings and lighting plots. By taking the time to invest in proper lighting design from the early planning stages, a cohesive overall aesthetic is assured, so every ambition for the event or show is sure to be met. Whether you are organizing a charity event in Nairobi or a weekend festival in Mombasa, Stagepass Audio Visual Limited is the partner you need.</p>'
      }
    };

    return serviceContent[path] || {
      title: 'Service',
      description: 'Professional AV services for your event needs.'
    };
  };

  const content = getServiceContent();
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: content.title, path: `/service/${service}${subservice ? `/${subservice}` : ''}` }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar data={homepageData?.navigation} isPage={true} />
      
      {/* Breadcrumb */}
      <div className="pt-28 pb-4">
        <div className="mx-auto max-w-4xl px-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>
      
      {/* Service Content */}
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-black text-[#172455] mb-6">
          {content.title}
        </h1>
        
        {content.description && (
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            {content.description}
          </p>
        )}
        
        {content.content && (
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-7 mb-8"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        )}
      </main>
      
      <Footer data={homepageData?.footer} />
      <BottomNavbar data={homepageData?.navigation?.bottom_links} isPage={true} />
    </div>
  );
};

export default ServicePage;
