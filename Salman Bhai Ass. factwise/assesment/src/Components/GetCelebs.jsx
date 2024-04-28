import { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  Col,
  Image,
  Table,
  Modal,
  Button,
  Card,
} from "react-bootstrap";
import { BsPencil, BsTrash3 } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { TbSquareRoundedCheck } from "react-icons/tb";

const GetCelebs = () => {
  const [jsonData, setJsonData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteData(deleteId);
      setShowDeleteModal(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/celebrities");
      setJsonData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = (id) => {
    try {
      setJsonData(jsonData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculating Age
  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const currentDate = new Date();
    const ageDate = new Date(currentDate - dob);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
  };

  // Returning the JSX
  return (
    <div>
      {/* Mapping Data */}
      {jsonData.map((celebrity) => (
        <div key={celebrity.id} style={{ marginBottom: "20px" }}>
          {/* Accordion Started */}
          <Accordion >
            {/* Accordion for Name, Image */}
            <Accordion.Item eventKey={celebrity.id}>
              <Card style={{ width: "400px"}}>
                <Accordion.Header>
                  <div>
                    <Col>
                      <Image
                        src={celebrity.picture}
                        roundedCircle
                        style={{ width: "50px", height: "50px" }}
                      />
                    </Col>
                  </div>
                  {`${celebrity.first} ${celebrity.last}`}
                </Accordion.Header>

                {/* Accordion for Age, Gender, Country & Description */}
                <Accordion.Body>
                  <Table>
                    <thead style={{ color: "grey" }}>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Country</th>
                    </thead>
                    <tbody>
                      <td>{calculateAge(celebrity.dob)}</td>
                      <td>{celebrity.gender.charAt(0).toUpperCase() + celebrity.gender.slice(1)}</td>
                      <td>{celebrity.country}</td>
                    </tbody>
                  </Table>
                  <Card.Text style={{ textAlign: "left" }}>
                    {celebrity.description}
                  </Card.Text>{" "}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <BsTrash3
                      color="red"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setDeleteId(celebrity.id);
                      }}
                    />
                
                      {" "}
                      <BsPencil color="blue" style={{ marginLeft: "30px" }}/>
                   
                  </div>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
      <MdOutlineCancel color="red" />
      <TbSquareRoundedCheck color="green" />

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
       
        <Modal.Header closeButton className="no-border">Are you sure you want to delete ?</Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GetCelebs;
