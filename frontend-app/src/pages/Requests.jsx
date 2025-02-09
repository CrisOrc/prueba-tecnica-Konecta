import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequests,
  createRequest,
  deleteRequest,
} from "../services/requesrService.js";
import {
  setRequests,
  addRequest,
  deleteRequest as deleteState,
} from "../store/requestSlice.js";
import RequestForm from "../components/RequestForm.jsx";
import decodeJWT from "../adapters/decodeJWT.js";
import { useError } from "../context/ErrorContext.jsx";

/**
 * Requests component that displays a list of requests and handles creating and deleting requests.
 *
 * @returns {JSX.Element} The rendered Requests component.
 */
export default function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests.requests);
  const token = useSelector((state) => state.auth.token);
  const decodedToken = decodeJWT(token);
  const role = decodedToken?.role;
  const [showForm, setShowForm] = useState(false);
  const { handleError } = useError();

  /**
   * Fetches the list of requests from the API and dispatches the setRequests action.
   */
  useEffect(() => {
    async function fetchRequests() {
      try {
        const data = await getRequests(token, handleError);
        dispatch(setRequests(data.requests));
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchRequests();
  }, [dispatch, token, handleError]);

  /**
   * Handles the creation of a new request by calling the createRequest API and dispatching the addRequest action.
   *
   * @param {Object} requestData - The data of the request to create.
   */
  const handleCreateRequest = async (requestData) => {
    try {
      const newRequest = await createRequest(requestData, token, handleError);
      dispatch(addRequest(newRequest));
      setShowForm(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  /**
   * Handles the deletion of a request by calling the deleteRequest API and dispatching the deleteState action.
   *
   * @param {number} id - The ID of the request to delete.
   */
  const handleDeleteRequest = async (id) => {
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar esta solicitud?")
    )
      return;

    try {
      await deleteRequest(id, token, handleError);
      dispatch(deleteState(id));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Solicitudes</h1>

      {(role === "EMPLOYEE" || role === "ADMIN") && (
        <button
          onClick={() => setShowForm(true)}
          className="mb-4 bg-green-500 text-white p-2 rounded"
        >
          Crear Nueva Solicitud
        </button>
      )}

      {showForm && <RequestForm onSubmit={handleCreateRequest} />}

      <ul className="mt-4">
        {requests.map((req) => (
          <li key={req.id} className="p-2 border-b flex justify-between">
            <span>
              {req.code} - {req.description} - {req.summary} -{" "}
              {req.employee?.name || req.admin?.name}
            </span>

            {role === "ADMIN" && (
              <button
                onClick={() => handleDeleteRequest(req.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
