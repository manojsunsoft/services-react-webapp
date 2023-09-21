const Invoices = () => {
  return (
    <>
      <div
        id="invoiceListNavLeftPane"
        className="row small-collapse medium-uncollapse align-center"
      >
        <div className="medium-8 large-6 columns">
          <div id="invoiceListNavScrollContainer">
            <div className="u-textCenter">
              <sg-icon
                icon="invoice"
                className="icon--circle u-textLargest u-paddingLarge u-colorBlue u-bgColorGreyLighter u-marginBottomSmall icon"
              />
              <h2 className="u-textLarger u-marginBottomSmall">
                You haven't received any invoices yet
              </h2>
              <p className="u-textBase">
                All invoices we send to you will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Invoices;
