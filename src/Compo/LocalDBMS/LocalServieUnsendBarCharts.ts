import { db } from "./DbTabels";

export const addUnSendSubject = async (subject: string, date: string) => {
  try {
    await db.localUnSendSubjects.add({ subject, date });
    console.log(
      `Added to localUnSendSubjects: subject="${subject}", date="${date}"`
    );
  } catch (error) {
    console.error("Failed to add to localUnSendSubjects:", error);
  }
};

export const clearUnSendSubjects = async () => {
  try {
    await db.localUnSendSubjects.clear();
    console.log("Cleared all entries from localUnSendSubjects.");
  } catch (error) {
    console.error("Failed to clear localUnSendSubjects:", error);
  }
};

export const UnsendData = {
  addUnSendSubject,
  clearUnSendSubjects,
};
