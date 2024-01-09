import React from 'react';

const Contact = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto max-w-screen-md px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>
        <p className="text-lg font-light text-center mb-16">
          Got a question? We'd love to hear from you. Send us a message, and we'll respond as soon as possible.
        </p>
        <form className="space-y-8">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="form-input mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form-input mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
              Your Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Type your message here..."
              className="form-input mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
