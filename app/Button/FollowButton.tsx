"use client";
import React, { useState } from "react";
import { Button } from "@mantine/core";
import { IconUserMinus, IconUserPlus, IconStar } from "@tabler/icons-react";

interface FollowButtonProps {
  onClick: () => void;

}

const FollowButton: React.FC<FollowButtonProps> = ({ onClick, }) => {
  const [isFollowed, setIsFollowed] = useState(true);

  const handleClick = () => {
    setIsFollowed(!isFollowed);

    onClick ();
  };

  return (
    <Button onClick={handleClick}>
      {isFollowed ? <IconUserPlus /> : <IconUserMinus />}

      {isFollowed ? "Follow" : "UnFollow"}
      

    </Button>
  );
};

export default FollowButton;
