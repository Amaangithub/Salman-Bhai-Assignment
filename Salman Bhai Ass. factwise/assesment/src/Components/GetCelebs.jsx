// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Accordion } from "react-bootstrap";
// import { BsPencil } from "react-icons/bs";
// import { BsTrash3 } from "react-icons/bs";
// import { MdOutlineCancel } from "react-icons/md";
// import { TbSquareRoundedCheck } from "react-icons/tb";

// const GetCelebs = () => {
//   const [jsonData, setJsonData] = useState([]);

//   const fetchData = async () => {
//     await axios
//       .get(`http://localhost:3000/celebrities`)
//       .then((data) => setJsonData(data.data));
//   };
//   const deleteData = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/celebrities/${id}`);
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {jsonData.map((item) => {
//         return (
//           <div key={item.id}>
//             <Accordion>
//               <Accordion.Item eventKey={item.id}>
//                 <Accordion.Header>
//                   <div>
//                     <img
//                       src={item.picture}
//                       alt="Accordion Image"
//                       style={{
//                         marginRight: "10px",
//                         width: "50px",
//                         height: "50px",
//                       }}
//                     />
//                   </div>
//                   {`${item.first} ${item.last}`}
//                 </Accordion.Header>
//                 <Accordion.Body>
//                   {item.description}
//                   <div>
//                     <BsTrash3 color="red" onClick={() => deleteData(item.id)} />
//                     <BsPencil color="blue" />
//                   </div>
//                 </Accordion.Body>
//               </Accordion.Item>
//             </Accordion>
//           </div>
//         );
//       })}
//       <MdOutlineCancel color="red" />
//       <TbSquareRoundedCheck color="green" />
//     </div>
//   );
// };

import { useEffect, useState } from "react";
import axios from "axios";
import { Accordion, Col, Image, Table, Modal, Button } from "react-bootstrap";
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

  return (
    <div>
      {jsonData.map((celebrity) => (
        <div key={celebrity.id}>
          <Accordion>
            <Accordion.Item eventKey={celebrity.id}>
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
              <Accordion.Body>
                <Table>
                  <thead style={{color:"grey"}}>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Country</th>
                  </thead>
                  <tbody>
                    <td>{calculateAge(celebrity.dob)}</td>
                    <td>{celebrity.gender}</td>
                    <td>{celebrity.country}</td>
                  </tbody>
                </Table>
                {celebrity.description}
                <div>
                  <BsTrash3
                    color="red"
                    onClick={() => deleteData(celebrity.id)}
                  />
                  <BsPencil color="blue" />
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      ))}
      <MdOutlineCancel color="red" />
      <TbSquareRoundedCheck color="green" />
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
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
