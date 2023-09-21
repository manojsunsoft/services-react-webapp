function Footer() {
  return (
    <div className="flexContent u-paddingSmall u-hidden showForPrint">
      <h5 className="u-colorGreyBlueDark u-paddingTopSmall">
        Contact GG Electrical Inc.
      </h5>
      <p>
        941 48 Avenue Southeast, Calgary, Alberta T2G 2A7 <br />
        <a className="u-marginRightSmall" href="tel:4039930631">
          4039930631
        </a>
        <a
          className="u-marginRightSmall"
          data-ja-track-link="Clicked Company Email"
          href="mailto:electrical@ggcalgary.ca"
        >
          electrical@ggcalgary.ca
        </a>
        <a
          target="_blank"
          className="u-marginRightSmall"
          data-ja-track-link="Clicked Company Site URL"
          href="http://www.ggcalgary.ca"
        >
          www.ggcalgary.ca
        </a>
      </p>
      <p className="paragraph u-paddingTopSmall">
        <img
          className="u-inlineBlock u-verticalAlignMiddle"
          src="https://d3ey4dbjkt2f6s.cloudfront.net/assets/app/icons/icon_24x24-df466ea098a7c61c17bbf0ea4234f36c3ee65502adb55eb149260513afca5825.png"
        />
        Created with{" "}
        <a target="_blank" href="https://getjobber.com">
          getjobber.com
        </a>
      </p>
    </div>
  );
}

export default Footer;
