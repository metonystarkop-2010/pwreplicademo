import { useCallback, useEffect, useState } from "react";

/** A batch the user has added to their own study list. */
export type EnrolledBatch = {
  id: string;
  name: string;
  image: string;
};

const KEY = "pw_enrolled_batches_v1";
const EVENT = "pw-enrolled-changed";

function read(): EnrolledBatch[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "[]") as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b): b is EnrolledBatch =>
        !!b && typeof (b as EnrolledBatch).id === "string" && !!(b as EnrolledBatch).id,
    );
  } catch {
    return [];
  }
}

function write(list: EnrolledBatch[]) {
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function useEnrolledBatches() {
  const [batches, setBatches] = useState<EnrolledBatch[]>([]);

  useEffect(() => {
    const sync = () => setBatches(read());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const enroll = useCallback((batch: EnrolledBatch) => {
    const list = read().filter((b) => b.id !== batch.id);
    write([batch, ...list]);
  }, []);

  const unenroll = useCallback((id: string) => {
    write(read().filter((b) => b.id !== id));
  }, []);

  const isEnrolled = useCallback(
    (id: string) => batches.some((b) => b.id === id),
    [batches],
  );

  return { batches, enroll, unenroll, isEnrolled };
}
