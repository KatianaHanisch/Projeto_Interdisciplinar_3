"use client";

import { useCallback, useState } from "react";
import { DropzoneState, useDropzone } from "react-dropzone";

import { LuUpload } from "react-icons/lu";
import { AiFillFileImage } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

interface InputProps {
  dropzone: DropzoneState;
}

interface HasFileProps {
  file?: File;
  removeFile: () => void;
}

export const FileInput = () => {
  const [file, setFile] = useState<File | null>(null);

  const removeFile = useCallback(() => {
    setFile(null);
  }, [file]);

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/png": [".jpg", ".png", ".jpeg"],
    },
  });

  if (file) return <HasFile file={file} removeFile={removeFile} />;

  return <Input dropzone={dropzone} />;
};

const Input = ({ dropzone }: InputProps) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div
      {...getRootProps()}
      className={`w-full h-1/6 rounded-lg border-dashed border-2 hover:border-gray-500 bg-gray-200 hover:bg-gray-300 transition-all
      ${isDragActive ? "border-blue-800" : "border-gray-400"}`}
    >
      <label htmlFor="dropzone-file" className="cursor-pointer w-full h-full">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full h-full">
          <LuUpload
            className={`w-8 h-8 mb-3 ${
              isDragActive ? "text-blue-600" : "text-gray-500"
            }`}
          />
          {isDragActive ? (
            <p className="font-bold text-lg text-blue-600">
              Solte para adicionar
            </p>
          ) : (
            <>
              <p className="text-gray-500 font-bold text-lg">Capa do livro</p>
              <p className="mb-2 text-lg text-gray-500">
                <span>Clique para enviar</span> ou arraste até aqui
              </p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

const HasFile = ({ file, removeFile }: HasFileProps) => {
  return (
    <div className="w-full h-full rounded-lg border-dashed p-2 border-2 border-gray-500 bg-gray-200 flex justify-center items-center">
      <div className="bg-gray-100  w-3/5 rounded-md shadow-md flex gap-3 items-center justify-between">
        <div className="flex items-center justify-center">
          <AiFillFileImage className="ml-3 mr-1" size={30} color="#2d333f" />
          <span className="text-sm text-gray-500 my-4">{file?.name}</span>
        </div>
        <button
          type="button"
          onClick={removeFile}
          className="place-self-center mr-1 p-1"
        >
          <GrClose size={21} color="#2d333f" />
        </button>
      </div>
    </div>
  );
};

export default FileInput;
