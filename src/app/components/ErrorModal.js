export default function ErrorModal({ message, onClose }) {
  return (
    // Modal overlay with semi-transparent black background
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        {/* Display the error message with red text for visibility */}
        <p className="text-red-600">{message}</p>

        {/* Button to close the modal by triggering the onClose function */}
        <button
          onClick={onClose}
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

/**
Assumptions

1.message: The message prop is expected to be a string containing the error message to be displayed in the modal.
2.onClose: The onClose prop is a function that will be executed when the "Close" button is clicked to close the modal.

 */
