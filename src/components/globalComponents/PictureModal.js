import React from "react";
import style from "./global.module.css";
import Title from "./Title";
import CloseIcon from "@material-ui/icons/Close";

const PosterRow = props => {
  return (
    <div className={style["poster-row"]}>
      {props.posters.map(p => (
        <img
          src={`https://image.tmdb.org/t/p/w185/${p.file_path}`}
          alt="poster image"
          onClick={() => {
            props.openNewWindow(p.file_path);
          }}
        />
      ))}
    </div>
  );
};

const BackdropRow = props => {
  return (
    <div className={style["backdrop-row"]}>
      {props.backdrops.map(b => (
        <img
          src={`https://image.tmdb.org/t/p/w300/${b.file_path}`}
          onClick={() => {
            props.openNewWindow(b.file_path);
          }}
        />
      ))}
    </div>
  );
};

const ModalBackground = React.forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        width: "100%",
        height: "110vh",
        top: "0px",
        background: "rgba(0, 0, 0, 0.6)",
        zIndex: 20,
        visibility: "hidden"
      }}
      onClick={props.closeModal}
    ></div>
  );
});

const PictureModal = React.forwardRef((props, ref) => {
  //   const modalBackground = React.createRef();
  //   const pictureModal = React.createRef();

  const openNewWindow = imgPath => {
    window.open(window.origin + "/image" + imgPath, "_blank");
  };

  const closeModal = () => {
    ref.firstRef.current.style.opacity = "0";
    ref.firstRef.current.style.visibility = "hidden";
    ref.firstRef.current.style.transition = "all 200ms ease-in";

    ref.secondRef.current.style.opacity = "0";
    ref.secondRef.current.style.visibility = "hidden";
    ref.secondRef.current.style.transition = "all 200ms ease-in";
  };

  const { posters, backdrops } = props;

  return (
    <>
      <ModalBackground
        ref={ref.firstRef}
        closeModal={closeModal}
        closeModal={closeModal}
      />
      <div
        ref={ref.secondRef}
        className={style["pictures-modal"]}
        style={{ zIndex: "21" }}
      >
        <CloseIcon className={style.closeIcon} onClick={closeModal} />
        <Title titleName="Posters" className={style.title} />
        {posters && (
          <PosterRow posters={posters} openNewWindow={openNewWindow} />
        )}
        <Title titleName="Backdrops" />
        <BackdropRow backdrops={backdrops} openNewWindow={openNewWindow} />
      </div>
    </>
  );
});

export default PictureModal;
