import {vi} from "vitest";


vi.mock("firebase/app", () => ({
  initializeApp: vi.fn(() => ({})),
}));


vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(() => ({})),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),

  setPersistence: vi.fn(() => Promise.resolve()),
  browserSessionPersistence: "browserSessionPersistence",
  browserLocalPersistence: "browserLocalPersistence",
}));

vi.mock("firebase/database", () => ({
  getDatabase: vi.fn(() => ({})),
  ref: vi.fn(),
  get: vi.fn(),
  set: vi.fn(() => Promise.resolve()),
  push: vi.fn(() => ({ key: "mock-id-123" })),
  update: vi.fn(() => Promise.resolve()),
  remove: vi.fn(() => Promise.resolve()),
}));

vi.mock("react-hot-toast", () => ({
  toast: {
    promise: vi.fn(async (promise) => {
      try {
        return await promise;
      } catch (error) {
        throw error;
      }
    }),
    error: vi.fn(),
    success: vi.fn(),
  },
}));