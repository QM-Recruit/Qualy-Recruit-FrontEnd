import React from "react";
import MailApplyForm from "./MailApplyForm";

function JobForm({ closeForm }) {
  return (
    <>
      <div className="inner">
        <div className="close" onClick={closeForm}>
          <img src="/close.png" alt="close_image" />
        </div>
        <div className="contents">
          <div className="top">
            <h3>Apply For a job</h3>
            <p>
              Qualy Myanmar is an offshore company based in Myanmar that specializes in Quality Assurance Testing (Website verification, App verification, Software verification, Game debugging), Web Design Coding, and Business Process Outsourcing (BPO) including administrative and operational tasks.
              <br />
              Additionally, we support to Myanmar people who have the ambition to work in Japan as Training worker or Tokuteiginou worker.
              <br />
              <br />
              Job offer for those who are interested in working at Japan IT company in Mawlamyine, Myanmar. Position include Web Design Coder, Quality Assurance Engineer, Japanese Teacher, and more. Please apply your CV.
            </p>
            <p className="notice-txt">* Require</p>
          </div>
          <div className="bottom">
            <MailApplyForm closeForm={closeForm} />
          </div>
        </div>
      </div>
    </>
  );
}

export default JobForm;
