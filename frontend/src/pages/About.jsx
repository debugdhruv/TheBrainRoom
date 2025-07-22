import React, { useState } from "react";
import { toast } from "sonner";
import logo from "@/assets/darklogo.png"

const About = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
      <div className="mt-20 max-w-4xl mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-10">
          <img
            src={ logo }
            alt="The Brain Room Logo"
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-slate-800 mb-2">About The Brain Room</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            The Brain Room is your digital mental wellness companion — designed with love using the MERN stack, powered by OpenAI, and crafted to help users track moods, reflect deeper, and talk freely with our friendly BrainBot. It’s more than an app — it’s your daily check-in space, journal, and AI friend all in one.
          </p>
        </div>

        <div className="bg-slate-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">📬 If you have any feedback or just want to connect!</h3>
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
                  toast.success("Message sent to Dhruv! ✅");
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending message..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    );
};

export default About;