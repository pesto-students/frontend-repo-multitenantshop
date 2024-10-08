import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  APP_NAME_REGULAR,
  TENANT_LANDING_CONFIG,
} from "../../../utils/constants";
import log from "loglevel";

const Landing = () => {
  const navigate = useNavigate();
  const aboutSectionRef = useRef(null);

  const routeToUserRegistration = () => {
    navigate("/register");
  };

  const scrollToSection = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-page">
      <section className="header-container flex">
        <h1 className="heading-1 color-primary">
          {TENANT_LANDING_CONFIG.heading}
        </h1>
        <p className="color-secondary">{TENANT_LANDING_CONFIG.description}</p>
        <div className="call-to-action">
          <button
            onClick={routeToUserRegistration}
            className="btn btn-get-started"
          >
            {TENANT_LANDING_CONFIG["call-to-action-btn-one"]}
          </button>
          <button onClick={scrollToSection} className="btn btn-learn-more">
            {TENANT_LANDING_CONFIG["call-to-action-btn-two"]}
          </button>
        </div>
      </section>
      <section ref={aboutSectionRef} className="about-container flex">
        <h2 className="heading-2 color-primary">
          {TENANT_LANDING_CONFIG["about-heading"]}
        </h2>
        <p
          dangerouslySetInnerHTML={{
            __html: TENANT_LANDING_CONFIG["about-description"].replaceAll(
              "{shopName}",
              APP_NAME_REGULAR
            ),
          }}
          className="color-secondary"
        ></p>
      </section>
      <section className="card-container flex">
        <h2 className="heading-2 color-primary">
          {TENANT_LANDING_CONFIG["card-section-heading"]}
        </h2>
        <div className="cards">
          {TENANT_LANDING_CONFIG["card-values"].map((card) => {
            return (
              <div key={card.title} className="card">
                <h3 className="poppins-semibold">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            );
          })}
        </div>
      </section>
      <section className="contact-container flex">
        <h2 className="heading-2 color-primary">
          {TENANT_LANDING_CONFIG["contact-us-heading"]}
        </h2>
        <p className="color-secondary">
          {TENANT_LANDING_CONFIG["contact-us-text"].replace(
            "{contactId}",
            TENANT_LANDING_CONFIG["contact-us-id"]
          )}
        </p>
      </section>
    </div>
  );
};

export default Landing;
