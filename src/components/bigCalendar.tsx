import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import moment from "moment";

import GetSchedulesAPI from "../api/api/schedules/getSchedulesAPI.tsx";

import "../App.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type CalendarList = {
  id: number;
  startDate: number[];
  endDate: number[];
  content: string;
  createdAt: number[];
};

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  .react-calendar {
    width: 100%;
    border: 1px solid #fff;
    border-radius: 15px;
    background-color: transparent;
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      font-size: 18px;
      color: #fff;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }
  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-family: Suit-SemiBold;
    font-size: 30px;
    color: #fff;
    border-radius: 10px;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: transparent;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: transparent;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 간격 */
  .react-calendar__month-view__weekdays {
    box-sizing: border-box;
    padding: 15px 0;
    border-top: 2px #eef0fe solid;
    border-bottom: 2px #eee solid;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    font-family: Suit-ExtraBold;
    font-size: 20px;
    color: #fff;
    text-decoration: none;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background-color: transparent;
    color: #114df0;
  }

  /* 네비게이션 현재 월 스타일 적용*/
  .react-calendar__tile--hasActive {
    box-shadow: 0 0 0 2px #114df0 inset;
    background-color: transparent;
    border-radius: 10px;
    abbr {
      color: #114df0;
    }
  }

  /* 일 날짜 스타일 적용 */
  .react-calendar__month-view__days__day {
    // border-bottom: 2px #eee solid;
    font-family: Suit-SemiBold;
    padding: 10px 5px 80px;
    position: relative;
    text-align: left;
    abbr {
      padding-left: 5px;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 15px;
    background-color: #fff;
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 30px 6.6667px;
    font-family: Suit-ExtraBold;
    font-size: 14px;
    color: #fff;
  }

  /* 월 hover, focus 스타일 적용 */
  .react-calendar__tile:enabled:hover {
    background-color: transparent;
    border-radius: 15px;
    color: #fff;
  }
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    box-shadow: 0 0 0 2px #114df0 inset;
    background-color: transparent;
    border-radius: 15px;
    color: #114df0;
  }

  /* 근처 월 스타일 적용 */
  .react-calendar__month-view__days__day--neighboringMonth {
    abbr {
      color: #777;
    }
  }
`;

const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
const StyledTodayBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 35px;
  background-color: #8aa7f8;
  color: #fff;
  width: 60px;
  min-width: fit-content;
  height: 20px;
  text-align: center;
  margin: 0 auto;
  border-radius: 15px;
  font-family: Suit-Regular;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

type DateSelectionHandler = (selectedDate: Date) => void;
interface BigCalendarProps {
  onDateSelect: DateSelectionHandler;
}

const BigCalendar: React.FC<BigCalendarProps> = ({ onDateSelect }) => {
  const today = new Date();
  const [date, setDate] = useState<Value>(today);
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(
    new Date()
  );
  const [currentMonthDays, setCurrentMonthDays] = useState<Date[]>([]);

  const [calendarPlanList, setCalendarPlanList] = useState<CalendarList[]>([]);

  // 날짜 범위를 돌면서 rowIndex 배정
  const eventRowMap = useMemo(() => {
    const rowMap: Record<string, number> = {};
    const occupied: Record<string, string[]> = {}; // date -> eventId[] (row 차지 현황)

    calendarPlanList.forEach((event) => {
      const start = moment(event.startDate);
      const end = moment(event.endDate);
      let assignedRow: number | null = null;

      for (let d = start.clone(); d.isSameOrBefore(end); d.add(1, "day")) {
        const dateKey = d.format("YYYY-MM-DD");
        if (!occupied[dateKey]) occupied[dateKey] = [];

        // 이 이벤트가 아직 rowIndex를 안 받은 경우
        if (assignedRow === null) {
          let candidate = 0;
          while (occupied[dateKey].includes(String(candidate))) {
            candidate++;
          }
          assignedRow = candidate;
          rowMap[event.id] = candidate;
        }

        occupied[dateKey].push(String(assignedRow));
      }
    });

    return rowMap;
  }, []);

  useEffect(() => {
    if (activeStartDate) {
      const start = moment(activeStartDate).startOf("month").startOf("week"); // 주의 시작 (일요일 기준)
      const end = moment(activeStartDate).endOf("month").endOf("week"); // 주의 끝
      const days: Date[] = [];
      for (let d = start.clone(); d.isSameOrBefore(end); d.add(1, "day")) {
        days.push(d.toDate());
      }
      setCurrentMonthDays(days);
    }
  }, [activeStartDate]);

  useEffect(() => {
    async function fetchSchedules() {
      const schedules = await GetSchedulesAPI();
      setCalendarPlanList(schedules);
    }
    fetchSchedules();
  }, []);

  const handleDateChange = (newDate: Value) => {
    setDate(newDate);
    if (newDate instanceof Date) {
      onDateSelect(newDate);
    }
  };

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
    onDateSelect(today);
  };

  const renderEventBars = () => {
    const firstDay = currentMonthDays[0];
    const lastDay = currentMonthDays[currentMonthDays.length - 1];
    if (!firstDay || !lastDay) return null;

    const dayEventsMap: Record<number, string[]> = {};
    calendarPlanList.forEach((event) => {
      const start = moment.max(moment(event.startDate), moment(firstDay));
      const end = moment.min(moment(event.endDate), moment(lastDay));
      if (end.isBefore(start)) return;

      for (let d = start.clone(); d.isSameOrBefore(end); d.add(1, "day")) {
        const key = d.format("YYYY-MM-DD");
        if (!dayEventsMap[key]) dayEventsMap[key] = [];
        dayEventsMap[key].push(event.id);
      }
    });

    const bars: React.ReactNode[] = [];

    calendarPlanList.forEach((event) => {
      const start = moment.max(moment(event.startDate), moment(firstDay));
      const end = moment.min(moment(event.endDate), moment(lastDay));
      if (end.isBefore(start)) return;

      const startIndex = start.diff(moment(firstDay), "days");
      const endIndex = end.diff(moment(firstDay), "days");
      const rowIndex = eventRowMap[event.id] ?? 0;

      let weekStart = startIndex;
      while (weekStart <= endIndex) {
        const weekRow = Math.floor(weekStart / 7);
        const colStart = weekStart % 7;
        const weekEnd = Math.min(endIndex, (weekRow + 1) * 7 - 1);
        const colSpan = weekEnd - weekStart + 1;

        const isStartWeek = weekStart === startIndex;
        const isEndWeek = weekEnd === endIndex;
        const isOneDay = startIndex === endIndex;

        const dayKey = moment(firstDay)
          .add(weekStart, "days")
          .format("YYYY-MM-DD");
        const totalEvents = dayEventsMap[dayKey]?.length ?? 0;

        if (rowIndex < 2) {
          bars.push(
            <div
              key={`${event.id}-${weekRow}`}
              style={{
                position: "absolute",
                top: `${40 + weekRow * 111.2 + rowIndex * 30}px`,
                left: `${(colStart / 7) * 100}%`,
                width: isOneDay
                  ? `calc(${(colSpan / 7) * 100}% - 20px)`
                  : isStartWeek || isEndWeek
                  ? `calc(${(colSpan / 7) * 100}% - 15px)`
                  : `calc(${(colSpan / 7) * 100}% - 10px)`,
                marginLeft: isStartWeek || isOneDay ? "5px" : "0",
                height: "25px",
                backgroundColor: rowIndex === 0 ? "#EEF0FE" : "#C9D9FD",
                fontFamily: "Suit-SemiBold",
                fontSize: "13px",
                color: "#000",
                padding: "0 5px",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  minWidth: 0,
                  flex: 1,
                }}
              >
                {isStartWeek || isOneDay ? event.content : ""}
              </span>
            </div>
          );
        } else if (rowIndex === 2) {
          bars.push(
            <div
              key={`more-${dayKey}`}
              style={{
                position: "absolute",
                top: `${10 + weekRow * 111.2}px`,
                right: `calc(${((6 - colStart) / 7) * 100}% + 10px)`,
                height: "20px",
                fontSize: "12px",
                fontFamily: "Suit-Regular",
                color: "#000",
                textAlign: "center",
                lineHeight: "20px",
                pointerEvents: "none",
              }}
            >
              +{totalEvents - 2}
            </div>
          );
        }

        weekStart = weekEnd + 1;
      }
    });
    return bars;
  };

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(_, date) => moment(date).format("D")}
        formatYear={(_, date) => moment(date).format("YYYY")}
        formatMonthYear={(_, date) => moment(date).format("YYYY. MM")}
        calendarType="gregory"
        locale="en-US"
        showNeighboringMonth={true}
        next2Label={null}
        prev2Label={null}
        minDetail="year"
        // 오늘 날짜로 돌아오는 기능
        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
        onActiveStartDateChange={({ activeStartDate }) =>
          setActiveStartDate(activeStartDate)
        }
      />
      <div
        style={{
          position: "absolute",
          top: "125px",
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
        }}
      >
        {renderEventBars()}
      </div>
      <StyledTodayBtn onClick={handleTodayClick}>Today</StyledTodayBtn>
    </StyledCalendarWrapper>
  );
};

export default BigCalendar;
