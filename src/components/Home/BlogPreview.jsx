import React, { useEffect, useState } from "react";
import "./BlogPreview.css";
import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import AspectRatio from '@mui/material/AspectRatio';

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://sgl-be.onrender.com/getblogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <h1 className="ourblogs">OUR BLOGS</h1>
      <div className="home-blogs-section">
        {blogs.slice(0, 4).map((blog, index) => (
          <Card sx={{ width: 300 , boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}} key={index}>
            <div>
              <Typography level="title-lg " sx={{ textAlign: 'center',fontFamily:'Roboto',fontSize:'25px', lineHeight:'40px' }}>{blog.title}</Typography>
              <Typography level="body-sm">{blog.date}</Typography>
              {/* <IconButton
                aria-label={`bookmark ${blog.title}`}
                variant="plain"
                color="neutral"
                size="sm"
                sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
              >
                <BookmarkAdd />
              </IconButton> */}
            </div>
            <div className="aspect-ratio-container">
              <div className="aspect-ratio-item">
                <img
                  src={`data:image/png;base64,${blog.image}`}
                  alt={blog.title}
                  style={{ objectFit: 'cover', width: '90%', height: '90%' }}
                />
              </div>
            </div>
            <CardContent orientation="horizontal">
              <div>
                <Typography level="body-xs"> {blog.content.length > 500 ? `${blog.content.substring(0, 500)}...` : blog.content}</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {blog.price}
                </Typography>
              </div>
              <Button
                variant="solid"
                size="md"
                color="primary"
                aria-label={`Explore ${blog.title}`}
                sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
              >
                View Blog
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="blogs-submit">
        <Button
          sx={{
            background: "#F4821F",
            borderRadius: "10px",
            width:'10rem',
            color: "white",
            '&:hover': {
              background: "#F4821F",
            },
          }}
          className='submit'
        >
          View more blogs
        </Button>
      </div>
    </>
  );
};

export default BlogPreview;
