import React, { useReducer } from "react";

import Document from "./Document";
import ViewDocument from "./ViewDocument";

function reducer(state, action) {
  const { type, data } = action;
  switch (type) {
    case "DISPLAY_DOC":
      return {
        ...state,
        name: data.name,
        type: data.type,
        url: data.url,
      };
    default:
      return state;
  }
}

export default function DocumentsContainer({ documents }) {
  const [displayedDocument, dispatch] = useReducer(reducer, {
    name: null,
    type: null,
    url: null,
  });

  const handleDocumentSelect = (name, type, url) => {
    console.log("In handleDocumentSelect: ", name, type, url);
    dispatch({ type: "DISPLAY_DOC", data: { name, type, url } });
  };

  return (
    <div className='documents-list-and-view-container'>
      <ul className="document-list-container">
        {documents.map(
          ({ id, name, mimeType, webContentLink, webViewLink }) => (
            <Document
              key={id}
              id={id}
              name={name}
              mimeType={mimeType}
              webContentLink={webContentLink}
              webViewLink={webViewLink}
              handleDocumentSelect={handleDocumentSelect}
            />
          )
        )}
      </ul>
      <ViewDocument
        name={displayedDocument.name}
        type={displayedDocument.type}
        url={displayedDocument.url}
      />
    </div>
  );
}
