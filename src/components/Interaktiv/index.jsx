import React from "react";

const Interaktiv = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-5 p-3">
        Interaktiv xizmatlar
      </h2>
      <div>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          E-kutubxona
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Link</h3>
            <form className="flex justify-between">
              <input
                type="text"
                placeholder="https://kspi.uz"
                className="input input-bordered w-full max-w-xs"
              />
              <button className="btn" type="submit">Saqlash</button>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default Interaktiv;
