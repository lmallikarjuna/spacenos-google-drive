import React from "react";

export default function ViewDocument({ name, type, url }) {
  console.log("In ViewDocument: ", name, type, url);
  return (
    <div className="view-document-container">
      {type === "image" ? (
        <img className="view" src={url} alt={name} />
      ) : (
        <iframe className="view" src={url} title={name} />
      )}
    </div>
  );
}
