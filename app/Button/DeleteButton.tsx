"use client";
import React from "react";
import { Button } from "@mantine/core";


interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) =>{
  return (
    <Button
    onClick={onClick}
      style={{ backgroundColor: "white" }}
      variant="outline"
      color="blue"
    >
       {/* <IconTrash  /> */}
      Delete
    </Button>
  );
};

export default DeleteButton;