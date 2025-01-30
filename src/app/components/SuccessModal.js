export default function SuccessModal({ message, onClose }) {
  return (
    // Modal overlay to display the modal on top of the page
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p>{message}</p>

        {/* Button to trigger onClose function and close the modal */}
        <button
          onClick={onClose}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
}
/*
Assumptions

1.message: The message prop is expected to be a string that will be displayed in the modal.
2.onClose: The onClose prop is a function used to close the modal when the "OK" button is clicked.

*/
