import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const footerLinks = {
    company: [
      { label: t('footer.about'), href: '/about' },
      { label: t('footer.contact'), href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
    ],
    legal: [
      { label: t('footer.terms'), href: '/terms' },
      { label: t('footer.privacy'), href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Data Protection', href: '/data-protection' },
    ],
    support: [
      { label: t('footer.help'), href: '/help' },
      { label: 'Safety', href: '/safety' },
      { label: 'Community Guidelines', href: '/guidelines' },
      { label: 'Report Issue', href: '/report' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold">HelperHand</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting communities through mutual assistance. 
              Find help for everyday tasks or earn money by helping others.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>support@helperhand.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>123 Community St, Helper City, HC 12345</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest news and updates from HelperHand</p>
            </div>
            <div className="flex space-x-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600"
              />
              <button className="btn-primary">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} HelperHand. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* App Download Links */}
        <div className="py-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 mb-4">Download our mobile app</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📱</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </div>
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🤖</span>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;