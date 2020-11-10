import React, { Fragment, useEffect, useState } from "react";
import { gapi } from "gapi-script";

import "./app.css";
import DocumentsContainer from "./DocumentsContainer";
import Navigation from "./Navigation";

export default function App() {
  const [signInState, setSignInState] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [signedInUser, setSignedInUser] = useState();

  const listFiles = (searchTerm = null) => {
    gapi.client.drive.files
      .list({
        pageSize: 10,
        fields:
          "nextPageToken, files(id, name, mimeType, modifiedTime, mimeType, webContentLink, webViewLink)",
        q: searchTerm,
      })
      .then(function (response) {
        const res = JSON.parse(response.body);
        setDocuments(res.files);
        console.log(res.files);
      });
  };

  const updateSigninStatus = (isSignedIn) => {
    if (isSignedIn) {
      setSignInState(true);
      setSignedInUser(gapi.auth2.getAuthInstance().currentUser.je.Qt);
      listFiles();
    } else {
      handleLoginClick();
    }
  };
  const initClient = () => {
    gapi.client
      .init({
        apiKey: "YOUR_API_KEY",
        clientId: "CLIENT_ID",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
      })
      .then(
        function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function (error) {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    gapi.load("client:auth2", initClient);
  }, []);

  const handleLoginClick = (e) => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleLogoutClick = (e) => {
    gapi.auth2.getAuthInstance().signOut();
    setSignInState(false);
  };

  return (
    <Fragment>
      <Navigation
        handleLoginClick={handleLoginClick}
        handleLogoutClick={handleLogoutClick}
        currentState={signInState}
      />
      <main>
        {signInState ? (
          <DocumentsContainer documents={documents} />
        ) : (
          <p className="please-login">Login to view files</p>
        )}
      </main>
    </Fragment>
  );
}
