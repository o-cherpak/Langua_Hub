import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { get } from "firebase/database";
import { useStudentsStore } from "../stores/useStudentsStore.ts";

describe("useStudentsStore - Testy danych", () => {
  it("powinien poprawnie sparsować wszystkie dane studenta", async () => {
    const magdalenaUID = "0p1JZlXZj1S6JEjG8dStKScZaHz2";
    const mockFirebaseData = {
      [magdalenaUID]: {
        email: "magdalena.kowalczyk@email.com",
        role: "student",
        languages: [
          { subject: "English", level: "B1" },
          { subject: "Spanish", level: "A1" }
        ],
        name: "Magdalena",
        phone: "+48 555 444 555",
        surname: "Kowalczyk"
      }
    };

    (get as any).mockResolvedValue({
      val: () => mockFirebaseData,
      exists: () => true,
    });

    const { result } = renderHook(() => useStudentsStore());

    await act(async () => {
      await result.current.fetchStudents();
    });

    const student = result.current.students.find(s => s.uid === magdalenaUID);

    expect(student).toBeDefined();
    expect(student).toEqual({
      uid: magdalenaUID,
      name: "Magdalena",
      surname: "Kowalczyk",
      email: "magdalena.kowalczyk@email.com",
      phone: "+48 555 444 555",
      role: "student",
      languages: [
        { subject: "English", level: "B1" },
        { subject: "Spanish", level: "A1" }
      ]
    });
  });

  it("powinien usunąć studenta ze stanu (state)", async () => {
    const { result } = renderHook(() => useStudentsStore());
    const magdalenaUID = "0p1JZlXZj1S6JEjG8dStKScZaHz2";

    act(() => {
      useStudentsStore.setState({
        students: [{
          uid: magdalenaUID,
          name: "Magdalena",
          surname: "Kowalczyk",
          email: "magdalena.kowalczyk@email.com",
          role: "student",
          phone: "+48 555 444 555",
          languages: []
        }]
      });
    });

    await act(async () => {
      await result.current.deleteStudent(magdalenaUID);
    });

    expect(result.current.students).toHaveLength(0);
  });
});