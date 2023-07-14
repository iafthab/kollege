import React from "react";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

const ErrorElement = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="body">
      <Header />
      <main className="main">
        <Nav />
        <div id="error-page">
          <h2 className="text-violet-950 text-6xl font-bold">Oops!</h2>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ErrorElement;
