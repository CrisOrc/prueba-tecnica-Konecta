import { useState } from "react";
import PropTypes from "prop-types";

/**
 * RequestForm component for submitting a request with description and summary.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSubmit - Function to call when the form is submitted.
 * @returns {JSX.Element} The rendered RequestForm component.
 */
export default function RequestForm({ onSubmit }) {
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");

  /**
   * Handles the form submission.
   *
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ description, summary });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
    >
      <label className="block text-gray-700">Descripción</label>
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block text-gray-700">Resumen</label>
      <input
        type="text"
        placeholder="Resumen (opcional)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Enviar Solicitud
      </button>
    </form>
  );
}

// prop-types validation
RequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
