// ViewBlog.jsx
import React, { useState, useEffect } from 'react';
import './ViewBlog.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AllBlog from '../components/AllBlog';

var data;

const ViewBlog = () => {
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        const fetchdata = async () => {
            const response = await fetch('/show-all-blog');
            console.log(response);
            const json = await response.json();
            data = json;
            console.log(data);
            setTimeout(async function () {
                setisLoading(false);
            }, 2000)
        }
        fetchdata();
    }, []);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="view-blogs-page">
                    <div className="container">
                        <h2>All Blog</h2>
                        <ul className="blog-list">
                            <p>Loading....</p>
                        </ul>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    else {
        return (
            <>
              <Navbar />
              <div className="blog-page">
                <section className="blog-list">
                  <h2>All Blogs</h2>
                  <div className="horizontal-scroll-container">
                  {data.map((blog) => (
                    <AllBlog blog={blog} key={blog.blog_id} />
                  ))}
                  </div>
                </section>
              </div>
                {/* <div className="view-blogs-page">
                    <div className="container">
                        <h2>View All Blog Posts</h2>
                        <ul className="blog-list">
                            {data.map((blog) => (
                                <BlogItem blog={blog} key={blog.blog_id} />
                            ))}
                        </ul>
                    </div>
                </div> */}
                <Footer />
            </>
        );
    }
};

export default ViewBlog;
