import calculateShipping from "./calculateShipping";
import cancelUnpaid from "./cancelUnpaid";
import getOne from "./getOne";
import list from "./list";
import sendToProduction from "./sendToProduction";
import submit from "./submit";
import submitExpress from "./submitExpress";

const Orders = {
  list,
  getOne,
  submit,
  submitExpress,
  sendToProduction,
  calculateShipping,
  cancelUnpaid,
};

export default Orders;
