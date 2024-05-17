import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, List } from "flowbite-react";
import Navbar from "./komponen/navbar";
import { getAyah, getQuran } from "./redux/action/dataAction";
import { useDispatch, useSelector } from "react-redux";
import { setSurahId, setNomor } from "./redux/reducer/dataReducer";

export default function Quran() {
  const navigate = useNavigate();
  const surah = useSelector((state) => state.data.surah);
  const editAyah = useSelector((state) => state.data.editAyah);
  const cekstate = useSelector((state) => state);
  console.log("cek state", cekstate);
  const number = useSelector((state) => state.data.nomor);

  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [mood, setMood] = useState(null);

  useEffect(() => {
    dispatch(getQuran());
  }, [dispatch]);

  useEffect(() => {
    console.log("cek nomor pas dispatch:", number);
    dispatch(getAyah());
  }, [dispatch, number]);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    if (selectedMood === "sedih") {
      dispatch(setNomor("1735"));
    } else {
      console.log("cek nomor", number);
      dispatch(setNomor("1757"));
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setMood(null);
  };

  return (
    <div className="bg-[#0C121F]">
      <Navbar />

      {/* Modal */}
      <Modal show={showModal} onClose={closeModal}>
        <Modal.Header>Pilih Keadaan Anda</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col items-center">
            {mood ? (
              <div className="text-2xl  text-center">
                <div className="text-xl mt-3">
                  Allah berfirman dalam surat {editAyah?.surah?.englishName}{" "}
                  {editAyah?.numberInSurah}
                </div>
                <div className="text-2xl font-bold text-center mt-3">
                  {editAyah?.text}
                </div>
                {mood === "sedih" ? (
                  <>
                    <div className="text-center text-sm mt-3">
                      Rasa sedih, kecewa, terluka, kesepian, tersesat, dan
                      segala jenis emosi negatif lainnya tuh wajar dirasakan &
                      pasti akan dihadapi semua manusia tauu :) . Tapi kalo kamu
                      menyerahkan segala niat & harapan hanya kepada Allah,
                      nanti hati kamu pasti akan berangsur-angsur memperoleh
                      kedamaian & ketenangan :)
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center text-sm mt-3">
                      ingeet yaaa jangan lupa untuk bersyukur atas kesenangan
                      yang kamu peroleh hari iniii :) . nah kalo kamu bersyukur
                      pasti allah akan menambahkan nikmat yang lebih buat kamuuu
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-700">
                  assalamualaikum ya ahli firdaus, gimana kamu hari ini?
                </p>
                <div className="flex gap-4">
                  <Button
                    color="gray"
                    onClick={() => handleMoodSelect("sedih")}
                  >
                    Sedih
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => handleMoodSelect("senang")}
                  >
                    Senang
                  </Button>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        {mood && (
          <Modal.Footer>
            <Button onClick={closeModal}>Tutup</Button>
          </Modal.Footer>
        )}
      </Modal>

      <div className="top-0 w-full flex justify-center text-gray-200">
        <img
          src="images/bg.png"
          className="w-full h-[600px] object-cover"
          alt="Background"
        />
        <div className="absolute left-0 w-full h-[600px] bg-gray-800/50 flex items-end justify-center">
          <div className="text-center px-24">
            <h1 className="text-white text-3xl font-semibold mb-8">
              BISMILLAH kuy BACA ALQURAN rekam posting
            </h1>
            <form className="mx-auto w-full">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-[100%] h-12 p-4 ps-10 text-sm text-gray-200 border border-gray-500 rounded-lg bg-gray-800 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari surat Al-quran"
                  value={search}
                  onChange={(e) => setSearch(e?.target?.value)}
                />
              </div>
            </form>

            <List className="overflow-y-auto h-36 text-gray-300">
              {search.trim() !== "" &&
                surah
                  ?.filter((e) =>
                    e.englishName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((e) => (
                    <div
                      className="py-2 px-2 bg-gray-800 border-gray-600 hover:bg-gray-600 flex justify-between items-center"
                      key={e?.number}
                      onClick={() => {
                        navigate("quran-details", {
                          state: { number: e?.number },
                        });
                        dispatch(setSurahId(e?.number));
                      }}
                    >
                      <div className="flex items-center gap-4 bg">
                        <div className="text-xl w-5 text-center font-semibold">
                          {e?.number}
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="font-semibold">{e?.englishName}</div>
                          <div className="text-sm text-gray-400">
                            {e?.revelationType} . {e?.numberOfAyahs} ayat
                          </div>
                        </div>
                      </div>
                      <div className="">{e?.name}</div>
                    </div>
                  ))}
            </List>
          </div>
        </div>
      </div>

      <div className="mx-96 mb-20 text-gray-200">
        <div className="">
          <div className="grid grid-cols-3 gap-4 mt-10">
            {surah.map((e) => (
              <div
                className="border-2 border-gray-600 rounded-xl py-2 px-2 flex justify-between items-center bg-gray-800 hover:bg-gray-600"
                key={e?.number}
                onClick={() => {
                  navigate("quran-details", { state: { number: e?.number } });
                  dispatch(setSurahId(e?.number));
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-xl w-5 text-center font-semibold">
                    {e?.number}
                  </div>
                  <div>
                    <div className="font-semibold">{e?.englishName}</div>
                    <div className="text-sm text-gray-400">
                      {e?.revelationType} . {e?.numberOfAyahs} ayat
                    </div>
                  </div>
                </div>
                <div className="">{e?.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
