import { extendMoment } from "moment-range";
import moment from "moment";
import "moment/locale/ru";

moment.locale("ru");
const Moment = extendMoment(moment);

export default Moment;
