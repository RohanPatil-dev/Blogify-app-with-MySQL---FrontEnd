import axios from "axios"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Author() {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [blog, setBlog] = useState([])

  useEffect(() => {
    renderBlog()
  }, [blog])

  
  const token = localStorage.getItem("uid")

  const data = {
    title: title,
    description: description
  }

  function postBlog(event) {
    event.preventDefault()

    axios.post("http://localhost:8081/blogs/addBlogs", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      console.log(value);
    })
  }


  function renderBlog() {
    axios.get("http://localhost:8081/blogs/renderBlog", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((value) => {
      console.log("renderBlog",value.data.allData);
      setBlog(value.data.allData)
    })
  }


  function deleteBlog(id) {
      axios.delete(`http://localhost:8081/blogs/deleteData/${id}`,{
        headers : {
           Authorization : `Bearer ${token}`
        }
      }).then((value)=>{
          console.log(value);
      })
  }


  return (
    <>
      <div id="blog-writer">
        <form action="" onSubmit={postBlog}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog title</label>
            <input type="text" className="form-control" name="title" value={title} onChange={(event) => { return setTitle(event.target.value) }} id="exampleFormControlInput1" placeholder="Enter your blog title" />
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1" style={{ fontSize: "25px", fontWeight: "600" }}>Blog Description</label>
            <textarea className="form-control" name="description" value={description} onChange={(event) => { return setDescription(event.target.value) }} id="exampleFormControlTextarea1" rows="3" style={{ height: "300px", overflow: "auto", resize: "none" }} placeholder="Enter your blog description"></textarea>
          </div>

          <button type="submit" className="btn btn-primary blogger">Submit</button>
        </form>
      </div>

      <div id="allBlogs">
        {
          blog.map((value) => {
            return (
              <>
                <div className="card" style={{ width: "18rem" }} key={value.id}>
                  <div className="card-body">
                    <h5 className="card-title">{value.title}</h5>
                    <p className="card-text">{value.description}</p>
                    <a href="#" className="btn btn-danger" onClick={()=>{return deleteBlog(value.id)}}>Delete Blog</a>
                    <Link to={`/updateBlog/${value.id}`} className="btn btn-success ml-3">Update Blog</Link>
                  </div>
                </div>
              </>
            )
          })
        }
      </div>

            <div>
                   

            </div>
    </>
  )
}


