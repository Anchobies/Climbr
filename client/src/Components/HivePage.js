import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import BeePage from './Components/BeePage';

const HivePage = ({ currentUser }) => {
  const hiveId = useParams().hive_id;

  const [edit, setEdit] = useState(false);
  const [hiveName, setHiveName] = useState("");
  const [editErrors, setEditErrors] = useState([]);
  const [removeErrors, setRemoveErrors] = useState([]);
  const [addErrors, setAddErrors] = useState([]);
  const [newBee, setNewBee] = useState([]);

  let isQueen = false;

  const [bees, setBees] = useState([]);

  const getBees = () => {
    fetch(`/bees/${hiveId}/bees`)
      .then((response) => response.json())
      .then((json) => {
        setBees(json);
      });
  };

  const handleEditName = (e) => {
    e.preventDefault();

    fetch(`/hives/${hiveId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        hive: { name: hiveName, queen_bee_id: bees[0].hive.queen_bee_id },
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.errors) {
          setEdit(false);
          setEditErrors([]);
          setRemoveErrors([]);
          setAddErrors([]);
          getBees();
        } else {
          setEditErrors(json.errors);
        }
      });
  };

  useEffect(() => {
    fetch(`/bees/${hiveId}/bees`)
      .then((response) => response.json())
      .then((json) => {
        setBees(json);
      });
  }, [hiveId]);

  const handleRemoveBee = (e, beeId) => {
    e.preventDefault();

    fetch(`/bees/${beeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.errors) {
          setEditErrors([]);
          setRemoveErrors([]);
          setAddErrors([]);
          getBees();
        } else {
          setRemoveErrors(json.errors);
        }
      });
  };

  if (bees.length > 0 && bees[0].hive.queen_bee_id === currentUser.id) {
    isQueen = true;
  }

  const beesArray = bees.map((bee) => {
    return (
      <div key={bee.id}>
        {bee.user.id === currentUser.id ? (
          <>
            <h3>
              {bee.user.first_name} {bee.user.last_name} (Me)
            </h3>
            <img
              src={
                bee.user.img_url
                  ? bee.user.img_url
                  : bee.user.id === bee.hive.queen_bee_id
                  ? "https://s.clipartkey.com/mpngs/s/9-90613_transparent-pumpkin-monogram-clipart-clip-art-queen-bee.png"
                  : "https://image.flaticon.com/icons/png/128/809/809052.png"
              }
              alt="Bee"
              className={bee.user.img_url ? "img-circle" : "default"}
            />
          </>
        ) : (
          <>
            <Link to={`/hives/${hiveId}/${bee.id}`}>
              <h3>
                {bee.user.first_name} {bee.user.last_name}
              </h3>
              <img
                src={
                  bee.user.img_url
                    ? bee.user.img_url
                    : bee.user.id === bee.hive.queen_bee_id
                    ? "https://s.clipartkey.com/mpngs/s/9-90613_transparent-pumpkin-monogram-clipart-clip-art-queen-bee.png"
                    : "https://image.flaticon.com/icons/png/128/809/809052.png"
                }
                alt="Bee"
                className={bee.user.img_url ? "img-circle" : "default"}
              />
            </Link>
            <br />
            {isQueen ? (
              <button onClick={(e) => handleRemoveBee(e, bee.id)}>
                Remove
              </button>
            ) : null}
          </>
        )}
      </div>
    );
  });

  const editHive = () => {
    if (edit) {
      return (
        <form onSubmit={handleEditName}>
          <input
            onChange={(e) => setHiveName(e.target.value)}
            type="text"
            name="hiveName"
            value={hiveName}
            placeholder={bees.length > 0 ? bees[0].hive.name : null}
          />
          <button type="submit">Save</button>
        </form>
      );
    } else {
      return <header>{bees.length > 0 ? bees[0].hive.name : null}</header>;
    }
  };

  const addNewBee = (e) => {
    e.preventDefault();

    fetch(`/bees/${hiveId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ username: newBee }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.errors) {
          setEditErrors([]);
          setRemoveErrors([]);
          setAddErrors([]);
          getBees();
        } else {
          setAddErrors(json.errors);
        }
      });
  };

  return (
    <div>
      {editHive()}
      <br />
      {editErrors.map((editError) => (
        <p className="error-message" key={editError}>
          {editError}
        </p>
      ))}
      {isQueen && !edit ? (
        <button onClick={() => setEdit(!edit)}>Edit</button>
      ) : null}
      {removeErrors.map((removeError) => (
        <p className="error-message" key={removeError}>
          {removeError}
        </p>
      ))}
      {beesArray}
      <br />
      <form onSubmit={addNewBee}>
        <input
          value={newBee}
          onChange={(e) => setNewBee(e.target.value)}
          name="newBee"
          type="text"
          placeholder="Enter username ..."
        />
        <button id="add-bee">Add bee</button>
      </form>
      {addErrors.map((addError) => (
        <p className="error-message" key={addError}>
          {addError}
        </p>
      ))}
      <br />
    </div>
  );
};

export default HivePage;
