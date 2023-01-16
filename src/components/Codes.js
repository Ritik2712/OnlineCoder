import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

export default function Codes(props) {
  const [codes, setcodes] = useState([]);
  const [islogin, setIslogin] = useState(false);
  const HEADERS = {
    authorization: `Toekn ` + localStorage.getItem("TOKEN"),
  };
  const [Navigate, setNavigate] = useState(false);
  const [url, setUrl] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("IsLogin") === "0") {
      setIslogin(true);
    }

    axios({
      method: "GET",
      url: "http://localhost:5000/code",
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res.data);
        setcodes(res.data);
      })
      .catch((e) => {
        console.log(e);
      });

    return setNavigate(false);
  }, []);
  if (islogin) {
    return <Navigate to="/new/html" />;
  }
  const Del = (name) => {
    axios({
      method: "DELETE",
      url: "http://localhost:5000/code/delete",
      data: { name },
      headers: HEADERS,
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const navigate = (event, url) => {
    event.stopPropagation();
    props.click(url);
  };
  if (Navigate) {
    window.location.href = "/" + url;
  }
  return (
    <>
      <h1>My codes</h1>
      {codes.length ? (
        <ul>
          {codes.map((item, index) => {
            return (
              <li
                onClick={(e) => navigate(e, item.name)}
                title={"updated " + moment(item.modified).fromNow()}
              >
                <Link to={"/" + item.name + "/html"} className="link1">
                  {item.name}
                </Link>
                <i
                  class="fa fa-trash"
                  onClick={() => {
                    Del(item.name);
                  }}
                  aria-hidden="true"
                ></i>
                <ul>
                  <li onClick={(e) => navigate(e, item.name)}>
                    <Link to={"/" + item.name + "/html"} className="link1">
                      HTML
                    </Link>
                  </li>
                  <li onClick={(e) => navigate(e, item.name)}>
                    <Link to={"/" + item.name + "/css"} className="link1">
                      Css
                    </Link>
                  </li>
                  <li onClick={(e) => navigate(e, item.name)}>
                    <Link to={"/" + item.name + "/js"} className="link1">
                      JS
                    </Link>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      ) : (
        <h1>No projects</h1>
      )}
    </>
  );
}
