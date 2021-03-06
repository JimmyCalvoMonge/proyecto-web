import React, { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import { themes } from "../../styles/ColorStyles";
import { Caption, H1 } from "../../styles/TextStyles";

const Admin = () => {

  let history = useHistory();
  let location = useLocation();
  const { t } = useTranslation();
  const { addNotification, removeLastNotification } = useApp();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [link, setLink] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  // Redirigir al usuario a dashboards una vez que sube su nuevo proyecto.
  let { from } = (location.state as any) || { from: { pathname: "/dashboard" } };

  async function doAdmin(event: FormEvent<HTMLFormElement>) {
    dismissError();
    event.preventDefault();
    if (!readyToSubmit()) {
      setErrorMsg(t("admin.err_invalid_form"));
      return;
    }

    try {
      addNotification(t("loader.text"));
      await save_new_project();
      history.replace(from);
    } catch (e) {
      setErrorMsg(t("admin.err_invalid_form"));
    } finally {
      removeLastNotification();
    }
  }

  function onChangeAnyInput() {
    setErrorMsg("");
  }

  function onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    onChangeAnyInput();
  }

  function onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    onChangeAnyInput();
  }

  function onChangeTags(e: ChangeEvent<HTMLInputElement>) {
    setTags(e.target.value);
    onChangeAnyInput();
  }

  function onChangeLink(e: ChangeEvent<HTMLInputElement>) {
    setLink(e.target.value);
    onChangeAnyInput();
  }

  function readyToSubmit(): boolean {
    // Revisar si no hay inputs vacíos.
    return title !== "" && description !== "" && tags !== "" && link !=="";
  }

  function dismissError() {
    setErrorMsg("");
  }

  function save_new_project(){
    // Por el momento estoy guardando los nuevos datos en localStorage
    //No es eficiente, pero luego podremos ver las opciones de Backend para guardar los nuevos proyectos
    // de una mejor manera. // Puede ser con un useContext también, pero como Admin y Dashboard no son parent-child
    // se me hizo un poco más complicado.

    localStorage.setItem('title',title);
    localStorage.setItem('description',description);
    localStorage.setItem('tags',tags);
    localStorage.setItem('link',link);
    
  }

  return (
    
      <Wrapper>
      <ContentWrapper>
        <TitleForm>{t("admin.header")}</TitleForm>
        <AdminPannel onSubmit={doAdmin}>
          { errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription>}
          <AdminForm name="title" type="string" placeholder={t("admin.input_title")} value={title} onChange={onChangeTitle}/>
          <AdminForm name="description" type="string" placeholder={t("admin.input_description")} value={description} onChange={onChangeDescription}/>
          <AdminForm name="tags" type="string" placeholder={t("admin.input_tags")} value={tags} onChange={onChangeTags}/>
          <AdminForm name="version" type="string" placeholder={t("admin.input_link")} value={link} onChange={onChangeLink}/>
          <ButtonFormSubmit type="submit" value={t("admin.button_accept") != null ? t("admin.button_accept") as string : "Post"}  />
          <ButtonFormDelete type="submit" value={t("admin.button_delete") != null ? t("admin.button_delete") as string : "Delete"}  />
        </AdminPannel>
      </ContentWrapper>
    </Wrapper>
    
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }

  @media (max-width: 500px) {
    justify-content: stretch;
    justify-items: stretch;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`

const AdminPannel = styled.form`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
    padding: 20px;
  }


`;

const ErrorDescription = styled(Caption)`

  color: ${themes.light.warning};


`;

const AdminForm = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }

`;

const ButtonForm = styled.input`
  height: 36px;
  border-radius: 4px;
  border: none;
  width:25%;
  margin-left:75%;
  
`;

const ButtonFormSubmit = styled(ButtonForm)`
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;

const ButtonFormDelete = styled(ButtonForm)`
  background-color: #E83D1B;
  color: ${themes.dark.text1};
`

export default Admin;

