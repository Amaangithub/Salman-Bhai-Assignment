"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Text, Group, Avatar, Anchor, Button } from "@mantine/core";
import { IconTrash, IconUserPlus, IconUserMinus } from "@tabler/icons-react";
import {
  IconAt,
  IconPhoneCall,
  IconWorld,
  IconStar,
} from "@tabler/icons-react";
import classes from "./CardWithStats.module.css";

interface UserData {
  id: number;
  name: string | React.ReactElement;
  email: string;
  phone: string;
  website: string;
  isFollowed: boolean;
}

const CardSection: React.FC<{ user: UserData }> = ({ user }) => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        size="xl"
        radius="50%"
        src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
      />
    </div>
  );
};

const UserDetails: React.FC<{
  label: string;
  icon: React.ReactNode;
  value: string;
}> = ({ label, icon, value }) => {
  const getLinkType = (label: string, value: string): string => {
    switch (label.toLowerCase()) {
      case "email:":
        return `mailto:${value}`;
      case "phone:":
        return `tel:${value}`;
      case "website:":
        return value.startsWith("http") ? value : `http://${value}`;
      default:
        return "";
    }
  };
  return (
    <Anchor
      href={getLinkType(label, value)}
      target="_blank"
      underline="hover"
      fz="sm"
      lh="xs"
      style={{ color: "gray", margin: "5px" }}
    >
      {icon}
      <span style={{ marginLeft: "5px" }}>{value}</span>
    </Anchor>
  );
};

const HomePage = () => {
  const [names, setNames] = useState<UserData[]>([]);
  const [starIcon, setStarIcon] = useState(<IconStar size={15} />);

  const fetchData = async () => {
    try {
      const response = await axios.get<UserData[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      setNames(response.data.map((user) => ({ ...user, isFollowed: false })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFollow = (id: number) => {
    setNames((prevNames) =>
      prevNames.map((user) =>
        user.id === id
          ? {
              ...user,
              name: user.isFollowed
                ? user.name.toString().replace("<IconStar/>", "") 
                : user.name,
              isFollowed: !user.isFollowed, 
            }
          : user
      )
    );
  };
  

  const deleteCard = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setNames((prevNames) => prevNames.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.cardContainer}>
      {names.map((user) => (
        <Card
          key={user.id}
          withBorder
          shadow="md"
          className={`${classes.card} ${classes.customCardSize}`}
        >
          <CardSection user={user} />

          <Group
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text size="md" ta="center" fw={500}>
              {user.isFollowed ? (
                <>
                  {user.name} {starIcon}
                </>
              ) : (
                user.name
              )}
            </Text>
          </Group>

          <UserDetails
            label="Email:"
            icon={<IconAt stroke={1.5} size={15} />}
            value={user.email}
          />
          <UserDetails
            label="Phone:"
            icon={<IconPhoneCall stroke={1.5} size={15} />}
            value={user.phone}
          />
          <UserDetails
            label="Website:"
            icon={<IconWorld stroke={1.5} size={15} />}
            value={user.website}
          />

          <div
            className="button-container"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <Group grow wrap="nowrap">
              <Button
                variant={user.isFollowed ? "default" : "primary"}
                size="xs"
                radius="sm"
                onClick={() => handleFollow(user.id)}
              >
                {user.isFollowed ? (
                  <IconUserMinus size={30} />
                ) : (
                  <IconUserPlus size={15} />
                )}
                <Text style={{ marginLeft: "5px" }}>
                  {user.isFollowed ? "Unfollow" : "Follow"}
                </Text>
              </Button>

              <Button
                variant="outline"
                size="xs"
                radius="sm"
                onClick={() => deleteCard(user.id)}
              >
                <IconTrash size={15} style={{ marginRight: "5px" }} />
                <Text>Delete</Text>
              </Button>
            </Group>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HomePage;
