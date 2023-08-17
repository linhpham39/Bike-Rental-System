import React from "react";

const RentingReturn = (props) => {
  return (
    <React.Fragment>
      <p>When you rent bike, you need:</p>
      <ul>
        <li>Deposit your citizenship or identity card</li>
        <li>Return bike before the time you rent</li>
        <li>Return bike in the same condition as when you rent</li>
      </ul>
      <p>
        After renting bike, admin will confirm information and hold your deposit (if you return bike late or damage bike,
         <b> you will be charged for the damage</b>)
      </p>
      <p>
        If you want to cancel renting, you can cancel it before the time you rent.
         After you pay for renting fee,
         admin will return your deposit and you can rent bike again
      </p>
    </React.Fragment>
  );
};

export default RentingReturn;
