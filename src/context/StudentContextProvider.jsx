import { addDoc, collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useState } from "react"
import { db } from "../config/firebase";
import { PcContext } from "./PcContextProvider";

export const StudentContext = createContext();
const StudentContextProvider = ({ children }) => {

  const [students, setStudents] = useState([]);
  const collectionRefer = (collection(db, "students"))

  const { pcs, fetchPc } = useContext(PcContext)

  const addStudent = async (student) => {
    try {
      const stuDateObj = { ...student, createdAt: new Date() }
      await addDoc(collectionRefer, stuDateObj);
      fetchStudent();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const fetchStudent = async () => {
    try {
      const { docs } = await getDocs(collectionRefer);
      const allStudent = docs.map((student) => {
        return {
          studentId: student.id,
          ...student.data()
        }
      })
      setStudents(allStudent);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const showPcName = (pcId) => {
    const pcName = pcs.find((pc) => pcId === pc.pcId);
    return pcName?.name ? pcName.name : "Not Assigned";
  };

  const value = {
    students, addStudent, fetchStudent, showPcName
  }
  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  )
}

export default StudentContextProvider