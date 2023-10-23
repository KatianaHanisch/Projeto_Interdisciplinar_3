"use client";

import {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from "react";

import Image from "next/image";

import { LivroProps } from "@/app/types/Types";

import Input from "../../../../components/Input";
import Textarea from "./components/Textarea";
import InputFile from "./components/InputFile";
import Button from "../../components/Button";
import Modal from "@/app/components/Modal";
import SnackBar from "@/app/components/SnackBar";

import book from "../../../../../../public/banner-login.jpg";

export default function Adicionar() {
  const [abrirModal, setAbrirModal] = useState(false);
  const [formularioConfirmado, setFormularioConfirmado] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [abrirSnackBar, setAbrirSnackBar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tipoSnackBar, setTipoSnackBar] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [categoriaOriginal, setCategoriaOriginal] = useState("");
  const [livroData, setLivroData] = useState<LivroProps>({
    titulo: "",
    autor: "",
    categoria: "",
    sinopse: "",
    capaUrl: "",
  });

  const removeFile = useCallback(() => {
    setFile(null);
  }, [file]);

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  function fecharSnackBar() {
    setAbrirSnackBar(false);
  }

  function abrirModalConfirmacao() {
    setAbrirModal(!abrirModal);
    setFormularioConfirmado(false);
  }

  function confirmarModal() {
    setFormularioConfirmado(true);
    setAbrirModal(false);
  }

  function fecharModal() {
    setAbrirModal(false);
  }

  function cancelarModal() {
    setAbrirModal(false);
    setLivroData({
      titulo: "",
      autor: "",
      categoria: "",
      sinopse: "",
      capaUrl: "",
    });
  }

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLivroData({
      ...livroData,
      sinopse: event.target.value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "categoria") {
      setCategoriaOriginal(value);
    }

    setLivroData({
      ...livroData,
      [name]: value,
    });
  };

  async function cadastroLivro() {
    setLoading(true);
    try {
      const response = await fetch("/api/dashboard/adicionarLivro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livroData),
      });

      if (response.status === 409) {
        setTipoSnackBar("error");
        setMensagem("Não foi possível cadastrar o livro");
        setAbrirSnackBar(true);
        setLoading(false);
        setFormularioConfirmado(false);
        return;
      }

      setTipoSnackBar("sucesso");
      setMensagem("Livro cadastrado com sucesso");
      setAbrirSnackBar(true);
      setLoading(false);

      setLivroData({
        titulo: "",
        autor: "",
        categoria: "",
        sinopse: "",
        capaUrl: "",
      });

      setFile(null);
      setFormularioConfirmado(false);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setFormularioConfirmado(false);
      setTipoSnackBar("error");
      setMensagem("Não foi possível cadastrar o livro");
      setAbrirSnackBar(true);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);
    }
  }

  async function uploadImage(file: File) {
    try {
      const image = file;
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "projeto_interdisplinar");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dtlenywzp/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      const imageUrl = data.secure_url;

      setLivroData((prevLivroData) => ({
        ...prevLivroData,
        capaUrl: imageUrl,
      }));
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      setMensagem("Erro ao fazer upload da imagem. Tente novamente");
      setTipoSnackBar("erro");
      setAbrirSnackBar(true);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);
    }
  }

  async function verificaLivro() {
    try {
      const response = await fetch(
        `/api/dashboard/livroExistente?titulo=${livroData.titulo}`
      );

      if (response.status === 200) {
        const livroExistente = await response.json();
        if (livroExistente) {
          cadastroLivro();
        }
      }

      if (response.status === 404) {
        uploadImage(file!);
      }
    } catch (error) {
      console.error("Erro ao verificar a existência do livro: ", error);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (file) {
      setLivroData({
        ...livroData,
        categoria: categoriaOriginal.toLowerCase(),
      });

      setAbrirModal(true);
    } else {
      setAbrirSnackBar(true);
      setMensagem("É necessário adicionar uma imagem");
      setTipoSnackBar("erro");
      setLoading(false);

      setTimeout(() => {
        setAbrirSnackBar(false);
      }, 3000);
      return;
    }
  }

  useEffect(() => {
    if (formularioConfirmado) {
      setLoading(true);

      verificaLivro();
    }
  }, [formularioConfirmado]);

  useEffect(() => {
    if (livroData.capaUrl !== "") {
      cadastroLivro();
    }
  }, [livroData.capaUrl]);

  return (
    <div className="bg-gray-100 h-full w-full rounded-lg shadow-md">
      <div className="flex items-center justify-center h-full p-10 ">
        <div className="flex items-center justify-start rounded-lg  h-full w-full">
          <div className="w-2/4 h-full">
            <Image
              src={book}
              className="h-full rounded-l-lg"
              alt="imagem biblioteca"
            />
          </div>
          <div className="h-full w-full p-6 flex flex-col items-center bg-gray-300">
            <form
              className="w-11/12 h-full p-5 bg-white flex items-center flex-col rounded-lg gap-3 shadow-md"
              onSubmit={onSubmit}
            >
              <h1 className="text-3xl font-semibold mb-4 text-gray-700">
                Adicionar livro
              </h1>
              <Input
                type="text"
                title="Título do livro"
                name="titulo"
                value={livroData.titulo}
                onChange={handleChange}
              />
              <Input
                type="text"
                title="Autor do livro"
                name="autor"
                value={livroData.autor}
                onChange={handleChange}
              />
              <Input
                type="text"
                title="Categoria do livro"
                name="categoria"
                value={livroData.categoria}
                onChange={handleChange}
              />
              <Textarea
                value={livroData.sinopse!}
                name="sinopse"
                onChange={handleTextareaChange}
              />
              <InputFile file={file!} onDrop={onDrop} removeFile={removeFile} />
              <div className="w-full py-1 flex items-center justify-end">
                <Button
                  typeButton="submit"
                  tituloButton="Adicionar livro"
                  carregando={loading}
                />
              </div>
            </form>
          </div>
        </div>

        {abrirSnackBar && (
          <SnackBar
            mensagem={mensagem}
            fecharSnackBar={fecharSnackBar}
            tipo={tipoSnackBar}
          />
        )}

        {abrirModal && (
          <Modal
            title="Deseja confirmar?"
            textButton="Adicionar"
            confirmarModal={confirmarModal}
            cancelarModal={cancelarModal}
            fecharModal={fecharModal}
          >
            <div className="relative p-6 flex-auto">
              <p className="text-gray-600 text-lg font-normal leading-relaxed">
                Você realmente deseja adicionar o livro
                <span className="font-medium text-gray-700">
                  {" "}
                  {livroData.titulo}{" "}
                </span>
                na biblioteca?
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
