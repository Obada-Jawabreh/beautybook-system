import React from "react";
import { Mail, Linkedin, Heart, Star } from "lucide-react";

const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-4 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">B</span>
            </div>
            <span className="text-lg font-bold text-gray-900">BeautyBook</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-gray-600">
            <span className="text-xs">
              © 2025 BeautyBook. All rights reserved.
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-1 text-gray-500">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs">
                Your Beauty, Our Priority · Powered by Modern Technology
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-end items-center gap-4">
          <a
            href="https://linkedin.com"
            className="w-8 h-8 bg-gray-50 hover:bg-blue-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:info@beautybook.com"
            className="w-8 h-8 bg-gray-50 hover:bg-purple-50 rounded-lg flex items-center justify-center text-gray-600 hover:text-purple-600 transition-all duration-300 hover:scale-105"
            target="_blank"
            rel="noreferrer"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="md:hidden text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs">
              Your Beauty, Our Priority · Powered by Modern Technology
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
