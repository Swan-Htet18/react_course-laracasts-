import React from "react";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Blog from "./Pages/Blog";
import BlogPost from "./Pages/BlogPost";
import NotMatch from "./Pages/NotMatch";
import App from "./App";
import NavigationBar from "./Pages/NavigationBar";
import { Routes, Route } from "react-router-dom";

function Root() {
  return (
    <div className="todo-app-container">
      <NavigationBar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="*" element={<NotMatch />} />
      </Routes>
    </div>
  );
}

export default Root;
