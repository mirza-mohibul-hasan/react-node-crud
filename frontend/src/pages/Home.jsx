import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
      const fetchAllBooks = async () => {
        try {
          const res = await axios.get("http://localhost:4400/books");
          setBooks(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchAllBooks();
    }, []);
  
    console.log(books);
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`http://localhost:4400/books/${id}`);
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div>
        <div className="books">
          {books.map((book) => (
            <div key={book.id} className="book">
              <img src={book.cover} alt="" />
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>${book.price}</span>
              <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
              <button className="update">
                <Link
                  to={`/update/${book.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Update
                </Link>
              </button>
            </div>
          ))}
        </div>
  
        <button className="addHome">
          <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
            Add new book
          </Link>
        </button>
      </div>
    );
}

export default Home