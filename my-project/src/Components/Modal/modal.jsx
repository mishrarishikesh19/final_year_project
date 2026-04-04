// import React from 'react';
// import ClearIcon from '@mui/icons-material/Clear';

// const Modal = ({ HandleClose, content, header }) => {
//   return (
//     <div className="w-full h-[100vh] fixed bg-black bg-opacity-50 text-black top-0 left-0 flex justify-center">
//       <div className="w-1/2 bg-white rounded-lg h-fit mt-32 p-5">
//         <div className="flex justify-between">
//           <div className="text-4xl font-semibold">{header}</div>
//           <div onClick={HandleClose}>
//             <ClearIcon sx={{ fontSize:"32px"}} /></div>
//           </div>
//         <div className="mt-10">
//           {content}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from "react";
import ClearIcon from "@mui/icons-material/Clear";

const Modal = ({ handleClose, content, header }) => {
  return (
    <div
      className="w-full h-[100vh] fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleClose} // 👈 outside click se bhi close hoga
    >
      {/* Stop click inside modal */}
      <div
        className="w-1/2 bg-white rounded-lg p-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-semibold">{header}</div>

          {/* ❌ Close Button */}
          <div
            onClick={handleClose}
            className="cursor-pointer hover:text-red-500"
          >
            <ClearIcon sx={{ fontSize: "32px" }} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-5">{content}</div>
      </div>
    </div>
  );
};

export default Modal;