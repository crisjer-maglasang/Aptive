import {
  TwitterIcon,
  InstagramIcon,
  GitHubIcon,
  DribbbleIcon,
  FacebookIcon,
} from '@/components/common/icons';

const socialLinks = [
  { name: 'Facebook', icon: <FacebookIcon />, link: '#' },
  { name: 'Instagram', icon: <InstagramIcon />, link: '#' },
  { name: 'X', icon: <TwitterIcon />, link: '#' },
  { name: 'GitHub', icon: <GitHubIcon />, link: '#' },
  { name: 'Dribbble', icon: <DribbbleIcon />, link: '#' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightNotice = `\u00A9 ${currentYear} aptive. All Rights Reserved.`;

  return (
    <footer className="bg-gray-100 border-t border-gray-300">
      <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {socialLinks.map((linkItem) => (
            <a href={linkItem.link} key={linkItem.name} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">{linkItem.name}</span>
              {linkItem.icon}
            </a>
          ))}
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-400">
            {copyrightNotice}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
