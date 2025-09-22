import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";

const Pc = () => {

    const navigate = useNavigate();
    const { pcs , deletePc , showLabName} = useContext(PcContext);
    const { labs } = useContext(LabContext);

    console.log(labs,pcs);



    return (
        <div className="bg-gray-800">
            <div className="container mx-auto h-screen">
                <div className="flex align-center justify-between px-10 py-10">
                    <h1 className="text-white text-3xl fw-semibold">Add Pcs</h1>
                    <button onClick={() => navigate("/add-pc")} className="border text-white rounded px-3">Add Pc +</button>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    PC Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Lab Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Assigned Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Active
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pcs.map((pc, idx) => {
                                    return <tr key={pc.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {idx + 1}
                                        </th>
                                        <td className="px-6 py-4">
                                            {pc.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {showLabName(pc.labId)}
                                        </td>
                                        <td className="px-6 py-4 capitalize">
                                            {
                                                pc.status === "1" ? "Assigned" : pc.status === "2" ? "Occupied" : pc.status === "3" ? "Maintenance" : "Unknown"
                                            }
                                        </td>
                                        <td className="px-6 py-4">
                                            {pc.createdAt.toDate().toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-3">
                                            <button onClick={() => navigate(`/edit-pc/${pc.id}`)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Edit</button>
                                            <button onClick={() => {deletePc(pc.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Pc