"use client";

import { Chapter } from "@/client_routing/types/player_types";

export function convertToSeconds(timeString: string): number {
  if (timeString.split(":").length < 3) {
    timeString = `0:${timeString}`;
  }
  let [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const acceptable_characters = "abcdefghijklmnopqrstuvwxyz0123456789";

const split_string_into_timestamp_and_description = (
  string: string
): Chapter[] => {
  const split_string_arr = string.split("\n");
  const chapters_array: Chapter[] = [];

  split_string_arr.forEach((part) => {
    const chapter_obj: Chapter = { start: 0, title: "" };

    if (!/\b\d{1,2}:\d{2}\b/.test(part)) {
      return;
    }

    let timestamp_parts = part.split(/\b\d{1,2}:\d{2}\b/);
    let timestamp = /\b\d{1,2}:\d{2}\b/.exec(part)?.[0] || "";
    let description_string = timestamp_parts.join("").trim();

    let start = 0;
    while (
      start < description_string.length &&
      !acceptable_characters.includes(description_string[start].toLowerCase())
    ) {
      start++;
    }

    let end = description_string.length - 1;
    while (
      end >= 0 &&
      !acceptable_characters.includes(description_string[end].toLowerCase())
    ) {
      end--;
    }

    let description = description_string.slice(start, end + 1);

    chapter_obj.start = convertToSeconds(timestamp);
    chapter_obj.title = description;

    chapters_array.push(chapter_obj);
  });

  return chapters_array;
};

const make_chapter_obj = (
  chapters_array: Chapter[],
  duration: number
): boolean => {
  let is_valid_chapters = true;

  for (let i = 0; i < chapters_array.length; i++) {
    if (
      i < chapters_array.length - 1 &&
      chapters_array[i].start > chapters_array[i + 1].start
    ) {
      is_valid_chapters = false;
      break;
    }
    if (chapters_array[i].start > duration) {
      is_valid_chapters = false;
      break;
    }
    if (i > 0 && chapters_array[i].start <= 0) {
      is_valid_chapters = false;
      break;
    }
    chapters_array[i].end =
      i < chapters_array.length - 1 ? chapters_array[i + 1].start : duration;
  }

  return is_valid_chapters;
};

const generateChapters = (des_string: string, duration: number): Chapter[] => {
  let chapters_array = split_string_into_timestamp_and_description(des_string);
  let is_valid_chapters = make_chapter_obj(chapters_array, duration);

  if (!is_valid_chapters || chapters_array.length === 0) {
    return [{ start: 0, title: "", end: duration }];
  }

  return chapters_array;
};

export default generateChapters;
