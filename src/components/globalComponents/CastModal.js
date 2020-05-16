import React from "react";
import style from "./global.module.css";
import Title from "./Title";
import CloseIcon from "@material-ui/icons/Close";

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

const Cast = props => {
  return (
    <div
      className={style.cast}
      onClick={() => {
        props.onClickPerson(props.castID);
      }}
    >
      {props.image !== null ? (
        <img src={`https://image.tmdb.org/t/p/w185/${props.image}`} alt="" />
      ) : (
        <img
          className={style["empty-image"]}
          src={require("../../../src/assets/person.png")}
          alt="empty person image"
        />
      )}

      <div className={style["cast-description"]}>
        <span className={style["cast-name"]}>{props.castName}</span>
        <span>{props.character}</span>
      </div>
    </div>
  );
};

const CastModal = React.forwardRef((props, ref) => {
  const { cast } = props;

  const closeModal = () => {
    const { background, modal } = ref;
    background.current.style.visibility = "hidden";
    background.current.style.opacity = "0";
    background.current.style.transition = "all 200ms ease-in";

    modal.current.style.visibility = "hidden";
    modal.current.style.opacity = "0";
    modal.current.style.transition = "all 200ms ease-in";
  };

  const onClickPerson = personID => {
    window.open(window.origin + "/person/" + personID, "block");
  };

  return (
    <>
      <ModalBackground
        ref={ref.background}
        ref={ref.background}
        closeModal={closeModal}
      />
      <div ref={ref.modal} className={style["cast-modal"]}>
        <CloseIcon className={style.closeIcon} onClick={closeModal} />
        <Title titleName="Cast" />
        <div className={style["cast-container"]}>
          {cast.map(c => (
            <Cast
              onClickPerson={onClickPerson}
              castID={c.id}
              key={c.id}
              image={c.profile_path}
              castName={c.name}
              character={c.character}
            />
          ))}
        </div>
      </div>
    </>
  );
});

export default CastModal;
