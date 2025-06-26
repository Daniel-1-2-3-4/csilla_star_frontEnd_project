// src/db/indexedDb.ts
import Dexie, { type EntityTable } from "dexie";

// Interfaces for each table
interface LocalSubjects {
  id?: number;
  subject: string;
  hours: number;
}

interface LocalUnSendSubjects {
  id?: number; // Auto-incrementing primary key
  subject: string;
  date: string;
}

interface LocalDates {
  id?: number; // Optional because it's auto-incrementing
  dates: { [date: string]: { [subject: string]: number } };
}

interface LocalOldData {
  id?: number; // Optional because it's auto-incrementing
  oldData: { [subject: string]: string };
}

const DB_NAME = "CsillasDatabase";
const DB_VERSION = 1;

// Dexie DB with 3 tables
const db = new Dexie(DB_NAME) as Dexie & {
  localSubjects: EntityTable<LocalSubjects, "id">;
  localUnSendSubjects: EntityTable<LocalUnSendSubjects, "id">;
  localDates: EntityTable<LocalDates, "id">;
  localOldData: EntityTable<LocalOldData, "id">;
};

// Schema declaration
db.version(DB_VERSION).stores({
  // '++id': primary key, auto-incrementing
  // 'subject, hours': indexed fields for efficient querying by subject name or hours
  localSubjects: "++id, subject, hours",

  // new table with id, subject, date
  localUnSendSubjects: "++id, subject, date", // new table with id, subject, date

  // 'dates': This field is a complex object. Indexing the whole object is not useful.
  // We'll primarily access this by its ID.
  localDates: "++id",

  // 'oldData': This field is also a complex object. Indexing the whole object is not useful.
  // We'll primarily access this by its ID.
  localOldData: "++id",
});

// IMPORTANT: Initialize default data or ensure tables are created
db.on("ready", async () => {
  try {
    // For localSubjects, we might add some initial subjects
    const subjectCount = await db.localSubjects.count();
    if (subjectCount === 0) {
      await db.localSubjects.bulkAdd([
        { subject: "Deutsch", hours: 0 },
        { subject: "Gk", hours: 0 },
        { subject: "Englisch", hours: 0 },
        { subject: "Mathe", hours: 0 },
        { subject: "Ethik", hours: 0 },
      ]);
      console.log("IndexedDB: Default localSubjects initialized.");
    }

    // For localDates and localOldData, you might or might not want initial default records.
    // If you want a single "main" record for each (like your previous singleton),
    // you'd check for a specific ID (e.g., 1) and add it if missing.
    // For now, these tables will be empty until data is added explicitly via your DAO/Service.
    console.log("IndexedDB: Database and tables are ready.");
  } catch (error) {
    console.error(
      "IndexedDB: Error during database initialization on 'ready' event:",
      error
    );
  }
});

export type { LocalSubjects, LocalUnSendSubjects, LocalDates, LocalOldData };
export { db };
