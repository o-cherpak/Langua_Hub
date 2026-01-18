import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { get } from "firebase/database";
import { useStudentsStore } from "../stores/useStudentsStore.ts";

describe("useStudentsStore - Testy wydajności (Performance)", () => {
  it("powinien przetworzyć 1000 studentów w czasie krótszym niż 50ms", async () => {
    const { result } = renderHook(() => useStudentsStore());

    const bigMockData: Record<string, any> = {};

    for (let i = 0; i < 1000; i++) {
      bigMockData[`id_${i}`] = {
        name: `Student ${i}`,
        surname: `Kowalczyk ${i}`,
        email: `student${i}@email.com`,
        role: "student",
        languages: [
          { subject: "English", level: "B1" },
          { subject: "Spanish", level: "A1" }
        ],
        phone: "+48 000 000 000"
      };
    }

    (get as any).mockResolvedValue({
      val: () => bigMockData,
      exists: () => true,
    });

    const start = performance.now();

    await act(async () => {
      await result.current.fetchStudents();
    });

    const end = performance.now();
    const duration = end - start;

    console.log(`Czas wykonania dla 1000 rekordów: ${duration.toFixed(2)}ms`);

    expect(result.current.students).toHaveLength(1000);

    expect(duration).toBeLessThan(50);
  });
});