import {ScheduleList} from "../../../components/sheduleList/ScheduleList";
import type {ICourse} from "../../../interfaces/ICourse.ts";
import {EmptyCourses} from "../../../components/sheduleList/EmptyCourses.tsx";

type StatusLessonListProps = {
  hasLessons?: boolean;
  todayCourses: ICourse[]
}

export function StatusLessonList({hasLessons, todayCourses}: StatusLessonListProps) {
  return (
    <>
      {hasLessons ? (
        <ScheduleList courses={todayCourses}/>
      ) : (
        <EmptyCourses />
      )}</>
  );
}
