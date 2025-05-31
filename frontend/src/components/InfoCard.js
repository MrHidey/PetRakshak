import React from 'react';
import PropTypes from 'prop-types';

/**
 * InfoCard component displays a card with an icon, title, description, and a call-to-action link.
 * Used for showcasing ways to contribute or engage, with customizable colors and hover effects.
 * 
 * Example usage:
 * ```jsx
 * import InfoCard from './InfoCard';
 * 
 * <InfoCard
 *   title="Report Cases"
 *   description="Found an animal in distress? Report it immediately and our rescue team will respond."
 *   icon={<Camera size={24} />}
 *   linkText="Report Now"
 *   linkUrl="#report"
 *   color="orange"
 *   className="my-4"
 * />
 * 
 * <InfoCard
 *   title="Support Our Mission"
 *   description="Your donations help us save more animals and provide them with necessary care."
 *   icon={<Award size={24} />}
 *   linkText="Donate"
 *   linkUrl="#donate"
 *   color="green"
 * />
 * ```
 */
const InfoCard = ({ title, description, icon, linkText, linkUrl, color, className }) => {
  const colorStyles = {
    orange: 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white border-orange-200',
    blue: 'bg W-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white border-blue-200',
    green: 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white border-green-200',
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md text-center transition-transform duration-300 hover:scale-100 border ${colorStyles[color]} ${className}`}>
      <div className={`inline-flex items-center justify-center w-12 h-12 ${colorStyles[color]} rounded-full mb-4 transition-colors duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a
        href={linkUrl}
        className={`inline-block px-4 py-2 rounded-md ${colorStyles[color]} font-medium transition-colors duration-300 hover:shadow-lg`}
      >
        {linkText}
      </a>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  linkText: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['orange', 'blue', 'green']).isRequired,
  className: PropTypes.string,
};

InfoCard.defaultProps = {
  color: 'blue',
  className: '',
};

export default InfoCard;