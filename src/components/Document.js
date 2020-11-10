import React from "react";

export default function Document({
  id,
  name,
  mimeType,
  webContentLink,
  webViewLink,
  handleDocumentSelect,
}) {
  const handleDocumentClick = () => {
    if (mimeType === "image/jpeg") {
      handleDocumentSelect(name, "image", webContentLink);
    } else if (mimeType === "application/pdf") {
      handleDocumentSelect(
        name,
        "pdf",
        `https://drive.google.com/file/d/${id}/preview`
      );
    } else if (mimeType === "video/mp4") {
      handleDocumentSelect(
        name,
        "video",
        `https://drive.google.com/file/d/${id}/view`
      );
    } else if (
      mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      handleDocumentSelect(
        name,
        "officedocument",
        `https://drive.google.com/file/d/${id}/view`
      );
    } else {
      handleDocumentSelect(name, "other", webViewLink);
    }
  };
  return (
    <li className="document-container">
      <p onClick={handleDocumentClick}>{name}</p>
    </li>
  );
}
