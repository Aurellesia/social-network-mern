import "../../style/sass/styles.scss";
import EnInstagramWithCircle from "@meronex/icons/en/EnInstagramWithCircle";
import EnLinkedinWithCircle from "@meronex/icons/en/EnLinkedinWithCircle";
import EnTwitterWithCircle from "@meronex/icons/en/EnTwitterWithCircle";
import FaTelegram from "@meronex/icons/fa/FaTelegram";
import FaFacebook from "@meronex/icons/fa/FaFacebook";
import EnMailWithCircle from "@meronex/icons/en/EnMailWithCircle";

const CardContactMe = ({ dataUser }) => {
  const classLink = (data) => {
    if (data !== "") {
      return "sosmed-link";
    } else {
      return "disable";
    }
  };
  return (
    <div className="card-contact-me">
      <div className="contact-me-content">
        <span className="text-18-bold">Contact Me</span>
        <div className="sosmed">
          <a
            href={dataUser.instagram}
            target={dataUser.instagram !== "" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={classLink(dataUser.instagram)}
          >
            <EnInstagramWithCircle className="contact-me-icon" />
          </a>
          <a
            href={dataUser.linkedin}
            target={dataUser.linkedin !== "" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={classLink(dataUser.linkedin)}
          >
            <EnLinkedinWithCircle className="contact-me-icon" />
          </a>
          <a
            href={dataUser.twitter}
            target={dataUser.twitter !== "" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={classLink(dataUser.twitter)}
          >
            <EnTwitterWithCircle className="contact-me-icon" />
          </a>
          <a
            href={dataUser.telegram}
            target={dataUser.telegram !== "" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={classLink(dataUser.telegram)}
          >
            <FaTelegram className="contact-me-icon" />
          </a>
          <a
            href={dataUser.facebook}
            target={dataUser.facebook !== "" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={classLink(dataUser.facebook)}
          >
            <FaFacebook className="contact-me-icon" />
          </a>
          <a
            href={`mail to: ${dataUser.business_email}`}
            target={dataUser.business_email !== "" ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className={classLink(dataUser.business_email)}
          >
            <EnMailWithCircle className="contact-me-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardContactMe;
