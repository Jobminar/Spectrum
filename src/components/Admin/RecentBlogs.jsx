import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const RecentBlogs = ({ blogs, title, subtitle, content, file }) => {
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    if (!blogs || blogs.length === 0) {
      fetchBlogs();
    }
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("https://sgl-be.onrender.com/getblogs");
      if (response.ok) {
        const data = await response.json();
        setAllBlogs(data);
        console.log("Blogs fetched successfully:", data);
      } else {
        showError("Failed to fetch blogs. Please try again.");
      }
    } catch (error) {
      showError("Error fetching blogs. Please check the console for details.");
    }
  };

  const handleDeleteBlog = async (blogId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://sgl-be.onrender.com/deleteblogs/${blogId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setAllBlogs((prevBlogs) =>
            prevBlogs.filter((blog) => blog._id !== blogId)
          );

          await Swal.fire({
            icon: "success",
            title: "Blog deleted successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Blog deleted successfully:", blogId);
        } else {
          showError("Failed to delete blog. Please try again.");
        }
      } catch (error) {
        showError("Error deleting blog. Please check the console for details.");
      }
    }
  };

  const showError = (errorMessage) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: errorMessage,
    });
  };

  const renderBlogCard = (blog) => (
    <div key={blog._id} className="col-sm-4 mb-3">
      <div className="card" style={{ maxWidth: "100%" }}>
        <img
          src={`data:image/png;base64,${blog.image}`}
          className="card-img-top"
          alt="Blog"
          style={{ maxHeight: "100px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title" style={{ fontSize: "0.8rem" }}>
            {blog.title}
          </h5>
          <p className="card-text" style={{ fontSize: "0.7rem" }}>
            {blog.subtitle}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteBlog(blog._id)}
            >
              Delete
            </button>
            <a href="#" className="btn btn-primary btn-sm ms-1">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  const contentChunks = content.split("\n").map((chunk, index) => (
    <React.Fragment key={index}>
      {chunk}
      <br />
    </React.Fragment>
  ));

  return (
    <div
      className="text-center mt-2"
      style={{
        fontSize: "0.7rem",
        color: "#999",
        marginLeft: "1rem", // Add left margin
      }}
    >
      <div className="container mt-2">
        <h2 className="text-center mb-2" style={{ fontSize: "1rem" }}>
          {title || "Recent Blogs"}
        </h2>
        {subtitle && (
          <p
            className="text-center mb-2"
            style={{ fontSize: "0.8rem", color: "#666" }}
          >
            {subtitle}
          </p>
        )}
        <div className="scrolling-container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2">
            {allBlogs.map(renderBlogCard)}
          </div>
        </div>

        {/* Display content chunks */}
        {contentChunks}

        {/* Display file preview */}
        {file && (
          <div>
            <p style={{ fontSize: "0.8rem", color: "#666" }}>Image Preview:</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Blog Preview"
              className="img-fluid"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}

        {/* Tiny Footer Design */}
        <footer
          className="text-center mt-2"
          style={{ fontSize: "0.7rem", color: "#999" }}
        >
          <p>&copy; 2023 Your Blog App</p>
        </footer>
      </div>
    </div>
  );
};

RecentBlogs.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  file: PropTypes.object,
};

export default RecentBlogs;
