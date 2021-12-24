import "../../style/sass/styles.scss";
import FaGraduationCap from "@meronex/icons/fa/FaGraduationCap";
import MdWork from "@meronex/icons/md/MdWork";

const CardAboutMe = ({ dataUser }) => {
  return (
    <div className="card-about-me">
      <div className="about-me-content">
        <span className="text-18-bold">About Me</span>
        <span className="text-12">{dataUser.bio}</span>
        <hr />
        <div className="edu-work">
          <FaGraduationCap className="about-me-icon" />
          <span className="text-12">{dataUser.education}</span>
        </div>
        <div className="edu-work">
          <MdWork className="about-me-icon" />
          <span className="text-12">{dataUser.workplace}</span>
        </div>
      </div>
    </div>
  );
};

export default CardAboutMe;
