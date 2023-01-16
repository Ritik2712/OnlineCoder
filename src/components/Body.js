import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Codes from "./Codes";

function Body(props) {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [size, setSize] = useLocalStorage("size", "");
  const [srcDoc, setSrcDoc] = useState("");
  const { id, type } = useParams();
  const [Id, setId] = useState(id);
  const [isLogin, setIslogin] = useState(true);

  useEffect(() => {
    if (id === "new") {
      setHtml("");
      setCss("");
      setJs("");
    } else {
      if (localStorage.getItem("IsLogin") === "0") {
        setIslogin(false);
      }
      const HEADERS = {
        authorization: `Toekn ` + localStorage.getItem("TOKEN"),
      };
      axios({
        method: "GET",
        url: "http://localhost:5000/code/getCode",
        params: { name: id },
        headers: HEADERS,
      })
        .then((res) => {
          setHtml(res.data.html);
          setCss(res.data.css);
          setJs(res.data.js);
        })
        .catch((e) => {
          alert("code not found");
          window.location.href = "/new/html";
        });
    }
  }, [Id]);

  useEffect(() => {
    const template = `
    <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
  `;
    const byteSize = (str) => new Blob([str]).size;
    const timeout = setTimeout(() => {
      setSrcDoc(template);
      setSize(byteSize(template));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [html, css, js]);
  if (!isLogin) {
    return <Navigate to="/new/html" />;
  }
  return (
    <>
      <div className="flex">
        <div className="codes">
          <Codes
            click={(id) => {
              setId(id);
            }}
          />
        </div>
        <div className="pane top-pane">
          {type === "html" ? (
            <Editor
              language="xml"
              displayName="HTML"
              value={html}
              onChange={setHtml}
            />
          ) : null}
          {type === "css" ? (
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              onChange={setCss}
            />
          ) : null}
          {type === "js" ? (
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              onChange={setJs}
            />
          ) : null}
        </div>
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default Body;
