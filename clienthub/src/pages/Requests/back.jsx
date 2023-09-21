import { Link, useParams } from "react-router-dom";
const BackButton = () => {
  const { token } = useParams();
  return (
    <div className="row row--tighterColumns align-justify hideForPrint">
      <div className="medium-shrink columns">
        <div className="buttonGroup u-marginBottomSmall">
          <Link
            className="button button--icon button--greyBlue button--ghost  js-spinOnClick button--iconOnRight"
            data=""
            to={`/client_hubs/${token}/work_requests`}
          >
            <sg-icon icon="backArrow" class="icon--onLeft icon" />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BackButton;
