//import "../../assets/error_styles.css";
const NotFound = () => {
  return (
    <>
      <div className="logoContainer">
        <a href="https://getjobber.com">
          <img
            src="https://getservis.com/wp-content/uploads/2021/01/imgpsh_fullsize_anim-3.png"
            alt="Jobber"
          />
        </a>
      </div>
      <div className="card">
        <h1 className="headingOne u-textJumbo u-marginTopSmall">404</h1>
        <h3 className="headingThree u-colorGreyBlueDark">Page Not Found</h3>
        <p className="paragraph">Check the address for errors and try again</p>
      </div>
    </>
  );
};
export default NotFound;
