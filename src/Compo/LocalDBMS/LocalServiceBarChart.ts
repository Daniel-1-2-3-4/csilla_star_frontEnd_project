import { db } from "./DbTabels";

/**
 * Initializes the localSubjects table with default subjects and sets their hours to 0.
 * Clears the table before adding.
 */
export const initializeSubjects = async () => {
  const subjects: string[] = ["Deutsch", "Gk", "Englisch", "Ethik", "Mathe"];
  try {
    // Clear the table first (optional, remove if you want to keep existing data)
    await db.localSubjects.clear();

    // Add each subject with hours set to 0
    for (const subject of subjects) {
      await db.localSubjects.add({
        subject,
        hours: 0,
      });
    }
    console.log("All subjects initialized with hours = 0");
  } catch (error) {
    console.error("Failed to initialize subjects:", error);
  }
};

/**
 * Updates the hours for a given subject.
 * If the subject does not exist, logs a message.
 */
export const updateBySubject = async (
  subjectValue: string,
  hoursValue: number
) => {
  try {
    // Find the first entry with the matching subject
    const existing = await db.localSubjects
      .where("subject")
      .equals(subjectValue)
      .first();
    if (existing) {
      await db.localSubjects.update(existing.id, { hours: hoursValue });
      console.log(
        `Updated subject "${subjectValue}" with hours: ${hoursValue}`
      );
    } else {
      console.log(`Subject "${subjectValue}" not found.`);
    }
  } catch (error) {
    console.error("Failed to update localSubjects:", error);
  }
};

/**
 * Retrieves all subjects as an object: { subject: hours, ... }
 */
export const getSubjects = async () => {
  try {
    const allSubjects = await db.localSubjects.toArray();
    // Convert array to object: { subject: hours, ... }
    const result: { [subject: string]: number } = {};
    allSubjects.forEach((entry) => {
      result[entry.subject] = entry.hours;
    });
    return result;
  } catch (error) {
    console.error("Failed to get subjects as object:", error);
    return {};
  }
};

/**
 * Increments the hours of a given subject by 1.
 * If the subject does not exist, logs a message.
 */
export const incrementHoursByOne = async (subjectValue: string) => {
  try {
    const existing = await db.localSubjects
      .where("subject")
      .equals(subjectValue)
      .first();
    if (existing) {
      await db.localSubjects.update(existing.id, { hours: existing.hours + 1 });
      console.log(`Incremented hours for "${subjectValue}" by 1.`);
    } else {
      console.log(`Subject "${subjectValue}" not found.`);
    }
  } catch (error) {
    console.error("Failed to increment hours by 0:", error);
  }
};

/**
 * Increments the hours of a given subject by a specified value x.
 * If the subject does not exist, logs a message.
 */
export const incrementHoursByX = async (subjectValue: string, x: number) => {
  try {
    const existing = await db.localSubjects
      .where("subject")
      .equals(subjectValue)
      .first();
    if (existing) {
      await db.localSubjects.update(existing.id, { hours: existing.hours + x });
      console.log(`Incremented hours for "${subjectValue}" by ${x}.`);
    } else {
      console.log(`Subject "${subjectValue}" not found.`);
    }
  } catch (error) {
    console.error(`Failed to increment hours by ${x}:`, error);
  }
};

export const barChartTables = {
  initializeSubjects,
  updateBySubject,
  getSubjects,
  incrementHoursByOne,
  incrementHoursByX,
};