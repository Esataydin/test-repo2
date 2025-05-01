// import { useState, useEffect } from "react";
// import api from "../api";
// import Note from "../components/Note"
// import "../styles/Home.css"

// function Home() {

//     const [notes, setNotes] = useState([]);
//     const [content, setContent] = useState("");
//     const [title, setTitle] = useState("");

//     useEffect(() => {
//         getNotes();
//     }, []);


//     const getNotes = () => {
//         api
//             .get("/api/notes/")
//             .then((res) => res.data)
//             .then((data) => {
//                 setNotes(data);
//                 console.log(data);
//             })
//             .catch((err) => alert(err));
//     };

//     const deleteNote = (id) => {
//         api
//             .delete(`/api/notes/delete/${id}/`)
//             .then((res) => {
//                 if (res.status === 204) alert("Note deleted!");
//                 else alert("Failed to delete note.");
//                 getNotes();
//             })
//             .catch((error) => alert(error));
//     };

//     const createNote = (e) => {
//         e.preventDefault();
//         api
//             .post("/api/notes/", { content, title })
//             .then((res) => {
//                 if (res.status === 201) alert("Note created!");
//                 else alert("Failed to make note.");
//                 getNotes();
//             })
//             .catch((err) => alert(err));
//     };

//     return (
//         <div>
//             <div>
//                 <h2>Notes</h2>
//                 {notes.map((note) => (
//                     <Note note={note} onDelete={deleteNote} key={note.id} />
//                 ))}
//             </div>
//             <h2>Create a Note</h2>
//             <form onSubmit={createNote}>
//                 <label htmlFor="title">Title:</label>
//                 <br />
//                 <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     required
//                     onChange={(e) => setTitle(e.target.value)}
//                     value={title}
//                 />
//                 <label htmlFor="content">Content:</label>
//                 <br />
//                 <textarea
//                     id="content"
//                     name="content"
//                     required
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                 ></textarea>
//                 <br />
//                 <input type="submit" value="Submit"></input>
//             </form>
//         </div>
//     );
// }


import { useState, useEffect } from "react";
import api from "../api";
import Post from "../components/Post"
import "../styles/Home.css"


function Home() {


    const [posts, setPosts] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        api
            .get("/api/posts/")
            .then((res) => res.data)
            .then((data) => {
                setPosts(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deletePost = (id) => {
        api
            .delete(`/api/posts/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Post deleted!");
                else alert("Failed to delete post.");
                getPosts();
            })
            .catch((error) => alert(error));
    };

    const createPost = (e) => {
        e.preventDefault();
        api
            .post("/api/posts/", { content })
            .then((res) => {
                if (res.status === 201) alert("Post created!");
                else alert("Failed to make post.");
                getPosts();
            })
            .catch((err) => alert(err));
    };


    return (
        <div>
            <div>
                <h2>Posts</h2>
                {posts.map((post) => (
                    <Post post={post} onDelete={deletePost} key={post.id} />
                ))}
            </div>
            <h2>Create a Post</h2>
            <form onSubmit={createPost}>
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
    
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );


}

export default Home;