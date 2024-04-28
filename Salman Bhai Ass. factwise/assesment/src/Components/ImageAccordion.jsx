import  { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Button, Form } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

const GetCelebs = () => {
  const [jsonData, setJsonData] = useState([]);
  const [editModeId, setEditModeId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [saveDisabled, setSaveDisabled] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/celebrities");
      setJsonData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleAccordion = (id) => {
    if (editModeId !== null) return;
    setEditModeId(id === editModeId ? null : id);
  };

  const handleEdit = (id) => {
    if (editModeId !== null) return;
    setEditModeId(id);
    const userToEdit = jsonData.find((user) => user.id === id);
    setEditedData(userToEdit);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
    setSaveDisabled(false);
  };

  const handleSave = () => {
    // Update the user's details
    const updatedData = jsonData.map((user) =>
      user.id === editedData.id ? editedData : user
    );
    setJsonData(updatedData);
    setEditModeId(null);
    setSaveDisabled(true);
  };

  const handleCancel = () => {
    // Cancel editing
    setEditModeId(null);
    setEditedData({});
    setSaveDisabled(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // Delete the user
      const updatedData = jsonData.filter((user) => user.id !== id);
      setJsonData(updatedData);
      setEditModeId(null);
    }
  };

  return (
    <div>
      {jsonData.map((user) => (
        <div key={user.id}>
          <Accordion activeKey={editModeId === user.id ? user.id.toString() : null}>
            <Accordion.Item eventKey={user.id.toString()}>
              <Accordion.Header onClick={() => toggleAccordion(user.id)}>
                <div>
                  <img
                    src={user.picture}
                    alt="Accordion Image"
                    style={{ marginRight: "10px", width: "50px", height: "50px" }}
                  />
                </div>
                {`${user.first} ${user.last}`} - {user.gender}, {user.age} years old
                {editModeId === user.id ? "-" : "+"}
              </Accordion.Header>
              <Accordion.Body>
                {editModeId === user.id ? (
                  <Form>
                    <Form.Group controlId="formBasicFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="first"
                        value={editedData.first || ""}
                        onChange={handleChange}
                        disabled={user.age < 18}
                        required
                      />
                    </Form.Group>
                    {/* Add more Form.Group elements for other fields */}
                    <Button variant="primary" onClick={handleSave} disabled={saveDisabled}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Form>
                ) : (
                  <>
                    <p>Description: {user.description}</p>
                    <div>
                      <BsTrash onClick={() => handleDelete(user.id)} />
                      <BsPencil onClick={() => handleEdit(user.id)} />
                    </div>
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
      <MdOutlineCancel color="red" />
    </div>
  );
};

export default GetCelebs;
