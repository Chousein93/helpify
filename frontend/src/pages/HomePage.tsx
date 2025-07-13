import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Users, Shield, CreditCard, Star, CheckCircle, MessageCircle, Award } from 'lucide-react';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [userType, setUserType] = useState<'seeker' | 'helper'>('seeker');

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '50,000+', label: 'Tasks Completed' },
    { number: '4.8/5', label: 'Average Rating' },
    { number: '98%', label: 'Success Rate' },
  ];

  const features = [
    {
      icon: Users,
      title: 'Verified Helpers',
      description: 'All helpers undergo ID verification and background checks'
    },
    {
      icon: Shield,
      title: 'Payment Protection',
      description: 'Your money is held securely until task completion'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'End-to-end encrypted payment processing with Stripe'
    },
    {
      icon: MessageCircle,
      title: 'Real-time Chat',
      description: 'Communicate with helpers instantly through our app'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Busy Professional',
      image: '👩‍💼',
      text: 'HelperHand saved me hours every week. Found amazing help for cleaning and grocery shopping!'
    },
    {
      name: 'Mehmet Özkan',
      role: 'Helper',
      image: '👨‍🔧',
      text: 'Great way to earn extra income using my handyman skills. The payment system is reliable and fast.'
    },
    {
      name: 'Maria Garcia',
      role: 'Senior Citizen',
      image: '👵',
      text: 'The helpers are so kind and trustworthy. I feel safe having them help with my daily tasks.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* User Type Toggle */}
            <div className="inline-flex bg-white rounded-lg p-1 mb-8 shadow-sm">
              <button
                onClick={() => setUserType('seeker')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  userType === 'seeker'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                I need help
              </button>
              <button
                onClick={() => setUserType('helper')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  userType === 'helper'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                I want to help
              </button>
            </div>

            {/* Dynamic Hero Content */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {userType === 'seeker' ? t('hero.titleSeeker') : t('hero.titleHelper')}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {userType === 'seeker' ? t('hero.subtitleSeeker') : t('hero.subtitleHelper')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/signup"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
              >
                {userType === 'seeker' ? t('hero.ctaSeeker') : t('hero.ctaHelper')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <button
                onClick={() => setUserType(userType === 'seeker' ? 'helper' : 'seeker')}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {userType === 'seeker' ? t('hero.switchToHelper') : t('hero.switchToSeeker')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary-600">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('howItWorks.title')}
            </h2>
            <p className="text-xl text-gray-600">Simple steps to get help or start helping</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step}
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`howItWorks.step${step}.title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`howItWorks.step${step}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HelperHand?
            </h2>
            <p className="text-xl text-gray-600">Built with trust and security in mind</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <feature.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600">Real stories from real people</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.image}</div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('faq.title')}
            </h2>
          </div>

          <div className="space-y-6">
            {['fees', 'safety', 'payments'].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {t(`faq.${faq}`)}
                </h3>
                <p className="text-gray-600">
                  {t(`faq.${faq}Answer`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of people already using HelperHand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-white text-primary-600 px-8 py-4 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              to="/tasks"
              className="border border-white text-white px-8 py-4 rounded-md font-medium hover:bg-primary-700 transition-colors"
            >
              Browse Tasks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;