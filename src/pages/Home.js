import React from "react";

function Home(props) {
  return (
    <div class="container-fluid mt-auto text-white  ">
      <div class="row min-vh-100">
        <div class="col-md-6 outer-wrap text-center">
          <div class="project-module module text project-module-text align- js-project-module e2e-site-project-module-text">
            <div class="rich-text js-text-editable module-text">
              <div class="title">
                <strong>Huy Do</strong>
              </div>
            </div>
          </div>
          <div class="project-module module text project-module-text align- js-project-module e2e-site-project-module-text">
            <div class="rich-text js-text-editable module-text">
              <div>RMIT Student, Bachelor of Computer Science</div>
              <div>Artificial Intelligence</div>
              <div>Machine Learning</div>
              <div>React</div>
              <div></div>
            </div>
          </div>
          <div class="js-project-module project-module module social_icons project-module-social_icons align-">
            <div class="module-content module-content-social_icons js-module-content">
              <div class="social">
                <ul></ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 ">
          <img src="Portfolio/Syd.jpg" alt="This is" class="img-fluid"></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
