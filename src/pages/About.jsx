import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRegisterRoute, checkUserRegistration } from '../utils/auth.js';

export default function About() {

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-blue-600 text-center mb-10">
        About College Collab
      </h1>

      {/* Purpose Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Purpose</h2>
        <p className="text-gray-700 leading-relaxed">
          College Collab is a student-focused platform designed to help college students
          connect based on the skills they have and the skills they need.
          Whether you're a developer looking for a designer, a writer searching for a teammate,
          or simply someone wanting to join or start a project — College Collab helps you find
          the right collaborators and opportunities.
        </p>
      </section>

      {/* How it Works Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">How It Works</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Register:</strong> Create your profile and list your skills or interests.</p>
          <p><strong>Browse:</strong> Explore profiles of other students by skill, domain, or project interest.</p>
          <p><strong>Connect:</strong> Reach out to students who match your needs or who you'd like to collaborate with.</p>
          <p><strong>Collaborate:</strong> Team up, build real projects, learn together, and grow your portfolio.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Benefits</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Expand Your Network</h3>
            <p>Meet like-minded peers from different colleges and fields.</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Real Project Experience</h3>
            <p>Build actual projects that you can showcase on your resume or portfolio.</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Skill Discovery</h3>
            <p>Find teammates with skills you don't have, and learn from collaboration.</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Visibility</h3>
            <p>Let others discover your strengths and invite you to work with them.</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Team Building</h3>
            <p>Form strong, project-based teams that mimic real-world collaboration.</p>
          </div>
          <div className="bg-blue-50 p-5 rounded-xl shadow-sm">
            <h3 className="font-semibold text-blue-700 mb-2">Self-Growth</h3>
            <p>Boost confidence, leadership, and teamwork through real-world practice.</p>
          </div>
        </div>
      </section>

      {/* Extra: Vision / Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          At College Collab, we believe in learning by doing and growing by sharing.
          Our mission is to foster a space where students don't wait for opportunities —
          they create them by connecting, collaborating, and building together.
        </p>
      </section>
      
    </div>
  );
}

