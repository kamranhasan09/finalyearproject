import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { storage, app, database, firestore } from "../../firebase";

// import DeleteBtn from "../delete";

export default function File({ file }) {
  const db = firestore;

  const copytToClip = (file) => {
    navigator.clipboard.writeText(file.url);
  };

  const deleteItems = (deleteItems) => {
    var desertRef = storage.refFromURL(deleteItems.url);
    desertRef
      .delete()
      .then(() => {
        console.log(" File deleted successfully");
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!");
      });

    db.collection("files")
      .where("createdAt", "==", file.createdAt)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      })
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };
  return (
    <>
      <a
        href={file.url}
        target="_blank"
        className="btn btn-outline-dark text-truncate w-100"
      >
        <FontAwesomeIcon icon={faFile} className="mr-2" />
        {file.name}
      </a>
      <a className="btn btn-danger text-truncate  w-45 m-1">
        <div onClick={() => deleteItems(file)}>Delete</div>
      </a>
      <a className="btn btn-success text-truncate  w-45 m-1">
        <div className="ml-2" onClick={() => copytToClip(file)}>
          Share
        </div>
      </a>
    </>
  );
}
