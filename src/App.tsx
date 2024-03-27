import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  DateRangePickerDayProps,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { bookedDates } from "./mockData/data";
import dayjs, { Dayjs } from "dayjs";
import classNames from "classnames";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function App() {
  const [emded, setEmded] = useState(false);

  const embededScript = `<iframe src=${window.location.origin}/embed=true style="width:100%;border:none"></iframe>`;

  function DayBox(props: DateRangePickerDayProps<Dayjs>) {
    const { outsideCurrentMonth, disabled } = props;
    const currentDate = dayjs(props.day).format("DD/MM/YYYY");
    const isBookedConfirm = bookedDates.find(
      (item) =>
        item.type === "booked" &&
        currentDate === dayjs(item.date).format("DD/MM/YYYY")
    );

    const isPendingConfrim = bookedDates.find(
      (item) =>
        item.type === "pending" &&
        currentDate === dayjs(item.date).format("DD/MM/YYYY")
    );

    const isAvailable =
      !disabled &&
      !outsideCurrentMonth &&
      !isBookedConfirm &&
      !isPendingConfrim;
    return (
      <div
        className={classNames(
          "p-2 m-1 w-8 flex justify-center rounded",
          { "bg-blue-500": isBookedConfirm },
          { "bg-yellow-400": isPendingConfrim },
          { "bg-green-400": isAvailable },
          { "bg-gray-100 opacity-30": disabled && !outsideCurrentMonth },
          {
            "bg-transparent": outsideCurrentMonth,
          }
        )}
      >
        {!outsideCurrentMonth && (
          <span className="text-cente">{dayjs(props.day).get("date")}</span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-200 p-8 h-screen">
      <div className="text-3xl text-center my-5">
        Simple Availability Calendar
      </div>

      <div className="max-w-max bg-white m-auto p-2 rounded-xl">
        <div
          className={classNames("mb-4", {
            hidden: window.location.pathname.includes("/embed"),
          })}
        >
          <button
            className="bg-green-300 p-2 rounded ml-auto flex mb-2"
            type="button"
            onClick={() => setEmded(!emded)}
          >
            Embed
          </button>

          {emded && (
            <div className="flex justify-end bg-black text-white border w-fit p-3">
              <div className="">{embededScript}</div>
              <CopyToClipboard text={embededScript}>
                <ContentCopyIcon className="cursor-pointer" />
              </CopyToClipboard>
            </div>
          )}
        </div>
        <div id="calender">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateRangeCalendar"]}>
              <DateRangeCalendar
                calendars={3}
                slots={{
                  day: DayBox,
                }}
                disablePast
                showDaysOutsideCurrentMonth={false}
              />
            </DemoContainer>
          </LocalizationProvider>
          <div className="flex justify-end p-2 gap-4 my-2">
            <div className="flex gap-1">
              <div className="rounded border w-6 text-center bg-blue-400"></div>
              <span>Booked</span>
            </div>
            <div className="flex gap-1">
              <div className="rounded border w-6 text-center  bg-yellow-400"></div>
              <span>Pending</span>
            </div>
            <div className="flex gap-1">
              <div className="rounded border w-6 text-center bg-green-400"></div>
              <span>Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
