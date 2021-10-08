import React, { useState, useContext , useEffect} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export const EditArticle = (props) => {
    var user = JSON.parse(localStorage.getItem('user'));
    const { editArticle, articles } = useContext(GlobalContext);
    const [selectedArticle, setSelectedArticle] = useState({
      id: '',
      title: '',
      body : '',
      author : user.username
    })
    const history = useHistory();
    const currentArticleId = props.match.params.id;
  
    useEffect(() => {
      const ArticleId = currentArticleId;
      const selectedArticle = articles.find(article => article.id === ArticleId);
      setSelectedArticle(selectedArticle);
    }, [currentArticleId, articles])
  
    const onChange = (e) => {
      setSelectedArticle({ ...selectedArticle, [e.target.name]: e.target.value })
    }
  
    const onSubmit = (e) => {
      e.preventDefault();
      editArticle(selectedArticle);
      history.push("/user")
    }
  
    return (
      <Form onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor="title">Title</label>
        <Input
            type="text"
            className="form-control"
            name="title"
            value={selectedArticle.title}
            onChange={onChange}
            placeholder="Enter Title"
            required
        />
        </div>

        <div className="form-group">
        <label htmlFor="body">Body</label>
        <Input
            type="text"
            className="form-control"
            name="body"
            value={selectedArticle.body}
            onChange={onChange}
            placeholder="Enter Body"
            required
        />
        </div>
        <button className="btn btn-success m-2" type="submit">Submit</button>
        <Link to="/" className="btn btn-danger m-2">Cancel</Link>
      </Form>
    )
  }