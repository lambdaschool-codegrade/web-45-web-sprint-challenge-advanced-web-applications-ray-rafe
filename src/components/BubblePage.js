import React, { useEffect, useState } from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from "../services/fetchColorService";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService()
      .then((res) => {
        setColors(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
      .then((res) => {
        const newColors = colors.map((color) => {
          if (color.id === editColor.id) {
            return editColor;
          } else {
            return color;
          }
        });
        setColors(newColors);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
      .then((res) => {
        const newColors = colors.filter(
          (color) => color.id !== JSON.parse(res.data)
        );
        setColors(newColors);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div className="container">
      <ColorList
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;
//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
