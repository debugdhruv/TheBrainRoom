import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import profile from "@/assets/profile.png"
import logo from "@/assets/darklogo.png"
import BackIcon from "@/assets/icons/back.svg";

const About = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/dashboard");
  }
  return (
    <div className="mt-10 scale-[1.05]">
      <div className="fixed left-28 top-16 justify-start">
        <button
          onClick={handleBack}
          className="flex items-center bg-cyan-50 text-cyan-600 font-bold text-md border border-cyan-200 pr-5 pl-4 py-2 rounded-full hover:bg-cyan-200  disabled:opacity-30"
        >
          <img src={BackIcon} alt="Back" className="h-4 w-4" /> Back
        </button>
      </div>
      <div className="flex flex-col items-center justify-center px-8 lg:px-24 py-16 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-12 max-w-4xl w-full mx-auto">
          <img
            src={profile}
            alt="Dhruv"
            className="rounded-full sm:rounded-xl shadow-xl w-80 h-80 object-cover"
          />
          <div className="text-justify max-w-2xl">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Hi, I’m Dhruv</h1>
            <p className="text-slate-700 text-base mb-4 leading-relaxed">
              I’m a product designer and part-time developer with a CS degree from LNCT. This website — The Brain Room —
              is my solo project built using the MERN stack with ShadCN for UI and DeepSeek LLM for AI. I designed the whole thing in Figma and developed it myself to combine thoughtful design with solid tech.
            </p>
            <p className="text-slate-700 text-base mb-4 leading-relaxed">
              I’m currently open to new opportunities — whether it’s full-time, freelance, or just a good conversation
              about design and tech. If you’re interested, feel free to leave a message in the form below. I’d love to connect!
              <div className="pt-2" />
              <a
                href="https://drive.google.com/file/d/1QajQRx9Xu8NeX3yaG_dmtDn6XNjkS4YO/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium underline hover:text-indigo-800">
                Resume
              </a>
            </p>
          </div>
        </div>

        {/* Last Section */}
        <div className="mt-20 max-w-4xl w-full mx-auto px-6 py-10 bg-white border rounded-lg shadow-lg">
          <div className="text-center mb-10">
            <img
              src={logo}
              alt="The Brain Room Logo"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">About The Brain Room</h1>
            <p className="text-slate-500 text-justify max-w-2xl font-medium mx-auto">
              The Brain Room is your digital mental wellness companion. It is designed and developed by me using Figma and the MERN stack, powered by DeepSeek LLM Model for AI Chatbot, and crafted to help users track moods, reflect deeper, and talk freely with our friendly BrainBot. It’s more than a website, it’s your daily check-in space, journal, and AI friend all in one.
              <div className="pt-2" />
              <a href="https://www.github.com/debugdhruv/thebrainroom.git"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 font-medium underline hover:text-indigo-800">Source Code
              </a>
            </p>
          </div>
          <div className="mt-20 max-w-2xl w-full mx-auto px-6 py-10 bg-slate-50 p-6 rounded-lg shadow-inner">
            <h3 className="flex justify-center text-xl font-semibold mb-4 text-slate-800">Feedback and Contact Form</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                const form = e.target;
                const formData = new FormData(form);
                try {
                  const response = await fetch("https://formspree.io/f/mrblerlp", {
                    method: "POST",
                    body: formData,
                    headers: {
                      Accept: "application/json",
                    },
                  });
                  if (response.ok) {
                    toast.success("Message sent! ✅");
                    form.reset();
                  } else {
                    toast.error("Something went wrong. Please try again.");
                  }
                } catch (err) {
                  console.error("Error sending message:", err);
                  toast.error("Error sending message.");
                } finally {
                  setIsSubmitting(false);
                }
              }}
              className="flex flex-col space-y-4"
            >
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="Name"
                  required
                  placeholder="Your Name"
                  className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="email"
                  name="Email"
                  required
                  placeholder="Your Email"
                  className="w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <input
                type="text"
                name="Subject"
                required
                placeholder="Subject"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <textarea
                name="Message"
                required
                rows="4"
                placeholder="Your Message"
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending message..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;