import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

function PublicView(props) {
  const [html, setHtml] = useLocalStorage(
    "html",
    localStorage.getItem("codepen-clone-html")
  );
  const [css, setCss] = useLocalStorage(
    "css",
    localStorage.getItem("codepen-clone-css")
  );
  const [js, setJs] = useLocalStorage(
    "js",
    localStorage.getItem("codepen-clone-js")
  );
  const [srcDoc, setSrcDoc] = useState("");
  const [isLogin, setIslogin] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("IsLogin") === "0") {
      setIslogin(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [html, css, js]);
  if (!isLogin) {
    return <Navigate to="/new/html" />;
  }
  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={() => {}}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={() => {}}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={() => {}}
        />
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

export default PublicView;
